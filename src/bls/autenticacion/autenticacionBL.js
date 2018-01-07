/**
 * Lógica del Negocio -> autenticación
 */
import crypto from 'crypto';
import jwt from 'jwt-simple';
import moment from 'moment';
const dao = require('../../dao/dao');
const util = require('../../libs/util');
const menuBL = require('../../bls/autenticacion/menuBL');
// const personaBL = require('../../bls/autenticacion/personaBL');
const usuarioBL = require('../../bls/autenticacion/usuarioBL');
// const serviciosWebBL = require('../../bls/serviciosWeb/serviciosWebBL');
// const plantillaBL = require('../parametros/plantillaBL');
const utilBL = require('../../utils/util');
const Q = require('q');
const handlebars = require('handlebars');
// const config = require('konfig')();

// const enviarCodigoConfirmacion = (nombrePlantilla, data, models) => {
//   const deferred = Q.defer();
//   let infoPlantilla = {};
//   dao.obtenerRegistro(models.plantilla, {where: {nombre: nombrePlantilla}})
//   .then(respuestaPlantilla => {
//     if(util.isUndefined(respuestaPlantilla)) {
//       throw new Error('No se encuentra la plantilla para confirmar el usuario');
//     }
//     infoPlantilla = respuestaPlantilla;
//     const primeraParte =  `00000${((Math.random() * Math.pow(36, 5) << 0).toString(36))}`;
//     const contrasenaEnviar = primeraParte.slice(-5);
//     const parametros = {
//       codigo_contrasena: contrasenaEnviar,
//       email: data.email,
//     };
//     if (!data.nit) {
//       parametros.usuario = data.email;
//     }
//     return dao.modificarRegistro(models.usuario, data.idUsuario, parametros)
//   })
//   .then(respuesta => {
//     const asunto = infoPlantilla.asunto;
//     const template = handlebars.compile(infoPlantilla.contenido);
//     data.codigo = respuesta.codigo_contrasena;
//     data.nombre = respuesta.usuario;
//     data.nit = respuesta.nit;
//     data.email = respuesta.email;
//     const correoEnviar = {
//       remitente: infoPlantilla.remitente,
//       origen: infoPlantilla.origen,
//       modo: 'html',
//       mensaje: template(data),
//       correos: [data.email],
//       asunto: infoPlantilla.asunto,
//     };
//     models.notificaciones(correoEnviar);
//     const respuestaObj = {
//       confirmacion: true,
//       id_usuario: respuesta.id_usuario,
//       estado: respuesta.estado,
//       tipo: 'ARTESANO',
//     };
//     if(process.env.NODE_ENV === 'test') {
//       deferred.resolve(respuesta)
//     } else {
//       deferred.resolve(respuestaObj)
//     }

//   })
//   .catch(error => deferred.reject(error))
//   return deferred.promise;
// };

// const validarCorreo = (idUsuario, body, models) => {
//   const deferred = Q.defer();
//   let usuario = {};
//   let data = {};
//   let nombrePlantilla;
//   const email = body.email;
//   dao.obtenerRegistroPorId(models.usuario, idUsuario)
//   .then(respuestaUsuario => {
//     if(util.isUndefined(respuestaUsuario)) {
//       throw new Error(`No existe el usuario solicitado`);
//     }
//     usuario = respuestaUsuario;
//     const tieneNit = typeof(respuestaUsuario.nit)!== "undefined" && respuestaUsuario.nit!==null;
//     if (tieneNit) {
//       data = {
//         nombre: respuestaUsuario.usuario, nit: respuestaUsuario.nit,
//       };
//       nombrePlantilla = PLANTILLA_USUARIO_CONFIRMAR_NIT;
//     } else {
//       data = {
//         nombre: respuestaUsuario.usuario,
//       };
//       nombrePlantilla = PLANTILLA_USUARIO_CONFIRMAR;
//     }
//     data.email = email;
//     data.idUsuario = respuestaUsuario.id_usuario;
//     data.nit = respuestaUsuario.nit;
//     return enviarCodigoConfirmacion(nombrePlantilla, data, models);
//   })
//   .then(respuestaPlantilla => deferred.resolve(respuestaPlantilla))
//   .catch(error => deferred.reject(error));

//   return deferred.promise;
// };

const crearCuenta = (body, app) => {
  const deferred = Q.defer();
  const models = app.src.db.models;
  body.audit_usuario = {};
  body.audit_usuario.id_usuario = USUARIO_ADMIN;
  usuarioBL.crearCargo(body, app, formarPayload)
  .then(respuesta => deferred.resolve(respuesta))
  .catch(error => {
    deferred.reject(error)
  });
  return deferred.promise;
};

const autenticar = (cuerpoObj, app) => {
  let crearRegistro = false;
  const deferred = Q.defer();
  if (!(cuerpoObj.usuario && cuerpoObj.contrasena)) { // Verficamos que mínimamente tengamos usuario y password
    deferred.reject(new Error('Los datos de Usuario y Contraseña son obligatorios.'));
    return deferred.promise;
  }
  const password = crypto.createHash("sha256").update(cuerpoObj.contrasena).digest("hex");
  cuerpoObj.contrasena = password;
  const models = app.src.db.models;
  models.sequelize = app.src.db.sequelize;
  usuarioBL.verificarExistencia(false, cuerpoObj, models) // verificamos que exista el usuario. El parámetro false indica que sólo verificará y no arrojará un error en caso de encontrar la existencia
  .then(respuestaUsuarioExiste => {
    if (respuestaUsuarioExiste) {
      return obtenerDatos(cuerpoObj, app); // Si existe el usuario y no tiene nit, obtenemos su datos de inicio de sesión
    }
    else {
      throw new Error('Credenciales no válidas'); // Si no existe el usuario y no es EMPRESARIO con NIT, entonces ingresó credenciales erróneas.
    }
  })
  .then(respuesta =>  {
    return respuesta;
  })
  .then(respuesta =>  deferred.resolve(respuesta))
  .catch(error => deferred.reject(error));
  return deferred.promise;
};

const obtenerDatos = (cuerpoObj, app) => {
  const deferred = Q.defer();
  const models = app.src.db.models;
  const contrasena = cuerpoObj.contrasena;
  const usuario_p = cuerpoObj.usuario;
  let usuario = {};
  const objParametros = {
    where: {
      $or: [
        {
          usuario: {
            $like: usuario_p
          }
        },
        {
          email: {
            $like: usuario_p
          }
        }
      ],
      // usuario: usuario_p,
      contrasena,
    },
    include:[{
      attributes: ['id_persona', 'nombres', 'primer_apellido', 'segundo_apellido', 'nombre_completo', 'documento_identidad'],
      model: models.persona,
      as: 'persona',
      required: false,
    },{
      attributes: ['fid_rol'],
      model: models.usuario_rol,
      as: 'usuarios_roles',
      required: true,
      include: [{
        attributes: ['id_rol', 'nombre', 'estado'],
        model: models.rol,
        as: 'rol',
      }],
    }],
  };
  dao.obtenerRegistro(models.usuario, objParametros)
  .then(user => {
    if (user && user.id_usuario) {
      usuario = user;
      return user;
    } else {
      throw new Error("Los datos de acceso son incorrectos.");
    }
  })
  .then(user => {
    usuario = user;
    if (usuario.usuarios_roles.length > 0) {
      const usuario_rol = usuario.usuarios_roles[0];
      return menuBL.cargarMenu(usuario_rol.fid_rol, models);
    } else {
      throw new Error("El usuario no tiene asignado ningún permiso en el Sistema.");
    }
  })
  .then(respuesta => formarPayload(usuario.dataValues, respuesta, app))
  .then(respuesta => {
    deferred.resolve(respuesta)
  })
  .catch(error => deferred.reject(error));
  return deferred.promise;
};

const formarPayload = (usuario, roles_menus, app) => {
  const deferred = Q.defer();
  const menusDevolver = roles_menus.menu;
  const menuEntrar = roles_menus.menuEntrar;
  const cfg = app.src.config.config;
  const payload = {
    id_usuario: usuario.id_usuario,
    usuario: usuario.usuario,
    id_persona: usuario.fid_persona,
    id_rol: usuario.usuarios_roles[0].fid_rol,
    nit: usuario.nit,
    secret:jwt.encode({
      fecha:moment().tz('America/La_Paz').add(cfg.sistema.tiempo_token,'minutes').format(),
      clave: Math.random().toString(36).slice(-8),
    },app.settings.secretAGETIC),
    clave: Math.random().toString(36).slice(-8),
  };
  const usuarioEnviar = {
    id_usuario: usuario.id_usuario,
    nombres:  util.isUndefined(usuario.persona) ? '' : usuario.persona.nombres,
    apellidos: util.isUndefined(usuario.persona) ? '' : `${usuario.persona.primer_apellido} ${usuario.persona.segundo_apellido}`,
    email: usuario.email,
    usuario: usuario.usuario,
    nit: usuario.nit,
    id_rol: usuario.usuarios_roles[0].fid_rol,
    rol: usuario.usuarios_roles[0].rol,
    estado: usuario.estado,
  };

  // Recupera el objeto contenedor de sesiones.
  const sesion = app.get('sesion');
  // Arma el objeto a retornar.
  const resultado = {
    token: jwt.encode(payload, app.settings.secretAGETIC),
    user: usuarioEnviar,
    menu: menusDevolver,
    menuEntrar,
  };
  // Actualiza la informacion de la sesion, para el usuario que ssolicita la autentificacion.
  sesion[usuario.id_usuario]= {
    // Fecha que se usa para la validacion de la sesion.
    fecha:moment().tz('America/La_Paz').add(cfg.sistema.tiempo_token,'minutes').format(),
    // Token que valida la sesion.
    token:resultado.token,
  };
  // Actualiza el objeto contenedor se sesiones.
  app.set('sesion', sesion);
  // Finaliza la promesa de autentificacion.
  const resultadoEnviar = resultado;
  deferred.resolve(resultadoEnviar);
  return deferred.promise;
};


module.exports = {
  autenticar,
  // validarCorreo,
  obtenerDatos,
  crearCuenta,
};
