const sequelizeFormly = require("sequelize-formly");
const dpaBL = require('../../bls/parametros/dpaBL');
const Util = require('../../utils/util');

module.exports = app => {
  const models = app.src.db.models;
  models.sequelize = app.src.db.sequelize;
  models.notificaciones = app.src.libs.notificaciones;

  app.route("/api/v1/codigoDeptos")
    .get((req, res) => {
      dpaBL.listarDepartamentos(req.query, req.body, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });

  app.route("/api/v1/dpaNivel")
    .get((req, res) => {
      dpaBL.listarNivel(req.query, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });

  app.route("/api/v1/dpaHijos")
    .get((req, res) => {
      dpaBL.obtenerHijos(req.query, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });

  app.route("/api/v1/dpaPadre")
    .get((req, res) => {
      dpaBL.obtenerPadre(req.query, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });
};
