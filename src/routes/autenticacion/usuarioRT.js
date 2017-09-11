// import sequelizeFormly from "sequelize-formly";
// const usuarioBL = require('../../bls/autenticacion/usuarioBL');
// const autenticacionBL = require('../../bls/autenticacion/autenticacionBL');
const Util = require('../../utils/util');

module.exports = app => {
  // const models = app.src.db.models;
  // models.sequelize = app.src.db.sequelize;
  // models.notificaciones = app.src.libs.notificaciones;

  app.route("/")
  .get((req, res) => {
    Util.mensajeExito(res, "Obtencion de datos exitosa.", 200, "Hola Mundo!")
  });
};