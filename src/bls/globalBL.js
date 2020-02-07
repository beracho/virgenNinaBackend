/**
* Lógica del Negocio -> ConfiguracionBL
*/
const config = require('konfig')();
const dao = require('../dao/dao');
const Q = require('q');
const util = require('../libs/util');
const general = require('../utils/util');
const handlebars = require('handlebars');
const fs = require('fs-extra');
const moment = require('moment');

module.exports = app => {

  const generaCodigo = (nombre, paterno, materno, sexo, fecha_nacimiento) => {
    let codigo = '';
    codigo += fecha_nacimiento.substring(2, 4);
    codigo += '-';
    if(sexo === 'M') {
      codigo += fecha_nacimiento.substring(5, 7);
    } else {
      codigo += (50 + parseInt(fecha_nacimiento.substring(5, 7)));
    }
    codigo += fecha_nacimiento.substring(8);
    codigo += '-';
    if (paterno.length === 0) {
        codigo += materno.charAt(0).toUpperCase();
        codigo += materno.charAt(0).toUpperCase();
    } else if (materno.length === 0) {
        codigo += paterno.charAt(0).toUpperCase();
        codigo += paterno.charAt(0).toUpperCase();
    } else {
        codigo += paterno.charAt(0).toUpperCase();
        codigo += materno.charAt(0).toUpperCase();
    }
    codigo += nombre.charAt(0).toUpperCase();
    return codigo;
  }

  const siguienteCodigo = (codigo) => {
      if (codigo.length === 11) {
          return codigo + '1';
      }
      let position = parseInt(codigo.substring(11));
      if (position != NaN) {
          position++;
          return (codigo.substring(0, 11) + position);
      }
      return 'codeError'
  }

  const registroBL = {
    generaCodigo,
    siguienteCodigo
  };

  return registroBL;
};
