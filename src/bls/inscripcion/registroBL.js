/**
* Lógica del Negocio -> ConfiguracionBL
*/
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
  const estudianteBL = app.src.bls.inscripcion.estudianteBL;
  const validaFormulario = (body, models) => {
    const deferred = Q.defer();
    let valida = {
      value: true,
      error: '',
    };
    if (!body) {
      valida.value = false;
      valida.error = `noDataSent`;
      deferred.reject(valida)
      return deferred.promise;
    }
    if (!body.persona || !body.nacimiento) {
      valida.value = false;
      valida.error = `wrongFormat`;
      deferred.reject(valida)
      return deferred.promise;
    }
    if (!body.persona.nombres || body.persona.nombres == "") {
      valida.value = false;
      valida.error = `noNamesValue`;
      deferred.resolve(valida);
      return deferred.promise;
    }
    if ((!body.persona.primer_apellido || body.persona.primer_apellido == "") && (!body.persona.segundo_apellido || body.persona.segundo_apellido == "")) {
      valida.value = false;
      valida.error = `noLastNameValue`;
      deferred.resolve(valida);
      return deferred.promise;
    }
    if (!body.persona.tipo_documento || body.persona.tipo_documento == "") {
      valida.value = false;
      valida.error = `noDocumentTipeValue`;
      deferred.resolve(valida);
      return deferred.promise;
    }
    if (!body.nacimiento.fecha_nacimiento || body.nacimiento.fecha_nacimiento == "") {
      valida.value = false;
      valida.error = `noBornDateValue`;
      deferred.resolve(valida);
      return deferred.promise;
    }
    if (!body.persona.genero || body.persona.genero == "") {
      valida.value = false;
      valida.error = `noGenderValue`;
      deferred.resolve(valida);
      return deferred.promise;
    }
    if (!body.persona.codrude || body.persona.codrude == "") {
      valida.value = false;
      valida.error = `noRudeValue`;
      deferred.resolve(valida);
      return deferred.promise;
    }
    if (!body.nacimiento.municipio || body.nacimiento.municipio == "") {
      valida.value = false;
      valida.error = `noCityValue`;
      deferred.resolve(valida);
      return deferred.promise;
    }
    deferred.resolve(valida);
    return deferred.promise;
  }
  
  const llenaRegistro = (body, models) => {
    const deferred = Q.defer();
    let personaCreada = false;
    var personaModificar = {};
    let clavesForaneas = {};
    var personaObj = {};
    var whereObj = {};
    validaFormulario(body, models)
      .then(respuesta => {
        const deferred = Q.defer();
        if (!respuesta.value) {
          throw new Error(respuesta.error);
        }
        personaObj = {
          nombres: body.persona.nombres,
          primer_apellido: body.persona.primer_apellido,
          segundo_apellido: body.persona.segundo_apellido,
          genero: body.persona.genero,
          fecha_nacimiento: body.nacimiento.fecha_nacimiento,
          _usuario_creacion: body.audit_usuario.id_usuario
        }
        whereObj = {
          tipo_documento: body.persona.tipo_documento == 'CODIGO' ? 'CARNET_IDENTIDAD' : body.persona.tipo_documento,
          documento_identidad: body.persona.documento_identidad,
          lugar_documento_identidad: body.persona.lugar_documento_identidad
        }
        if (body.salud.discapacidad_origen !== '') { personaObj.discapacidad_origen = body.salud.discapacidad_origen };
        if (body.salud.carnet_discapacidad !== '') { personaObj.carnet_discapacidad = body.salud.carnet_discapacidad };
        if (body.salud.tiene_discapacidad !== '') { personaObj.tiene_discapacidad = body.salud.tiene_discapacidad };
        if (body.persona.pioc !== '') { personaObj.pioc = body.persona.pioc };
        if (body.persona.discapacidad !== '') { personaObj.discapacidad = body.persona.discapacidad };
        if (body.registroInscripcion.idioma !== '') { personaObj.idioma_materno = body.registroInscripcion.idioma };
        if (body.registroInscripcion.idiomas !== '') { personaObj.idiomas = body.registroInscripcion.idiomas };
        if (body.salud.tipo_discapacidad !== '') { personaObj.fid_discapacidad = body.salud.tipo_discapacidad };
        if (body.salud.subtipo_discapacidad !== '') { personaObj.fid_discapacidad = body.salud.subtipo_discapacidad };
        return models.sequelize.transaction()
      })
      .then((transaccion) => {
        models.persona.findOrCreate({ where: whereObj, defaults: personaObj, transaction: transaccion })
          .spread((personResponse, created) => {
            personaCreada = created;
            if (personaCreada) {
              // devuelve creado
              return personResponse;
            } else {
              // devuelve objeto
              let params = {};
              if (body.persona && body.persona.codigo) {
                params = {
                  codigo: body.persona.codigo
                }
              }
              if (body.persona && body.persona.tipo_documento &&
                body.persona && body.persona.documento_identidad &&
                body.persona && body.persona.lugar_documento_identidad) {
                params = {
                  tipo_documento: body.persona.tipo_documento == 'CODIGO' ? 'CARNET_IDENTIDAD' : body.persona.tipo_documento,
                  documento_identidad: body.persona.documento_identidad,
                  lugar_documento_identidad: body.persona.lugar_documento_identidad
                }
              }
              return estudianteBL.obtenerRegistros(params, body);
            }
          })
          .then(respuesta => {
            const parametrosRegistro = {};
            if (body.nacimiento.nOficialia !== '') { parametrosRegistro.oficialia = body.nacimiento.nOficialia };
            if (body.nacimiento.nLibro !== '') { parametrosRegistro.libro = body.nacimiento.nLibro };
            if (body.nacimiento.nPartida !== '') { parametrosRegistro.partida = body.nacimiento.nPartida };
            if (body.nacimiento.nFolio !== '') { parametrosRegistro.folio = body.nacimiento.nFolio };
            if (body.salud.centro_salud !== '') { parametrosRegistro.centro_salud = body.salud.centro_salud };
            if (body.salud.frecuencia_medica !== '') { parametrosRegistro.frecuencia_medica = body.salud.frecuencia_medica };
            if (body.servicios_basicos.origen_agua !== '') { parametrosRegistro.origen_agua = body.servicios_basicos.origen_agua };
            if (body.servicios_basicos.acceso_electricidad !== '') { parametrosRegistro.acceso_electricidad = body.servicios_basicos.acceso_electricidad };
            if (body.servicios_basicos.destino_agua !== '') { parametrosRegistro.destino_agua = body.servicios_basicos.destino_agua };
            if (body.empleo.actividad_laboral !== '') { parametrosRegistro.actividad_laboral = body.empleo.actividad_laboral };
            if (body.empleo.dias_trabajo !== '') { parametrosRegistro.dias_trabajo = body.empleo.dias_trabajo };
            if (body.empleo.salario !== '') { parametrosRegistro.salario = body.empleo.salario };
            if (body.comunicacion_transporte.acceso_internet !== '') { parametrosRegistro.acceso_internet = body.comunicacion_transporte.acceso_internet };
            if (body.comunicacion_transporte.frecuencia_internet !== '') { parametrosRegistro.frecuencia_internet = body.comunicacion_transporte.frecuencia_internet };
            if (body.comunicacion_transporte.medio_transporte !== '') { parametrosRegistro.medio_transporte = body.comunicacion_transporte.medio_transporte };
            if (body.comunicacion_transporte.duracion_transporte !== '') { parametrosRegistro.duracion_transporte = body.comunicacion_transporte.duracion_transporte };
            if (body.persona.pioc !== '') { parametrosRegistro.fid_pioc = body.persona.pioc };
            if (body.registroInscripcion.lugarEnvio !== '') { parametrosRegistro.lugar_envio = body.registroInscripcion.lugarEnvio };
            parametrosRegistro.vigente = true;
            parametrosRegistro._fecha_envio = new Date();
            if (personaCreada) {
              // Crea registro
              personaModificar = respuesta;
              parametrosRegistro._usuario_creacion = body.audit_usuario.id_usuario;
              return dao.crearRegistro(models.registro_inscripcion, parametrosRegistro, false, transaccion)
            } else {
              // modifica registro
              personaModificar = respuesta[0];
              parametrosRegistro._usuario_modificacion = body.audit_usuario.id_usuario;
              return dao.modificarRegistro(models.registro_inscripcion, personaModificar.estudiante.fid_registro, parametrosRegistro, transaccion)
            }
          })
          .then(respuesta => {
            const parametrosEstudiante = {};
            if (body.persona.codrude !== '') { parametrosEstudiante.rude = body.persona.codrude };
            if (body.persona.codigo !== '') { parametrosEstudiante.codigo = body.persona.codigo };
            if (personaCreada) {
              // Crea estudiante
              parametrosEstudiante.fid_registro = respuesta.id_registro_inscripcion;
              parametrosEstudiante._usuario_creacion = body.audit_usuario.id_usuario;
              return dao.crearRegistro(models.estudiante, parametrosEstudiante, false, transaccion)
            } else {
              // Modifica estudiante
              parametrosEstudiante._usuario_modificacion = body.audit_usuario.id_usuario;
              return dao.modificarRegistro(models.estudiante, personaModificar.fid_estudiante, parametrosEstudiante, transaccion)
            }
          })
          .then(respuesta => {
            const parametrosDireccion = {};
            if (body.direccion.localidad !== '') { parametrosDireccion.comunidad = body.direccion.localidad };
            if (body.direccion.zona !== '') { parametrosDireccion.zona = body.direccion.zona };
            if (body.direccion.calle !== '') { parametrosDireccion.calle = body.direccion.calle };
            if (body.direccion.numero !== '') { parametrosDireccion.numero = body.direccion.numero };
            if (body.direccion.telefono !== '') { parametrosDireccion.telefono = body.direccion.telefono };
            if (body.direccion.celular !== '') { parametrosDireccion.celular = body.direccion.celular };
            if (body.direccion.municipio !== '') { parametrosDireccion.fid_dpa = body.direccion.municipio };
            if (personaCreada) {
              // Crea ubicacion direccion
              clavesForaneas.fid_estudiante = respuesta.id_estudiante;
              parametrosDireccion._usuario_creacion = body.audit_usuario.id_usuario;
              return dao.crearRegistro(models.ubicacion, parametrosDireccion, false, transaccion)
            } else {
              // Modifica ubicacion direccion
              parametrosDireccion._usuario_modificacion = body.audit_usuario.id_usuario;
              return dao.modificarRegistro(models.ubicacion, personaModificar.fid_direccion, parametrosDireccion, transaccion)
            }
          })
          .then(respuesta => {
            const parametrosLugarNacimiento = {};
            if (body.nacimiento.municipio !== '') { parametrosLugarNacimiento.fid_dpa = body.nacimiento.municipio };
            if (!personaModificar.fid_lugar_nacimiento) {
              // Crea ubicacion nacimiento
              if (personaCreada) {
                clavesForaneas.fid_direccion = respuesta.id_ubicacion;
              }
              parametrosLugarNacimiento._usuario_creacion = body.audit_usuario.id_usuario;
              return dao.crearRegistro(models.ubicacion, parametrosLugarNacimiento, false, transaccion)
            } else {
              // Modifica ubicacion nacimiento
              parametrosLugarNacimiento._usuario_modificacion = body.audit_usuario.id_usuario;
              return dao.modificarRegistro(models.ubicacion, personaModificar.fid_lugar_nacimiento, parametrosLugarNacimiento, transaccion)
            }
          })
          .then(respuesta => {
            const parametrosUniEduEstu = {};
            if (body.registroInscripcion.nivel !== '') { parametrosUniEduEstu.nivel = body.registroInscripcion.nivel };
            if (body.registroInscripcion.grado !== '') { parametrosUniEduEstu.grado = body.registroInscripcion.grado };
            if (body.registroInscripcion.paralelo !== '') { parametrosUniEduEstu.paralelo = body.registroInscripcion.paralelo };
            if (body.registroInscripcion.turno !== '') { parametrosUniEduEstu.turno = body.registroInscripcion.turno };
            if (body.registroInscripcion.gestion !== '') { parametrosUniEduEstu.gestion = body.registroInscripcion.gestion };
            if (body.unidadEducativa.sie !== '') { parametrosUniEduEstu.fid_unidad_educativa = body.unidadEducativa.nombre };
            parametrosUniEduEstu.fid_estudiante = personaModificar.fid_estudiante;
            let idUniEduEstu = -1;
            if (!personaModificar.fid_lugar_nacimiento) {
              clavesForaneas.fid_lugar_nacimiento = respuesta.id_ubicacion;
            }
            var existeUnidadEducativaEstudiante = false;
            personaModificar.dataValues.unidades_educativas.forEach(element => {
              if (element.gestion == parametrosUniEduEstu.gestion && element.fid_unidad_educativa === parametrosUniEduEstu.fid_unidad_educativa) {
                existeUnidadEducativaEstudiante = true;
              }
            });
            if (personaCreada || !existeUnidadEducativaEstudiante) {
              // Crea unidad educativa en la gestion actual
              parametrosUniEduEstu._usuario_creacion = body.audit_usuario.id_usuario;
              clavesForaneas.fid_lugar_nacimiento = respuesta.id_ubicacion;
              return dao.crearRegistro(models.unidad_educativa_estudiante, parametrosUniEduEstu, false, transaccion)
            } else {
              // Modifica unidad educativa en la gestion actual
              parametrosUniEduEstu._usuario_modificacion = body.audit_usuario.id_usuario;
              personaModificar.dataValues.unidades_educativas.forEach(function (element) {
                const year = new Date();
                if (element.gestion == year.getFullYear()) {
                  idUniEduEstu = element.id_unidad_educativa_estudiante;
                }
              }, this);
              if (idUniEduEstu !== -1) {
                return dao.modificarRegistro(models.unidad_educativa_estudiante, idUniEduEstu, parametrosUniEduEstu, transaccion);
              } else {
                return 'No se encontró el elemento';
              }
            }
          })
          .then(respuesta => {
            const parametrosUniEduEstu = {};
            if (body.unidadEducativa.id !== '') { parametrosUniEduEstu.fid_unidad_educativa = body.unidadEducativa.id };
            parametrosUniEduEstu.fid_estudiante = personaModificar.fid_estudiante;
            let idUniEduEstu = -1;
            if (personaCreada) {
              // Crea unidad educativa en la gestion pasada
              parametrosUniEduEstu._usuario_creacion = body.audit_usuario.id_usuario;
              clavesForaneas.fid_lugar_nacimiento = respuesta.id_ubicacion;
              return dao.crearRegistro(models.unidad_educativa_estudiante, parametrosUniEduEstu, false, transaccion)
            } else {
              // Modifica unidad educativa en la gestion pasada
              parametrosUniEduEstu._usuario_modificacion = body.audit_usuario.id_usuario;
              personaModificar.dataValues.unidades_educativas.forEach(function (element) {
                if (element.gestion != (new Date()).getFullYear()) {
                  idUniEduEstu = element.id_unidad_educativa_estudiante;
                }
              }, this);
              if (idUniEduEstu !== -1) {
                return dao.modificarRegistro(models.unidad_educativa_estudiante, idUniEduEstu, parametrosUniEduEstu, transaccion);
              } else {
                return 'No se encontró el elemento';
              }
            }
          })
          .then(() => {
            // Crea personas apoderadas nuevas
            apoderadosNuevosPersona = [];
            apoderadosNuevosRelacion = [];
            body.apoderados.forEach(function (element) {
              if (element.estadoApoderado !== undefined && element.estadoApoderado == 'nuevo') {
                if (element.nombres && (element.primer_apellido || element.segundo_apellido || element.casada_apellido)) {
                  element.nombre_completo = `${element.primer_apellido ? element.primer_apellido : ''}`;
                  element.nombre_completo = `${element.nombre_completo} ${element.segundo_apellido ? element.segundo_apellido : ''}`;
                  element.nombre_completo = `${element.nombre_completo} ${element.casada_apellido ? element.casada_apellido : ''}`;
                  element.nombre_completo = `${element.nombre_completo} ${element.nombres} `;
                  element.nombre_completo = element.nombre_completo.replace(/\s\s+/g, ' ');
                  element.nombre_completo = element.nombre_completo.trim();
                }
                const objPersona = {
                  tipo_documento: element.tipo_documento,
                  documento_identidad: element.documento_identidad,
                  lugar_documento_identidad: element.lugar_documento_identidad,
                  complemento_documento: element.complemento_documento ? element.complemento_documento : '00',
                  fecha_nacimiento: element.fecha_nacimiento,
                  nombres: element.nombres,
                  primer_apellido: element.primer_apellido,
                  segundo_apellido: element.segundo_apellido,
                  genero: element.genero,
                  idioma_materno: element.idioma_materno,
                  ocupacion_actual: element.ocupacion_actual,
                  grado_instruccion: element.grado_instruccion,
                  telefono: element.telefono,
                  _usuario_creacion: body.audit_usuario.id_usuario
                };
                const objRelacion = {
                  fid_persona_de: personaModificar.id_persona,
                  relacion: element.relation,
                  _usuario_creacion: body.audit_usuario.id_usuario
                };
                apoderadosNuevosPersona.push(objPersona);
                apoderadosNuevosRelacion.push(objRelacion);
              }
            }, this);
            return dao.crearRegistro(models.persona, apoderadosNuevosPersona, true, transaccion)
          })
          .then(respuestaPersonas => {
            for (let index = 0; index < respuestaPersonas.length; index++) {
              apoderadosNuevosRelacion[index].fid_persona_es = respuestaPersonas[index].id_persona;
            }
            return dao.crearRegistro(models.parentezco, apoderadosNuevosRelacion, true, transaccion)
          })
          .then(() => {
            return dao.modificarRegistro(models.persona, personaModificar.id_persona, clavesForaneas, transaccion);
          })
          .then(respuesta => {
            deferred.resolve('Creado exitosamente');
            transaccion.commit()
          })
          .catch(error => {
            if (error.message == 'llave duplicada viola restricción de unicidad «estudiante_rude_key»') {
              error.message = 'rudeInUse'
            };
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

  const listarRegistros = (query, body) => {
    const deferred = Q.defer();
    const parametros = query;
    const whereUnidadProductiva = {};
    if (body.audit_usuario.id_rol === ROL_INSCRIPCION) {
      whereUnidadProductiva.fid_usuario = body.audit_usuario.id_usuario;
    }
    parametros.include = [{
      model: models.persona,
      as: 'persona',
    }];
    dao.listarRegistros(models.registro, parametros)
      .then(respuesta => deferred.resolve(respuesta))
      .catch(error => deferred.reject(error));
    return deferred.promise;
  };

  const registroBL = {
    listarRegistros,
    llenaRegistro
  };

  return registroBL;
};
