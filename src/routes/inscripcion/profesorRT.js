const sequelizeFormly = require('sequelize-formly');
const usuarioBL = require('../../bls/autenticacion/usuarioBL');
const Util = require('../../utils/util');

module.exports = app => {
  const models = app.src.db.models;
  models.sequelize = app.src.db.sequelize;
  models.notificaciones = app.src.libs.notificaciones;
    
  app.route("/api/v1/profesor")
    .get((req, res) => {
      usuarioBL.listarMaestros(req.query, req.body, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });
};
