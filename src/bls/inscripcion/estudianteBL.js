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
  let respuestaTotal = {};
  const obtenerRegistros = (req, body) => {
    const deferred = Q.defer();
    params = {
      where: req,
      include: [{
        model: models.estudiante,
        as: 'estudiante',
        required: true,
        include: [{
          model: models.registro_inscripcion,
          as: 'registro',
          required: true,
          include: [{
            model: models.pioc,
            as: 'pioc',
            required: true
          }]
        }]
      }, {
        model: models.ubicacion,
        as: 'direccion'
      }, {
        model: models.ubicacion,
        as: 'lugar_nacimiento'
      }, {
        model: models.parentezco,
        as: 'persona_de',
        include: [{
          model: models.persona,
          as: 'persona_es'
        }]
      }]
    };
    dao.listarRegistros(models.persona, params)
    .then(respuesta => {
      respuestaTotal = respuesta;
      if (respuestaTotal.length === 1) {
        return dpaBL.obtenerELemento(respuestaTotal[0].direccion.fid_dpa, models)
      } 
      else {
        deferred.resolve(respuestaTotal);
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
      deferred.resolve(respuestaTotal);
    })
    .catch(error => {
      deferred.reject(error)
    });
    return deferred.promise;
  }

  const estudianteBL = {
    obtenerRegistros
  };

  return estudianteBL;
};
