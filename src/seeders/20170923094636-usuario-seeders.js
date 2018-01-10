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
      },
      // 2
      {
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        email: 'director',
        usuario: 'director',
        contrasena: '3fb7b39416f1d067268747fc214494d759d2609f863ace1a8a76705618d5c80b',
        fid_persona: 2,
      },
      // 3
      {
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        email: 'inscripciones',
        usuario: 'inscripciones',
        contrasena: '3fb7b39416f1d067268747fc214494d759d2609f863ace1a8a76705618d5c80b',
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
        contrasena: '3fb7b39416f1d067268747fc214494d759d2609f863ace1a8a76705618d5c80b',
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
        contrasena: '3fb7b39416f1d067268747fc214494d759d2609f863ace1a8a76705618d5c80b',
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
        contrasena: '3fb7b39416f1d067268747fc214494d759d2609f863ace1a8a76705618d5c80b',
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
        contrasena: '3fb7b39416f1d067268747fc214494d759d2609f863ace1a8a76705618d5c80b',
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
        contrasena: '3fb7b39416f1d067268747fc214494d759d2609f863ace1a8a76705618d5c80b',
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
        contrasena: '3fb7b39416f1d067268747fc214494d759d2609f863ace1a8a76705618d5c80b',
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
        contrasena: '3fb7b39416f1d067268747fc214494d759d2609f863ace1a8a76705618d5c80b',
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
        contrasena: '3fb7b39416f1d067268747fc214494d759d2609f863ace1a8a76705618d5c80b',
        fid_persona: 11,
      },
      // 12
      {
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        email: 'profesor',
        usuario: 'profesor',
        contrasena: '3fb7b39416f1d067268747fc214494d759d2609f863ace1a8a76705618d5c80b',
        fid_persona: 12,
      },
      // 13
      {
        estado: 'PENDIENTE',
        codigo_contrasena: '123456789123',
        fecha_expiracion: fechaMasUnMes,
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        email: 'profesor1',
        usuario: 'profesor1',
        fid_persona: 13,
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
