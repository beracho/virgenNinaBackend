const sequelizeFormly = require("sequelize-formly");
const Util = require('../../utils/util');
// const jsreport = require('jsreport');

module.exports = app => {
  const models = app.src.db.models;
  const categoriaBL = app.src.bls.registro.categoriaBL;
  models.notificaciones = app.src.libs.notificaciones;

  app.route("/api/v1/categoria/")
  .get((req, res) => {
    categoriaBL.obtieneCategoria(req.query, req.body)
    .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
    .catch(error => Util.mensajeError(res, error.message));
  }).post((req, res) => {
    categoriaBL.creaCategoria(req.body)
    .then(respuesta => Util.mensajeExito(res, "Creación de datos exitosa.", 200, respuesta))
    .catch(error => Util.mensajeError(res, error.message));
  }).put((req, res) => {
    categoriaBL.editaCategoria(req.body)
    .then(respuesta => Util.mensajeExito(res, "Edición de datos exitosa.", 200, respuesta))
    .catch(error => Util.mensajeError(res, error.message));
  }).delete((req, res) => {
    categoriaBL.eliminaCategoria(req.body)
    .then(respuesta => Util.mensajeExito(res, "Eliminación de datos exitosa.", 200, respuesta))
    .catch(error => Util.mensajeError(res, error.message));
  });

  app.route("/api/v1/categoriaRegistroSimple/")
  .get((req, res) => {
    categoriaBL.obtieneCategoriaRegistroSimple(req.body, req.query)
    .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
    .catch(error => Util.mensajeError(res, error.message));
  }).post((req, res) => {
    categoriaBL.creaCategoriaRegistroSimple(req.body)
    .then(respuesta => Util.mensajeExito(res, "Creación de datos exitosa.", 200, respuesta))
    .catch(error => Util.mensajeError(res, error.message));
  }).delete((req, res) => {
    categoriaBL.eliminaCategoriaRegistroSimple(req.body)
    .then(respuesta => Util.mensajeExito(res, "Eliminación de datos exitosa.", 200, respuesta))
    .catch(error => Util.mensajeError(res, error.message));
  });
};
