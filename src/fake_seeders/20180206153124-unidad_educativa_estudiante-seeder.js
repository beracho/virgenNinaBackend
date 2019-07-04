'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('unidad_educativa_estudiante', [
      // 1
      {
        nivel: 'INICIAL',
        grado: 1,
        gestion: '2017',
        paralelo: 'a',
        turno: 'MAÑANA',
        fid_estudiante: 1,
        fid_unidad_educativa: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 2
      {
        nivel: 'PRIMARIA',
        grado: 1,
        gestion: '2017',
        paralelo: 'b',
        turno: 'MAÑANA',
        fid_estudiante: 2,
        fid_unidad_educativa: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 3
      {
        nivel: 'PRIMARIA',
        grado: 2,
        gestion: '2018',
        paralelo: 'd',
        turno: 'TARDE',
        fid_estudiante: 2,
        fid_unidad_educativa: 3,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
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
