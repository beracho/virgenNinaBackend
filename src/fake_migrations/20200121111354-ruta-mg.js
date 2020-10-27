'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    console.log("generando ");
    return Promise.all([queryInterface.bulkInsert('ruta', [
      {
        ruta: '/api/v1/existePersona',
        descripcion: 'Verifica existencia de persona',
        method_get: true,
        method_post: false,
        method_put: false,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        ruta: '/api/v1/generaCodigo',
        descripcion: 'Genera código correspondiente',
        method_get: false,
        method_post: false,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      }
    ]),
    queryInterface.bulkInsert('rol_ruta', [
      {
        fid_ruta: 41,
        fid_rol: 3,
        method_get: true,
        method_post: false,
        method_put: false,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        fid_ruta: 42,
        fid_rol: 3,
        method_get: false,
        method_post: false,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      }
    ])
  ])
  },
  down: (queryInterface, Sequelize) => {
    return Promise.resolve();
  },
};