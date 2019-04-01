'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('rol', [
      {
        // 1
        nombre: 'ADMINISTRADOR',
        descripcion: 'Administrador',
        area: 'Administración',
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
        area: 'Dirección',
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
        area: 'Inscripción',
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
        area: 'Psicomotricidad',
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
        area: 'Fisioterapia',
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
        area: 'Fonoaudiología',
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
        area: 'Nutrición',
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
        area: 'Psicología',
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
        area: 'Odontología',
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
        area: 'Psicopedagogía',
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
        area: 'Trabajo social',
        peso: 10,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        // 12
        nombre: 'PROF_MEDICINA_GENERAL',
        descripcion: 'Profesional de Medicina General',
        area: 'Medicina general',
        peso: 10,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        // 13
        nombre: 'PROF_TRABAJO_OCUPACIONAL',
        descripcion: 'Profesional de Trabajo Ocupacional',
        area: 'Trabajo Ocupacional',
        peso: 10,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        // 14
        nombre: 'PROF_EDUCACION',
        descripcion: 'Profesional de Educación',
        area: 'Educación',
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
