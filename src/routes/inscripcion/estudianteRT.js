const sequelizeFormly = require("sequelize-formly");
const Util = require('../../utils/util');

module.exports = app => {
  const models = app.src.db.models;
  const estudianteBL = app.src.bls.inscripcion.estudianteBL;
  models.notificaciones = app.src.libs.notificaciones;

  app.route("/api/v1/estudiantes")
  .get((req, res) => {
    estudianteBL.obtenerRegistros(req.query, req.body)
    .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
    .catch(error => Util.mensajeError(res, error.message));
  });

  // app.route("/api/v1/unidadesEducativas")
  // .get((req, res) => {
  //   estudianteBL.obtenerRegistros(req.params, req.body)
  //   .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
  //   .catch(error => Util.mensajeError(res, error.message));
  // });
};
