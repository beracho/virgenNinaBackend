'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('usuario', [
      // 1
      {
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        email: 'admin',
        usuario: 'admin',
        contrasena: 'Developer',
        fid_persona: 1,
      },
      // 2
      {
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        email: 'director',
        usuario: 'director',
        contrasena: 'Developer',
        fid_persona: 2,
      },
      // 3
      {
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        email: 'inscripciones1',
        usuario: 'inscripciones1',
        contrasena: 'Developer',
        fid_persona: 3,
      },
      // 4
      {
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        email: 'psicomotricidad',
        usuario: 'psicomotricidad',
        contrasena: 'Developer',
        fid_persona: 4,
      },
      // 5
      {
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        email: 'fisioterapia',
        usuario: 'fisioterapia',
        contrasena: 'Developer',
        fid_persona: 5,
      },
      // 6
      {
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        email: 'fonoaudiologia',
        usuario: 'fonoaudiologia',
        contrasena: 'Developer',
        fid_persona: 6,
      },
      // 7
      {
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        email: 'nutricion',
        usuario: 'nutricion',
        contrasena: 'Developer',
        fid_persona: 7,
      },

      // 8
      {
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        email: 'psicologia',
        usuario: 'psicologia',
        contrasena: 'Developer',
        fid_persona: 8,
      },
      // 9
      {
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        email: 'odontologia',
        usuario: 'odontologia',
        contrasena: 'Developer',
        fid_persona: 9,
      },
      // 10
      {
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        email: 'psicopedagogia',
        usuario: 'psicopedagogia',
        contrasena: 'Developer',
        fid_persona: 10,
      },
      // 11
      {
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        email: 'trabajosocial',
        usuario: 'trabajosocial',
        contrasena: 'Developer',
        fid_persona: 11,
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
