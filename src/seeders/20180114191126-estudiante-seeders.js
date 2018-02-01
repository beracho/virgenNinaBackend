'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('estudiante', [
      // 1
      {
        rude: '11111014',
        estado: 'INSCRITO',
        discapacidad_comunicacion: true,
        discapacidad_motriz: false,
        discapacidad_mental: false,
        discapacidad_otra: '',
        discapacidad_origen: 'ADQUIRED',
        fid_registro: 1,
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      // 2
      {
        rude: '11111015',
        estado: 'PREINSCRITO',
        discapacidad_comunicacion: false,
        discapacidad_motriz: true,
        discapacidad_mental: false,
        discapacidad_otra: '',
        discapacidad_origen: 'INHERITED',
        fid_registro: 2,
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
