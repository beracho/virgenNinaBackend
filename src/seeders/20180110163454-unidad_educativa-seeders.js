'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('unidad_educativa', [
      // 1
      {
        sie: '111',
        nombre: 'Centro Virgen Niña',
        dependencia: 'public',
        distrito: 'el alto',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      // 2
      {
        nombre: 'Manitos',
        dependencia: 'public',
        distrito: 'el alto',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      // 3
      {
        sie: '245',
        nombre: 'Escuela',
        dependencia: 'public',
        distrito: 'el alto',
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
