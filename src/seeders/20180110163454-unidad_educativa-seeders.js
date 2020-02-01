'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('unidad_educativa', [
      // 1
      {
        sie: '40730493',
        nombre: 'Centro de Educación Especial',
        codigo: 'CVN-CEE',
        dependencia: 'public',
        distrito: 'El Alto 1 Distrito 6',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      // 2
      {
        nombre: 'Programa de Desarrollo Infantil',
        codigo: 'CVN-PDI',
        dependencia: 'public',
        distrito: 'El Alto 1 Distrito 6',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      // 3
      {
        sie: '40730644',
        nombre: 'Unidad Educativa Inicial en Familia Comunitaria',
        codigo: 'CVN-UEI',
        dependencia: 'public',
        distrito: 'El Alto 1 Distrito 6',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      // 4
      {
        nombre: 'Servicio en Familia Comunitaria',
        codigo: 'CVN-SFC',
        dependencia: 'public',
        distrito: 'El Alto 1 Distrito 6',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      // 5
      {
        nombre: 'Apoyo Pedagógico y Terapéutico',
        codigo: 'CVN-APT',
        dependencia: 'public',
        distrito: 'El Alto 1 Distrito 6',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
    ], {});
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
