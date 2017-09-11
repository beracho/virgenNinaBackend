/**
 * UTILS
 */

const Q = require('q');
const dao = require('../dao/dao');
var moment = require('moment');
// import moment from 'moment';
  // ============================= MENSAJES DE ERROR ============================

const mensajeError = (res, mensajeError, codigo, datos) => {
  const codigoEnviar = codigo ? codigo : 412;
  if(typeof mensajeError === 'object'&&mensajeError.errors)
  {
    mensajeError = (mensajeError.errors.map(function(x){return x.message;})).join("<br/>");
  }
  else if(typeof mensajeError==="string")
  {
    mensajeError = mensajeError.replace(/notNull Violation/g, '');
    mensajeError = mensajeError.replace(/\n: /g, '');
    mensajeError = mensajeError.replace(/Validation error:/g, '');
    mensajeError = mensajeError.replace(/\n/g, '');
    mensajeError = mensajeError.replace(/cannot be null/g, 'es un dato obligatorio');
    mensajeError = mensajeError.replace(/Validation isNumeric failed/g, 'El dato introducido no es un valor numérico válido');
    mensajeError = mensajeError.replace(/llave duplicada viola restricción de unicidad «pago_codigo_deposito_key/g, 'El código de depósito ya existe.');
  }
  else if(mensajeError.message)
  {
    mensajeError = mensajeError.message;
  }

  return res.status(codigoEnviar).
    json({
      finalizado: false,
      mensaje: mensajeError,
      datos: datos ? datos : null,
    });
}

const mensajeExito = (res, mensajeExito, codigo, datos) => {
  const codigoEnviar = codigo ? codigo : 200;
  return res.status(codigoEnviar).
    json({
      finalizado: true,
      mensaje: mensajeExito,
      datos: datos ? datos : null,
      fecha: moment().format(),
    });
}

const obtenerVariables = (models) => {
  const deferred = Q.defer();
  const constantes = {};
  constantes.tipos_grupos = {
    asamblea: GRUPO_TIPO_ASAMBLEA,
    oficilia: GRUPO_TIPO_OFICIALIA_MAYOR,
    secretaria: GRUPO_TIPO_SECRETARIA_GENERAL,
    pleno: GRUPO_TIPO_PLENO,
    vicepresidencia: GRUPO_TIPO_VICEPRESIDENCIA,
    comision: GRUPO_TIPO_COMISION,
    comite: GRUPO_TIPO_COMITE,
    bancada: GRUPO_TIPO_BANCADA,
    brigada: GRUPO_TIPO_BRIGADA,
  };
  constantes.estados_generales = {
    activo: ESTADO_ACTIVO,
    inactivo: ESTADO_INACTIVO,
    eliminado: ESTADO_ELIMINADO,
    pendiente: ESTADO_PENDIENTE,
    notificado: ESTADO_NOTIFICADO,
    baja_temporal: ESTADO_BAJA_TEMPORAL,
    baja_permanente: ESTADO_BAJA_PERMANENTE,
    expirado: ESTADO_EXPIRADO,
  };
  constantes.camaras = {
    senadores: 1,
    diputados: 2,
    asamblea: 3,
  };
  constantes.roles = {
    ROL_ADMINISTRADOR,
    ROL_ADMINISTRADOR_CAMARA,
    ROL_UNIDAD_SEGUIMIENTO,
    ROL_UNIDAD_REVISION,
    ROL_PRESIDENTE,
    ROL_PRESIDENTE_CAMARA,
    ROL_PRIMER_SECRETARIO,
    ROL_SEGUNDO_SECRETARIO,
    ROL_TERCER_SECRETARIO,
    ROL_CUARTO_SECRETARIO,
    ROL_QUINTO_SECRETARIO,
    ROL_PRIMER_VICEPRESIDENTE,
    ROL_SEGUNDO_VICEPRESIDENTE,
    ROL_MIEMBRO,
  };
  obtenerLegislaturaActiva(models)
  .then(respuesta => {
    constantes.legislatura = {
      id_legislatura: respuesta.id_legislatura,
      fecha_inicio: respuesta.fecha_inicio,
      fecha_final: respuesta.fecha_final,
      fid_periodo: respuesta.fid_periodo,
    };
    return obtenerConfiguraciones(models, respuesta.id_legislatura);
  })
  .then(respuesta => {
    const configuracion = {};
    respuesta.forEach(conf => {
      configuracion[conf.nombre] = conf.valor;
    });
    constantes.configuraciones = configuracion;
    return dao.listarRegistros(models.grupo,
      {
        where: {
          tipo: { $in: [GRUPO_TIPO_ASAMBLEA, GRUPO_TIPO_OFICIALIA_MAYOR, GRUPO_TIPO_SECRETARIA_GENERAL, GRUPO_TIPO_VICEPRESIDENCIA, GRUPO_TIPO_PLENO] },
        },
        attributes: ['id_grupo', 'nombre', 'tipo', 'fid_camara'],
        order: 'orden',
      }
    );
  })
  .then(respuesta => {
    respuesta.forEach(gr => {
      if (gr.tipo === GRUPO_TIPO_PLENO && gr.fid_camara === CAMARA_SENADORES) {
        constantes.pleno_senadores = gr;
      } else if (gr.tipo === GRUPO_TIPO_PLENO && gr.fid_camara === CAMARA_DIPUTADOS) {
        constantes.pleno_diputados = gr;
      }
    });
    constantes.grupos = respuesta;
    deferred.resolve(constantes);
  })
  .catch(error => deferred.reject(error));
  return deferred.promise;
}

const obtenerLegislaturaActiva = (models) => {
  const deferred = Q.defer();
  const legislaturaModel = models.legislatura;
  dao.obtenerRegistro(legislaturaModel, {where: {estado: 'ACTIVO'}})
  .then(respuesta => deferred.resolve(respuesta))
  .catch(error => deferred.reject(error));
  return deferred.promise;
}
const obtenerConfiguraciones = (models, fid_legislatura) => {
  const deferred = Q.defer();
  dao.listarRegistros(models.configuracion, {estado: 'ACTIVO', fid_legislatura})
  .then(respuesta => deferred.resolve(respuesta))
  .catch(error => deferred.reject(error));
  return deferred.promise;
}
//texto vacio?
const emptyText = (txt) => {
  return txt !== null && txt !==''? txt : ''
}

/**
 * Promesa para iterar un array. El metodo va iterando todos los elementos
 * pero si falla uno se cancela la iteracion y retorna cath de la promesa
 * La funciones que llamen a esta promesa deveran implementar el metodo
 * callbackProcesarItem(item,callbackContinuar,callbackError)
 *
 * @param {type} array El array de elementos a iterar
 * @param {type} callbackProcesarItem la funcion para procesar el item
 * @returns {Promise} Retorna una promesa
 */
const iterarArray = (array, callbackProcesarItem)=>
{
  return new Promise(function (resolve, reject)
  {
    var callbackError = function (error)
    {
      reject(error);
    };
    var indice = 0;
    var LIMITE_ARRAY = array.length;
    if (LIMITE_ARRAY === 0)
    {
      resolve();
      return;
    }

    var arrayResult = new Array();
    var callbakContinuarIteracion = function ()
    {
      indice++;
      if (indice < LIMITE_ARRAY)
      {
        var aa = callbackProcesarItem(array[indice], callbakContinuarIteracion, callbackError);
        arrayResult.push(aa);
      } else
      {
        resolve(arrayResult);
      }
    };
    var cc = callbackProcesarItem(array[indice], callbakContinuarIteracion, callbackError);
    arrayResult.push(cc);
  });
}

/**
 * Funcion para crear/modificar una consulta de peticiones get list. filtrara limit, order, offset
 * @param {Objeto} req Objeto req de Node y que tiene los querys
 * @param {Objeto} obj Objeto consulta. 
 * @return {Objeto} options En caso de que obj no sea nullo se retornara un nuevo objeto
 */
// const filterQuery = require('./../libs/handlers/filter');

module.exports = {
  mensajeError,
  mensajeExito,
  obtenerVariables,
  emptyText,
  iterarArray,
  // filterQuery,
}
