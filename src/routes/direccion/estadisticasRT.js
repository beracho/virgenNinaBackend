const sequelizeFormly = require("sequelize-formly");
const Util = require('../../utils/util');
// const jsreport = require('jsreport');

module.exports = app => {
  const models = app.src.db.models;
  const estadisticasBL = app.src.bls.direccion.estadisticasBL;
  models.notificaciones = app.src.libs.notificaciones;

  app.route("/api/v1/informesPorArea/")
  .post((req, res) => {
    estadisticasBL.informesPorArea(req.body)
    .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
    .catch(error => Util.mensajeError(res, error.message));
  });

  app.route("/api/v1/informesEstudiantes/")
  .post((req, res) => {
    estadisticasBL.informesEstudiantes(req.body)
    .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
    .catch(error => Util.mensajeError(res, error.message));
  });
};
