import jwt from "jwt-simple";
import LdapStrategy from "passport-ldapauth";
import passport from "passport";
import crypto from "crypto";
import Q from 'q';
const autenticacionBL = require('../../bls/autenticacion/autenticacionBL');
const Util = require('../../utils/util');



module.exports = app => {
  app.post("/autenticar", (req, res) => {
    autenticacionBL.autenticar(req.body, app)
    .then(respuesta => res.status(200).json(respuesta))
    .catch(error => {
      Util.mensajeError(res, error.message || error.mensaje)
    });
  });

  // app.post("/crear_cuenta", (req, res) => {
  //   autenticacionBL.crearCuenta(req.body, app)
  //   .then(respuesta => Util.mensajeExito(res, "Obtención de datos exitosa.", 200, respuesta))
  //   .catch(error => {
  //     Util.mensajeError(res, error.message || error.mensaje)
  //   });
  // });

  // TODO: eliminar
  // app.post("/api/v1/cambiarRol", (req, res) => {
  //   if (req.body.rolCambio) {
  //     const audit_usuario = req.body.audit_usuario;
  //     const rolCambio = req.body.rolCambio;
  //     obtenerDatos(null, null, audit_usuario, rolCambio)
  //     .then(respuesta => res.json(respuesta))
  //     .catch(_error => res.status(412).json({error: _error}));
  //   } else {
  //     res.status(412).json({error: "Debe indicar el rol al que desea cambiar."});
  //   }
  // });
};
