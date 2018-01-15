const sequelizeFormly = require("sequelize-formly");
const Util = require('../../utils/util');
// const jsreport = require('jsreport');

module.exports = app => {
  const models = app.src.db.models;
  const unidadEducativaBL = app.src.bls.inscripcion.unidadEducativaBL;
  // const reporteBL = app.src.bls.ddjj.reporteBL;
  // const duplicadoBL = app.src.bls.ddjj.duplicadoBL;
  models.notificaciones = app.src.libs.notificaciones;

  app.route("/api/v1/unidadEducativa/:id")
  .get((req, res) => {
    unidadEducativaBL.obtenerRegistros(req.params, req.body)
    .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
    .catch(error => Util.mensajeError(res, error.message));
  });

  app.route("/api/v1/unidadesEducativas")
  .get((req, res) => {
    unidadEducativaBL.obtenerRegistros(req.params, req.body)
    .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
    .catch(error => Util.mensajeError(res, error.message));
  });
};
