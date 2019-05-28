const sequelizeFormly = require("sequelize-formly");
const Util = require('../../utils/util');
// const jsreport = require('jsreport');

module.exports = app => {
  const models = app.src.db.models;
  const personaBL = app.src.bls.autenticacion.personaBL;

  // app.route("/api/v1/registros")
  // .get((req, res) => {
  //   personaBL.listarRegistros(req.query, req.body)
  //   .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
  //   .catch(error => Util.mensajeError(res, error.message));
  // });

  app.route("/api/v1/actualizaPersona")
  .put((req, res) => {
    personaBL.modificarPersona(req.body.idPersona, req.body.carnetData, models, req.body)
    .then(respuesta => Util.mensajeExito(res, "Modificación de datos exitosa.", 200, respuesta))
    .catch(error => Util.mensajeError(res, error.message));
  });
};
