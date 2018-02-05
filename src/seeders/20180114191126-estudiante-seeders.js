'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('estudiante', [
      // 1
      {
        rude: '11111014',
        estado: 'INSCRITO',
        discapacidad_origen: 'ADQUIRED',
        fid_registro: 1,
        fid_discapacidad: 76,
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      // 2
      {
        rude: '11111015',
        estado: 'PREINSCRITO',
        discapacidad_origen: 'INHERITED',
        fid_registro: 2,
        fid_discapacidad: 83,
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
