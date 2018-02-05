'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('parametro', [
      // 1
      {
        id_parametro: 1,
        grupo: 'water_origin',
        sigla: '',
        nombre: 'netConexion',
        descripcion: '',
        orden: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 2
      {
        id_parametro: 2,
        grupo: 'water_origin',
        sigla: '',
        nombre: 'publicWater',
        descripcion: '',
        orden: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 3
      {
        id_parametro: 3,
        grupo: 'water_origin',
        sigla: '',
        nombre: 'deliveryCar',
        descripcion: '',
        orden: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 4
      {
        id_parametro: 4,
        grupo: 'water_origin',
        sigla: '',
        nombre: 'well',
        descripcion: '',
        orden: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 5
      {
        id_parametro: 5,
        grupo: 'water_origin',
        sigla: '',
        nombre: 'river',
        descripcion: '',
        orden: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 6
      {
        id_parametro: 6,
        grupo: 'water_origin',
        sigla: '',
        nombre: 'other',
        descripcion: '',
        orden: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 11
      {
        id_parametro: 11,
        grupo: 'water_destiny',
        sigla: '',
        nombre: 'sewer',
        descripcion: '',
        orden: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 12
      {
        id_parametro: 12,
        grupo: 'water_destiny',
        sigla: '',
        nombre: 'septicTank',
        descripcion: '',
        orden: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 13
      {
        id_parametro: 13,
        grupo: 'water_destiny',
        sigla: '',
        nombre: 'blindWell',
        descripcion: '',
        orden: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 14
      {
        id_parametro: 14,
        grupo: 'water_destiny',
        sigla: '',
        nombre: 'street',
        descripcion: '',
        orden: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 15
      {
        id_parametro: 15,
        grupo: 'water_destiny',
        sigla: '',
        nombre: 'river',
        descripcion: '',
        orden: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 21
      {
        id_parametro: 21,
        grupo: 'activity_rude',
        sigla: '',
        nombre: 'agricultureIndustry',
        descripcion: '',
        orden: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 22
      {
        id_parametro: 22,
        grupo: 'activity_rude',
        sigla: '',
        nombre: 'familyAgriculture',
        descripcion: '',
        orden: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 23
      {
        id_parametro: 23,
        grupo: 'activity_rude',
        sigla: '',
        nombre: 'domesticAid',
        descripcion: '',
        orden: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 24
      {
        id_parametro: 24,
        grupo: 'activity_rude',
        sigla: '',
        nombre: 'babySister',
        descripcion: '',
        orden: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 25
      {
        id_parametro: 25,
        grupo: 'activity_rude',
        sigla: '',
        nombre: 'minery',
        descripcion: '',
        orden: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 26
      {
        id_parametro: 26,
        grupo: 'activity_rude',
        sigla: '',
        nombre: 'construction',
        descripcion: '',
        orden: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 27
      {
        id_parametro: 27,
        grupo: 'activity_rude',
        sigla: '',
        nombre: 'publicTransport',
        descripcion: '',
        orden: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 28
      {
        id_parametro: 28,
        grupo: 'activity_rude',
        sigla: '',
        nombre: 'other',
        descripcion: '',
        orden: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 29
      {
        id_parametro: 29,
        grupo: 'activity_rude',
        sigla: '',
        nombre: 'none',
        descripcion: '',
        orden: 1,
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
