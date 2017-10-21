/**
 * Lógica del Negocio -> ParametroBL
 */

const dao = require('../../dao/dao');
const Q = require('q');

const listarDepartamentos = (query, body, models) => {
  const deferred = Q.defer();
  const parametros = {};
  parametros.attributes = ["codigo", "abreviacion"];
  dao.listarRegistros(models.departamento, parametros)
  .then(respuesta => deferred.resolve(respuesta))
  .catch(error => deferred.reject(error));
  return deferred.promise;
};

module.exports = {
  listarDepartamentos,
}
