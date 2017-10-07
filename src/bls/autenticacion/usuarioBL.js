/**
 * Lógica del Negocio -> ParametroBL
 */

const dao = require('../../dao/dao');
const Q = require('q');
// const personaBL = require('./personaBL');
// const plantillaBL = require('../parametros/plantillaBL');
const usuario_rolBL = require('./usuario_rolBL');
// const serviciosWebBL = require('../serviciosWeb/serviciosWebBL');
const autenticacionBL = require('./autenticacionBL');
const handlebars = require('handlebars');
// const config = require('konfig')();
const util = require('../../libs/util');
import moment from 'moment';
import crypto from 'crypto';

// const crearUsuario = (body, models) => {
//   const deferred = Q.defer();
//   const usuarioObj = body.usuario;
//   delete usuarioObj.contrasena;
//   if (!usuarioObj.persona && usuarioObj.fid_persona) {
//     usuarioObj.persona = {
//       id_persona: usuarioObj.fid_persona,
//     }
//   }
//   usuarioObj.usuario = usuarioObj.email;
//   let usuarioGuardado = {};
//   models.sequelize.transaction().then((transaccion) => {
//     usuarioObj._usuario_creacion = body.audit_usuario.id_usuario;
//     personaBL.modificarPersona(usuarioObj.persona.id_persona, usuarioObj.persona, models, body, transaccion)
//     .then(respuesta => validarUsuarioCrear(usuarioObj, body, models))
//     .then(respuesta => dao.crearRegistro(models.usuario, respuesta, false, transaccion))
//     .then(respuesta => {
//       usuarioGuardado = respuesta;
//       return usuario_rolBL.registrarUsuarioRol(respuesta.id_usuario, usuarioObj.fid_rol, body, models, transaccion)
//     })
//     .then(respuesta => transaccion.commit() )
//     .then(respuesta => notificarEvento(usuarioGuardado.id_usuario, models, body, PLANTILLA_USUARIO_REGISTRO, ESTADO_PENDIENTE, cargarDataRegistro) )
//     .then(respuesta => {
//       delete usuarioGuardado.dataValues.contrasena;
//       deferred.resolve(usuarioGuardado);
//     })
//     .catch(error => {
//       transaccion.rollback();
//       deferred.reject(error)
//     });
//   });
//   return deferred.promise;
// };

const modificarUsuario = (id, body, models) => {
  const deferred = Q.defer();
  const personaObj = {};
  let modificarObj = {};
  if (body.usuario && !util.isDefined(body.usuario.alta)) {
    models.sequelize.transaction().then((transaccion) => {
      obtenerUsuarioPorId(id, models, null, body)
      .then(respuesta => {
        const usuarioObj = {
          id_usuario: respuesta.id_usuario,
          email: body.usuario.email ? body.usuario.email : respuesta.dataValues.email,
          fid_rol: body.usuario.fid_rol,
          _usuario_modificacion: body.audit_usuario.id_usuario,
        }
        return validarUsuarioCrear(usuarioObj, body, models)
      })
      .then(respuesta => dao.modificarRegistro(models.usuario, id, respuesta, transaccion))
      .then(respuesta => {
        modificarObj = respuesta;
        return usuario_rolBL.eliminarUsuarioRol(modificarObj.id_usuario,  body.usuario.fid_rol, models, transaccion)
      })
      .then(respuesta => {
        return usuario_rolBL.registrarUsuarioRol(modificarObj.id_usuario,  body.usuario.fid_rol, body, models, transaccion)
      })
      .then(respuesta => {
        transaccion.commit();
        deferred.resolve(modificarObj)
      })
      .catch(error => {
        transaccion.rollback();
        deferred.reject(error)
      });
    });
  } else {
    if (body.usuario.alta) {
      modificarObj.estado = ESTADO_ACTIVO;
    } else {
      modificarObj.estado = ESTADO_INACTIVO;
    }
    obtenerUsuarioPorId(id, models, {}, body)
    .then(respuesta => {
      if (!respuesta) {
        throw new Error("No se ha encontrado al usuario solicitado.");
      } else if (respuesta && respuesta.estado == ESTADO_PENDIENTE) {
        throw new Error(`No puede realizar acciones sobre un usuario en estado ${ESTADO_PENDIENTE}.`);
      }
      return dao.modificarRegistro(models.usuario, id, modificarObj)
    }).then(respuesta => deferred.resolve(respuesta))
    .catch(error => deferred.reject(error));
  }
  return deferred.promise;
};

// const reenviarActivacion = (body, models) => {
//   const deferred = Q.defer();
//   const usuario = body.usuario;
//   if (usuario && usuario.id_usuario) {
//     const contrasenaEnviar = `${Math.trunc(Math.random() * 99999999).toString()}${moment(new Date())}`;
//     notificarEvento(usuario.id_usuario, models, body, PLANTILLA_USUARIO_REGISTRO, ESTADO_PENDIENTE, cargarDataRegistro)
//     .then(respuesta => deferred.resolve(respuesta))
//     .catch(error => deferred.reject(error));
//   } else {
//     deferred.reject(new Error("No se ha encontrado el usuario correspondiente."));
//   }
//   return deferred.promise;
// }

// const cambiarContrasena = (body, models) => {
//   const deferred = Q.defer();
//   const audit_usuario = body.audit_usuario;
//   const id_usuario = audit_usuario.id_usuario;

//   if (audit_usuario.nit) {
//     deferred.reject(new Error('No se puede cambiar la contraseña de un usuario que tiene acceso por Interoperabilidad.'));
//     return deferred.promise;
//   }
//   if (!body.contrasena || !body.contrasena_nueva) {
//     deferred.reject(new Error('Debe ingresa su contraseña actual y su contraseña nueva.'));
//   }
//   else if (body.contrasena_nueva.length < 8) {
//     deferred.reject(new Error('La contraseña debe contar con al menos 8 caracteres.'));
//   } else {
//     const password = crypto.createHash("sha256").update(body.contrasena).digest("hex");
//     obtenerUsuario( { where: { id_usuario, contrasena: password } } , models)
//     .then(usuario => {
//       if (usuario) {
//         return usuario;
//       } else {
//         throw new Error("Los datos de acceso no coinciden.");
//       }
//     })
//     .then((usuario) => {
//       const usuarioModificar = {
//         contrasena: body.contrasena_nueva,
//         _usuario_modificacion: audit_usuario.id_usuario,
//       };
//       return dao.modificarRegistro(models.usuario, usuario.id_usuario, usuarioModificar);
//     }).then((respuesta) => {
//       const respuestaUsuario = {
//         id_usuario: respuesta.id_usuario,
//         usuario: respuesta.usuario,
//       };
//       deferred.resolve(respuestaUsuario);
//     })
//     .catch(error => deferred.reject(error));
//   }
//   return deferred.promise;
// }

// const recuperarCuenta = (body, models) => {
//   const deferred = Q.defer();
//   obtenerUsuario({ where: { usuario: body.usuario } }, models)
//   .then(result => {
//     if (result && result.estado === ESTADO_ACTIVO) {
//       return result;
//     } else if (result) {
//       deferred.reject(new Error('El usuario enviado no se encuentra ACTIVO, por lo que no puede cambiar la contraseña.'));
//     } else {
//       deferred.reject(new Error('Ninguno de los usuarios coincide con los datos enviados.'));
//     }
//   }).then(result => notificarEvento(result.dataValues.id_usuario, models, body, PLANTILLA_USUARIO_RECUPERAR, ESTADO_ACTIVO, cargarDataRecuperar))
//   .then(result => deferred.resolve({ usuario: body.username }))
//   .catch(error => deferred.reject(error));
//   return deferred.promise;
// }

const listarUsuarios = (query, body, models) => {
  const deferred = Q.defer();
  let parametros = {};
  let paginado = false;
  query.where = [];
  if (Object.keys(query).length != 0) {
    if (query.filter) {
      query.where.push({
        $or: [
          models.sequelize.literal(`"usuario" ILIKE '%${query.filter}%'`),
          models.sequelize.literal(`"persona"."documento_identidad" ILIKE '${query.filter}%'`),
          models.sequelize.literal(`"persona"."nombres" ILIKE '${query.filter}%'`),
          models.sequelize.literal(`"persona"."primer_apellido" ILIKE '${query.filter}%'`),
          models.sequelize.literal(`"persona"."segundo_apellido" ILIKE '${query.filter}%'`),
        ],
      });
    }
    parametros = query;
    paginado = true;
  }
  parametros.attributes = ["id_usuario", "usuario", "email", "estado", "fid_persona"];
  parametros.order = 'usuario';
  parametros.distinct = true; // agrega la opción DISTINCT a count
  parametros.include = [{
    model: models.persona,
    as: 'persona',
    attributes: ['id_persona', 'documento_identidad', 'nombres', 'primer_apellido', 'segundo_apellido', 'nombre_completo', 'genero', 'direccion'],
  },{
    model: models.usuario_rol,
    as: 'usuarios_roles',
    attributes: ['fid_rol', 'fid_usuario'],
    required: true,
    include: [{
      model: models.rol,
      as: 'rol',
      attributes: ['id_rol', 'nombre'],
    }],
    where: {fid_rol: {$ne: ROL_UNIDAD_PRODUCTIVA}},
  }];
  dao.listarRegistros(models.usuario, parametros, paginado)
  .then(respuesta => {
    const usuarios = respuesta.rows ? respuesta.rows : respuesta;
    usuarios.forEach(usuario => {
      if (usuario && usuario.usuarios_roles && usuario.usuarios_roles.length > 0) {
        usuario.dataValues.fid_rol = usuario.usuarios_roles[0].fid_rol;
      }
    });
    if (respuesta && respuesta.rows) {
      respuesta.rows = usuarios;
    } else {
      respuesta = usuarios;
    }
    deferred.resolve(respuesta)
  })
  .catch(error => deferred.reject(error));
  return deferred.promise;
};

const obtenerUsuarioPorId = (id, models, parametros, body) => {
  const deferred = Q.defer();
  if (!parametros) {
    parametros = {};
    parametros.attributes = ["id_usuario", "usuario", "email",  "estado", "fid_persona"];
    parametros.include = [{
      model: models.persona,
      as: 'persona',
      attributes: ['id_persona', 'documento_identidad', 'nombres', 'primer_apellido', 'segundo_apellido', 'nombre_completo', 'genero', 'direccion'],
      required: false,
    },{
      model: models.usuario_rol,
      as: 'usuarios_roles',
      attributes: ['fid_rol', 'fid_usuario'],
      required: true,
      include: [{
        model: models.rol,
        as: 'rol',
        attributes: ['id_rol', 'nombre'],
      }],
    }];
  }
  dao.obtenerRegistroPorId(models.usuario, id, parametros)
  .then(respuesta => {
    if (respuesta && respuesta.usuarios_roles && respuesta.usuarios_roles.length > 0) {
      respuesta.dataValues.rol = respuesta.usuarios_roles[0].rol;
    }
    if (respuesta) {
      deferred.resolve(respuesta)
    } else {
      throw new Error("No existe el usuario solicitado.");
    }
  })
  .catch(error => deferred.reject(error));
  return deferred.promise;
};

const obtenerUsuario = (parametros, models) => {
  const deferred = Q.defer();
  dao.obtenerRegistro(models.usuario, parametros)
  .then(respuesta => {
    deferred.resolve(respuesta);
  })
  .catch(error => deferred.reject(error));
  return deferred.promise;
};

// const activarUsuario = (body, models) => {
//   const deferred = Q.defer();
//   const fecha = new Date();
//   const parametros = {
//     where: {
//       usuario: body.usuario,
//       codigo_contrasena: body.codigo,
//       $or: [{
//         fecha_expiracion: {
//           $gt: fecha,
//         },
//       }, {
//         estado: {
//           $eq: 'PENDIENTE',
//         },
//       },
//     ],
//     },
//   };
//   obtenerUsuario(parametros, models)
//   .then(result => {
//     if (result) {
//       if (body.contrasena.length < 8) {
//         throw new Error('La contraseña debe contar con al menos 8 caracteres.');
//       }
//       const usuario = JSON.parse(JSON.stringify(result.dataValues));
//       usuario.estado = ESTADO_ACTIVO;
//       usuario.contrasena = body.contrasena;
//       usuario.codigo_contrasena = null;
//       usuario.fecha_expiracion = null;
//       return result.updateAttributes(usuario).then((usuario));
//     } else {
//       throw new Error("No se ha encontrado el usuario enviado. Es posible que el Código sea incorrecto o haya expirado.");
//     }
//   }).then(result => deferred.resolve({email: result.email})
//   ).catch(error => deferred.reject(error));
//   return deferred.promise;
// };

const validarUsuarioCrear = (usuarioObj, body, models) => {
  const deferred = Q.defer();
  if (usuarioObj.fid_rol === ROL_UNIDAD_PRODUCTIVA) {
    deferred.reject(new Error("No se puede crear usuarios con rol UNIDAD PRODUCTIVA a través del administrador del sistema."));
    return deferred.promise;
  }
  if (body.audit_usuario.id_rol !== ROL_ADMINISTRADOR) {
    deferred.reject(new Error("No tiene privilegios para crear usuarios."));
    return deferred.promise;
  }
  if (!usuarioObj.fid_rol) {
    deferred.reject(new Error("Debe seleccionar un rol para el usuario."));
    return deferred.promise;
  }
  const parametros = {
    where: {
      id_usuario: {
        $not: usuarioObj.id_usuario,
      },
      fid_persona: usuarioObj.fid_persona,
      estado: [ESTADO_PENDIENTE, ESTADO_ACTIVO],
    },
    attributes: ['id_usuario'],
  };

  obtenerUsuario(parametros, models)
  .then(respuesta => {
    if (respuesta && respuesta.id_usuario) {
      throw new Error("Ya existe un usuario ACTIVO asociado a la persona seleccionada. Por favor verifique sus datos.");
    } else {
      const parametrosEmail = {
        where: {
          id_usuario: { $not: usuarioObj.id_usuario},
          email: usuarioObj.email,
          estado: [ESTADO_PENDIENTE, ESTADO_ACTIVO],
        },
        include:[{
          required: true,
          model: models.usuario_rol, as: 'usuarios_roles',
          where: {fid_rol:{$ne: ROL_UNIDAD_PRODUCTIVA}},
        }],
        attributes: ['id_usuario'],
      };
      return obtenerUsuario(parametrosEmail, models)

    }
  })
  .then(respuesta => {
    if (respuesta && respuesta.id_usuario) {
      throw new Error(`Ya existe un usuario registrado con el correo electrónico ${usuarioObj.email}.`);
    } else {
      return usuarioObj;
    }
  })
  .then(respuesta => deferred.resolve(respuesta))
  .catch(error => deferred.reject(error));
  return deferred.promise;
}

// function notificarEvento(id_usuario, models, body, plantilla, estadoValido, cargarData) {
//   const nombrePlantilla = plantilla || PLANTILLA_USUARIO_REGISTRO;
//   const deferred = Q.defer();
//   let usuarioAEnviar = {};
//   const parametrosUsuario = {
//     attributes: ["id_usuario", "usuario", "contrasena", "email", "codigo_contrasena", "estado", [models.sequelize.literal(`to_char(fecha_expiracion, 'DD "DE" TMMONTH "DEL" YYYY')`), 'fecha_expiracion']],
//     include: [{
//       model: models.persona,
//       as: 'persona',
//       attributes: ["nombres", "primer_apellido", "segundo_apellido", "genero"],
//     }],
//   };

//   const contrasenaEnviar = `${Math.trunc(Math.random() * 99999999).toString()}${moment(new Date())}`;
//   const usuarioModificar = {};
//   usuarioModificar.codigo_contrasena = contrasenaEnviar;
//   const fecha = new Date();
//   fecha.setDate(fecha.getDate() + 1);
//   usuarioModificar.fecha_expiracion = fecha;
//   if (body && body.audit_usuario) {
//     usuarioModificar._usuario_modificacion = body.audit_usuario.id_usuario;
//   }
//   dao.modificarRegistro(models.usuario, id_usuario, usuarioModificar)
//   .then(respuesta => obtenerUsuarioPorId(id_usuario, models, parametrosUsuario, body))
//   .then(respuesta => {
//     if (respuesta && respuesta.estado === estadoValido) {
//       usuarioAEnviar = respuesta;
//       return respuesta;
//     } else {
//       return null;
//     }
//   }).then(respuesta => {
//     if (respuesta) {
//       const parametros = {
//         where: {
//           nombre: nombrePlantilla,
//           estado: ESTADO_ACTIVO,
//         },
//         attributes: ['remitente', 'origen', 'asunto', ['contenido', 'mensaje']],
//       };
//       return plantillaBL.obtenerPlantilla(parametros, models)
//     } else {
//       return null;
//     }
//   }).then(respuesta => {
//     if (respuesta) {
//       respuesta.dataValues.modo = 'html';
//       respuesta.dataValues.correos = [usuarioAEnviar.email];
//       const template = handlebars.compile(respuesta.dataValues.mensaje);
//       const data = cargarData(usuarioAEnviar, contrasenaEnviar);
//       respuesta.dataValues.mensaje = template(data);
//       models.notificaciones(respuesta.dataValues);
//       return respuesta;
//     } else {
//       throw new Error(`No se encuentra la plantilla de Registro de Usuarios`);
//     }
//   })
//   .then(respuesta => {
//     deferred.resolve(respuesta);
//   }).catch(error => deferred.reject(error));

//   return deferred.promise;
// }

// const cargarDataRegistro = function (usuarioAEnviar, contrasenaEnviar) {
//   const data = {
//     nombre: (`${usuarioAEnviar.persona.nombres} ${usuarioAEnviar.persona.primer_apellido} ${usuarioAEnviar.persona.segundo_apellido}`).trim(),
//     usuario: usuarioAEnviar.usuario,
//     contrasena: contrasenaEnviar,
//     urlSistemaActivacion: `${config.app.urlActivacion}?codigo=${contrasenaEnviar}&usuario=${usuarioAEnviar.usuario}`,
//     urlSistema: `${config.app.urlLoginAdmin}`,
//   };
//   return data;
// }

// const cargarDataRecuperar = function (usuarioAEnviar, contrasenaEnviar) {
//   const data = {
//     nombre: (`${usuarioAEnviar.persona.nombres} ${usuarioAEnviar.persona.primer_apellido} ${usuarioAEnviar.persona.segundo_apellido}`).trim(),
//     contrasena: contrasenaEnviar,
//     urlSistemaRecuperar: `${config.app.urlRecuperar}?usuario=${usuarioAEnviar.usuario}&codigo=${contrasenaEnviar}`,
//     urlSistema: `${config.app.urlLoginAdmin}`,
//   };
//   return data;
// }

// const confirmarUsuario = (id, body) => {
//   const app = require('../../../index.js');
//   const models = app.src.db.models;
//   const deferred = Q.defer();
//   const idUsuario = id;
//   const usuarioObj = {};
//   usuarioObj.email = body.email;
//   usuarioObj.estado = ESTADO_ACTIVO;
//   usuarioObj._usuario_modificacion = body.audit_usuario.id_usuario;
//   const codigo = body.codigo_activacion;

//   dao.obtenerRegistroPorId(models.usuario, idUsuario)
//   .then(respuestaUsuario => {
//     if(util.isUndefined(usuarioObj.email)) {
//       throw new Error('Datos incompletos para la solicitud: falta el parámetro email');
//     }
//     if(util.isUndefined(codigo)) {
//       throw new Error('Datos incompletos para la solicitud: falta el código de activación');
//     }

//     if (respuestaUsuario.estado !== ESTADO_PENDIENTE) {
//       throw new Error(`El usuario ${respuestaUsuario.usuario} ya se encuentra activo en el sistema.`);
//     }
//     if (respuestaUsuario.codigo_contrasena !== codigo) {
//       throw new Error(`El código de activación para el usuario ${respuestaUsuario.usuario} es incorrecto. Por favor, revise nuevamente la bandeja de entrada de su correo electrónico o vuelva a enviar un correo de activación.`);
//     }
//     if (respuestaUsuario.email !== usuarioObj.email) {
//       throw new Error(`El email ${usuarioObj.email} es diferente al email ${respuestaUsuario.email} al que se ha enviado el código de activación. Por favor, verifique sus datos.`);
//     }
//     return dao.modificarRegistro(models.usuario, idUsuario, usuarioObj)
//   })
//   .then(respuesta => {
//     if(util.isUndefined(respuesta)) {
//       throw new Error(`No se encuentra al usuario con email ${usuarioObj.email} para ser confirmado. Por favor, revise sus datos.`);
//     }
//     const cuerpoObj = {
//       nit: respuesta.nit,
//       usuario: respuesta.usuario,
//       contrasena: respuesta.contrasena,
//       email: respuesta.email,
//     };
//     return autenticacionBL.obtenerDatos(cuerpoObj, app);

//   })
//   .then(respuesta => deferred.resolve(respuesta))
//   .catch(error =>  {
//     deferred.reject(error)
//   });
//   return deferred.promise;
// };

// const obtenerEmpresas = (id, body, models) => {
//   const deferred = Q.defer();
//   if (util.isUndefined(id)) {
//     deferred.reject(new Error('Datos de la solicitud icompletos: falta ingresar el identificador del usuario'));
//     return deferred.promise;
//   }
//   dao.obtenerRegistro(models.usuario, {where: {id_usuario: id, estado: ESTADO_ACTIVO}})
//   .then(respuestaUsuario => {
//     if (util.isUndefined(respuestaUsuario)) {
//       throw new Error('El usuario que solicita las matriculas no existe o se encuentra INACTIVO en el Sistema');
//     }
//     const parametros = {
//       attributes:['id_empresa', 'nit', 'razon_social', 'matricula_comercio', 'fid_usuario'],
//     };
//     return respuestaUsuario.getEmpresas(parametros)
//   })
//   .then(respuesta => deferred.resolve(respuesta))
//   .catch(error => deferred.reject(error));
//   return deferred.promise;
// };

const verificarExistencia = (paraCrear, body, models) => {
  const deferred = Q.defer();
  const parametros = {};
  if (paraCrear) {
    //verifica usuario y email
    //devuelve error o false
    verificarUsuario(paraCrear, body, models)
    .then(respuesta => {
      return verificarEmail(paraCrear, body, models)
    })
    .then(respuesta => deferred.resolve(false))
    .catch(error => deferred.reject(error));
  } else {
    //tengo usuario o email
    //si usuario => verifica usuario
    //si email => verifica email
    //Devuelve usuario obtenido o false
    if (body.usuario) {
      verificarUsuario(paraCrear, body, models)
      .then(respuesta => deferred.resolve(respuesta))
      .catch(error => deferred.reject(error));
    } else {
      if (body.email) {
        verificarEmail(paraCrear, body, models)
        .then(respuesta => deferred.resolve(respuesta))
        .catch(error => deferred.reject(error));
      } else {
        deferred.reject(new Error('Solicitud incompleta: falta ingresar usuario o correo electronico'));
        return deferred.promise;
      }
    }
  }
  return deferred.promise;
};

const verificarUsuario = (paraCrear, body, models) => {
  const deferred = Q.defer();
  if (util.isUndefined(body.usuario)) {
    deferred.reject(new Error('Solicitud incompleta: falta ingresar usuario'));
    return deferred.promise;
  }
  const parametros = {};
  parametros.where = {};
  parametros.where = {usuario: body.usuario};
  const mensajeError = `Ya existe registrado el usuario ${body.usuario}`;
  obtenerUsuario(parametros, models)
  .then(respuesta => {
    if(respuesta) {
      if(paraCrear){
        deferred.reject(new Error(mensajeError));
        return deferred.promise;
      } else
        deferred.resolve(respuesta);
    } else {
      deferred.resolve(false);
    }
  })
  .catch(error => deferred.reject(error));
  return deferred.promise;
};

const verificarEmail = (paraCrear, body, models) => {
  const deferred = Q.defer();
  if (util.isUndefined(body.email)) {
    deferred.reject(new Error('Solicitud incompleta: falta ingresar correo electrónico'));
    return deferred.promise;
  }
  const parametros = {};
  parametros.where = {};
  parametros.where = {email: body.email};
  const mensajeError = `Ya existe registrado el correo ${body.email}`;
  obtenerUsuario(parametros, models)
  .then(respuesta => {
    if(respuesta) {
      if(paraCrear){
        deferred.reject(new Error(mensajeError));
        return deferred.promise;
      } else
        deferred.resolve(respuesta);
    } else {
      deferred.resolve(false);
    }
  })
  .catch(error => deferred.reject(error));
  return deferred.promise;
};

// const crearEmpresarioConNit = (body, app, callback) => {
//   const deferred = Q.defer();
//   if(!body.nit) {
//     deferred.reject(new Error(`No se puede crear un usuario si no se ha indicado el NIT`));
//     return deferred.promise;
//   }
//   const tieneNit = typeof(body.nit)!== "undefined" && body.nit!==null;
//   serviciosWebBL.verificaIdentidadImpuestos(body.nit, body.usuario, body.contrasena)
//   .then(respusta => crearEmpresario(body, app, callback))
//   .then(respuesta => deferred.resolve(respuesta))
//   .catch(error => deferred.reject(error));
//   return deferred.promise;
// };

const crearCargo = (body, app, callback) => {
  const usuario = body.usuario;
  const contrasena = body.contrasena || null;
  const models = app.src.db.models;
  const deferred = Q.defer();
  const idRol = body.id_rol;
  const email = body.email;
  const doc_identidad = body.documento_identidad;
  const lug_identidad = body.lugar_documento_identidad;
  let usuarioObj = {};
  if (util.isUndefined(body.email) && util.isUndefined(body.usuario)) {
    deferred.reject(new Error('Solicitud incompleta: falta ingresar correo electrónico'));
    return deferred.promise;
  }
  if (util.isUndefined(body.usuario)) {
    deferred.reject(new Error('Solicitud incompleta: falta ingresar usuario'));
    return deferred.promise;
  }
  if (util.isUndefined(body.contrasena)) {
    deferred.reject(new Error('Solicitud incompleta: falta ingresar contraseña para la cuenta'));
    return deferred.promise;
  }
  if (util.isUndefined(body.documento_identidad)) {
    deferred.reject(new Error('Solicitud incompleta: falta ingresar documento de identidad del usuario.'));
    return deferred.promise;
  }
  if (util.isUndefined(body.lugar_documento_identidad)) {
    deferred.reject(new Error('Solicitud incompleta: falta ingresar lugar del documento del usuario.'));
    return deferred.promise;
  }

  models.sequelize.transaction().then((transaccion) => {
    verificarExistencia(true, body, models)
    .then(respuesta =>  {
      const personaObj = {
        documento_identidad: doc_identidad,
        lugar_documento_identidad: lug_identidad,
        _usuario_creacion: USUARIO_ADMIN,
        // fid_usuario: usuarioObj.id_usuario,
        // _usuario_creacion: usuarioObj._usuario_creacion,
      };
      return dao.crearRegistro(models.persona, personaObj, false, transaccion)
    })
    .then(respuestaPersona => {
      usuarioObj = {
        usuario,
        _usuario_creacion: USUARIO_ADMIN,
        contrasena,
        email,
        fid_persona: respuestaPersona.id_persona,
      };
      return dao.crearRegistro(models.usuario, usuarioObj, false, transaccion);
    })
    .then(respuestaUsuario =>  {
      usuarioObj = respuestaUsuario;
      const rolObj = {
        fid_rol: idRol,
        fid_usuario: usuarioObj.id_usuario,
        _usuario_creacion: usuarioObj._usuario_creacion,
      };
      return dao.crearRegistro(models.usuario_rol, rolObj, false, transaccion)
    })
    .then(respuesta => {
      usuarioObj.dataValues.rol = respuesta.dataValues;
      usuarioObj.usuarios_roles = [];
      usuarioObj.usuarios_roles.push(respuesta.dataValues);
      const roles_menus = {
        menu: [],
        menuEntrar: '',
      };
      return callback(usuarioObj, roles_menus, app);
    })
    .then(respuesta => {
      transaccion.commit().then(res => deferred.resolve(respuesta));
    })
    .catch(error => {
      transaccion.rollback().then(res => deferred.reject(error))
    });
  })
  .catch(error => deferred.reject(error));
  return deferred.promise;
};


module.exports = {
  // crearUsuario,
  modificarUsuario,
  listarUsuarios,
  obtenerUsuario,
  // obtenerUsuarioPorId,
  // activarUsuario,
  // reenviarActivacion,
  // cambiarContrasena,
  // recuperarCuenta,
  // confirmarUsuario,
  // obtenerEmpresas,
  verificarExistencia,
  // crearEmpresarioConNit,
  crearCargo,
}
