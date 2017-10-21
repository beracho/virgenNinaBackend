import sequelizeFormly from "sequelize-formly";
const departamentoBL = require('../../bls/parametros/departamentoBL');
const Util = require('../../utils/util');

module.exports = app => {
  const models = app.src.db.models;
  models.sequelize = app.src.db.sequelize;
  models.notificaciones = app.src.libs.notificaciones;

  app.route("/codigoDeptos")
    .get((req, res) => {
      departamentoBL.listarDepartamentos(req.query, req.body, models)
        .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
        .catch(error => Util.mensajeError(res, error.message));
    });
};
