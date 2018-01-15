/**
* Lógica del Negocio -> ConfiguracionBL
*/
const config = require('konfig')();
const dao = require('../../dao/dao');
const Q = require('q');
const util = require('../../libs/util');
const general = require('../../utils/util');
const usuarioBL = require('../autenticacion/usuarioBL');
const plantillaBL = require('../parametros/plantillaBL');
// const Hashids = require('hashids');
const handlebars = require('handlebars');
const fs = require('fs-extra');
const moment = require('moment');

// const hashids = new Hashids("PROBOLIVIA", 15, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");

module.exports = app => {
  const models = app.src.db.models;
  const sequelize = app.src.db.sequelize;

  const obtenerRegistros = (req, body) => {
    const deferred = Q.defer();
    if (req.id !== undefined) {
      dao.obtenerRegistro(models.unidad_educativa, {
        where: {
          sie: req.id
        }
      })
      .then(respuesta => {
        deferred.resolve(respuesta);
      })
      .catch(error => {
        deferred.reject(error)
      });
    } else {
      dao.listarRegistros(models.unidad_educativa, {})
      .then(respuesta => {
        deferred.resolve(respuesta);
      })
      .catch(error => {
        deferred.reject(error)
      });
    }
    return deferred.promise;
  }

  const unidad_educativaBL = {
    obtenerRegistros
  };

  return unidad_educativaBL;
};
