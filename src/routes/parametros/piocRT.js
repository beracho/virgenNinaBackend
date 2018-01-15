const sequelizeFormly = require("sequelize-formly");
const piocBL = require('../../bls/parametros/piocBL');
const Util = require('../../utils/util');

module.exports = app => {
  const models = app.src.db.models;
  models.sequelize = app.src.db.sequelize;
  models.notificaciones = app.src.libs.notificaciones;

  app.route("/api/v1/piocs")
    .get((req, res) => {
      piocBL.listarPiocs(req.body, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });
};
