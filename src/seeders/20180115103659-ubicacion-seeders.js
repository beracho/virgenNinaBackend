'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ubicacion', [
      // 1
      {
        zona: 'los alamos',
        calle: 'calle 3',
        numero: '34',
        telefono: '6754958',
        _usuario_modificacion: 1,
        _usuario_creacion: 1,
        fid_dpa: 125,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      // 2
      {
        zona: 'los sauces',
        calle: 'calle 8',
        numero: '888',
        telefono: '84581684',
        _usuario_modificacion: 1,
        _usuario_creacion: 1,
        fid_dpa: 126,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      // 3
      {
        _usuario_modificacion: 1,
        _usuario_creacion: 1,
        fid_dpa: 125,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      // 4
      {
        _usuario_modificacion: 1,
        _usuario_creacion: 1,
        fid_dpa: 126,
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
