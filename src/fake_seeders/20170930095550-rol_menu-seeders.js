'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    let roles_menus_array = [];

    // ADMIN
    let obj = [
      { fid_menu: 2, fid_rol: 1, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 3, fid_rol: 1, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 4, fid_rol: 1, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 10, fid_rol: 1, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() }
    ];
    roles_menus_array = roles_menus_array.concat(obj);

    // DIRECTOR
    obj = [
      { fid_menu: 10, fid_rol: 2, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 28, fid_rol: 2, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 29, fid_rol: 2, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 30, fid_rol: 2, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() }
    ];
    roles_menus_array = roles_menus_array.concat(obj);

    // INSCRIPCIONES
    obj = [
      { fid_menu: 6, fid_rol: 3, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 7, fid_rol: 3, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 8, fid_rol: 3, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 10, fid_rol: 3, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() }
    ];
    roles_menus_array = roles_menus_array.concat(obj);

    // PSICOPEDAGOGIA
    obj = [
      { fid_menu: 10, fid_rol: 4, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 12, fid_rol: 4, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 13, fid_rol: 4, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 14, fid_rol: 4, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 22, fid_rol: 4, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 26, fid_rol: 4, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 31, fid_rol: 4, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 32, fid_rol: 4, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() }
    ];
    roles_menus_array = roles_menus_array.concat(obj);
    
    // FISIOTERAPIA
    obj = [
      { fid_menu: 10, fid_rol: 5, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 12, fid_rol: 5, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 13, fid_rol: 5, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 14, fid_rol: 5, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 16, fid_rol: 5, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 26, fid_rol: 5, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 31, fid_rol: 5, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 32, fid_rol: 5, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() }
    ];
    roles_menus_array = roles_menus_array.concat(obj);

    // FONOAUDIOLOGIA
    obj = [
      { fid_menu: 10, fid_rol: 6, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 12, fid_rol: 6, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 13, fid_rol: 6, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 14, fid_rol: 6, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 17, fid_rol: 6, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 26, fid_rol: 6, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 31, fid_rol: 6, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 32, fid_rol: 6, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() }
    ];
    roles_menus_array = roles_menus_array.concat(obj);

    // NUTRICION
    obj = [
      { fid_menu: 10, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 12, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 13, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 14, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 19, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 26, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 31, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 32, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() }
    ];
    roles_menus_array = roles_menus_array.concat(obj);

    // PSICOLOGIA
    obj = [
      { fid_menu: 10, fid_rol: 8, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 12, fid_rol: 8, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 13, fid_rol: 8, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 14, fid_rol: 8, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 21, fid_rol: 8, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 26, fid_rol: 8, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 31, fid_rol: 8, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 32, fid_rol: 8, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() }
    ];
    roles_menus_array = roles_menus_array.concat(obj);

    // ODONTOLOGIA
    obj = [
      { fid_menu: 10, fid_rol: 9, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 12, fid_rol: 9, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 13, fid_rol: 9, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 14, fid_rol: 9, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 20, fid_rol: 9, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 26, fid_rol: 9, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 31, fid_rol: 9, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 32, fid_rol: 9, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() }
    ];
    roles_menus_array = roles_menus_array.concat(obj);

    // PSICOMOTRICIDAD
    obj = [
      { fid_menu: 10, fid_rol: 10, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 12, fid_rol: 10, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 13, fid_rol: 10, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 14, fid_rol: 10, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 23, fid_rol: 10, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 26, fid_rol: 10, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 31, fid_rol: 10, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 32, fid_rol: 10, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() }
    ];
    roles_menus_array = roles_menus_array.concat(obj);

    // TRABAJO SOCIAL
    obj = [
      { fid_menu: 10, fid_rol: 11, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 12, fid_rol: 11, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 13, fid_rol: 11, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 14, fid_rol: 11, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 25, fid_rol: 11, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 26, fid_rol: 11, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 31, fid_rol: 11, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 32, fid_rol: 11, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() }
    ];
    roles_menus_array = roles_menus_array.concat(obj);
    
    // MEDICINA GENERAL
    obj = [
      { fid_menu: 10, fid_rol: 12, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 12, fid_rol: 12, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 13, fid_rol: 12, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 14, fid_rol: 12, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 18, fid_rol: 12, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 26, fid_rol: 12, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 31, fid_rol: 12, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 32, fid_rol: 12, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() }
    ];
    roles_menus_array = roles_menus_array.concat(obj);
    
    // TERAPIA OCUPACIONAL
    obj = [
      { fid_menu: 10, fid_rol: 13, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 12, fid_rol: 13, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 13, fid_rol: 13, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 14, fid_rol: 13, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 24, fid_rol: 13, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 26, fid_rol: 13, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 31, fid_rol: 13, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 32, fid_rol: 13, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() }
    ];
    roles_menus_array = roles_menus_array.concat(obj);
    
    // EDUCACION
    obj = [
      { fid_menu: 10, fid_rol: 14, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 12, fid_rol: 14, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 13, fid_rol: 14, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 14, fid_rol: 14, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 15, fid_rol: 14, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 26, fid_rol: 14, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 31, fid_rol: 14, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 32, fid_rol: 14, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() }
    ];
    roles_menus_array = roles_menus_array.concat(obj);
    
    // AUTISMO
    obj = [
      { fid_menu: 10, fid_rol: 15, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 12, fid_rol: 15, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 13, fid_rol: 15, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 14, fid_rol: 15, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 15, fid_rol: 15, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 26, fid_rol: 15, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 31, fid_rol: 15, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 32, fid_rol: 15, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() }
    ];
    roles_menus_array = roles_menus_array.concat(obj);

    return queryInterface.bulkInsert('rol_menu', roles_menus_array, {});
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
