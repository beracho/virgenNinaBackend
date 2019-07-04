'use strict';
// TODO arreglar esto
module.exports = {
  up (queryInterface, Sequelize) {

    let roles_rutas_array = [];

    // ADMINISTRADOR
    let obj = [
      { fid_ruta: 1, fid_rol: 1, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 2, fid_rol: 1, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 3, fid_rol: 1, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 5, fid_rol: 1, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 6, fid_rol: 1, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 7, fid_rol: 1, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 8, fid_rol: 1, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 9, fid_rol: 1, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },

    // DIRECTOR
      { fid_ruta: 9, fid_rol: 2, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 14, fid_rol: 2, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 23, fid_rol: 2, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 26, fid_rol: 2, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 29, fid_rol: 2, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 30, fid_rol: 2, method_get: false, method_post: true, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 32, fid_rol: 2, method_get: false, method_post: true, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },

    // INSCRIPCIONES
      { fid_ruta: 6, fid_rol: 3, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 9, fid_rol: 3, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 12, fid_rol: 3, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 13, fid_rol: 3, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 14, fid_rol: 3, method_get: true, method_post: false, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 15, fid_rol: 3, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 16, fid_rol: 3, method_get: false, method_post: false, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 17, fid_rol: 3, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 18, fid_rol: 3, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 19, fid_rol: 3, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 20, fid_rol: 3, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 21, fid_rol: 3, method_get: false, method_post: true, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 22, fid_rol: 3, method_get: false, method_post: true, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 23, fid_rol: 3, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 24, fid_rol: 3, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 34, fid_rol: 3, method_get: false, method_post: false, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 31, fid_rol: 3, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    ];
    roles_rutas_array = roles_rutas_array.concat(obj);

    // PSICOMOTRICIDAD
    obj = [
      { fid_ruta: 14, fid_rol: 4, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 19, fid_rol: 4, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 23, fid_rol: 4, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 25, fid_rol: 4, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 26, fid_rol: 4, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 28, fid_rol: 4, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 29, fid_rol: 4, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 30, fid_rol: 4, method_get: false, method_post: true, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 35, fid_rol: 4, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 37, fid_rol: 4, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 38, fid_rol: 4, method_get: true, method_post: true, method_put: false, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    ];
    roles_rutas_array = roles_rutas_array.concat(obj);
    
    // FISIOTERAPIA
    obj = [
      { fid_ruta: 14, fid_rol: 5, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 19, fid_rol: 5, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 23, fid_rol: 5, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 25, fid_rol: 5, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 26, fid_rol: 5, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 28, fid_rol: 5, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 29, fid_rol: 5, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 30, fid_rol: 5, method_get: false, method_post: true, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 36, fid_rol: 5, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 37, fid_rol: 5, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 38, fid_rol: 5, method_get: true, method_post: true, method_put: false, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    ];
    roles_rutas_array = roles_rutas_array.concat(obj);

    // FONOAUDIOLOGIA
    obj = [
      { fid_ruta: 14, fid_rol: 6, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 19, fid_rol: 6, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 23, fid_rol: 6, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 25, fid_rol: 6, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 26, fid_rol: 6, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 28, fid_rol: 6, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 29, fid_rol: 6, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 30, fid_rol: 6, method_get: false, method_post: true, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 37, fid_rol: 6, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 38, fid_rol: 6, method_get: true, method_post: true, method_put: false, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    ];
    roles_rutas_array = roles_rutas_array.concat(obj);

    // NUTRICION
    obj = [
      { fid_ruta: 14, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 19, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 23, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 25, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 26, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 28, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 29, fid_rol: 7, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 30, fid_rol: 7, method_get: false, method_post: true, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 37, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 38, fid_rol: 7, method_get: true, method_post: true, method_put: false, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    ];
    roles_rutas_array = roles_rutas_array.concat(obj);

    // PSICOLOGIA
    obj = [
      { fid_ruta: 14, fid_rol: 8, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 19, fid_rol: 8, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 23, fid_rol: 8, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 25, fid_rol: 8, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 26, fid_rol: 8, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 28, fid_rol: 8, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 29, fid_rol: 8, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 30, fid_rol: 8, method_get: false, method_post: true, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 37, fid_rol: 8, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 38, fid_rol: 8, method_get: true, method_post: true, method_put: false, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    ];
    roles_rutas_array = roles_rutas_array.concat(obj);

    // ODONTOLOGIA
    obj = [
      { fid_ruta: 14, fid_rol: 9, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 19, fid_rol: 9, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 23, fid_rol: 9, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 25, fid_rol: 9, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 26, fid_rol: 9, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 28, fid_rol: 9, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 29, fid_rol: 9, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 30, fid_rol: 9, method_get: false, method_post: true, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 37, fid_rol: 9, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 38, fid_rol: 9, method_get: true, method_post: true, method_put: false, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    ];
    roles_rutas_array = roles_rutas_array.concat(obj);

    // PSICOPEDAGOGIA
    obj = [
      { fid_ruta: 14, fid_rol: 10, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 19, fid_rol: 10, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 23, fid_rol: 10, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 25, fid_rol: 10, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 26, fid_rol: 10, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 28, fid_rol: 10, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 29, fid_rol: 10, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 30, fid_rol: 10, method_get: false, method_post: true, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 37, fid_rol: 10, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 38, fid_rol: 10, method_get: true, method_post: true, method_put: false, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    ];
    roles_rutas_array = roles_rutas_array.concat(obj);

    // TRABAJO SOCIAL
    obj = [
      { fid_ruta: 14, fid_rol: 11, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 19, fid_rol: 11, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 23, fid_rol: 11, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 25, fid_rol: 11, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 26, fid_rol: 11, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 27, fid_rol: 11, method_get: true, method_post: false, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 28, fid_rol: 11, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 29, fid_rol: 11, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 30, fid_rol: 11, method_get: false, method_post: true, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 37, fid_rol: 11, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 38, fid_rol: 11, method_get: true, method_post: true, method_put: false, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    ];
    roles_rutas_array = roles_rutas_array.concat(obj);
    
    // MEDICINA GENERAL
    obj = [
      { fid_ruta: 14, fid_rol: 12, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 19, fid_rol: 12, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 23, fid_rol: 12, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 25, fid_rol: 12, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 26, fid_rol: 12, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 29, fid_rol: 12, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 30, fid_rol: 12, method_get: false, method_post: true, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 37, fid_rol: 12, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 38, fid_rol: 12, method_get: true, method_post: true, method_put: false, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    ];
    roles_rutas_array = roles_rutas_array.concat(obj);
    
    // TERAPIA OCUPACIONAL
    obj = [
      { fid_ruta: 14, fid_rol: 13, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 19, fid_rol: 13, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 23, fid_rol: 13, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 25, fid_rol: 13, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 26, fid_rol: 13, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 28, fid_rol: 13, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 29, fid_rol: 13, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 30, fid_rol: 13, method_get: false, method_post: true, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 33, fid_rol: 13, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 37, fid_rol: 13, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 38, fid_rol: 13, method_get: true, method_post: true, method_put: false, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    ];
    roles_rutas_array = roles_rutas_array.concat(obj);
    
    // PROFESOR
    obj = [
      { fid_ruta: 14, fid_rol: 14, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 19, fid_rol: 14, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 23, fid_rol: 14, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 25, fid_rol: 14, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 26, fid_rol: 14, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 29, fid_rol: 14, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 30, fid_rol: 14, method_get: false, method_post: true, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 37, fid_rol: 14, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 38, fid_rol: 14, method_get: true, method_post: true, method_put: false, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    ];
    roles_rutas_array = roles_rutas_array.concat(obj);

    // AUTISMO
    obj = [
      { fid_ruta: 14, fid_rol: 15, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 19, fid_rol: 15, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 23, fid_rol: 15, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 25, fid_rol: 15, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 26, fid_rol: 15, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 29, fid_rol: 15, method_get: true, method_post: false, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 30, fid_rol: 15, method_get: false, method_post: true, method_put: false, method_delete: false, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 37, fid_rol: 15, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_ruta: 38, fid_rol: 15, method_get: true, method_post: true, method_put: false, method_delete: true, estado: 'ACTIVO', _usuario_creacion: 'SISTEMA', _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    ];
    roles_rutas_array = roles_rutas_array.concat(obj);
    
    return queryInterface.bulkInsert('rol_ruta', roles_rutas_array, {});
  },

  down (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  },
};
