const sequelizeFormly = require("sequelize-formly");
const Util = require('../../utils/util');
// const jsreport = require('jsreport');

module.exports = app => {
  const models = app.src.db.models;
  const registroBL = app.src.bls.inscripcion.registroBL;
  // const reporteBL = app.src.bls.ddjj.reporteBL;
  // const duplicadoBL = app.src.bls.ddjj.duplicadoBL;
  models.notificaciones = app.src.libs.notificaciones;

  app.route("/api/v1/registros")
  .get((req, res) => {
    registroBL.listarRegistros(req.query, req.body)
    .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
    .catch(error => Util.mensajeError(res, error.message));
  });

  app.route("/api/v1/registroRude")
  .put((req, res) => {
    registroBL.llenaRegistro(req.body, models)
    .then(respuesta => Util.mensajeExito(res, "Almacenamiento de datos exitoso.", 200, respuesta))
    .catch(error => Util.mensajeError(res, error.message));
  });
};
