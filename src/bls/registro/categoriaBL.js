/**
* Lógica del Negocio -> ConfiguracionBL
*/
const dao = require('../../dao/dao');
const Q = require('q');

module.exports = app => {
  const models = app.src.db.models;
  const rolBL = app.src.bls.autenticacion.rolBL;
  const estudianteBL = app.src.bls.inscripcion.estudianteBL;

  const obtieneCategoria = (query, body) => {
    const deferred = Q.defer();
    const paramsCategoria = {
      where: {
        area: query.area.replace('%20', ' ').toLowerCase()
      },
    };
    dao.listarRegistros(models.categoria, paramsCategoria)
    .then(respuestaCategorias => {
      deferred.resolve(respuestaCategorias)
    })
    .catch(error => {
      console.log(error);
      deferred.reject(error)
    });
    return deferred.promise;
  };

  const editaCategoria = (body) => {
    const deferred = Q.defer();
    const parametrosCategoria = {
      descripcion: body.descripcion,
      area: body.area.toLowerCase(),
      _usuario_modificacion: body.audit_usuario.id_usuario
    };
    if (body.estado) {
      parametrosCategoria.estado = body.estado;
    }
    models.sequelize.transaction().then((transaccion) => {
      dao.modificarRegistro(models.categoria, body.idCategoria, parametrosCategoria, transaccion)
      .then(respuestaCreacion => {
        transaccion.commit().then(res => deferred.resolve(respuestaCreacion))
      })
      .catch(error => {
        transaccion.rollback().then(res => deferred.reject(error))
      });
    })
    .catch(error => deferred.reject(error));
    return deferred.promise;
  }

  const eliminaCategoria = (body) => {
    const deferred = Q.defer();
    models.sequelize.transaction().then((transaccion) => {
      dao.eliminarRegistro(models.categoria, body.idCategoria, transaccion)
      .then(respuestaCreacion => {
        transaccion.commit().then(res => deferred.resolve(respuestaCreacion))
      })
      .catch(error => {
        transaccion.rollback().then(res => deferred.reject(error))
      });
    })
    .catch(error => deferred.reject(error));
    return deferred.promise;
  }

  const creaCategoria = (body) => {
    const deferred = Q.defer();
    const parametrosCategoria = {
      descripcion: body.descripcion,
      area: body.area.toLowerCase(),
      estado: 'ACTIVO',
      _usuario_creacion: body.audit_usuario.id_usuario
      // _usuario_modificacion: body._usuario_modificacion
    };
    models.sequelize.transaction().then((transaccion) => {
      dao.crearRegistro(models.categoria, parametrosCategoria, false, transaccion)
      .then(respuestaCreacion => {
        transaccion.commit().then(res => deferred.resolve(respuestaCreacion))
      })
      .catch(error => {
        transaccion.rollback().then(res => deferred.reject(error))
      });
    })
    .catch(error => deferred.reject(error));
    return deferred.promise;
  }

  const obtieneCategoriaRegistroSimple = (body, query) => {
    const deferred = Q.defer();
    const parametrosCategoriaRegistroSimple = {
      where: {
        fid_registro_simple: query.idRegistroSimple
      }
    };
    models.sequelize.transaction().then((transaccion) => {
      dao.listarRegistros(models.categoria_registro_simple, parametrosCategoriaRegistroSimple)
      .then(respuestaCreacion => {
        transaccion.commit().then(res => deferred.resolve(respuestaCreacion))
      })
      .catch(error => {
        transaccion.rollback().then(res => deferred.reject(error))
      });
    })
    .catch(error => deferred.reject(error));
    return deferred.promise;
  }

  const creaCategoriaRegistroSimple = (body) => {
    const deferred = Q.defer();
    const parametrosCategoriaRegistroSimple = {
      fid_categoria: body.fid_categoria,
      fid_registro_simple: body.fid_registro_simple,
    };
    models.sequelize.transaction().then((transaccion) => {
      dao.crearRegistro(models.categoria_registro_simple, parametrosCategoriaRegistroSimple, false, transaccion)
      .then(respuestaCreacion => {
        transaccion.commit().then(res => deferred.resolve(respuestaCreacion))
      })
      .catch(error => {
        transaccion.rollback().then(res => deferred.reject(error))
      });
    })
    .catch(error => deferred.reject(error));
    return deferred.promise;
  }

  const eliminaCategoriaRegistroSimple = (body) => {
    const deferred = Q.defer();
    const parametrosCategoriaRegistroSimple = {
      where: {
        fid_categoria: body.fid_categoria,
        fid_registro_simple: body.fid_registro_simple,
      }
    };
    models.sequelize.transaction().then((transaccion) => {
      dao.eliminarRegistro(models.categoria_registro_simple, parametrosCategoriaRegistroSimple, transaccion)
      .then(respuestaCreacion => {
        transaccion.commit().then(res => deferred.resolve(respuestaCreacion))
      })
      .catch(error => {
        transaccion.rollback().then(res => deferred.reject(error))
      });
    })
    .catch(error => deferred.reject(error));
    return deferred.promise;
  }

  const categoriaBL = {
    obtieneCategoria,
    creaCategoria,
    editaCategoria,
    eliminaCategoria,
    obtieneCategoriaRegistroSimple,
    creaCategoriaRegistroSimple,
    eliminaCategoriaRegistroSimple
  };

  return categoriaBL;
};