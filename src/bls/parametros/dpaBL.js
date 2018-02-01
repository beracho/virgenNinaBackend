/**
 * Lógica del Negocio -> ParametroBL
 */

const dao = require('../../dao/dao');
const Q = require('q');

const listarDepartamentos = (query, body, models) => {
  const deferred = Q.defer();
  const parametros = {};
  parametros.attributes = ["id_dpa", "codigo_ine"];
  parametros.where = {
    nivel_dpa: 2
  }
  dao.listarRegistros(models.dpa, parametros)
  .then(respuesta => deferred.resolve(respuesta))
  .catch(error => deferred.reject(error));
  return deferred.promise;
};

const listarNivel = (query, models) => {
  const deferred = Q.defer();
  const parametros = {};
  parametros.attributes = ["id_dpa", "nombre"];
  parametros.where = {
    nivel_dpa: query.nivel
  }
  dao.listarRegistros(models.dpa, parametros)
  .then(respuesta => {
    if (respuesta.length == 0)
      throw new Error("incorrectLevel");
    deferred.resolve(respuesta)
  })
  .catch(error => deferred.reject(error));
  return deferred.promise;
};

const obtenerELemento = (id, models) => {
  const deferred = Q.defer();
  const parametros = {
    where: {id_dpa: id}
  };
  let respuestaDPA = {};
  dao.listarRegistros(models.dpa, parametros)
  .then(respuesta => {
    if (respuesta[0].nivel_dpa === 1) {
      respuestaDPA.pais = respuesta[0].id_dpa;
      return respuestaDPA;
    } else {
      switch (respuesta[0].nivel_dpa) {
        case 2:
          respuestaDPA.departamento = respuesta[0].id_dpa;
          break;
        case 3:
          respuestaDPA.provincia = respuesta[0].id_dpa;
          break;
        case 4:
          respuestaDPA.municipio = respuesta[0].id_dpa;
          break;
        }
      return obtenerELemento(respuesta[0].fid_dpa_superior, models)
    }
  })
  .then(respuesta => {
    respuestaDPA.pais = respuesta.pais;
    respuestaDPA.departamento = respuesta.departamento ? respuesta.departamento : respuestaDPA.departamento;
    respuestaDPA.provincia = respuesta.provincia ? respuesta.provincia : respuestaDPA.provincia;
    deferred.resolve(respuestaDPA)
  })
  .catch(error => deferred.reject(error));
  return deferred.promise;
};

const obtenerHijos = (query, models) => {
  const deferred = Q.defer();
  if (!(query && query.id_dpa)) {
    throw new Error("noIdDpa");
  }
  const parametros = {};
  parametros.attributes = ["id_dpa", "nombre"];
  parametros.where = {
    fid_dpa_superior: query.id_dpa
  }
  dao.listarRegistros(models.dpa, parametros)
  .then(respuesta => {
    if (respuesta.length == 0)
      throw new Error("dpaHasNoChild");
    deferred.resolve(respuesta)
  })
  .catch(error => deferred.reject(error));
  return deferred.promise;
};

const obtenerPadre = (query, models) => {
  const deferred = Q.defer();
  if (!(query && query.id_dpa)) {
    throw new Error("noIdDpa");
  }
  const parametros = {};
  parametros.attributes = ["id_dpa", "fid_dpa_superior"];
  parametros.where = {
    id_dpa: query.id_dpa
  }
  dao.listarRegistros(models.dpa, parametros)
  .then(respuesta => {
    return dao.listarRegistros(models.dpa, {
      attributes: ["id_dpa", "nombre"],
      where: {
        id_dpa: respuesta[0].fid_dpa_superior
      }
    })
  })
  .then(respuesta => {
    if (respuesta.length == 0)
      throw new Error("dpaHasNoParent");
    deferred.resolve(respuesta)
  })
  .catch(error => deferred.reject(error));
  return deferred.promise;
};

module.exports = {
  listarDepartamentos,
  listarNivel,
  obtenerELemento,
  obtenerHijos,
  obtenerPadre
}
