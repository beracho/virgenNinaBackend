'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    let roles_menus_array = [];

    // ADMIN
    let obj = [
      { fid_menu: 2, fid_rol: 1, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 3, fid_rol: 1, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 4, fid_rol: 1, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      
      // { fid_menu: 27, fid_rol: 1, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },

    ];
    roles_menus_array = roles_menus_array.concat(obj);

    // TECNICO PROBOLIVIA
    // obj = [
    //   { fid_menu: 9, fid_rol: 2, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    //   { fid_menu: 16, fid_rol: 2, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    //   { fid_menu: 17, fid_rol: 2, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    //   { fid_menu: 21, fid_rol: 2, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    // ];
    // roles_menus_array = roles_menus_array.concat(obj);

    // // TECNICO PROMUEVE
    // obj = [
    //   { fid_menu: 15, fid_rol: 3, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    //   { fid_menu: 19, fid_rol: 3, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    //   { fid_menu: 20, fid_rol: 3, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      
    //   { fid_menu: 26, fid_rol: 3, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    // ];
    // roles_menus_array = roles_menus_array.concat(obj);

    // // INSCRIPCIONES
    obj = [
      { fid_menu: 6, fid_rol: 3, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      { fid_menu: 7, fid_rol: 3, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    //   { fid_menu: 11, fid_rol: 4, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    //   { fid_menu: 12, fid_rol: 4, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    //   { fid_menu: 18, fid_rol: 4, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
      
      
    //   { fid_menu: 23, fid_rol: 4, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    //   { fid_menu: 24, fid_rol: 4, method_get: true, method_post: true, method_put: true, method_delete: true, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    ];
    roles_menus_array = roles_menus_array.concat(obj);

    // // TECNICO REGIONAL
    // obj = [
    //   { fid_menu: 6, fid_rol: 5, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    //   { fid_menu: 7, fid_rol: 5, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    // ];
    
    
    
    
    // // ADMINISTRADRO PROMUEVE
    // obj = [
    //   { fid_menu: 28, fid_rol: 6, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    //   { fid_menu: 29, fid_rol: 6, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    // ];
    // // DIRECTOR
    // obj = [
    //   { fid_menu: 30, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    //   { fid_menu: 31, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    //   { fid_menu: 32, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    //   { fid_menu: 33, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    //   { fid_menu: 34, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    //   { fid_menu: 35, fid_rol: 7, method_get: true, method_post: true, method_put: true, method_delete: false, estado: 'ACTIVO', _usuario_creacion:1, _fecha_creacion: new Date(), _fecha_modificacion: new Date() },
    // ];
    
    
    // roles_menus_array = roles_menus_array.concat(obj);



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
