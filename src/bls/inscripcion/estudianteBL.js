/**
* Lógica del Negocio -> ConfiguracionBL
*/
const config = require('konfig')();
const dao = require('../../dao/dao');
const Q = require('q');
const util = require('../../libs/util');
const general = require('../../utils/util');
const dpaBL = require('../parametros/dpaBL');
const handlebars = require('handlebars');
const fs = require('fs-extra');
const moment = require('moment');
const csv=require('csvtojson')

module.exports = app => {
  const models = app.src.db.models;
  const sequelize = app.src.db.sequelize;

  const obtenerRegistros = (req, body) => {
    let respuestaTotal = {};
    const deferred = Q.defer();
    let busqueda = {};
    let busquedaEstudiante = {};
    if (req.tipo_documento && req.documento_identidad && req.lugar_documento_identidad) {
      busqueda = {
        tipo_documento: req.tipo_documento,
        documento_identidad: req.documento_identidad,
        lugar_documento_identidad: req.lugar_documento_identidad
      }
    } else {
      if (req.codigo) {
        busquedaEstudiante = {
          codigo: req.codigo
        }
      };
    };
    if (req.nombres) {
      busqueda = {
        $or: [
          {
            nombres: {
              $like: '%' + req.nombres + '%'
            }
          }, 
          {
            primer_apellido: {
              $like: '%' + req.nombres + '%'
            }
          }, 
          {
            segundo_apellido: {
              $like: '%' + req.nombres + '%'
            }
          }
        ]
      }
    }
    if (req.tipobusqueda && req.buscar) {
      switch (req.tipobusqueda) {
        case 'codigo':
          busquedaEstudiante = {
            codigo: {
              $like: '%' + req.buscar + '%'
            }
          }
          break;
        case 'ci':
          busqueda.documento_identidad = {
            $like: '%' + req.buscar + '%'
          }
          break;
        default:
          break;
      }
    }
    params = {
      where: busqueda,
      include: [{
        where: busquedaEstudiante,
        model: models.estudiante,
        as: 'estudiante',
        // required: true,
        include: [{
          model: models.registro_inscripcion,
          as: 'registro',
          include: [{
            model: models.pioc,
            as: 'pioc',
          }]
        }]
      }, {
        model: models.ubicacion,
        as: 'direccion'
      }, {
        model: models.ubicacion,
        as: 'lugar_nacimiento'
      }]
    };
    if (req.limit && req.page) {
      params.limit = req.limit,
      params.page = req.page
    };
    if (req.order) {
      params.order = req.order;
    };
    let finished = false;
    let noAddress = false;
    let noBirthPlace = false;
    dao.listarRegistros(models.persona, params)
    .then(respuesta => {
      respuestaTotal = respuesta;
      if (respuestaTotal.length === 1 && req.list === undefined) {
        if (respuestaTotal[0].direccion) {
          return dpaBL.obtenerELemento(respuestaTotal[0].direccion.fid_dpa, models);
        } else {
          noAddress = true;
          return 0;
        }
      } 
      else {
        if (respuestaTotal.length === 0) {
          throw new Error('noData');
        }
        studentRows = []
        respuestaRows = respuesta.rows ? respuesta.rows : respuesta
        respuestaRows.forEach(function(student) {
          packageStudent = {
            id_persona: student.id_persona,
            codigo:student.estudiante.codigo,
            tipo_documento:student.tipo_documento,
            documento_identidad: student.documento_identidad,
            lugar_documento_identidad: student.lugar_documento_identidad,
            nombres: student.nombres,
            primer_apellido: student.primer_apellido,
            segundo_apellido: student.segundo_apellido,
            estado: student.estudiante.estado,
            fid_curso: student.estudiante.fid_curso
          };
          studentRows.push(packageStudent);
        }, this);
        respuestaLista = {
          count: respuesta.count ? respuesta.count : studentRows.length,
          rows: studentRows
        }
        finished = true;
        deferred.resolve(respuestaLista);
      } 
    })
    .then(respuesta => {
      if(!finished){
        if (!noAddress) {
          respuestaTotal[0].dataValues.direccion.dataValues.pais = respuesta.pais ;
          respuestaTotal[0].dataValues.direccion.dataValues.departamento = respuesta.departamento ;
          respuestaTotal[0].dataValues.direccion.dataValues.provincia = respuesta.provincia ;
          respuestaTotal[0].dataValues.direccion.dataValues.municipio = respuesta.municipio ;
        }
        if (respuestaTotal[0].lugar_nacimiento) {
          return dpaBL.obtenerELemento(respuestaTotal[0].lugar_nacimiento.fid_dpa, models);
        } else {
          noBirthPlace = true;
          return 0;
        }
      }
    })
    .then(respuesta => {
      if(!finished){
        if (!noBirthPlace) {
          respuestaTotal[0].dataValues.lugar_nacimiento.dataValues.pais = respuesta.pais ;
          respuestaTotal[0].dataValues.lugar_nacimiento.dataValues.departamento = respuesta.departamento ;
          respuestaTotal[0].dataValues.lugar_nacimiento.dataValues.provincia = respuesta.provincia ;
          respuestaTotal[0].dataValues.lugar_nacimiento.dataValues.municipio = respuesta.municipio ;
        }
        params = {
          where: {
            id_persona: respuestaTotal[0].id_persona
          },
          attributes: ['id_persona'],
          include: [{
            model: models.parentezco,
            as: 'persona_de',
            include: [{
              model: models.persona,
              as: 'persona_es'
            }]
          }]
        };
        return dao.listarRegistros(models.persona, params);
      }
    })
    .then(respuesta => {
      if(!finished){
        respuestaTotal[0].dataValues.persona_de = respuesta.length == 0 ? [] : respuesta[0].persona_de;
        params = {
          where: {
            fid_estudiante: respuestaTotal[0].dataValues.fid_estudiante
          },
          include: [{
            model: models.unidad_educativa,
            as: 'unidad_educativa'
          }]
        };
        return dao.listarRegistros(models.unidad_educativa_estudiante, params);
      }
    })
    .then(respuesta => {
      if(!finished){
        respuestaTotal[0].dataValues.unidades_educativas = respuesta;
        deferred.resolve(respuestaTotal)
      }
    })
    .catch(error => {
      console.log(error);
      deferred.reject(error)
    });
    return deferred.promise;
  }

  const obtenerIdDelCodigo = (body) => {
    const deferred = Q.defer();
    if (body.id_estudiante !== undefined) {
      dao.obtenerRegistroPorId(models.estudiante, body.id_estudiante)
      .then(respuesta => {
        if (respuesta) {
          deferred.resolve(respuesta.id_estudiante)
        } else {
          throw new Error('invalidData');
        }
      })
      .catch(error => {
        console.log(error);
        deferred.reject(error)
      });
    } else if (body.codigo !== undefined) {
      const paramsEstudiante = {
        where: {
          codigo: body.codigo
        }
      }
      dao.obtenerRegistro(models.estudiante, paramsEstudiante)
      .then(respuesta => {
        if (respuesta) {
          deferred.resolve(respuesta.id_estudiante)
        } else {
          throw new Error('invalidData');
        }
      })
      .catch(error => {
        console.log(error);
        deferred.reject(error)
      });
    } else {
      throw new Error('invalidData');
    }
    return deferred.promise;
  }

  const editaEstudiante = (body) => {
    const deferred = Q.defer();
    obtenerIdDelCodigo(body)
    .then(idEstudiante => {
      const paramsEstudiante = body;
      paramsEstudiante._usuario_modificacion = body.audit_usuario.id_usuario;
      delete paramsEstudiante.id_estudiante;
      delete paramsEstudiante.codigo;
      delete paramsEstudiante.audit_usuario;
      dao.modificarRegistro(models.estudiante, idEstudiante, paramsEstudiante)
    })
    .then(respuesta => deferred.resolve(respuesta))
    .catch(error => {
      console.log(error);
      deferred.reject(error)
    });
    return deferred.promise;
  }

  const validarCsvDatos = (rutaArchivo, cursos, discapacidades, estudiantes) => {
    const deferred = Q.defer();
    const arrayCols = ['Código', 'Apellido paterno', 'Apellido materno', 'Nombres', 'Fecha de nacimiento', 'Tipo documento', 'Número documento', 'Lugar documento', 'Oficialía', 'Libro', 'Partida', 'Folio', 'Género','Rude', 'Carnet de discapacidad', 'Tipo discapacidad', 'Grado de discapacidad', 'Código DPA', 'Zona', 'Calle/Avenida', 'Número', 'Comunidad', 'Referencias', 'Teléfono', 'Apellido Paterno Padre', 'Apellido Materno Padre', 'Nombres Padre', 'Documento identidad padre', 'Expedido padre', 'Teléfono padre', 'Apellido Paterno Madre', 'Apellido Materno Madre', 'Nombres Madre', 'Documento identidad madre', 'Expedido madre', 'Teléfono madre', 'Curso nombre', 'Curso paralelo', 'Curso gestion'];
    const arrayCrear = [];
    csv({delimiter: ';', headers:arrayCols})
    .fromFile(rutaArchivo)
    .on('json',(csvRow, rowIndex) => {
      if(Object.keys(csvRow).length == arrayCols.length) {
        // VALIDA CAMPOS INDIVIDUALES
        // 0 Código
        if (csvRow[arrayCols[0]].length === 0) {
          deferred.reject(new Error(`emptyValue@r:${rowIndex + 1},c:${arrayCols[0]}`));
          return deferred.promise;
        }
        // 1 2 Apellido paterno y apellido materno
        if (csvRow[arrayCols[1]].length === 0 && csvRow[arrayCols[2]].length === 0) {
          deferred.reject(new Error(`noLastName@r:${rowIndex + 1}`));
          return deferred.promise;
        }
        // 3 Nombres
        if (csvRow[arrayCols[3]].length === 0) {
          deferred.reject(new Error(`emptyValue@r:${rowIndex + 1},c:${arrayCols[3]}`));
          return deferred.promise;
        }
        // 4 Fecha de nacimiento
        if (csvRow[arrayCols[4]].length != 0 && csvRow[arrayCols[4]].match(/^\d{1,2}(\/|-)\d{1,2}(\/|-)\d{4}$/) == null) {
          deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[4]}`));
          return deferred.promise;
        }
        if (csvRow[arrayCols[5]].length !== 0 || csvRow[arrayCols[6]].length !== 0 || csvRow[arrayCols[7]].length !== 0) {
          // 5 Tipo documento
          if (csvRow[arrayCols[5]] != 'CI' && csvRow[arrayCols[5]] != 'PASAPORTE') {
            deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[5]}`));
            return deferred.promise;
          }
          // 6 Número documento
          if (csvRow[arrayCols[6]].length != 0 && csvRow[arrayCols[6]].match(/^[0-9]+$/) == null) {
            deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[6]}`));
            return deferred.promise;
          }
          // 7 Lugar documento
          if ((csvRow[arrayCols[7]] != 'LP' && csvRow[arrayCols[7]] != 'CBBA' && csvRow[arrayCols[7]] != 'SC' &&
          csvRow[arrayCols[7]] != 'OR' && csvRow[arrayCols[7]] != 'CH' && csvRow[arrayCols[7]] != 'BE' &&
          csvRow[arrayCols[7]] != 'PT' && csvRow[arrayCols[7]] != 'TA' && csvRow[arrayCols[7]] != 'PA') || csvRow[arrayCols[5]] != 'CI') {
            deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[7]}`));
            return deferred.promise;
          }
        }
        // 8 Oficialía
        if (csvRow[arrayCols[8]].length != 0 && csvRow[arrayCols[8]].match(/^[0-9]+$/) == null) {
          deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[8]}`));
          return deferred.promise;
        }
        // 9 Libro
        if (csvRow[arrayCols[9]].length != 0 && csvRow[arrayCols[9]].match(/^[0-9]+$/) == null) {
          deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[9]}`));
          return deferred.promise;
        }
        // 10 Partida
        if (csvRow[arrayCols[10]].length != 0 && csvRow[arrayCols[10]].match(/^[0-9]+$/) == null) {
          deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[10]}`));
          return deferred.promise;
        }
        // 11 Folio
        if (csvRow[arrayCols[11]].length != 0 && csvRow[arrayCols[11]].match(/^[0-9]+$/) == null) {
          deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[11]}`));
          return deferred.promise;
        }
        // 12 Género
        if (csvRow[arrayCols[12]].length != 0 && !(csvRow[arrayCols[12]] === 'F' || csvRow[arrayCols[12]] === 'M')) {
          deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[12]}`));
          return deferred.promise;
        }
        // 13 Rude
        if (csvRow[arrayCols[13]].length != 0 && csvRow[arrayCols[13]].match(/^[0-9]+$/) == null) {
          deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[13]}`));
          return deferred.promise;
        }
        // 14 Carnet de discapacidad
        // 15 Tipo discapacidad
        if (csvRow[arrayCols[15]].length != 0 && !(csvRow[arrayCols[15]] === 'FISICA' || csvRow[arrayCols[15]] === 'MULTIPLE' || csvRow[arrayCols[15]] === 'INTELECTUAL' || csvRow[arrayCols[15]] === 'VISUAL' || csvRow[arrayCols[15]] === 'AUDITIVA')) {
          deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[15]}`));
          return deferred.promise;
        }
        // 16 Grado de discapacidad
        if (csvRow[arrayCols[16]].length != 0 && (isNaN(csvRow[arrayCols[16]])) || Number(csvRow[arrayCols[16]]) > 100 || Number(csvRow[arrayCols[16]]) < 0) {
          deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[16]}`));
          return deferred.promise;
        }
        // 17 Código DPA
        if (csvRow[arrayCols[17]].length != 0 && (isNaN(csvRow[arrayCols[17]])) || Number(csvRow[arrayCols[17]]) > 465 || Number(csvRow[arrayCols[17]]) < 0) {
          deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[17]}`));
          return deferred.promise;
        }
        // 18 Zona
        // 19 Calle/Avenida
        // 20 Número
        if (csvRow[arrayCols[20]].length != 0 && csvRow[arrayCols[20]].match(/^[0-9]+$/) == null) {
          deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[20]}`));
          return deferred.promise;
        }
        // 21 Comunidad
        if (/\d/.test(csvRow[arrayCols[21]])) {
          deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[21]}`));
          return deferred.promise;
        }
        // 22 Referencias
        // 23 teléfono
        if (csvRow[arrayCols[24]].length !== 0 || csvRow[arrayCols[25]].length !== 0 ||csvRow[arrayCols[26]].length !== 0 ||csvRow[arrayCols[27]].length !== 0 ||csvRow[arrayCols[28]].length !== 0 ||csvRow[arrayCols[29]].length !== 0) {
          // 24 25 Apellido Paterno Padre
          if (csvRow[arrayCols[24]].length === 0 && csvRow[arrayCols[25]].length === 0) {
            deferred.reject(new Error(`noFatherLastName@r:${rowIndex + 1}`));
            return deferred.promise;
          }
          // 26 Nombres Padre
          if (csvRow[arrayCols[26]].length === 0) {
            deferred.reject(new Error(`emptyValue@r:${rowIndex + 1},c:${arrayCols[26]}`));
            return deferred.promise;
          }
          // 27 Documento identidad padre
          if (csvRow[arrayCols[27]].length != 0 && csvRow[arrayCols[27]].match(/^[0-9]+$/) == null) {
            deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[27]}`));
            return deferred.promise;
          }
          // 28 Expedido padre
          if ((csvRow[arrayCols[28]] != 'LP' && csvRow[arrayCols[28]] != 'CBBA' && csvRow[arrayCols[28]] != 'SC' &&
          csvRow[arrayCols[28]] != 'OR' && csvRow[arrayCols[28]] != 'CH' && csvRow[arrayCols[28]] != 'BE' &&
          csvRow[arrayCols[28]] != 'PT' && csvRow[arrayCols[28]] != 'TA' && csvRow[arrayCols[28]] != 'PA')) {
            deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[28]}`));
            return deferred.promise;
          }
          // 29 Teléfono padre
          if (csvRow[arrayCols[29]].length != 0 && csvRow[arrayCols[29]].match(/^[0-9]+$/) == null) {
            deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[29]}`));
            return deferred.promise;
          }
        }
        if (csvRow[arrayCols[30]].length !== 0 || csvRow[arrayCols[31]].length !== 0 ||csvRow[arrayCols[32]].length !== 0 ||csvRow[arrayCols[33]].length !== 0 ||csvRow[arrayCols[33]].length !== 0 ||csvRow[arrayCols[35]].length !== 0) {
          // 30 31 Apellido Paterno Madre
          if (csvRow[arrayCols[30]].length === 0 && csvRow[arrayCols[31]].length === 0) {
            deferred.reject(new Error(`noMotherLastName@r:${rowIndex + 1}`));
            return deferred.promise;
          }
          // 32 Nombres Madre
          if (csvRow[arrayCols[32]].length === 0) {
            deferred.reject(new Error(`emptyValue@r:${rowIndex + 1},c:${arrayCols[32]}`));
            return deferred.promise;
          }
          // 33 Documento identidad madre
          if (csvRow[arrayCols[33]].length != 0 && csvRow[arrayCols[33]].match(/^[0-9]+$/) == null) {
            deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[33]}`));
            return deferred.promise;
          }
          // 34 Expedido madre
          if ((csvRow[arrayCols[34]] != 'LP' && csvRow[arrayCols[34]] != 'CBBA' && csvRow[arrayCols[34]] != 'SC' &&
          csvRow[arrayCols[34]] != 'OR' && csvRow[arrayCols[34]] != 'CH' && csvRow[arrayCols[34]] != 'BE' &&
          csvRow[arrayCols[34]] != 'PT' && csvRow[arrayCols[34]] != 'TA' && csvRow[arrayCols[34]] != 'PA')) {
            deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[34]}`));
            return deferred.promise;
          }
          // 35 Teléfono madre
          if (csvRow[arrayCols[35]].length != 0 && csvRow[arrayCols[35]].match(/^[0-9]+$/) == null) {
            deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[35]}`));
            return deferred.promise;
          }
        }
        // 36 Curso nombre
        if (csvRow[arrayCols[36]].length != 0 && !(csvRow[arrayCols[36]] === 'AT' || csvRow[arrayCols[36]] === 'INI 1' || csvRow[arrayCols[36]] === 'INI 2' || csvRow[arrayCols[36]] === 'PRI 1' || csvRow[arrayCols[36]] === 'PRI 2' || csvRow[arrayCols[36]] === 'PRI 3' || csvRow[arrayCols[36]] === 'PRI SOC' || csvRow[arrayCols[36]] === 'GUARDERIA' || csvRow[arrayCols[36]] === 'GUARDERIA 1' || csvRow[arrayCols[36]] === 'GUARDERIA 2')) {
          deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[36]}`));
          return deferred.promise;
        }
        // 37 Curso paralelo
        if (csvRow[arrayCols[37]].length != 0 && (csvRow[arrayCols[37]].length != 1 || csvRow[arrayCols[37]].replace(/[^A-Z]/g, "").length != 1)) {
          deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[37]}`));
          return deferred.promise;
        }
        // 38 Curso gestion
        if (csvRow[arrayCols[38]].length != 0 && (isNaN(csvRow[arrayCols[38]]) || Number(csvRow[arrayCols[38]]) > (new Date()).getFullYear())) {
          deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[38]}`));
          return deferred.promise;
        }
        // VALIDA CURSO
        let cursoValido = false;
        let cursoKey;
        if(csvRow[arrayCols[36]] != '' && csvRow[arrayCols[37]] != '' && csvRow[arrayCols[38]] != ''){
          cursos.forEach(function(element) {
            if (element.nombre == csvRow[arrayCols[36]] && element.paralelo == csvRow[arrayCols[37]] && element.gestion == csvRow[arrayCols[38]]) {
              cursoValido = true;
              cursoKey = element.id
            }
          }, this);
          if (!cursoValido) {
            deferred.reject(new Error(`nonExistentCourse@r:${rowIndex + 1}`));
            return deferred.promise;
          }
        }
        // VALIDA ESTUDIANTE
        estudiantes.forEach(function(element) {
          if (element.codigo == csvRow[arrayCols[0]]) {
            deferred.reject(new Error(`codeRepeated@r:${rowIndex + 1}`));
            return deferred.promise;
          }
          if (element.rude == csvRow[arrayCols[6]]) {
            deferred.reject(new Error(`rudeRepeated@r:${rowIndex + 1}`));
            return deferred.promise;
          }
        }, this);
        // ENCUENTRA CLAVE FORANEA DE DISCAPACIDAD
        let foraignKey = '';
        switch (csvRow[arrayCols[15]]) {
          case 'VISUAL':
          foraignKey = 'visual';
          break;
          case 'AUDITIVA':
          foraignKey = 'auditory';
          break;
          case 'INTELECTUAL':
          foraignKey = 'intellectual';
          break;
          case 'FISICA':
          foraignKey = 'phisic';
          break;
          case 'MULTIPLE':
          foraignKey = 'multiple';
          break;
          default:
          if(csvRow[arrayCols[15]] != '') {
            deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[8]}`));
            return deferred.promise;
          }
          break;
        }
        discapacidades.forEach(function(element) {
          if (element.nombre == foraignKey) {
            foraignKey = element.id_parametro;
          }
        }, this);
        // CREA OBJETO PARA DEVOLVER
        const datosCrear = {
          padre: {
            // nombre_completo: csvRow[arrayCols[10]].toLowerCase(),
            primer_apellido: csvRow[arrayCols[24]].toLowerCase(),
            segundo_apellido: csvRow[arrayCols[25]].toLowerCase(),
            nombres: csvRow[arrayCols[26]].toLowerCase(),
            tipo_documento: 'CARNET_IDENTIDAD',
            lugar_documento_identidad: csvRow[arrayCols[28]],
            documento_identidad: csvRow[arrayCols[27]],
            telefono: csvRow[arrayCols[29]]
          },
          madre: {
            // nombre_completo: csvRow[arrayCols[13]].toLowerCase(),
            primer_apellido: csvRow[arrayCols[30]].toLowerCase(),
            segundo_apellido: csvRow[arrayCols[31]].toLowerCase(),
            nombres: csvRow[arrayCols[32]].toLowerCase(),
            tipo_documento: 'CARNET_IDENTIDAD',
            lugar_documento_identidad: csvRow[arrayCols[34]],
            documento_identidad: csvRow[arrayCols[33]],
            telefono: csvRow[arrayCols[35]]
          },
          estudiante: {
            codigo: csvRow[arrayCols[0]],
            rude: csvRow[arrayCols[13]],
            fid_curso: cursoKey,
            registro_inscripcion: {
              oficialia: csvRow[arrayCols[8]],
              libro: csvRow[arrayCols[9]],
              partida: csvRow[arrayCols[10]],
              folio: csvRow[arrayCols[11]]
            }
          },
          persona: {
            primer_apellido: csvRow[arrayCols[1]].toLowerCase(),
            segundo_apellido: csvRow[arrayCols[2]].toLowerCase(),
            nombres: csvRow[arrayCols[3]].toLowerCase(),
            fecha_nacimiento: csvRow[arrayCols[4]],
            genero: csvRow[arrayCols[12]],
            carnet_discapacidad: csvRow[arrayCols[14]],
            grado_discapacidad: csvRow[arrayCols[16]],
            telefono: csvRow[arrayCols[23]],
            fid_tipo_discapacidad: foraignKey != ''? foraignKey : null
          },
          ubicacion: {
            fid_dpa: csvRow[arrayCols[17]],
            zona: csvRow[arrayCols[18]].toLowerCase(),
            calle: csvRow[arrayCols[19]].toLowerCase(),
            numero: csvRow[arrayCols[20]],
            comunidad: csvRow[arrayCols[21]].toLowerCase(),
            referencias: csvRow[arrayCols[22]]
          }
        }
        if (csvRow[arrayCols[5]].length !== 0 || csvRow[arrayCols[6]].length !== 0 || csvRow[arrayCols[7]].length !== 0) {
          datosCrear.persona.tipo_documento= csvRow[arrayCols[5]] == 'CI' ? 'CARNET_IDENTIDAD' : csvRow[arrayCols[5]];
          datosCrear.persona.documento_identidad= csvRow[arrayCols[6]];
          datosCrear.persona.lugar_documento_identidad= csvRow[arrayCols[7]];
        }
        arrayCrear.push(datosCrear);
      } else {
        deferred.reject(new Error(`incorrectNumberOfColumns`));
        return deferred.promise;
      }
    })
    .on('error', (error) => {
      deferred.reject(error)
    })
    .on('done',() => {
      const options = {
        validate: false,
        hooks: false,
        individualHooks: false,
        benchmark: true,
      };
      deferred.resolve(arrayCrear);
    })
    return deferred.promise;
  };

  const importarCsvDatos = (req) => {
    const deferred = Q.defer();
    const audit_usuario  = req.body.audit_usuario;
    if (!req.files) {
      deferred.reject(new Error(`noCsvSent`));
      return deferred.promise;
    }
    if (!req.files.file) {
      deferred.reject(new Error(`noCsvSent`));
      return deferred.promise;
    }
    const archivo = req.files.file;
    const extension = archivo.name.replace(/^.*\./, '');
    if (!(archivo.mimetype && (archivo.mimetype === MIMETYPE_CSV || extension === 'csv'))) {
      deferred.reject(new Error(`notACsvFile`));
      return deferred.promise;
    }
    const tmpFile = archivo.name;
    const dirEstudiantes = `${config.app.directorios.ruta_estudiantes}`;
    const dirCsv = `${config.app.directorios.ruta_csv}`;
    const dirUsuarioCsv = `${dirCsv}/${audit_usuario.id_usuario}`;
    const rutaArchivo = `${dirUsuarioCsv}/${tmpFile}`;
    if(!fs.existsSync(dirEstudiantes)) {
      fs.mkdirSync(dirEstudiantes);
    }
    if(!fs.existsSync(dirCsv)) {
      fs.mkdirSync(dirCsv);
    }
    if(!fs.existsSync(dirUsuarioCsv)) {
      fs.mkdirSync(dirUsuarioCsv);
    }
    archivo.mv(rutaArchivo, err => {
      if (err) {
        throw new Error(err);
      } else {
        let nombreCurso=[];
        let codigoEstudiante=[];
        dao.listarRegistros(models.curso, {})
        .then(listaCursos => {
          listaCursos.forEach(function(element) {
            const datoCurso = {
              id: element.id_curso,
              nombre: element.nombre,
              paralelo: element.paralelo,
              gestion: element.gestion
            }
            nombreCurso.push(datoCurso);
          }, this);
          const paramsEstudiante = {
            attributes:['rude', 'codigo']
          }
          return dao.listarRegistros(models.estudiante, paramsEstudiante)
        })
        .then(listaEstudiantes => {
          listaEstudiantes.forEach(function(element) {
            const datoEstudiante = {
              codigo: element.codigo,
              rude: element.rude
            }
            codigoEstudiante.push(datoEstudiante);
          }, this);
          const paramsParametro = {
            attributes:['id_parametro', 'nombre'],
            where: {
              grupo: 'disability',
              orden: 1,
              estado: 'ACTIVO'}
          }
          return dao.listarRegistros(models.parametro, paramsParametro)
        })
        .then(listaDiscapacidades => validarCsvDatos(rutaArchivo, nombreCurso, listaDiscapacidades, codigoEstudiante))
        .then(objetosCreacion => {
          const personasPadresObjeto = [];
          const parentezcoObjeto = [];
          const estudianteObjeto = [];
          const personaObjeto = [];
          const ubicacionObjeto = [];
          const registroInscripcionObjeto = [];
          objetosCreacion.forEach(function(element) {
            if ((element.padre.nombres != '' && element.padre.primer_apellido != '' || element.padre.segundo_apellido != '') || element.padre.documento_identidad != '' || element.padre.telefono != '') {
              element.padre._usuario_creacion = audit_usuario.id_usuario;
              element.padre.genero = 'M';
              personasPadresObjeto.push(element.padre);
            }
            if ((element.madre.nombres != '' && element.madre.primer_apellido != '' || element.madre.segundo_apellido != '') || element.madre.documento_identidad != '' || element.madre.telefono != '') {
              element.madre._usuario_creacion = audit_usuario.id_usuario;
              element.madre.genero = 'F';
              personasPadresObjeto.push(element.madre);
            }
            element.estudiante._usuario_creacion = audit_usuario.id_usuario;
            if(element.estudiante.rude === '')
              delete element.estudiante.rude;
            if(element.estudiante.fid_curso === undefined)
              delete element.estudiante.fid_curso;
            estudianteObjeto.push(element.estudiante);
            if(element.persona.fecha_nacimiento === '')
              delete element.persona.fecha_nacimiento;
            else {
              const temp = element.persona.fecha_nacimiento.split('-');
              element.persona.fecha_nacimiento = temp[2]+'-'+temp[1]+'-'+temp[0];
            }
            if(element.persona.grado_discapacidad === '')
              delete element.persona.grado_discapacidad;
            else
              element.persona.grado_discapacidad = Number(element.persona.grado_discapacidad);
            personaObjeto.push(element.persona);
            element.ubicacion._usuario_creacion = audit_usuario.id_usuario;
            if(element.ubicacion.fid_dpa === undefined)
              delete element.ubicacion.fid_dpa;
            if(element.ubicacion.zona === '')
              delete element.ubicacion.zona;
            if(element.ubicacion.calle === '')
              delete element.ubicacion.calle;
            if(element.ubicacion.comunidad === '')
              delete element.ubicacion.comunidad;
            if(element.ubicacion.referencias === '')
              delete element.ubicacion.referencias;
            ubicacionObjeto.push(element.ubicacion);
            element.estudiante.registro_inscripcion._usuario_creacion = audit_usuario.id_usuario;
            if(element.estudiante.registro_inscripcion.oficialia === '')
              delete element.estudiante.registro_inscripcion.oficialia;
            if(element.estudiante.registro_inscripcion.libro === '')
              delete element.estudiante.registro_inscripcion.libro;
            if(element.estudiante.registro_inscripcion.partida === '')
              delete element.estudiante.registro_inscripcion.partida;
            if(element.estudiante.registro_inscripcion.folio === '')
              delete element.estudiante.registro_inscripcion.folio;
            registroInscripcionObjeto.push(element.estudiante.registro_inscripcion);
          }, this);
          // ENCUENTRA RUDE O CODIGO REPETIDO
          for(let i = 0; i<estudianteObjeto.length-1;i++){
            for(let j = i+1;j<estudianteObjeto.length;j++){
              if(estudianteObjeto[i].codigo == estudianteObjeto[j].codigo) {
                deferred.reject(new Error(`codeSentTwice:${estudianteObjeto[i].codigo}`));
                return deferred.promise;
              }
              if(estudianteObjeto[i].rude == estudianteObjeto[j].rude && estudianteObjeto[j].rude != undefined) {
                deferred.reject(new Error(`rudeSentTwice:${estudianteObjeto[i].rude}`));
                return deferred.promise;
              }
            }
          }
          return models.sequelize.transaction().then((transaccion) => {
            return dao.crearRegistro(models.persona, personasPadresObjeto, true, transaccion)
            .then(respuestaCreacion => {
              let datoParentezco = {};
              respuestaCreacion.forEach(function(element) {
                let added = false;
                objetosCreacion.forEach(function(datoCreacion) {
                  if (element.genero == 'M' && !added) {
                    if ((element.nombre_completo == datoCreacion.padre.nombre_completo && datoCreacion.padre.nombre_completo != '')
                      || (element.documento_identidad == datoCreacion.padre.documento_identidad && datoCreacion.padre.documento_identidad != '')
                    || (element.telefono == datoCreacion.padre.telefono && datoCreacion.padre.telefono != '')) {
                      datoParentezco = {
                        nombre_completo: element.nombre_completo,
                        documento_identidad: element.documento_identidad,
                        telefono: element.telefono,
                        relacion: 'padre',
                        fid_persona_es: element.id_persona,
                        _usuario_creacion: audit_usuario.id_usuario
                      }
                      parentezcoObjeto.push(datoParentezco);
                      added = true;
                    }
                  } else if (element.genero == 'F' && !added) {
                    if ((element.nombre_completo == datoCreacion.madre.nombre_completo && datoCreacion.madre.nombre_completo != '')
                      || (element.documento_identidad == datoCreacion.madre.documento_identidad && datoCreacion.madre.documento_identidad != '')
                    || (element.telefono == datoCreacion.madre.telefono && datoCreacion.madre.telefono != '')) {
                      datoParentezco = {
                        nombre_completo: element.nombre_completo,
                        documento_identidad: element.documento_identidad,
                        telefono: element.telefono,
                        relacion: 'madre',
                        fid_persona_es: element.id_persona,
                        _usuario_creacion: audit_usuario.id_usuario
                      }
                      parentezcoObjeto.push(datoParentezco);
                      added = true;
                    }
                  }
                }, this);
              }, this);
              return dao.crearRegistro(models.registro_inscripcion, registroInscripcionObjeto, true, transaccion);
            })
            .then(respuestaRegistro => {
              if (estudianteObjeto.length === respuestaRegistro.length) {
                for (let position = 0; position < estudianteObjeto.length; position++) {
                  estudianteObjeto[position].fid_registro = respuestaRegistro[position].id_registro_inscripcion;
                }
              }
              return dao.crearRegistro(models.estudiante, estudianteObjeto, true, transaccion);
            })
            .then(respuestaCreacion => {
              personaObjeto.forEach(function(persona) {
                persona._usuario_creacion= audit_usuario.id_usuario;
                respuestaCreacion.forEach(function(element) {
                  objetosCreacion.forEach(function(datoCreacion) {
                    if (element.codigo == datoCreacion.estudiante.codigo && persona == datoCreacion.persona)
                      persona.fid_estudiante= element.id_estudiante;
                  }, this);
                }, this);
              }, this);
              return dao.crearRegistro(models.ubicacion, ubicacionObjeto, true, transaccion);
            })
            .then(respuestaUbicacion => {
              let position = 0;
              personaObjeto.forEach(function(persona) {
                persona.fid_direccion= respuestaUbicacion[position].id_ubicacion;
                position++;
              }, this);
              return dao.crearRegistro(models.persona, personaObjeto, true, transaccion);
            })
            .then(respuestaCreacion => {
              parentezcoObjeto.forEach(function(parentezco) {
                parentezco._usuario_creacion= audit_usuario.id_usuario;
                respuestaCreacion.forEach(function(element) {
                  objetosCreacion.forEach(function(datoCreacion) {
                    if (element.fid_estudiante == datoCreacion.persona.fid_estudiante){
                        if ((parentezco.nombre_completo == datoCreacion.padre.nombre_completo && datoCreacion.padre.nombre_completo != '')
                          || (parentezco.documento_identidad == datoCreacion.padre.documento_identidad && datoCreacion.padre.documento_identidad != '')
                          || (parentezco.telefono == datoCreacion.padre.telefono && datoCreacion.padre.telefono != '')) {
                          parentezco.fid_persona_de= element.id_persona;
                        }
                        if ((parentezco.nombre_completo == datoCreacion.madre.nombre_completo && datoCreacion.madre.nombre_completo != '')
                          || (parentezco.documento_identidad == datoCreacion.madre.documento_identidad && datoCreacion.madre.documento_identidad != '')
                          || (parentezco.telefono == datoCreacion.madre.telefono && datoCreacion.madre.telefono != '')) {
                          parentezco.fid_persona_de= element.id_persona;
                        }
                    }
                  }, this);
                }, this);
                delete parentezco.nombre_completo;
                delete parentezco.documento_identidad;
                delete parentezco.telefono;
              }, this);
              return dao.crearRegistro(models.parentezco, parentezcoObjeto, true, transaccion);
            })
            .then(respuesta => {
              transaccion.commit();
              deferred.resolve(objetosCreacion)
            })
            .catch(error => {
              transaccion.rollback();
              deferred.reject(error)
            });
          });
        })
        .then(respuesta => deferred.resolve(respuesta))
        .catch(error => {
          console.log(error);
          deferred.reject(error)
        });
      }
    })
    return deferred.promise;
  };
  
  const existeCurso = (idCurso) => {
    const deferred = Q.defer();
    dao.obtenerRegistroPorId(models.curso, idCurso, {})
    .then(respuesta => deferred.resolve(respuesta))
    .catch(error => {
      console.log(error);
      deferred.reject(error)
    });
    return deferred.promise;
  }

  const estudiantesPorCurso = (query) => {
    const deferred = Q.defer();
    existeCurso(query.idCurso)
      .then(respuestaCurso => {
        if(respuestaCurso != null) {
          paramsEstudiante = {
            attributes: ['nombres', 'primer_apellido', 'segundo_apellido'],
            include: [{
              attributes: ['fid_curso', 'codigo'],
              model: models.estudiante,
              as: 'estudiante',
              required: true,
              where: { fid_curso: respuestaCurso.id_curso }
            }]
          };
        } else {
          throw new Error('noCourse');
        }
        return dao.listarRegistros(models.persona, paramsEstudiante)
      })
      .then(respuestaEstudiantes => {
        let estudiantesAEnviar = [];
        respuestaEstudiantes.forEach(function (element) {
          let itemEstudiante = {
            codigo: element.estudiante.codigo,
            nombres: element.nombres,
            primer_apellido: element.primer_apellido,
            segundo_apellido: element.segundo_apellido
          };
          estudiantesAEnviar.push(itemEstudiante);
        }, this);
        return estudiantesAEnviar;
      })
      .then(respuesta => deferred.resolve(respuesta))
      .catch(error => {
        console.log(error);
        deferred.reject(error)
      });
    return deferred.promise;
  };

  const estudiantePorCodigo = (codigoEstudiante) => {
    const deferred = Q.defer();
    parametrosEstudiante = {
      where:{
        codigo: codigoEstudiante
      }
    };
    dao.obtenerRegistro(models.estudiante, parametrosEstudiante)
      .then(respuesta => deferred.resolve(respuesta))
      .catch(error => deferred.reject(error));
    return deferred.promise;
  };

  const estudianteBL = {
    obtenerRegistros,
    editaEstudiante,
    importarCsvDatos,
    estudiantesPorCurso,
    estudiantePorCodigo
  };

  return estudianteBL;
};
