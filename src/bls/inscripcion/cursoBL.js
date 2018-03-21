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
const handlebars = require('handlebars');
const fs = require('fs-extra');
const moment = require('moment');

module.exports = app => {
  const models = app.src.db.models;
  const sequelize = app.src.db.sequelize;

  const listaCursos = (req, body) => {
    const deferred = Q.defer();
    const params = {
      where: {
        estado: 'ACTIVO'
      }
    };
    if (req.limit && req.page) {
      params.limit = req.limit,
      params.page = req.page
    };
    if (req.order) {
      params.order = req.order;
    };
    dao.listarRegistros(models.curso, params)
    .then(respuesta => deferred.resolve(respuesta))
    .catch(error => {
      console.log(error);
      deferred.reject(error)
    });
    return deferred.promise;
  };

  const editaCurso = (body) => {
    const deferred = Q.defer();
    const idCurso = body.id_curso;
    const parametrosCurso = {
      nombre: body.nombre,
      paralelo: body.paralelo,
      gestion: body.gestion,
      maestro: body.maestro,
      descripcion: body.descripcion,
      criterio_edad: body.criterio_edad,
      tipo_discapacidad: body.tipo_discapacidad,
      grado: body.grado,
      _usuario_modificacion: body.audit_usuario.id_usuario
    };
    dao.obtenerRegistro(models.curso, {
      where: {
        nombre:parametrosCurso.nombre,
        paralelo:parametrosCurso.paralelo,
        gestion:parametrosCurso.gestion
      }
    })
    .then(respuestaBusqueda => {
      if(respuestaBusqueda && respuestaBusqueda.id_curso !== idCurso)
        throw new Error("courseNameRepeated");
      else if(parametrosCurso.paralelo.length > 1)
        throw new Error("invalidParalelFormat");
      else if(idCurso === undefined)
        throw new Error("noIdCourseSend");
      else
        return dao.modificarRegistro(models.curso, idCurso, parametrosCurso)
    })
    .then(respuestaModificacion => deferred.resolve(respuestaModificacion))
    .catch(error => {
      console.log(error);
      deferred.reject(error)
    });
    return deferred.promise;
  }

  const creaCurso = (body) => {
    const deferred = Q.defer();
    const parametrosCurso = {
      nombre: body.nombre,
      paralelo: body.paralelo,
      gestion: body.gestion,
      maestro: body.maestro,
      descripcion: body.descripcion,
      criterio_edad: body.criterio_edad,
      tipo_discapacidad: body.tipo_discapacidad,
      grado: body.grado,
      _usuario_creacion: body.audit_usuario.id_usuario,
      _usuario_modificacion: body.audit_usuario.id_usuario
    };
    dao.obtenerRegistro(models.curso, {
      where: {
        nombre:parametrosCurso.nombre,
        paralelo:parametrosCurso.paralelo,
        gestion:parametrosCurso.gestion
      }
    })
    .then(respuestaBusqueda => {
      if(respuestaBusqueda)
        throw new Error("courseNameRepeated");
      else if(parametrosCurso.paralelo.length > 1)
        throw new Error("invalidParalelFormat");
      else
        return dao.crearRegistro(models.curso, parametrosCurso)
    })
    .then(respuestaModificacion => deferred.resolve(respuestaModificacion))
    .catch(error => {
      console.log(error);
      deferred.reject(error)
    });
    return deferred.promise;
  }

  const cursoBL = {
    listaCursos,
    editaCurso,
    creaCurso
  };

  return cursoBL;
};
