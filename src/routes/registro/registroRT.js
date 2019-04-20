const sequelizeFormly = require("sequelize-formly");
const Util = require('../../utils/util');
// const jsreport = require('jsreport');

module.exports = app => {
  const models = app.src.db.models;
  const registroBL = app.src.bls.registro.registroBL;
  const registroEvalTrabajoSocialBL = app.src.bls.registro.registroEvalTrabajoSocialBL;
  models.notificaciones = app.src.libs.notificaciones;
  
  app.route("/api/v1/registros/")
  .get((req, res) => {
    registroBL.listaRegistroPorArea(req.query, req.body)
    .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
    .catch(error => Util.mensajeError(res, error.message));
  })

  app.route("/api/v1/registroSimple/")
  // .get((req, res) => {
  //   registroBL.listaRegistroPorArea(req.query, req.body)
  //   .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
  //   .catch(error => Util.mensajeError(res, error.message));
  // })
  .post((req, res) => {
    registroBL.creaRegistroSimple(req.body)
    .then(respuesta => Util.mensajeExito(res, "Creación de datos exitosa.", 200, respuesta))
    .catch(error => Util.mensajeError(res, error.message));
  }).put((req, res) => {
    registroBL.editaRegistroSimple(req.body)
    .then(respuesta => Util.mensajeExito(res, "Edición de datos exitosa.", 200, respuesta))
    .catch(error => Util.mensajeError(res, error.message));
  }).delete((req, res) => {
    registroBL.eliminaRegistroSimple(req.body)
    .then(respuesta => Util.mensajeExito(res, "Eliminación de datos exitosa.", 200, respuesta))
    .catch(error => Util.mensajeError(res, error.message));
  });

  app.route("/api/v1/registroEvalTrabajoSocial/")
  .post((req, res) => {
    registroEvalTrabajoSocialBL.creaRegistroEvalTrabajoSocial(req.body)
    .then(respuesta => Util.mensajeExito(res, "Creación de datos exitosa.", 200, respuesta))
    .catch(error => Util.mensajeError(res, error.message));
  }).put((req, res) => {
    registroEvalTrabajoSocialBL.editaRegistroEvalTrabajoSocial(req.body)
    .then(respuesta => Util.mensajeExito(res, "Edición de datos exitosa.", 200, respuesta))
    .catch(error => Util.mensajeError(res, error.message));
  }).delete((req, res) => {
    registroEvalTrabajoSocialBL.eliminaRegistroEvalTrabajoSocial(req.body)
    .then(respuesta => Util.mensajeExito(res, "eliminación de datos exitosa.", 200, respuesta))
    .catch(error => Util.mensajeError(res, error.message));
  });
};
