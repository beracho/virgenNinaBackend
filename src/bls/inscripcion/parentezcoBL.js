const config = require('konfig')();
const dao = require('../../dao/dao');
const Q = require('q');
const util = require('../../libs/util');
const general = require('../../utils/util');
const personaBL = require('./../autenticacion/personaBL');
const handlebars = require('handlebars');
const fs = require('fs-extra');
const moment = require('moment');

module.exports = app => {
  const models = app.src.db.models;
  const sequelize = app.src.db.sequelize;
  const creaNombreCompleto = (primer_apellido, segundo_apellido, nombres) => {
    nombre_completo = `${primer_apellido ? primer_apellido : ''}`;
    nombre_completo = `${nombre_completo} ${segundo_apellido ? segundo_apellido : ''}`;
    nombre_completo = `${nombre_completo} ${nombres} `;
    nombre_completo = nombre_completo.replace( /\s\s+/g, ' ' );
    nombre_completo = nombre_completo.trim();
    return nombre_completo;
  }
  const agregaPariente = (body, models) => {
    const deferred = Q.defer();
    let whereEstudiante = {};
    let wherePersona = {};
    switch (body.busqueda) {
      case 'codigo':
        whereEstudiante = {
          codigo: body.codigo
        }
        break;
      case 'ci':
        wherePersona = {
          tipo_documento: body.tipo_documento,
          documento_identidad: body.documento_identidad,
          lugar_documento_identidad: body.lugar_documento_identidad
        }
        break;
      default:
        break;
    }
    params = {
      where: wherePersona,
      include: [{
        where: whereEstudiante,
        model: models.estudiante,
        as: 'estudiante'
      }, {
        model: models.parentezco,
        as: 'persona_de',
        include: [{
          model: models.persona,
          as: 'persona_es'
        }]
      }]
    };
    models.sequelize.transaction()
    .then(transaccion => {
      let personaDatos = {};
      let parentezcoDatos = {};
      let idPersonaDeEstudiante;
      dao.listarRegistros(models.persona, params)
      .then(respuestaParientes => {
        if (body.accion == 'edita') {
          idPersonaDeEstudiante = respuestaParientes[0].id_persona;
          respuestaParientes[0].persona_de.forEach(pariente => {
              // actualiza datos Relacion
              parentezcoDatos.relacion = body.padre.relation;
              parentezcoDatos._usuario_modificacion = body.audit_usuario.id_usuario;
              parentezcoDatos._fecha_modificacion = new Date();
              // actualiza datos persona
              personaDatos.tipo_documento = body.padre.tipo_documento;
              personaDatos.documento_identidad = body.padre.documento_identidad;
              personaDatos.lugar_documento_identidad = body.padre.lugar_documento_identidad;
              personaDatos.complemento_documento = body.padre.complemento_documento;
              personaDatos.fecha_nacimiento = body.padre.fecha_nacimiento;
              personaDatos.nombres = body.padre.nombres;
              personaDatos.primer_apellido = body.padre.primer_apellido;
              personaDatos.segundo_apellido = body.padre.segundo_apellido;
              personaDatos.genero = body.padre.genero;
              personaDatos.nombre_completo = creaNombreCompleto(body.padre.primer_apellido, body.padre.segundo_apellido, body.padre.nombres);
              personaDatos.idioma_materno = body.padre.idioma_materno;
              personaDatos.estado_civil = body.padre.civil_state;
              personaDatos.idiomas = body.padre.idiomas;
              personaDatos.ocupacion_actual = body.padre.ocupacion_actual;
              personaDatos.grado_instruccion = body.padre.grado_instruccion;
              personaDatos.salario_mensual = Number(body.padre.salario_mensual);
              personaDatos.edad = body.padre.age;
              personaDatos._usuario_modificacion = body.audit_usuario.id_usuario;
              personaDatos._fecha_modificacion = new Date();
          });
          return dao.modificarRegistro(models.persona, body.padre.id_persona, personaDatos, transaccion)
        } else {
          parentezcoDatos.relacion = body.padre.relationItems;
          parentezcoDatos._usuario_creacion = body.audit_usuario.id_usuario;
          parentezcoDatos._usuario_modificacion = body.audit_usuario.id_usuario;
          parentezcoDatos._fecha_modificacion = new Date();
          personaDatos.tipo_documento = body.padre.tipo_documento;
          personaDatos.documento_identidad = body.padre.documento_identidad;
          personaDatos.lugar_documento_identidad = body.padre.lugar_documento_identidad;
          personaDatos.fecha_nacimiento = body.padre.fecha_nacimiento;
          personaDatos.nombres = body.padre.nombres;
          personaDatos.primer_apellido = body.padre.primer_apellido;
          personaDatos.segundo_apellido = body.padre.segundo_apellido;
          personaDatos.genero = body.padre.genero;
          personaDatos.nombre_completo = creaNombreCompleto(body.padre.primer_apellido, body.padre.segundo_apellido, body.padre.nombres);
          personaDatos.idioma_materno = body.padre.idioma_materno;
          personaDatos.estado_civil = body.padre.civil_state;
          personaDatos.idiomas = body.padre.idiomas;
          personaDatos.ocupacion_actual = body.padre.ocupacion_actual;
          personaDatos.grado_instruccion = body.padre.grado_instruccion;
          personaDatos.salario_mensual = Number(body.padre.salario_mensual);
          personaDatos.edad = body.padre.age;
          personaDatos._usuario_creacion = body.audit_usuario.id_usuario;
          personaDatos._usuario_modificacion = body.audit_usuario.id_usuario;
          personaDatos._fecha_modificacion = new Date();
          return dao.crearRegistro(models.persona, personaDatos, false, transaccion)
        }
      })
      .then(respuestaPersona => {
        if (body.accion == 'edita') {
          return dao.modificarRegistro(models.parentezco, body.padre.id, parentezcoDatos, transaccion)
        } else {
          parentezcoDatos.fid_persona_es = respuestaPersona.id_persona;
          parentezcoDatos.fid_persona_de = idPersonaDeEstudiante;
          return dao.crearRegistro(models.parentezco, parentezcoDatos, false, transaccion)
        }
      })
      .then(respuesta => {
        deferred.resolve('Creado exitosamente');
        transaccion.commit()
      })
      .catch(error => {
        console.log(error);
        transaccion.rollback();
        deferred.reject(error)
      });
    })
    .catch(error => {
      console.log(error);
      deferred.reject(error)
    });
    return deferred.promise;
  }
  const declaracion_juradaBL = {
    agregaPariente
  };

  return declaracion_juradaBL;
};