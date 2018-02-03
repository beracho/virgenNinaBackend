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
        deferred.resolve(respuestaLista);
      } 
    })
    .then(respuesta => {
      respuestaTotal[0].dataValues.direccion.dataValues.pais = respuesta.pais ;
      respuestaTotal[0].dataValues.direccion.dataValues.departamento = respuesta.departamento ;
      respuestaTotal[0].dataValues.direccion.dataValues.provincia = respuesta.provincia ;
      respuestaTotal[0].dataValues.direccion.dataValues.municipio = respuesta.municipio ;
      return dpaBL.obtenerELemento(respuestaTotal[0].lugar_nacimiento.fid_dpa, models)
    })
    .then(respuesta => {
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
    })
    .then(respuesta => {
      respuestaTotal[0].dataValues.persona_de = respuesta[0].persona_de ;
      deferred.resolve(respuestaTotal);
    })
    .catch(error => {
      deferred.reject(error)
    });
    return deferred.promise;
  }

  const importarCsvDatos = (req) => {
    const deferred = Q.defer();
    const audit_usuario  = req.body.audit_usuario;
    if (!req.files) {
      deferred.reject(new Error(`Debe adjuntar un archivo csv con los activos productivos. Por favor, revise sus datos`));
      return deferred.promise;
    }
    if (!req.files.archivo) {
      deferred.reject(new Error(`Debe adjuntar un archivo csv con los activos productivos. Por favor, revise sus datos`));
      return deferred.promise;
    }
    const archivo = req.files.archivo;
    const extension = archivo.name.replace(/^.*\./, '');
    if (!(archivo.mimetype && (archivo.mimetype === MIMETYPE_CSV || extension === 'csv'))) {
      deferred.reject(new Error(`El archivo que desea importar no responde al formato correcto. Por favor, vuelva a leer las instrucciones e inténtelo de nuevo.`));
      return deferred.promise;
    }
    const arrayActivosProductivos = [];
    validarCertificacion(idCertificacion, req.body)
    .then(respuestaValidacion => {
      const tmpFile = archivo.name;
      const dirProBolivia = `${config.app.directorios.ruta_probolivia}`;
      const dirCsv = `${config.app.directorios.ruta_csv}`;
      const dirUsuarioCsv = `${dirCsv}/${audit_usuario.id_usuario}`;
      const rutaArchivo = `${dirUsuarioCsv}/${tmpFile}`;
      if(!fs.existsSync(dirProBolivia)) {
        fs.mkdirSync(dirProBolivia);
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
          const arrayCols = ['Cantidad', 'Descripción', 'Marca', 'Precio unitario', 'Total'];
          csv({delimiter: '\t', headers:arrayCols})
          .fromFile(rutaArchivo)
          .on('json',(csvRow, rowIndex) => {
            if(Object.keys(csvRow).length !== arrayCols.length) {
              deferred.reject(new Error(`El archivo que desea importar no responde al formato correcto. El número de columnas no es igual al esperado. Por favor, vuelva a leer las instrucciones e inténtelo de nuevo.`));
              return deferred.promise;
            } else {
              if (isNaN(parseInt(csvRow[arrayCols[0]]))) {
                deferred.reject(new Error(`Error en la fila ${rowIndex + 1}. El archivo que desea importar no responde al formato correcto. Se esperaba un valor numérico para la columna ${arrayCols[0]}. Por favor, vuelva a leer las instrucciones e inténtelo de nuevo.`));
                return deferred.promise;
              }
              if (isNaN(parseFloat(csvRow[arrayCols[3]]))) {
                deferred.reject(new Error(`Error en la fila ${rowIndex + 1}. El archivo que desea importar no responde al formato correcto. Se esperaba un valor numérico para la columna ${arrayCols[3]}. Por favor, vuelva a leer las instrucciones e inténtelo de nuevo.`));
                return deferred.promise;
              }
              if (isNaN(parseFloat(csvRow[arrayCols[4]]))) {
                deferred.reject(new Error(`Error en la fila ${rowIndex + 1}. El archivo que desea importar no responde al formato correcto. Se esperaba un valor numérico para la columna ${arrayCols[4]}. Por favor, vuelva a leer las instrucciones e inténtelo de nuevo.`));
                return deferred.promise;
              }
              if (csvRow[arrayCols[1]].toString().length === 0) {
                deferred.reject(new Error(`Error en la fila ${rowIndex + 1}. El archivo que desea importar no responde al formato correcto. Se esperaba que la columna ${arrayCols[1]} no esté vacía. Por favor, vuelva a leer las instrucciones e inténtelo de nuevo.`));
                return deferred.promise;
              }
              if (csvRow[arrayCols[2]].toString().length === 0) {
                deferred.reject(new Error(`Error en la fila ${rowIndex + 1}. El archivo que desea importar no responde al formato correcto. Se esperaba que la columna ${arrayCols[2]} no esté vacía. Por favor, vuelva a leer las instrucciones e inténtelo de nuevo.`));
                return deferred.promise;
              }
              csvRow._usuario_creacion = audit_usuario.id_usuario;
              csvRow.fid_unidad_productiva = respuestaValidacion.fid_unidad_productiva;
              csvRow.cantidad = parseInt(csvRow[arrayCols[0]]);
              csvRow.descripcion = csvRow[arrayCols[1]];
              csvRow.marca = csvRow[arrayCols[2]];
              csvRow.precio_unitario = parseFloat(csvRow[arrayCols[3]]);
              csvRow.total = parseFloat(csvRow[arrayCols[4]]);
              arrayActivosProductivos.push(csvRow);
            }
          })
          .on('error', (error) => {
            throw new Error(error);
          })
          .on('done',() => {
            const options = {
              validate: false,
              hooks: false,
              individualHooks: false,
              benchmark: true,
            };
            if (arrayActivosProductivos.length > 0) {
              dao.crearRegistro(models.activo_productivo, arrayActivosProductivos, true, null, options)
              .then(respuesta => deferred.resolve(respuesta))
              .catch(error => deferred.reject(error))
            }

          })
        }
      })
    })
    .catch(error => deferred.reject(error));
    return deferred.promise;
  };

  const estudianteBL = {
    obtenerRegistros,
    importarCsvDatos
  };

  return estudianteBL;
};
