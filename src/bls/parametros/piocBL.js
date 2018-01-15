/**
 * Lógica del Negocio -> ParametroBL
 */

const dao = require('../../dao/dao');
const Q = require('q');

const listarPiocs = (body, models) => {
  const deferred = Q.defer();
  const parametros = {
    attributes: ['id_pioc', 'nombre']
  };
  dao.listarRegistros(models.pioc, parametros)
  .then(respuesta => deferred.resolve(respuesta))
  .catch(error => deferred.reject(error));
  return deferred.promise;
};

module.exports = {
  listarPiocs
}
