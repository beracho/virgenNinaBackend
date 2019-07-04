'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    var fechaMasUnMes = new Date();
    fechaMasUnMes.setMonth(fechaMasUnMes.getMonth() + 1);
    return queryInterface.bulkInsert('usuario', [
      // 1
      {
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        email: 'admin',
        usuario: 'admin',
        contrasena: '3fb7b39416f1d067268747fc214494d759d2609f863ace1a8a76705618d5c80b',
        fid_persona: 1,
      }
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
