/**
* Lógica del Negocio -> ConfiguracionBL
*/
const config = require('konfig')();
const dao = require('../../dao/dao');
const Q = require('q');
const util = require('../../libs/util');
const general = require('../../utils/util');
const usuarioBL = require('../autenticacion/usuarioBL');
const plantillaBL = require('../parametros/plantillaBL');
// const Hashids = require('hashids');
const handlebars = require('handlebars');
import fs from 'fs-extra';
import moment from 'moment';

// const hashids = new Hashids("PROBOLIVIA", 15, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");

module.exports = app => {
  const models = app.src.db.models;
  const sequelize = app.src.db.sequelize;
  const formularioBL = app.src.bls.formularioBL;
  const unidad_productivaBL = app.src.bls.unidad_productivaBL;
  // const representante_legalBL = app.src.bls.ddjj.representante_legalBL;
  // const caebBL = app.src.bls.caebBL;

  // const crearRegistro = (body) => {
  //   const deferred = Q.defer();
  //   const unidadProductivaObj = {
  //     matricula_comercio: body.matricula_comercio,
  //     _usuario_creacion: body.audit_usuario.id_usuario,
  //   };
  //   const RegistroObj = {
  //     fid_formulario: body.fid_formulario,
  //     _usuario_creacion: body.audit_usuario.id_usuario,
  //     tipo: body.tipo || ESCALA_PAGO_TIPO_REGISTRO,
  //   };
  //   let formularioResp = {};
  //   let unidadProductivaRetornar = {};
  //   let RegistroRetornar = {};
  //   let RegistroAnteriorObj = {};
  //   sequelize.transaction().then((transaccion) => {
  //     app.src.bls.parametros.formularioBL.obtenerFormulario(RegistroObj.fid_formulario, body)
  //     .then(respuesta => {
  //       formularioResp = respuesta;
  //       if (!RegistroObj.tipo) {
  //         throw new Error("El tipo de Declaración Jurada (REGISTRO o RENOVACION) es un campo Obligatorio.");
  //       } else if (!formularioResp || (formularioResp && !formularioResp.id_formulario)) {
  //         throw new Error("No se ha encontrado el tipo de formulario seleccionado. Por favor verifique sus datos.");
  //       }
  //       if (RegistroObj.tipo === ESCALA_PAGO_TIPO_RENOVACION) {
  //         return obtenerRegistroActivaPROBOLIVIA(unidadProductivaObj.matricula_comercio, formularioResp, body);
  //       } else {
  //         return null;
  //       }
  //     })
  //     .then(RegistroAnterior => {
  //       RegistroAnteriorObj = RegistroAnterior;
  //       if (formularioResp.ambito === body.ambito?body.ambito:FORMULARIO_AMBITO_PROBOLIVIA) {
  //         return app.src.bls.ddjj.unidad_productivaBL.crearUnidadProductiva(unidadProductivaObj.matricula_comercio, RegistroObj.fid_formulario, body, transaccion, RegistroAnterior);
  //       } else {
  //         throw new Error("No se ha encontrado el tipo de formulario seleccionado. Por favor verifique sus datos.");
  //       }
  //     })
  //     .then(unidadProductiva => {
  //       // En ambos casos se devuelve una unidad productiva, creada o recuperada
  //       unidadProductivaRetornar = unidadProductiva;
  //       RegistroObj.fid_unidad_productiva = unidadProductiva.id_unidad_productiva;
  //       if (unidadProductivaObj.matricula_comercio) {
  //         RegistroObj.factura_nit = unidadProductiva.nit;
  //         RegistroObj.factura_razon_social = unidadProductiva.razon_social;
  //       } else if (RegistroObj.tipo === ESCALA_PAGO_TIPO_RENOVACION && RegistroAnteriorObj) {
  //         RegistroObj.factura_nit = RegistroAnteriorObj.factura_nit;
  //         RegistroObj.factura_razon_social = RegistroAnteriorObj.factura_razon_social;
  //       }
  //       if (RegistroAnteriorObj && RegistroAnteriorObj.fecha_fin > new Date()) {
  //         RegistroObj.tipo = ESCALA_PAGO_TIPO_REGISTRO;
  //       }
  //       return dao.crearRegistro(models.Registro, RegistroObj, false, transaccion);
  //     })
  //     .then((Registro)=>{
  //       if(body.ambito === 'SELLO_BOLIVIA')
  //       {
  //         return app.src.bls.promueve.productoPromBL.crearProductoProm(
  //           'BIEN_PRODUCIDO',
  //           unidadProductivaRetornar.id_unidad_productiva,
  //           body.audit_usuario.id_usuario,
  //           true,
  //           transaccion)
  //           .then(()=>{return Registro;});
  //       }
  //       else
  //       {
  //         return Registro;
  //       }
  //     })
  //     .then(Registro => {
  //       RegistroRetornar = Registro;
  //       return transaccion.commit();
  //     })
  //     .then(respuesta => obtenerRegistroPorId(RegistroRetornar.id_Registro, body))
  //     .then(devolver => deferred.resolve(devolver))
  //     .catch(error => {
  //       console.log(error);
  //       transaccion.rollback();
  //       deferred.reject(error);
  //     });
  //   });
  //   return deferred.promise;
  // };

  // const modificarRegistro = (id_Registro, body) => {
  //   const deferred = Q.defer();
  //   let RegistroObj = {};
  //   let unidadProductivaObj = {};
  //   const RegistroMod = body.Registro ? body.Registro : {};
  //   let representanteLegalBK = {};
  //   let unidadProductivaMod = body.unidad_productiva ? body.unidad_productiva : {};
  //   let formularioObj = {};
  //   let cobertura_departamento;
  //   sequelize.transaction().then((transaccion) => {
  //     obtenerRegistroPorId(id_Registro, body)
  //     .then(respuesta => {
  //       if (!respuesta || (respuesta && !respuesta.unidad_productiva)) {
  //         throw new Error("No se ha encontrado la Declaración Jurada pendiente de edición. Por favor verifique sus datos.");
  //       } else {
  //         return respuesta;
  //       }
  //     })
  //     .then(Registro => {
  //       RegistroObj = Registro.Registro;
  //       unidadProductivaObj = Registro.unidad_productiva;
  //       cobertura_departamento = unidadProductivaObj.cobertura_departamento || null;
  //       return app.src.bls.parametros.formularioBL.obtenerFormularioPorId(RegistroObj.fid_formulario, body);
  //     }).then(formularioRes => {
  //       formularioObj = formularioRes;
  //       representanteLegalBK = unidadProductivaMod.hist_representantes;
  //       // hack para el error de los montos
  //       const valorCeroDefault = !(unidadProductivaObj.exportaciones_anuales_venta && unidadProductivaObj.ingresos_anuales_venta && unidadProductivaObj.importaciones_anuales && unidadProductivaObj.patrimonio_creacion);
  //       return app.src.bls.parametros.formularioBL.validarCamposFormulario(formularioRes, unidadProductivaMod, unidadProductivaObj.hist_empresa, ['empresa', 'recursos_humanos', 'informacion_financiera', 'cobertura_servicios'], undefined, valorCeroDefault);
  //     }).then(unidadProductivaRes => {
  //       unidadProductivaMod = unidadProductivaRes;
  //       unidadProductivaMod.cobertura_departamento = unidadProductivaMod.cobertura_departamento || cobertura_departamento;
  //       return app.src.bls.ddjj.representante_legalBL.crearRepresentanteLegal(representanteLegalBK, body, transaccion);
  //     })
  //     .then(personaRes => {
  //       if (personaRes && personaRes.id_persona) {
  //         if ((!unidadProductivaObj.matricula_comercio && !unidadProductivaMod.matricula_comercio) && personaRes.dataValues.tipo_documento === PERSONA_TIPO_FUNDEMPRESA) {
  //           throw new Error(`No puede registrar un representante legal de tipo ${PERSONA_TIPO_FUNDEMPRESA} para una declaración jurada sin matrícula de comercio.`);
  //         }
  //         delete personaRes.dataValues.deleted_at;
  //         delete personaRes.dataValues._fecha_creacion;
  //         delete personaRes.dataValues._usuario_creacion;
  //         delete personaRes.dataValues._usuario_modificacion;
  //         delete personaRes.dataValues._fecha_modificacion;
  //         unidadProductivaMod.hist_representantes = personaRes.dataValues;
  //         unidadProductivaMod.fid_persona_representante = personaRes.id_persona;
  //       }
  //       return app.src.bls.ddjj.unidad_productivaBL.modificarUnidadProductiva(unidadProductivaMod, unidadProductivaObj, body, transaccion, ACCION_MODIFICAR, formularioObj);
  //     })
  //     .then(unidad_productiva => app.src.bls.ddjj.unidad_productivaBL.modificarUnidadProductiva(unidad_productiva, unidad_productiva, body, transaccion, ACCION_CATEGORIZAR, formularioObj))
  //     .then(unidad_productiva =>  {
  //       unidad_productiva.razon_social = unidadProductivaMod.razon_social || unidad_productiva.razon_social;
  //       unidad_productiva.nit = unidadProductivaMod.nit || unidad_productiva.nit;
  //       return validarEdicionRegistro(RegistroMod, RegistroObj, body, null, unidad_productiva);
  //     })
  //     .then(Registro => dao.modificarRegistro(models.Registro, RegistroObj.id_Registro, Registro, transaccion))
  //     .then(Registro => transaccion.commit())
  //     .then(Registro => obtenerRegistroPorId(RegistroObj.id_Registro, body))
  //     .then(Registro => deferred.resolve(Registro))
  //     .catch(error => {
  //       transaccion.rollback();
  //       deferred.reject(error);
  //     });
  //   });
  //   return deferred.promise;
  // };

  // const eliminarRegistro = (id_Registro, body) => {
  //   const deferred = Q.defer();
  //   let respuestaObj = {};
  //   sequelize.transaction().then((transaccion) => {
  //     obtenerRegistroPorId(id_Registro, body)
  //     .then(respuesta => {
  //       respuestaObj = respuesta;
  //       if (!respuesta || (respuesta && (!respuesta.unidad_productiva || !respuesta.Registro))) {
  //         throw new Error("No se ha encontrado la Declaración Jurada pendiente de edición. Por favor verifique sus datos.");
  //       } else if (respuesta && respuesta.Registro && respuesta.Registro.estado !== ESTADO_NUEVO) {
  //         throw new Error(`No se puede eliminar una Declaración Jurada en estado ${respuesta.Registro.estado}`);
  //       } else {
  //         return respuesta;
  //       }
  //     })
  //     .then(respuesta => dao.eliminarRegistro(models.activo_productivo, {where: {fid_unidad_productiva: respuestaObj.unidad_productiva.id_unidad_productiva}}, transaccion))
  //     .then(respuesta => dao.eliminarRegistro(models.ddjj_servicio, {where: {fid_unidad_productiva: respuestaObj.unidad_productiva.id_unidad_productiva}}, transaccion))
  //     // .then(respuesta => dao.eliminarRegistro(models.pago, {where: {fid_Registro: respuestaObj.Registro.id_Registro}}, transaccion))
  //     .then(respuesta => dao.eliminarRegistro(models.producto, {where: {fid_unidad_productiva: respuestaObj.unidad_productiva.id_unidad_productiva}}, transaccion))
  //     .then(respuesta => dao.eliminarRegistro(models.ubicacion, {where: {fid_unidad_productiva: respuestaObj.unidad_productiva.id_unidad_productiva}}, transaccion))
  //     .then(respuesta => dao.eliminarRegistro(models.unidad_productiva, {where: {id_unidad_productiva: respuestaObj.unidad_productiva.id_unidad_productiva}}, transaccion))
  //     .then(respuesta => dao.eliminarRegistro(models.Registro, {where: {id_Registro: respuestaObj.Registro.id_Registro}}, transaccion))
  //     .then(respuesta => transaccion.commit())
  //     .then(respuesta => deferred.resolve(true))
  //     .catch(error => {
  //       transaccion.rollback();
  //       deferred.reject(error);
  //     });
  //   });
  //   return deferred.promise;
  // };

  // const enviarRegistro = (id_Registro, body, unidad_productiva) => {
  //   const deferred = Q.defer();
  //   let RegistroObj = {};
  //   let unidadProductivaObj = {};
  //   let categorizacion = null;
  //   const RegistroMod = {};
  //   let formularioObj = {};
  //   const validacionesCertificado = [];
  //   sequelize.transaction().then((transaccion) => {
  //     obtenerRegistroPorId(id_Registro, body)
  //     .then(respuesta => {
  //       if (!respuesta || (respuesta && !respuesta.unidad_productiva)) {
  //         throw new Error("No se ha encontrado la Declaración Jurada pendiente de edición. Por favor verifique sus datos.");
  //       } else {
  //         return respuesta;
  //       }
  //     })
  //     .then(Registro => {
  //       RegistroObj = Registro.Registro;
  //       unidadProductivaObj = Registro.unidad_productiva;
  //       if (unidadProductivaObj.usuario.nit) {
  //         // validacionesCertificado = ['factura'];
  //       }
  //       return app.src.bls.parametros.formularioBL.obtenerFormularioPorId(RegistroObj.fid_formulario, body);
  //     }).then(formularioRes => {
  //       formularioObj = formularioRes;
  //       return validarEdicionRegistro(RegistroMod, RegistroObj, body, ACCION_ENVIAR);
  //     })
  //     .then(Registro => dao.modificarRegistro(models.Registro, RegistroObj.id_Registro, Registro, transaccion))
  //     .then(Registro => app.src.bls.parametros.formularioBL.validarCamposFormulario(formularioObj, Registro, unidadProductivaObj.hist_empresa, validacionesCertificado, true))
  //     .then(Registro => app.src.bls.ddjj.unidad_productivaBL.modificarUnidadProductiva({}, unidadProductivaObj, body, transaccion, ACCION_ENVIAR, formularioObj))
  //     .then(unidad_productiva =>  {
  //       const totalMinimoRRHH = (unidad_productiva.personal_hombres_permanente || 0 )+ (unidad_productiva.personal_mujeres_permanente || 0) + (unidad_productiva.personal_hombres_discapacitados || 0) + (unidad_productiva.personal_mujeres_discapacitados || 0);
  //       if (formularioObj.tipo !== FORMULARIO_TIPO_SHB_UNIDAD && formularioObj.tipo != FORMULARIO_TIPO_PROVEEDOR && formularioObj.tipo != FORMULARIO_TIPO_ICAP && (totalMinimoRRHH) <= 0) {
  //         throw new Error("Debe llenar la sección de Recursos Humanos.");
  //       }
  //       categorizacion = unidad_productiva.categorizacion;
  //       return app.src.bls.parametros.formularioBL.validarCamposFormulario(formularioObj, unidad_productiva, unidadProductivaObj.hist_empresa, ['empresa', 'recursos_humanos', 'informacion_financiera', 'cobertura_servicios'], true);
  //     })
  //     .then(Registro => validarDetalles(id_Registro, categorizacion, formularioObj))
  //     .then(Registro => transaccion.commit())
  //     .then(Registro => obtenerRegistroPorId(RegistroObj.id_Registro, body))
  //     .then(Registro => deferred.resolve(Registro))
  //     .catch(error => {
  //       transaccion.rollback();
  //       deferred.reject(error);
  //     });
  //   });
  //   return deferred.promise;
  // };

  // const notificarRegistro = (id_Registro, body, unidad_productiva) => {
  //   const deferred = Q.defer();
  //   const pagoBL = app.src.bls.ddjj.pagoBL;
  //   let ambito = '';
  //   let idFormulario = 0;
  //   let usuario = {};
  //   let formularioRes = {};
  //   let RegistroObj = {};
  //   let montoValidar = 0;
  //   sequelize.transaction().then((transaccion) => {
  //     obtenerRegistroPorId(id_Registro, body)
  //     .then(respuestaRegistro => {
  //       // Valida que la certificación exista
  //       if(util.isUndefined(respuestaRegistro)) {
  //         throw new Error(`No se encuentra la Declaración Jurada solicitada`);
  //       }
  //       // Valida que el estado de la certificación sea siempre ENVIADO
  //       if(respuestaRegistro.Registro.estado !== ESTADO_ENVIADO) {
  //         throw new Error(`No se puede notificar una Declaración Jurada que no está en estado ${ESTADO_ENVIADO}.`);
  //       }
  //       // Validar que el usuario que apruebe la certificación tenga el rol TÉCNICO
  //       if(body.audit_usuario.id_rol !== ROL_TECNICO) {
  //         throw new Error(`No puede notificar la Declaración Jurada. No tiene los permisos suficientes para completar la acción`);
  //       }
  //       formularioRes = respuestaRegistro.Registro.formulario;
  //       ambito = formularioRes.ambito;
  //       idFormulario = formularioRes.id_formulario;
  //       usuario = respuestaRegistro.unidad_productiva.usuario;
  //       usuario.razon_social = respuestaRegistro.unidad_productiva.razon_social;
  //       RegistroObj = respuestaRegistro;
  //       return app.src.bls.ddjj.actividad_economicaBL.listarActividadesEconomicas(id_Registro);
  //     })
  //     .then(respuesta => {
  //       if (util.isUndefined(respuesta)) {
  //         throw new Error(`No se puede notificar una Declaración Jurada que no tiene Actividades Económicas`);
  //       }
  //       const tieneCAEB = respuesta.filter(item => item.fid_parametro_caeb !== null);
  //       const tieneClasificacion = respuesta.filter(item => item.fid_par_clasificacion_artesanal !== null);
  //       if ((formularioRes.tipo == FORMULARIO_TIPO_UNIDAD_PRODUCTIVA || formularioRes.tipo == FORMULARIO_TIPO_ARTESANO || formularioRes.tipo == FORMULARIO_TIPO_PROVEEDOR) && tieneCAEB.length !== respuesta.length) {
  //         throw new Error(`No se puede notificar una Declaración Jurada que no ha sido clasificada por CAEB`);
  //       } else if (formularioRes.tipo === FORMULARIO_TIPO_ARTESANO && tieneClasificacion.length !== respuesta.length) {
  //         throw new Error(`No se puede notificar una Declaración Jurada que no ha sido clasificada (Clasificación Artesanal).`);
  //       }
  //       return app.src.bls.parametros.formularioBL.validarCamposFormulario(formularioRes, RegistroObj.unidad_productiva, RegistroObj.unidad_productiva.hist_empresa, ['empresa', 'recursos_humanos', 'informacion_financiera', 'cobertura_servicios'], true);
  //     })
  //     .then(respuesta => validarDetalles(id_Registro, null, formularioRes))
  //     .then(respuesta => pagoBL.validarEscalaPago(id_Registro, null, ESTADO_PENDIENTE_PAGO, true))
  //     .then(respuesta => {
  //       montoValidar = respuesta;
  //       const modificarObj = {
  //         _usuario_notificacion: body.audit_usuario.id_usuario,
  //         _fecha_notificacion: new Date(),
  //         estado: ESTADO_PENDIENTE_PAGO,
  //       };
  //       // TODO: ver la posibilidad de hacerlo con una transacción
  //       return dao.modificarRegistro(models.Registro, id_Registro, modificarObj, transaccion);
  //     })
  //     .then(respuesta => transaccion.commit())
  //     .then(respuesta => {
  //       enviarCorreoNotificacion(usuario, ambito, body, formularioRes, montoValidar);
  //       return obtenerRegistroPorId(RegistroObj.Registro.id_Registro, body);
  //     })
  //     .then(respuesta => deferred.resolve(respuesta))
  //     .catch(error => {
  //       transaccion.rollback();
  //       deferred.reject(error);
  //     });
  //   });
  //   return deferred.promise;
  // };

  // const validarEdicionRegistro = (Registro, RegistroObj, body, accion, unidad_productiva) => {
  //   const deferred = Q.defer();
  //   if (body.audit_usuario.id_rol === ROL_INSCRIPCION) {
  //     if (RegistroObj._usuario_creacion !== body.audit_usuario.id_usuario) {
  //       deferred.reject(new Error("No puede editar las declaraciones juradas de terceras personas."));
  //       return deferred.promise;
  //     }
  //     if (RegistroObj.estado !== ESTADO_NUEVO && RegistroObj.estado !== ESTADO_OBSERVADO) {
  //       deferred.reject(new Error("La declaración jurada se encuentra en un estado en el que no puede ser editado."));
  //       return deferred.promise;
  //     }
  //   } else if (body.audit_usuario.id_rol === ROL_TECNICO || body.audit_usuario.id_rol === ROL_TECNICO_REGIONAL) {
  //     if (RegistroObj._usuario_creacion !== body.audit_usuario.id_usuario) {
  //       deferred.reject(new Error("No puede editar las declaraciones juradas de terceras personas."));
  //       return deferred.promise;
  //     }
  //   } else {
  //     deferred.reject(new Error("No puede editar las declaraciones juradas de terceras personas."));
  //     return deferred.promise;
  //   }
  //   if (accion === ACCION_ENVIAR) {
  //     Registro.estado = ESTADO_ENVIADO;
  //     Registro._fecha_envio = new Date();
  //     Registro._usuario_envio = body.audit_usuario.id_usuario;
  //   }
  //   deferred.resolve(Registro);
  //   return deferred.promise;
  // };

  // const validarRegistro = (id_Registro, body) => {
  //   const deferred = Q.defer();
  //   let objetoRespuesta = {};
  //   let RegistroObj = {};
  //   let unidadProductivaObj = {};
  //   let categorizacion = null;
  //   const RegistroMod = {};
  //   let formularioObj = {};
  //   const validacionesCertificado = [];
  //   obtenerRegistroPorId(id_Registro, body)
  //   .then(respuesta => {
  //     if (!respuesta || (respuesta && !respuesta.unidad_productiva)) {
  //       throw new Error("No se ha encontrado la Declaración Jurada pendiente de edición. Por favor verifique sus datos.");
  //     } else {
  //       return respuesta;
  //     }
  //   })
  //   .then(Registro => {
  //     objetoRespuesta = Registro;
  //     RegistroObj = Registro.Registro;
  //     unidadProductivaObj = Registro.unidad_productiva;
  //     categorizacion = unidadProductivaObj.categorizacion;
  //     if (unidadProductivaObj.usuario.nit) {
  //       // validacionesCertificado = ['factura'];
  //     }
  //     return app.src.bls.parametros.formularioBL.obtenerFormularioPorId(RegistroObj.fid_formulario, body);
  //   }).then(formularioRes => {
  //     formularioObj = formularioRes;
  //     return app.src.bls.parametros.formularioBL.validarCamposFormulario(formularioObj, RegistroObj, unidadProductivaObj.hist_empresa, validacionesCertificado, true);
  //   }).then(respuesta => app.src.bls.parametros.formularioBL.validarCamposFormulario(formularioObj, unidadProductivaObj, unidadProductivaObj.hist_empresa, ['empresa', 'recursos_humanos', 'informacion_financiera', 'cobertura_servicios'], true))
  //   .then(respuesta =>  {
  //     const totalMinimoRRHH = (unidadProductivaObj.personal_hombres_permanente || 0 )+ (unidadProductivaObj.personal_mujeres_permanente || 0) + (unidadProductivaObj.personal_hombres_discapacitados || 0) + (unidadProductivaObj.personal_mujeres_discapacitados || 0);
  //     if (formularioObj.tipo !== FORMULARIO_TIPO_SHB_UNIDAD && formularioObj.tipo != FORMULARIO_TIPO_PROVEEDOR && formularioObj.tipo != FORMULARIO_TIPO_ICAP && (totalMinimoRRHH) <= 0) {
  //       throw new Error("Debe llenar la sección de Recursos Humanos.");
  //     }
  //     if (formularioObj.tipo === FORMULARIO_TIPO_UNIDAD_PRODUCTIVA && !unidadProductivaObj.tipo_actividad_economica){
  //       throw new Error("No ha seleccionado el tipo de actividad económica de la Unidad Productiva. Por favor verifique sus datos.");
  //     }
  //     return validarDetalles(RegistroObj.id_Registro, categorizacion, formularioObj);
  //   })
  //   .then(Registro => deferred.resolve(objetoRespuesta))
  //   .catch(error => deferred.reject(error));
  //   return deferred.promise;
  // };

  // const validarRegistroPROBOLIVA = (matricula_comercio, fid_formulario, body) => {
  //   const deferred = Q.defer();
  //   const unidadProductivaWhere = {
  //     fid_usuario: body.audit_usuario.id_usuario,
  //   };
  //   if (body.audit_usuario.id_rol === ROL_TECNICO || body.audit_usuario.id_rol === ROL_TECNICO_REGIONAL) {
  //     deferred.resolve(null);
  //     return deferred.promise;
  //   }
  //   if (matricula_comercio) {
  //     unidadProductivaWhere.matricula_comercio = matricula_comercio;
  //     unidadProductivaWhere.hist_empresa = {
  //       $not: null,
  //     };
  //   } else {
  //     unidadProductivaWhere.matricula_comercio = {
  //       $eq: null,
  //     };
  //     unidadProductivaWhere.hist_empresa = {
  //       $eq: null,
  //     };
  //   }
  //   const parametrosRegistro = {
  //     where: {
  //       fid_formulario,
  //       estado: [ESTADO_NUEVO, ESTADO_ENVIADO, ESTADO_OBSERVADO],
  //     },
  //     include: [{
  //       required: true,
  //       model: models.unidad_productiva,
  //       as: 'unidad_productiva',
  //       where: unidadProductivaWhere,
  //     }, {
  //       required: true,
  //       model: models.formulario,
  //       as: 'formulario',
  //       where: {
  //         ambito: FORMULARIO_AMBITO_PROBOLIVIA,
  //       },
  //     }],
  //   };
  //   dao.contarRegistros(models.Registro, parametrosRegistro)
  //   .then(respuesta => {
  //     if (respuesta > 0) {
  //       if (matricula_comercio) {
  //         throw new Error("Tiene formularios de PROBOLIVIA pendientes de aprobación para la matrícula seleccionada. Por favor verifique sus datos.");
  //       } else {
  //         throw new Error("Tiene formularios de PROBOLIVIA pendientes de aprobación. Por favor verifique sus datos.");
  //       }
  //     } else {
  //       return true;
  //     }
  //   }).then(respuesta => deferred.resolve(true))
  //   .catch(error => deferred.reject(error));
  //   return deferred.promise;
  // };

  // const obtenerRegistroActivaPROBOLIVIA = (matricula_comercio, formularioObj, body, id_usuario, transaccion) => {
  //   const deferred = Q.defer();
  //   const fechaActual = new Date();
  //   const parametrosUnidadProductiva = {
  //     fid_usuario: body.audit_usuario.id_rol === ROL_INSCRIPCION ? body.audit_usuario.id_usuario : null,
  //   };
  //   if (id_usuario) {
  //     parametrosUnidadProductiva.fid_usuario = id_usuario;
  //   }
  //   if (matricula_comercio) {
  //     parametrosUnidadProductiva.matricula_comercio = matricula_comercio;
  //   }
  //   const parametrosRegistro = {
  //     where: {
  //       tipo: [ESCALA_PAGO_TIPO_REGISTRO, ESCALA_PAGO_TIPO_RENOVACION],
  //       estado: ESTADO_APROBADO,
  //       fid_formulario: formularioObj.id_formulario,
  //     },
  //     order: '_fecha_aprobacion DESC',
  //     include: [{
  //       required: true,
  //       model: models.formulario,
  //       as: 'formulario',
  //       where: {
  //         ambito: FORMULARIO_AMBITO_PROBOLIVIA,
  //       },
  //     },{
  //       required: true,
  //       model: models.unidad_productiva,
  //       as: 'unidad_productiva',
  //       where: parametrosUnidadProductiva,
  //     }],
  //   };
  //   dao.obtenerRegistro(models.Registro, parametrosRegistro)
  //   .then(respuesta => deferred.resolve(respuesta))
  //   .catch(error => deferred.reject(error));
  //   return deferred.promise;
  // };

  // const obtenerRegistroPorId = (id, body, parametros) => {
  //   const deferred = Q.defer();
  //   const pagoBL = app.src.bls.ddjj.pagoBL;
  //   if (!parametros) {
  //     parametros = {};
  //   }
  //   const whereUnidadProductiva = {};
  //   if (body.audit_usuario.id_rol === ROL_INSCRIPCION || body.audit_usuario.id_rol === ROL_TECNICO_REGIONAL) {
  //     whereUnidadProductiva.fid_usuario = body.audit_usuario.id_usuario;
  //   }
  //   if (body.audit_usuario.id_rol === ROL_TECNICO) {
  //     parametros.where = {
  //       estado: [ESTADO_ENVIADO, ESTADO_OBSERVADO, ESTADO_APROBADO],
  //     };
  //   }
  //   parametros.include = [{
  //     // attributes: [],
  //     model: models.unidad_productiva,
  //     as: 'unidad_productiva',
  //     where: whereUnidadProductiva,
  //     include: [{
  //       required: false,
  //       model: models.parametro,
  //       as: 'tipo_societario',
  //       attributes: ["sigla", "nombre", "descripcion"],
  //     },{
  //       required: false,
  //       model: models.parametro,
  //       as: 'tipo_organizacion',
  //       attributes: ["sigla", "nombre", "descripcion"],
  //     },{
  //       required: false,
  //       model: models.usuario,
  //       as: 'usuario',
  //       attributes: ["id_usuario", "usuario", "email", "nit", "fid_persona"],
  //     }],
  //   },{
  //     model: models.formulario,
  //     attributes: ["id_formulario", "ambito", "tipo", "nombre", "descripcion", "nro_cuenta", "plazo_dias", "secciones", "duracion"],
  //     as: 'formulario',
  //   },{
  //     required: false,
  //     model: models.Registro_pago,
  //     as: 'Registros_pagos',
  //     include:[{
  //       model: models.pago, as: 'pago',
  //       include: [{
  //         required: false, model: models.factura, as: 'facturas', where: { estado: ESTADO_ACTIVO },
  //       }],
  //     }],
  //   }];
  //   parametros.order = '_fecha_creacion';
  //   let devolver = {};
  //   dao.obtenerRegistroPorId(models.Registro, id, parametros)
  //   .then(respuesta => {
  //     devolver = {
  //       Registro: respuesta,
  //       unidad_productiva: respuesta.unidad_productiva,
  //     };
  //     if (devolver.unidad_productiva.dataValues.cobertura_departamento) {
  //       devolver.unidad_productiva.dataValues.cobertura_departamento = devolver.unidad_productiva.dataValues.cobertura_departamento.split('|');
  //     }
  //     delete devolver.Registro.dataValues.unidad_productiva;
  //     if (devolver.Registro.estado === ESTADO_APROBADO || devolver.Registro.estado === ESTADO_PENDIENTE_PAGO) {
  //       return pagoBL.validarEscalaPago(devolver.Registro.id_Registro, null, devolver.Registro.estado, true);
  //     } else { return null; }
  //   }).then(respuesta => {
  //     if (respuesta && respuesta > 0) {
  //       devolver.pago = respuesta;
  //     }
  //     devolver.datos_factura = {};
  //     if (devolver.Registro.estado === ESTADO_APROBADO) {
  //       return dao.obtenerRegistro(models.factura, {where: {fid_pago: devolver.Registro.Registros_pagos[0].fid_pago}});
  //     } else {
  //       const tipoSocietario = devolver.Registro.unidad_productiva.fid_par_tipo_societario;
  //       if(tipoSocietario === TIPO_SOCIETARIO_EMP_UNIPERSONAL || tipoSocietario === TIPO_SOCIETARIO_PERSONA_NATURAL) {
  //         devolver.datos_factura.nombre_razon_social = devolver.Registro.unidad_productiva.hist_representantes? devolver.Registro.unidad_productiva.hist_representantes.nombre_completo : '';
  //         devolver.datos_factura.nit =  devolver.Registro.unidad_productiva.hist_representantes ? devolver.Registro.unidad_productiva.hist_representantes.documento_identidad : '';
  //       } else {
  //         devolver.datos_factura.nit = devolver.Registro.unidad_productiva.nit ? devolver.Registro.unidad_productiva.nit : '';
  //         devolver.datos_factura.nombre_razon_social = devolver.Registro.unidad_productiva.razon_social ? devolver.Registro.unidad_productiva.razon_social : '';
  //       }
  //       return devolver;
  //     }
  //   })
  //   .then(respuesta => {
  //     if (devolver.Registro.estado === ESTADO_APROBADO) {
  //       devolver.datos_factura.nombre_razon_social = respuesta.nombre_razon_social;
  //       devolver.datos_factura.nit = respuesta.nit;
  //       devolver.datos_factura.nro_factura = respuesta.nro_factura;
  //       devolver.datos_factura.numero_autorizacion = respuesta.numero_autorizacion;
  //       devolver.datos_factura.fecha_factura = respuesta.fecha_factura;
  //     }
  //     if (devolver.Registro && devolver.Registro.Registros_pagos && devolver.Registro.Registros_pagos.length > 0 && devolver.Registro.Registros_pagos[0].pago) {
  //       devolver.Registro.dataValues.pagos = [
  //         devolver.Registro.Registros_pagos[0].pago,
  //       ];
  //       if (devolver.Registro.dataValues.pagos && devolver.Registro.dataValues.pagos.length > 0 && devolver.Registro.dataValues.pagos[0].facturas && devolver.Registro.dataValues.pagos[0].facturas.length > 0) {
  //         devolver.Registro.dataValues.factura = devolver.Registro.dataValues.pagos[0].facturas[0];
  //       }
  //     }
  //     deferred.resolve(devolver);
  //   })
  //   .catch(error => deferred.reject(error));
  //   return deferred.promise;
  // };

  const listarRegistros = (query, body) => {
    const deferred = Q.defer();
    const parametros = query;
    const whereUnidadProductiva = {};
    if (body.audit_usuario.id_rol === ROL_INSCRIPCION) {
      whereUnidadProductiva.fid_usuario = body.audit_usuario.id_usuario;
    }
    // if (body.audit_usuario.id_rol === ROL_TECNICO) {
    //   if (!query.creadas) {
    //     parametros.where = {
    //       estado: [ESTADO_ENVIADO, ESTADO_OBSERVADO, ESTADO_APROBADO, ESTADO_PENDIENTE_PAGO, ESTADO_PAGADO],
    //       tipo: [ESCALA_PAGO_TIPO_REGISTRO, ESCALA_PAGO_TIPO_RENOVACION],
    //     };
    //   } else {
    //     parametros.where = {
    //       _usuario_creacion: body.audit_usuario.id_usuario,
    //     };

    //   }
    // }
    parametros.include = [{
      // attributes: [],
      model: models.persona,
      as: 'persona',
      // where: whereUnidadProductiva,
      // include: [{
      //   required: false,
      //   model: models.parametro,
      //   as: 'tipo_societario',
      //   attributes: ["sigla", "nombre", "descripcion"],
      // },{
      //   required: false,
      //   model: models.parametro,
      //   as: 'tipo_organizacion',
      //   attributes: ["sigla", "nombre", "descripcion"],
      // },{
      //   required: false,
      //   model: models.ubicacion,
      //   as: 'ubicaciones',
      //   attributes: ['id_ubicacion_unidad_productiva'],
      //   include: [{
      //     model: models.departamento,
      //     as: 'departamento',
      //     attributes: ['descripcion'],
      //   }],
      // },{
      //   required: false,
      //   model: models.persona,
      //   as: 'persona_representante',
      //   attributes: ["id_persona", "nombre_completo"],
      // }],
    // }, {
    //   model: models.formulario,
    //   attributes: ["ambito", "tipo", "nombre", "descripcion", "nro_cuenta", "plazo_dias", "secciones"],
    //   as: 'formulario',
    //   where: {
    //     ambito: query.ambito,
    //   },
    //   include: [{
    //     required: false,
    //     model: models.escala_pago, as: 'costo',
    //     where: {
    //       categoria: 'MICRO',
    //     },
    //   }],
    }];
    // parametros.attributes = ['id_Registro', 'tipo', 'gestion', 'nro_Registro', 'lote_duplicado', 'vigente', 'cuce', 'observaciones', 'observaciones_secciones', 'estado', '_fecha_envio',
    //                          '_fecha_notificacion', '_fecha_pago', '_fecha_aprobacion', '_fecha_firma', '_fecha_fin', '_usuario_notificacion', '_usuario_pago', '_usuario_aprobacion', '_usuario_observacion',
    //                          '_usuario_creacion', '_usuario_modificacion', '_usuario_firma', '_fecha_creacion', '_fecha_modificacion', 'fid_formulario', 'fid_unidad_productiva', 'fid_Registro_origen',
    //                          [models.sequelize.literal(`CASE WHEN "Registro"."estado" = 'ENVIADO' THEN 3 WHEN "Registro"."estado" = 'PAGADO' THEN 2 WHEN "Registro"."estado" = 'PENDIENTE_PAGO' THEN 1 ELSE 0 END`), 'enviados'],
    //                         ];
    // parametros.order = 'enviados DESC, _fecha_modificacion DESC';
    // parametros.subQuery = false;
    // if(parametros.filter) {
    //   if (!parametros.where) {
    //     parametros.where = {};
    //   }
    //   parametros.where.$or = {
    //     '$Registro.estado$': {$iLike: `%${parametros.filter}%`},
    //     // '$Registro.estado$': `${parametros.filter}`, // Validar que sea un estado valido
    //     '$unidad_productiva.ubicaciones.departamento.descripcion$': {$iLike: `%${parametros.filter}%`},
    //     '$formulario.nombre$': {$iLike: `%${parametros.filter}%`},
    //     '$unidad_productiva.matricula_comercio$': {$iLike: `%${parametros.filter}%`},
    //     '$unidad_productiva.nit$': {$iLike: `%${parametros.filter}%`},
    //     '$unidad_productiva.razon_social$': {$iLike: `%${parametros.filter}%`},
    //     '$unidad_productiva.persona_representante.nombre_completo$': {$iLike: `%${parametros.filter}%`},
    //     '$unidad_productiva.persona_representante.documento_identidad$': {$iLike: `%${parametros.filter}%`},
    //   };
    // }
    // if (query.aprobados) {
    //   if (!parametros.where) {
    //     parametros.where = {};
    //   }
    //   parametros.where.tipo = [ESCALA_PAGO_TIPO_REGISTRO, ESCALA_PAGO_TIPO_RENOVACION];
    //   parametros.where.estado = ESTADO_APROBADO;
    //   parametros.order = '_fecha_aprobacion DESC';
    //   parametros.vigente = true;
    // }
    dao.listarRegistros(models.registro, parametros)
    .then(respuesta => {
      console.log("---------------------------_________________---------------------");
      console.log(respuesta);
      // const filas = respuesta.rows ? respuesta.rows : respuesta;
      // const devolver = [];
      // let pago = {};
      // filas.forEach(fila => {
      //   const uP = fila.unidad_productiva;
      //   //buscando pago
      //   if (fila.formulario.costo.length > 0) {
      //     pago = fila.formulario.costo.filter(function(x){
      //       if (x.tipo === fila.tipo) {
      //         return x.categoria === fila.unidad_productiva.categorizacion;
      //       }
      //     });
      //   }
      //   delete fila.dataValues.unidad_productiva;
      //   devolver.push({Registro: fila, unidad_productiva: uP, pago: pago});
      // });
      // if (respuesta.rows) {
      //   respuesta.rows = devolver;
      // } else {
      //   respuesta = devolver;
      // }
      deferred.resolve(respuesta);
    })
    .catch(error => deferred.reject(error));
    return deferred.promise;
  };

  // const listarSolicitadosDuplicados = (query, body) => {
  //   const deferred = Q.defer();
  //   const parametros = query;
  //   const whereUnidadProductiva = {};
  //   let RegistrosDuplicadas = [];
  //   if (body.audit_usuario.id_rol != ROL_TECNICO) {
  //     deferred.reject(new Error("No tiene permisos para revisar éstos datos."));
  //   }
  //   parametros.where = {
  //     estado: [ESTADO_PENDIENTE_PAGO, ESTADO_APROBADO, ESTADO_PAGADO],
  //     tipo: ESCALA_PAGO_TIPO_DUPLICACION,
  //   };
  //   parametros.attributes = ['tipo', 'lote_duplicado', 'fid_Registro_origen', 'estado', '_fecha_fin', [sequelize.fn('count', sequelize.col('id_Registro')), 'duplicados']];
  //   parametros.group = ['tipo', 'lote_duplicado', 'fid_Registro_origen', 'estado', '_fecha_fin'];
  //   parametros.order = 'fid_Registro_origen DESC, lote_duplicado DESC';
  //   dao.listarRegistros(models.Registro, parametros)
  //   .then(respuesta => {
  //     RegistrosDuplicadas = respuesta;
  //     const RegistrosIds = [];
  //     respuesta.rows.forEach(cert => { RegistrosIds.push(cert.fid_Registro_origen); });
  //     const parametros2 = {
  //       where: {
  //         id_Registro: RegistrosIds,
  //       },
  //       include: [{
  //         // attributes: [],
  //         model: models.unidad_productiva,
  //         as: 'unidad_productiva',
  //         where: whereUnidadProductiva,
  //         include: [{
  //           required: false,
  //           model: models.parametro,
  //           as: 'tipo_societario',
  //           attributes: ["sigla", "nombre", "descripcion"],
  //         },{
  //           required: false,
  //           model: models.parametro,
  //           as: 'tipo_organizacion',
  //           attributes: ["sigla", "nombre", "descripcion"],
  //         },{
  //           required: false,
  //           model: models.ubicacion,
  //           as: 'ubicaciones',
  //           attributes: ['id_ubicacion_unidad_productiva'],
  //           include: [{
  //             model: models.departamento,
  //             as: 'departamento',
  //             attributes: ['descripcion'],
  //           }],
  //         },{
  //           required: false,
  //           model: models.persona,
  //           as: 'persona_representante',
  //           attributes: ["id_persona", "nombre_completo"],
  //         }],
  //       }, {
  //         model: models.formulario,
  //         attributes: ["ambito", "tipo", "nombre", "descripcion", "nro_cuenta", "plazo_dias", "secciones"],
  //         as: 'formulario',
  //         where: {
  //           ambito: query.ambito,
  //         },
  //       }],
  //     };
  //     return dao.listarRegistros(models.Registro, parametros2);
  //   })
  //   .then(respuesta => {
  //     const devolver = [];
  //     let pago = {};
  //     RegistrosDuplicadas.rows.forEach(certDup => {
  //       let detalle = respuesta.filter(item => item.id_Registro == certDup.fid_Registro_origen);
  //       detalle = detalle[0];
  //       const uP = detalle.unidad_productiva;
  //       //buscando pago
  //       if (fila.formulario.costo.length > 0) {
  //         pago = fila.formulario.costo.filter(function(x){
  //           if (x.tipo === fila.tipo) {
  //             return x.categoria === fila.unidad_productiva.categorizacion;
  //           }
  //         });
  //       }
  //       delete detalle.dataValues.unidad_productiva;
  //       certDup.dataValues.formulario = detalle.formulario;
  //       certDup = {Registro: certDup, unidad_productiva: uP, pago: pago};
  //       devolver.push(certDup);
  //     });
  //     RegistrosDuplicadas.rows = devolver;
  //     RegistrosDuplicadas.count = devolver.length;
  //     deferred.resolve(RegistrosDuplicadas);
  //   })
  //   .catch(error => deferred.reject(error));
  //   return deferred.promise;
  // };

  // const observarRegistro = (id_Registro, body) => {
  //   const deferred = Q.defer();
  //   let RegistroObj = {};
  //   const unidadProductivaObj = {};
  //   obtenerRegistroPorId(id_Registro, body)
  //   .then(respuesta => {
  //     if (respuesta && respuesta.Registro.estado === ESTADO_ENVIADO) {
  //       RegistroObj = respuesta;
  //       return respuesta;
  //     }
  //     else
  //     throw new Error("No es posible observar una declaración que no tenga el estado ENVIADO.");
  //   })
  //   .then(Registro => observarRegistro(models.Registro, Registro.Registro.id_Registro, body))
  //   .then(Registro => buscarUsuario(id_Registro))
  //   .then(usuario => enviarCorreoObservacion(usuario, body, RegistroObj))
  //   .then(Registro => dao.obtenerRegistroPorId(models.Registro, id_Registro))
  //   .then(Registro => deferred.resolve(Registro))
  //   .catch(error => deferred.reject(error));
  //   return deferred.promise;
  // };

  // const generarCodigoCertificado = (idFormulario) => {
  //   const deferred = Q.defer();
  //   const parametros = {
  //     where: {
  //       estado: ESTADO_APROBADO,
  //     },
  //   };
  //   dao.contarRegistros(models.Registro, parametros)
  //   .then(respuesta => {
  //     deferred.resolve(respuesta + 1);
  //   })
  //   .catch(error => deferred.reject(error));
  //   return deferred.promise;

  // };

  // const obtenerCertificadoEscala = (idRegistro) => {
  //   const deferred = Q.defer();
  //   const pagoBL = app.src.bls.ddjj.pagoBL;
  //   pagoBL.validarEscalaPago(idRegistro, null, ESTADO_PENDIENTE_PAGO, true, true)
  //   .then(respuesta => deferred.resolve(respuesta))
  //   .catch(error => deferred.reject(error));
  //   return deferred.promise;
  // };

  // const observarRegistro = (model, id_Registro, body) => {
  //   const deferred = Q.defer();
  //   let observarSecciones = null;
  //   if (body.audit_usuario.id_rol === ROL_ADMINISTRADOR || body.audit_usuario.id_rol === ROL_TECNICO){
  //     body.observaciones_secciones.forEach((item, value) => {
  //       if (!observarSecciones)
  //         observarSecciones = item;
  //       else
  //       observarSecciones = `${observarSecciones}#${item}`;
  //     });
  //     sequelize.transaction().then((transaction) => {
  //       model.update({
  //         observaciones: body.observaciones,
  //         observaciones_secciones: observarSecciones,
  //         estado: ESTADO_OBSERVADO,
  //         _usuario_observacion: body.audit_usuario.id_usuario,
  //       },{
  //         where: {
  //           id_Registro,
  //         },
  //       }).then(Registro => {
  //         transaction.commit();
  //         deferred.resolve(Registro);
  //       }).catch( error => {
  //         transaction.rollback();
  //         deferred.reject(error);
  //       });
  //     });
  //   } else {
  //     deferred.reject(new Error("No tiene suficientes privilegios para poder observar la declaración jurada."));
  //   }
  //   return deferred.promise;
  // };

  // const buscarUsuario = (id_Registro) => {
  //   const deferred = Q.defer();
  //   models.Registro.findOne({
  //     include: [{
  //       model: models.unidad_productiva,
  //       as: 'unidad_productiva',
  //       include: [{
  //         model: models.usuario,
  //         as: 'usuario',
  //       }],
  //     }],
  //     where: {
  //       id_Registro,
  //     },
  //   }).then(usuario => {
  //     deferred.resolve(usuario.unidad_productiva.usuario);
  //   })
  //   .catch(error => deferred.reject(error));
  //   return deferred.promise;
  // };

  // const enviarCorreoObservacion = (usuario, body, Registro) => {
  //   const deferred = Q.defer();
  //   let data = {};
  //   let correoEnviar = {};
  //   models.plantilla.findOne({
  //     where: {
  //       nombre: PLANTILLA_Registro_OBSERVAR,
  //     },
  //   })
  //   .then(plantilla => {
  //     const template = handlebars.compile(plantilla.contenido);
  //     const detalles = body.observaciones_secciones;
  //     data = {
  //       nombre: usuario.usuario,
  //       detalles,
  //       observaciones: body.observaciones,
  //       formulario: Registro.Registro.formulario.nombre,
  //       tipo: Registro.Registro.tipo,
  //       urlSistema: `${config.app.urlSistema}`,
  //     };
  //     correoEnviar = {
  //       remitente: plantilla.remitente,
  //       origen: plantilla.origen,
  //       modo: 'html',
  //       mensaje: template(data),
  //       correos: [usuario.email],
  //       asunto: plantilla.asunto,
  //     };
  //     models.notificaciones(correoEnviar);
  //     deferred.resolve(true);
  //   })
  //   .catch(error => deferred.reject(error));
  //   return deferred.promise;
  // };

  // const enviarCorreoAprobacion = (usuario, ambito, body, nombrePlantilla) => {
  //   const deferred = Q.defer();
  //   let correoEnviar = {};
  //   const parametros = {
  //     where: {
  //       nombre: nombrePlantilla || PLANTILLA_Registro_APROBAR,
  //     },
  //   };
  //   plantillaBL.obtenerPlantilla(parametros, models)
  //   .then(plantilla => {
  //     const template = handlebars.compile(plantilla.contenido);
  //     const data = {
  //       ambito,
  //     };
  //     correoEnviar = {
  //       remitente: plantilla.remitente,
  //       origen: plantilla.origen,
  //       modo: 'html',
  //       mensaje: template(data),
  //       correos: [usuario.email],
  //       asunto: `${plantilla.asunto} - ${ambito}`,
  //     };
  //     models.notificaciones(correoEnviar);
  //     deferred.resolve(true);
  //   })
  //   .catch(error => deferred.reject(error));
  //   return deferred.promise;
  // };

  // const enviarCorreoNotificacion = (usuario, ambito, body, formularioRes, montoValidar) => {
  //   const deferred = Q.defer();
  //   let correoEnviar = {};
  //   const parametros = {
  //     where: {
  //       nombre: usuario.nit ? PLANTILLA_Registro_NOTIFICAR_CON_NIT : PLANTILLA_Registro_NOTIFICAR_SIN_NIT,
  //     },
  //   };
  //   plantillaBL.obtenerPlantilla(parametros, models)
  //   .then(plantilla => {
  //     const template = handlebars.compile(plantilla.contenido);
  //     const data = {
  //       ambito,
  //       cuenta: formularioRes.nro_cuenta,
  //       monto: montoValidar,
  //       urlSistema: `${config.app.urlSistema}`,
  //     };
  //     correoEnviar = {
  //       remitente: plantilla.remitente,
  //       origen: plantilla.origen,
  //       modo: 'html',
  //       mensaje: template(data),
  //       correos: [usuario.email],
  //       asunto: `${plantilla.asunto} - ${ambito}`,
  //     };
  //     models.notificaciones(correoEnviar);
  //     deferred.resolve(true);
  //   })
  //   .catch(error => deferred.reject(error));
  //   return deferred.promise;
  // };

  // const validarDetalles = (id_Registro, categorizacion, formularioObj, estado) => {
  //   const deferred = Q.defer();
  //   const activoProductivoBL = app.src.bls.ddjj.activo_productivoBL;
  //   const actividadEconomicaBL = app.src.bls.ddjj.actividad_economicaBL;
  //   const ubicacionBL = app.src.bls.ddjj.ubicacionBL;
  //   const pagoBL = app.src.bls.ddjj.pagoBL;

  //   // Validar que existan activos productivos (no importa cuántos, siempre que sean más que cero)
  //   activoProductivoBL.listarActivosProductivos(id_Registro)
  //   .then(respuestaActivoProductivo =>
  //     // if(util.isUndefined(respuestaActivoProductivo)) {
  //     //   throw new Error(`No se puede procesar la Declaración Jurada porque no se han registrado Activos Productivos`);
  //     // }
  //     // if (respuestaActivoProductivo.length <= 0) {
  //     //   throw new Error(`No se puede procesar la Declaración Jurada porque no se han registrado Activos Productivos`);
  //     // }
  //      actividadEconomicaBL.listarActividadesEconomicas(id_Registro)
  //   )
  //   .then(respuestaActividadEconomica => {
  //     if (formularioObj.tipo != FORMULARIO_TIPO_ICAP && formularioObj.tipo !== FORMULARIO_TIPO_SHB_UNIDAD ) {
  //       if(util.isUndefined(respuestaActividadEconomica)) {
  //         throw new Error(`No se puede procesar la Declaración Jurada porque no se han registrado Actividades Económicas`);
  //       }
  //       if (respuestaActividadEconomica.length <= 0) {
  //         throw new Error(`No se puede procesar la Declaración Jurada porque no se han registrado Actividades Económicas`);
  //       }
  //     }
  //     if (respuestaActividadEconomica.length > 2) {
  //       throw new Error(`No se puede procesar la Declaración Jurada porque se han registrado más de dos Actividades Económicas`);
  //     }
  //     return ubicacionBL.listarUbicaciones(id_Registro);
  //   })
  //   .then(respuestaUbicacion => {
  //     if(util.isUndefined(respuestaUbicacion)) {
  //       throw new Error(`No se puede procesar la Declaración Jurada porque no se han registrado Ubicaciones de la Unidad Productiva`);
  //     }
  //     if (respuestaUbicacion.length <= 0) {
  //       throw new Error(`No se puede procesar la Declaración Jurada porque no se han registrado Ubicaciones de la Unidad Productiva`);
  //     }
  //     return pagoBL.listarPagos(id_Registro, categorizacion);
  //   })
  //   .then(respuestaPagos => {
  //     if(util.isUndefined(respuestaPagos) && estado === ESTADO_APROBADO) {
  //       throw new Error(`No se puede procesar la Declaración Jurada porque no se han registrado el o los Pagos requeridos`);
  //     }
  //     if (respuestaPagos.length <= 0 && estado === ESTADO_APROBADO) {
  //       throw new Error(`No se puede procesar la Declaración Jurada porque no se han registrado el o los Pagos requeridos`);
  //     }
  //     return pagoBL.validarEscalaPago(id_Registro, categorizacion, estado);
  //   })
  //   .then(respuestaValidacionPago => deferred.resolve(respuestaValidacionPago))
  //   .catch(error => deferred.reject(error));
  //   return deferred.promise;
  // };

  const declaracion_juradaBL = {
    // crearRegistro,
    // modificarRegistro,
    // enviarRegistro,
    // notificarRegistro,
    // pagarRegistro,
    listarRegistros,
    // obtenerRegistroActivaPROBOLIVIA,
    // obtenerRegistroPorId,
    // validarRegistroPROBOLIVA,
    // observarRegistro,
    // aprobarRegistro,
    // eliminarRegistro,
    // validarRegistro,
    // obtenerCertificadoEscala,
    // generarCodigoCertificado,
    // listarSolicitadosDuplicados,
  };

  return declaracion_juradaBL;
};
