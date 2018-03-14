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
const handlebars = require('handlebars');
const fs = require('fs-extra');
const moment = require('moment');

module.exports = app => {
  const models = app.src.db.models;
  const sequelize = app.src.db.sequelize;

  const listaCursos = (req, body) => {
    const deferred = Q.defer();
    dao.listarRegistros(models.curso, {
      where: {
        estado: 'ACTIVO'
      }
    })
    .then(respuesta => {
      deferred.resolve(respuesta);
    })
    .catch(error => {
      deferred.reject(error)
    });
    return deferred.promise;
  }
  const cursoBL = {
    listaCursos
  };

  return cursoBL;
};
