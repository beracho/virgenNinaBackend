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

  app.post("/crear_cuenta", (req, res) => {
    autenticacionBL.crearCuenta(req.body, app)
    .then(respuesta => Util.mensajeExito(res, "Creación de cuenta exitosa.", 200, respuesta))
    .catch(error => Util.mensajeError(res, error.message || error.mensaje));
  });
};
