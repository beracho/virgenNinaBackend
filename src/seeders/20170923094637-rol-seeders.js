'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('rol', [
      {
        // 1
        nombre: 'ADMINISTRADOR',
        descripcion: 'Administrador',
        peso: 0,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        // 2
        nombre: 'DIRECTOR',
        descripcion: 'Director',
        peso: 5,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        // 3
        nombre: 'ADMINISTRADOR_INSCRIPCIONES',
        descripcion: 'Administrador de inscripciones',
        peso: 10,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        // 4
        nombre: 'PROF_PSICOMOTRICIDAD',
        descripcion: 'Profesional de Psicomotricidad',
        peso:10,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        // 5
        nombre: 'PROF_FISIOTERAPIA',
        descripcion: 'Profesional de Fisioterapía',
        peso: 10,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        // 6
        nombre: 'PROF_FONOAUDIOLOGIA',
        descripcion: 'Profesional de Fonoaudiología',
        peso: 10,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        // 7
        nombre: 'PROF_NUTRICION',
        descripcion: 'Profesional de Nutrición',
        peso: 10,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },

      {
        // 8
        nombre: 'PROF_PSICOLOGIA',
        descripcion: 'Profesional de Psicología',
        peso: 10,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },

      {
        // 9
        nombre: 'PROF_ODONTOLOGIA',
        descripcion: 'Profesional de Odontología',
        peso: 10,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        // 10
        nombre: 'PROF_PSICOPEDAGOGIA',
        descripcion: 'Profesional de Psicopedagogía',
        peso: 10,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        // 11
        nombre: 'PROF_TRABAJO_SOCIAL',
        descripcion: 'Profesional de Trabajo Social',
        peso: 10,
        estado: 'ACTIVO',
        _usuario_creacion:1,
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
