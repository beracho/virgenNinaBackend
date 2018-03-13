/**
* Lógica del Negocio -> ConfiguracionBL
*/
const config = require('konfig')();
const dao = require('../../dao/dao');
const Q = require('q');
const util = require('../../libs/util');
const general = require('../../utils/util');
const usuarioBL = require('../autenticacion/usuarioBL');
const plantillaBL = require('../parametros/plantillaBL')
const dpaBL = require('../parametros/dpaBL');;
// const Hashids = require('hashids');
const handlebars = require('handlebars');
const fs = require('fs-extra');
const moment = require('moment');
const csv=require('csvtojson')

// const hashids = new Hashids("PROBOLIVIA", 15, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");

module.exports = app => {
  const models = app.src.db.models;
  const sequelize = app.src.db.sequelize;

  const obtenerRegistros = (req, body) => {
    let respuestaTotal = {};
    const deferred = Q.defer();
    let busqueda = {};
    if (req.tipo_documento && req.documento_identidad && req.lugar_documento_identidad) {
      busqueda = {
        tipo_documento: req.tipo_documento,
        documento_identidad: req.documento_identidad,
        lugar_documento_identidad: req.lugar_documento_identidad
      }
    };
    params = {
      where: busqueda,
      include: [{
        model: models.estudiante,
        as: 'estudiante',
        required: true,
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
    let finished = false
    dao.listarRegistros(models.persona, params)
    .then(respuesta => {
      respuestaTotal = respuesta;
      if (respuestaTotal.length === 1) {
        return dpaBL.obtenerELemento(respuestaTotal[0].direccion.fid_dpa, models)
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
            estado: student.estudiante.estado
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
        respuestaTotal[0].dataValues.direccion.dataValues.pais = respuesta.pais ;
        respuestaTotal[0].dataValues.direccion.dataValues.departamento = respuesta.departamento ;
        respuestaTotal[0].dataValues.direccion.dataValues.provincia = respuesta.provincia ;
        respuestaTotal[0].dataValues.direccion.dataValues.municipio = respuesta.municipio ;
        return dpaBL.obtenerELemento(respuestaTotal[0].lugar_nacimiento.fid_dpa, models)
      }
    })
    .then(respuesta => {
      if(!finished){
        respuestaTotal[0].dataValues.lugar_nacimiento.dataValues.pais = respuesta.pais ;
        respuestaTotal[0].dataValues.lugar_nacimiento.dataValues.departamento = respuesta.departamento ;
        respuestaTotal[0].dataValues.lugar_nacimiento.dataValues.provincia = respuesta.provincia ;
        respuestaTotal[0].dataValues.lugar_nacimiento.dataValues.municipio = respuesta.municipio ;
        params = {
          where: busqueda,
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
        respuestaTotal[0].dataValues.persona_de = respuesta[0].persona_de ;
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
      respuestaTotal[0].dataValues.unidades_educativas = respuesta;
      deferred.resolve(respuestaTotal)
    })
    .catch(error => {
      console.log(error);
      deferred.reject(error)
    });
    return deferred.promise;
  }

  const validarCsvDatos = (rutaArchivo, cursos, discapacidades, estudiantes) => {
    const deferred = Q.defer();
    const arrayCols = ['Código', 'Apellido paterno', 'Apellido materno', 'Nombres', 'Fecha de nacimiento', 'Género', 'Rude', 'Carnet de discapacidad', 'Tipo discapacidad', 'Grado de discapacidad', 'Nombre completo padre', 'Documento identidad padre', 'Teléfono padre', 'Nombre completo madre', 'Documento identidad madre', 'Teléfono madre', 'Curso nombre',	'Curso paralelo', 'Curso gestión'];
    const arrayCrear = [];
    csv({delimiter: ';', headers:arrayCols})
    .fromFile(rutaArchivo)
    .on('json',(csvRow, rowIndex) => {
      if(Object.keys(csvRow).length == arrayCols.length) {
        // VALIDA CAMPOS INDIVIDUALES
        if (csvRow[arrayCols[0]].length === 0) {
          deferred.reject(new Error(`emptyValue@r:${rowIndex + 1},c:${arrayCols[0]}`));
          return deferred.promise;
        }
        if (csvRow[arrayCols[1]].length === 0 && csvRow[arrayCols[2]].length === 0) {
          deferred.reject(new Error(`noLastName@r:${rowIndex + 1}`));
          return deferred.promise;
        }
        if (csvRow[arrayCols[3]].length === 0) {
          deferred.reject(new Error(`emptyValue@r:${rowIndex + 1},c:${arrayCols[3]}`));
          return deferred.promise;
        }
        if (csvRow[arrayCols[4]].length != 0 && csvRow[arrayCols[4]].match(/^\d{1,2}(\/|-)\d{1,2}(\/|-)\d{4}$/) == null) {
          deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[4]}`));
          return deferred.promise;
        }
        if (csvRow[arrayCols[5]].length != 0 && !(csvRow[arrayCols[5]] === 'F' || csvRow[arrayCols[5]] === 'M')) {
          deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[5]}`));
          return deferred.promise;
        }
        if (csvRow[arrayCols[8]].length != 0 && !(csvRow[arrayCols[8]] === 'FISICA' || csvRow[arrayCols[8]] === 'MULTIPLE' || csvRow[arrayCols[8]] === 'INTELECTUAL' || csvRow[arrayCols[8]] === 'VISUAL' || csvRow[arrayCols[8]] === 'AUDITIVA')) {
          deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[8]}`));
          return deferred.promise;
        }
        if (csvRow[arrayCols[9]].length != 0 && (isNaN(csvRow[arrayCols[9]])) || Number(csvRow[arrayCols[9]]) > 100 || Number(csvRow[arrayCols[9]]) < 0) {
          deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[9]}`));
          return deferred.promise;
        }
        if (csvRow[arrayCols[10]].length != 0 && /\d/.test(csvRow[arrayCols[10]])) {
          deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[10]}`));
          return deferred.promise;
        }
        if (csvRow[arrayCols[11]].length != 0 && csvRow[arrayCols[11]].match(/^[0-9]+$/) == null) {
          deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[11]}`));
          return deferred.promise;
        }
        if (csvRow[arrayCols[12]].length != 0 && csvRow[arrayCols[12]].match(/^[0-9]+$/) == null) {
          deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[12]}`));
          return deferred.promise;
        }
        if (csvRow[arrayCols[13]].length != 0 && /\d/.test(csvRow[arrayCols[13]])) {
          deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[13]}`));
          return deferred.promise;
        }
        if (csvRow[arrayCols[14]].length != 0 && csvRow[arrayCols[14]].match(/^[0-9]+$/) == null) {
          deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[14]}`));
          return deferred.promise;
        }
        if (csvRow[arrayCols[15]].length != 0 && csvRow[arrayCols[15]].match(/^[0-9]+$/) == null) {
          deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[15]}`));
          return deferred.promise;
        }
        if (csvRow[arrayCols[16]].length != 0 && !(csvRow[arrayCols[16]] === 'AT' || csvRow[arrayCols[16]] === 'INI 1' || csvRow[arrayCols[16]] === 'INI 2' || csvRow[arrayCols[16]] === 'PRI 1' || csvRow[arrayCols[16]] === 'PRI 2' || csvRow[arrayCols[16]] === 'PRI 3' || csvRow[arrayCols[16]] === 'PRI SOC')) {
          deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[16]}`));
          return deferred.promise;
        }
        if (csvRow[arrayCols[17]].length != 0 && (csvRow[arrayCols[17]].length != 1 || csvRow[arrayCols[17]].replace(/[^A-Z]/g, "").length != 1)) {
          deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[17]}`));
          return deferred.promise;
        }
        if (csvRow[arrayCols[18]].length != 0 && (isNaN(csvRow[arrayCols[18]]) || Number(csvRow[arrayCols[18]]) > (new Date()).getFullYear())) {
          deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[18]}`));
          return deferred.promise;
        }
        // VALIDA CURSO
        let cursoValido = false;
        let cursoKey;
        if(csvRow[arrayCols[16]] != '' && csvRow[arrayCols[17]] != '' && csvRow[arrayCols[18]] != ''){
          cursos.forEach(function(element) {
            if (element.nombre == csvRow[arrayCols[16]] && element.paralelo == csvRow[arrayCols[17]] && element.gestion == csvRow[arrayCols[18]]) {
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
        switch (csvRow[arrayCols[8]]) {
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
          if(csvRow[arrayCols[8]] != '') {
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
            nombre_completo: csvRow[arrayCols[10]],
            tipo_documento: 'CARNET_IDENTIDAD',
            lugar_documento_identidad: 'LP',
            documento_identidad: csvRow[arrayCols[11]],
            telefono: csvRow[arrayCols[12]]
          },
          madre: {
            nombre_completo: csvRow[arrayCols[13]],
            tipo_documento: 'CARNET_IDENTIDAD',
            lugar_documento_identidad: 'LP',
            documento_identidad: csvRow[arrayCols[14]],
            telefono: csvRow[arrayCols[15]]
          },
          estudiante: {
            codigo: csvRow[arrayCols[0]],
            rude: csvRow[arrayCols[6]],
            fid_curso: cursoKey
          },
          persona: {
            primer_apellido: csvRow[arrayCols[1]],
            segundo_apellido: csvRow[arrayCols[2]],
            nombres: csvRow[arrayCols[3]],
            fecha_nacimiento: csvRow[arrayCols[4]],
            genero: csvRow[arrayCols[5]],
            carnet_discapacidad: csvRow[arrayCols[7]],
            grado_discapacidad: csvRow[arrayCols[9]],
            fid_tipo_discapacidad: foraignKey != ''? foraignKey : null
          }
        }
        arrayCrear.push(datosCrear);
      } else {
        deferred.reject(new Error(`wrongFormat`));
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
          objetosCreacion.forEach(function(element) {
            if (element.padre.nombre_completo != '' || element.padre.documento_identidad != '' || element.padre.telefono != '') {
              element.padre._usuario_creacion = audit_usuario.id_usuario;
              element.padre.genero = 'M';
              personasPadresObjeto.push(element.padre);
            }
            if (element.madre.nombre_completo != '' || element.madre.documento_identidad != '' || element.madre.telefono != '') {
              element.madre._usuario_creacion = audit_usuario.id_usuario;
              element.madre.genero = 'F';
              personasPadresObjeto.push(element.madre);
            }
            element.estudiante._usuario_creacion = audit_usuario.id_usuario;
            if(element.estudiante.rude === '')
              delete element.estudiante.rude;
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
              return dao.crearRegistro(models.estudiante, estudianteObjeto, true, transaccion);
            })
            .then(respuestaCreacion => {
              let datoPersona = {};
              personaObjeto.forEach(function(persona) {
                persona._usuario_creacion= audit_usuario.id_usuario;
                respuestaCreacion.forEach(function(element) {
                  objetosCreacion.forEach(function(datoCreacion) {
                    if (element.codigo == datoCreacion.estudiante.codigo && persona == datoCreacion.persona)
                      persona.fid_estudiante= element.id_estudiante;
                  }, this);
                }, this);
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
        .then(respuesta => {
          return respuesta;
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

  const estudianteBL = {
    obtenerRegistros,
    importarCsvDatos
  };

  return estudianteBL;
};
