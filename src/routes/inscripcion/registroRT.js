import sequelizeFormly from "sequelize-formly";
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
    // if (req.query.duplicados) {
    //   registroBL.listarSolicitadosDuplicados(req.query, req.body)
    //   .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
    //   .catch(error => Util.mensajeError(res, error.message));
    // } else {
      registroBL.listarRegistros(req.query, req.body)
      .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
      .catch(error => Util.mensajeError(res, error.message));
    // }
  });

  // app.route("/api/v1/registros/:id")
  // .get((req, res) => {
  //   registroBL.obtenerregistroPorId(req.params.id, req.body)
  //   .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
  //   .catch(error => Util.mensajeError(res, error.message));
  // });

  // app.route("/api/v1/registros")
  // .post((req, res) => {
  //   registroBL.crearregistro(req.body)
  //   .then(respuesta => Util.mensajeExito(res, "La declaración jurada fue creada correctamente..", 200, respuesta))
  //   .catch(error => Util.mensajeError(res, error.message));
  // });

  // app.route("/api/v1/registros/:id")
  // .put((req, res) => {
  //   registroBL.modificarregistro(req.params.id, req.body)
  //   .then(respuesta => Util.mensajeExito(res, "Se modificaron los datos correctamente..", 200, respuesta))
  //   .catch(error => Util.mensajeError(res, error.message));
  // });

  // app.route("/api/v1/registros/:id")
  // .delete((req, res) => {
  //   registroBL.eliminarregistro(req.params.id, req.body)
  //   .then(respuesta => Util.mensajeExito(res, "Se eliminaron los datos correctamente..", 200, respuesta))
  //   .catch(error => Util.mensajeError(res, error.message));
  // });

  // app.route("/api/v1/registros/:id/validar")
  // .post((req, res) => {
  //   registroBL.validarregistro(req.params.id, req.body)
  //   .then(respuesta => Util.mensajeExito(res, "Se validó la Declaración Jurada correctamente..", 200, respuesta))
  //   .catch(error => Util.mensajeError(res, error.message));
  // });

  // app.route("/api/v1/registros/:id/enviar")
  // .put((req, res) => {
  //   registroBL.enviarregistro(req.params.id, req.body)
  //   .then(respuesta => Util.mensajeExito(res, "Se envió la Declaración Jurada correctamente..", 200, respuesta))
  //   .catch(error => Util.mensajeError(res, error.message));
  // });

  // app.route("/api/v1/registros/:id/notificar")
  // .put((req, res) => {
  //   registroBL.notificarregistro(req.params.id, req.body)
  //   .then(respuesta => Util.mensajeExito(res, "Se notificó la Declaración Jurada correctamente..", 200, respuesta))
  //   .catch(error => Util.mensajeError(res, error.message));
  // });

  // app.route("/api/v1/registros/:id/pagar")
  // .put((req, res) => {
  //   registroBL.pagarregistro(req.params.id, req.body)
  //   .then(respuesta => Util.mensajeExito(res, "Se procesó la Declaración Jurada correctamente..", 200, respuesta))
  //   .catch(error => Util.mensajeError(res, error.message));
  // });

  // app.route("/api/v1/registros/:id/observar")
  // .put((req, res) => {
  //   registroBL.observarregistro(req.params.id, req.body)
  //   .then(respuesta => Util.mensajeExito(res, "Se observó la declaración jurada correctamente.", 200, respuesta))
  //   .catch(error => Util.mensajeError(res, error.message));
  // });

  // app.route("/api/v1/registros/:id/aprobar")
  // .put((req, res) => {
  //   registroBL.aprobarregistro(res, req.params.id, req.body)
  //   .then(respuesta => Util.mensajeExito(res, "Se aprobó la declaración jurada correctamente.", 200, respuesta))
  //   .catch(error => Util.mensajeError(res, error.message));
  // });

  // app.route("/api/v1/registros/:id/duplicar")
  // .post((req, res) => {
  //   duplicadoBL.duplicarregistro(req.params.id, req.body)
  //   .then(respuesta => Util.mensajeExito(res, "Se duplicó la declaración jurada correctamente.", 200, respuesta))
  //   .catch(error => Util.mensajeError(res, error.message));
  // });

  // app.route("/api/v1/registros/:id/duplicados")
  // .put((req, res) => {
  //   duplicadoBL.aprobarDuplicados(res, req.params.id, req.body)
  //   .then(respuesta => Util.mensajeExito(res, "Se aprobó la declaración jurada correctamente.", 200, respuesta))
  //   .catch(error => Util.mensajeError(res, error.message));
  // });

  // app.route("/api/v1/registros/:id/duplicados/:idLote")
  // .get((req, res) => {
  //   duplicadoBL.obtenerDuplicados(req.params.id, req.params.idLote, req.body)
  //   .then(respuesta => Util.mensajeExito(res, "Se obtuvo la declaración jurada correctamente.", 200, respuesta))
  //   .catch(error => Util.mensajeError(res, error.message));
  // });

  // app.route("/api/v1/registros/:id/escala")
  // .get((req, res) => {
  //   registroBL.obtenerCertificadoEscala(req.params.id)
  //   .then(respuesta => Util.mensajeExito(res, "Se obtuvieron los datos.", 200, respuesta))
  //   .catch(error => Util.mensajeError(res, error.message));
  // });

  // app.route("/api/v1/registros/generar_certificado/:id")
  // .post((req, res) => {
  //   reporteBL.generarCertificado(res, req.params.id, false, false)
  //   //Util.mensajeExito(res, "Se generó el certificado correctamente.", 200, respuesta) // OJO Se comenta esta parte pues no es necesario volver a devolver un response, el método de generación ya lo hizo
  //   .then(respuesta =>  console.log('Se generó el certificado correctamente.'))
  //   .catch(error => Util.mensajeError(res, error.message));
  // });

  // app.route("/api/v1/registros/:id/reporte")
  // .post((req, res) => {
  //   reporteBL.obtenerCertificadoRpt(res, req.params.id, false, false)
  //   .then(respuesta => console.log("Se generó el reporte correctamente."))
  //   .catch(error => Util.mensajeError(res, error.message));
  // });

  // app.route("/registros/generar_certificado")
  // .post((req, res) => {
  //   reporteBL.mostrarDocumentoGuardado(res, req.query.codigo)
  //   .then(respuesta => {console.log("Se mostró el certificado correctamente.");})
  //   .catch(error => Util.mensajeError(res, error.message));
  // });

  // app.route("/api/v1/registros/mostrar_reporte/:id")
  // .post((req, res) => {
  //   reporteBL.mostrarDocumentoGuardado(res, null, req.params.id, false)
  //   .then(respuesta => {console.log("Se mostró el reporte correctamente.");})
  //   .catch(error => Util.mensajeError(res, error.message));
  // });

  // app.route("/api/v1/registros/mostrar_certificado/:id")
  // .post((req, res) => {
  //   reporteBL.mostrarDocumentoGuardado(res, null, req.params.id, true)
  //   .then(respuesta => {console.log("Se mostró el reporte correctamente.");})
  //   .catch(error => Util.mensajeError(res, error.message));
  // });

  // app.route("/registros/datos_certificado")
  // .post((req, res) => {
  //   reporteBL.datosCertificadoCliente(req.query.codigo)
  //   .then(respuesta => Util.mensajeExito(res, "Se encontraron los datos exitosamente.", 200, respuesta))
  //   .catch(error => Util.mensajeError(res, error.message));
  // })
};
