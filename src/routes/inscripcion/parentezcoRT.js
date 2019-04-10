const sequelizeFormly = require("sequelize-formly");
const Util = require('../../utils/util');

module.exports = app => {
  const models = app.src.db.models;
  const parentezcoBL = app.src.bls.inscripcion.parentezcoBL;

  app.route("/api/v1/parentezco")
  .put((req, res) => {
    parentezcoBL.agregaPariente(req.body, models)
    .then(respuesta => Util.mensajeExito(res, "Almacenamiento de datos exitoso.", 200, respuesta))
    .catch(error => Util.mensajeError(res, error.message));
  });
};
