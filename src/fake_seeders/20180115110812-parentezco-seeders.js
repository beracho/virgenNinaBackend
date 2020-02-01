'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('parentezco', [
      // 1
      {
        relacion: 'tutor',
        fid_persona_es: 16,
        fid_persona_de: 14,
        vive_con_ninio: true,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 2
      {
        relacion: 'padre',
        fid_persona_es: 16,
        fid_persona_de: 15,
        vive_con_ninio: true,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 3
      {
        relacion: 'madre',
        fid_persona_es: 17,
        fid_persona_de: 14,
        vive_con_ninio: false,
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
