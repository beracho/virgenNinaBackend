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

const obtenerELemento = (id, models) => {
  const deferred = Q.defer();
  const parametros = {
    where: {id_dpa: id}
  };
  let respuestaDPA = {};
  dao.listarRegistros(models.dpa, parametros)
  .then(respuesta => {
    // const nivel = respuesta.nivel;
    if (respuesta[0].nivel_dpa === 1) {
      respuestaDPA.pais = respuesta[0].nombre;
      return respuestaDPA;
    } else {
      switch (respuesta[0].nivel_dpa) {
        case 2:
          respuestaDPA.departamento = respuesta[0].nombre;
          break;
        case 3:
          respuestaDPA.provincia = respuesta[0].nombre;
          break;
        case 4:
          respuestaDPA.municipio = respuesta[0].nombre;
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

module.exports = {
  listarDepartamentos,
  obtenerELemento
}
