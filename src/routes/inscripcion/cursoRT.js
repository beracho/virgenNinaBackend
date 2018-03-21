const sequelizeFormly = require("sequelize-formly");
const Util = require('../../utils/util');
// const jsreport = require('jsreport');

module.exports = app => {
  const models = app.src.db.models;
  const cursoBL = app.src.bls.inscripcion.cursoBL;
  // const reporteBL = app.src.bls.ddjj.reporteBL;
  // const duplicadoBL = app.src.bls.ddjj.duplicadoBL;
  models.notificaciones = app.src.libs.notificaciones;

  app.route("/api/v1/cursos/")
  .get((req, res) => {
    cursoBL.listaCursos(req.query, req.body)
    .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
    .catch(error => Util.mensajeError(res, error.message));
  })
  .put((req, res) => {
    cursoBL.editaCurso(req.body)
    .then(respuesta => Util.mensajeExito(res, "Edición de datos exitosa.", 200, respuesta))
    .catch(error => Util.mensajeError(res, error.message));
  })
  .post((req, res) => {
    cursoBL.creaCurso(req.body)
    .then(respuesta => Util.mensajeExito(res, "Creación de datos exitosa.", 200, respuesta))
    .catch(error => Util.mensajeError(res, error.message));
  });

  app.route("/api/v1/cursos/id_curso")
};
