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
      // 40
      {
        id_parametro: 40,
        grupo: 'transport',
        sigla: '',
        nombre: 'foot',
        descripcion: '',
        orden: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 41
      {
        id_parametro: 41,
        grupo: 'transport',
        sigla: '',
        nombre: 'car',
        descripcion: '',
        orden: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 42
      {
        id_parametro: 42,
        grupo: 'transport',
        sigla: '',
        nombre: 'bicycle',
        descripcion: '',
        orden: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 43
      {
        id_parametro: 43,
        grupo: 'transport',
        sigla: '',
        nombre: 'train',
        descripcion: '',
        orden: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 50
      {
        id_parametro: 50,
        grupo: 'internet_frecuency',
        sigla: '',
        nombre: 'daily',
        descripcion: '',
        orden: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 51
      {
        id_parametro: 51,
        grupo: 'internet_frecuency',
        sigla: '',
        nombre: 'onceAWeek',
        descripcion: '',
        orden: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 52
      {
        id_parametro: 52,
        grupo: 'internet_frecuency',
        sigla: '',
        nombre: 'onceAMonth',
        descripcion: '',
        orden: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 60
      {
        id_parametro: 60,
        grupo: 'transport_time',
        sigla: '',
        nombre: 'halfHour',
        descripcion: '',
        orden: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 61
      {
        id_parametro: 61,
        grupo: 'transport_time',
        sigla: '',
        nombre: 'oneHour',
        descripcion: '',
        orden: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 62
      {
        id_parametro: 62,
        grupo: 'transport_time',
        sigla: '',
        nombre: 'twoHours',
        descripcion: '',
        orden: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 63
      {
        id_parametro: 63,
        grupo: 'transport_time',
        sigla: '',
        nombre: 'twoOrMore',
        descripcion: '',
        orden: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 70
      {
        id_parametro: 70,
        grupo: 'disability',
        sigla: '',
        nombre: 'visual',
        descripcion: '',
        orden: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 71
      {
        id_parametro: 71,
        grupo: 'disability',
        sigla: '',
        nombre: 'auditory',
        descripcion: '',
        orden: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 72
      {
        id_parametro: 72,
        grupo: 'disability',
        sigla: '',
        nombre: 'intellectual',
        descripcion: '',
        orden: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 73
      {
        id_parametro: 73,
        grupo: 'disability',
        sigla: '',
        nombre: 'phisic',
        descripcion: '',
        orden: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 74
      {
        id_parametro: 74,
        grupo: 'disability',
        sigla: '',
        nombre: 'multiple',
        descripcion: '',
        orden: 1,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 75
      {
        id_parametro: 75,
        grupo: 'disability',
        sigla: '',
        nombre: 'auditoryLow',
        descripcion: '',
        orden: 2,
        fid_parametro_padre: 71,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 76
      {
        id_parametro: 76,
        grupo: 'disability',
        sigla: '',
        nombre: 'auditoryMedium',
        descripcion: '',
        orden: 2,
        fid_parametro_padre: 71,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 77
      {
        id_parametro: 77,
        grupo: 'disability',
        sigla: '',
        nombre: 'auditoryHigh',
        descripcion: '',
        orden: 2,
        fid_parametro_padre: 71,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 78
      {
        id_parametro: 78,
        grupo: 'disability',
        sigla: '',
        nombre: 'auditoryDeep',
        descripcion: '',
        orden: 2,
        fid_parametro_padre: 71,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 79
      {
        id_parametro: 79,
        grupo: 'disability',
        sigla: '',
        nombre: 'blind',
        descripcion: '',
        orden: 2,
        fid_parametro_padre: 70,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 80
      {
        id_parametro: 80,
        grupo: 'disability',
        sigla: '',
        nombre: 'lowVision',
        descripcion: '',
        orden: 2,
        fid_parametro_padre: 70,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 81
      {
        id_parametro: 81,
        grupo: 'disability',
        sigla: '',
        nombre: 'intellectual',
        descripcion: '',
        orden: 2,
        fid_parametro_padre: 72,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 82
      {
        id_parametro: 82,
        grupo: 'disability',
        sigla: '',
        nombre: 'downSyndrome',
        descripcion: '',
        orden: 2,
        fid_parametro_padre: 72,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 83
      {
        id_parametro: 83,
        grupo: 'disability',
        sigla: '',
        nombre: 'autism',
        descripcion: '',
        orden: 2,
        fid_parametro_padre: 72,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 84
      {
        id_parametro: 84,
        grupo: 'disability',
        sigla: '',
        nombre: 'cerebralParalysis',
        descripcion: '',
        orden: 2,
        fid_parametro_padre: 73,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 85
      {
        id_parametro: 85,
        grupo: 'disability',
        sigla: '',
        nombre: 'traumatism',
        descripcion: '',
        orden: 2,
        fid_parametro_padre: 73,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 86
      {
        id_parametro: 86,
        grupo: 'disability',
        sigla: '',
        nombre: 'congenitalMalformation',
        descripcion: '',
        orden: 2,
        fid_parametro_padre: 73,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 87
      {
        id_parametro: 87,
        grupo: 'disability',
        sigla: '',
        nombre: 'other',
        descripcion: '',
        orden: 2,
        fid_parametro_padre: 73,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 88
      {
        id_parametro: 88,
        grupo: 'disability',
        sigla: '',
        nombre: 'deafblindness',
        descripcion: '',
        orden: 2,
        fid_parametro_padre: 74,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 89
      {
        id_parametro: 89,
        grupo: 'disability',
        sigla: '',
        nombre: 'physicalIntellectual',
        descripcion: '',
        orden: 2,
        fid_parametro_padre: 74,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 90
      {
        id_parametro: 90,
        grupo: 'disability',
        sigla: '',
        nombre: 'visualPhysics',
        descripcion: '',
        orden: 2,
        fid_parametro_padre: 74,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 91
      {
        id_parametro: 91,
        grupo: 'disability',
        sigla: '',
        nombre: 'auditoryPhysique',
        descripcion: '',
        orden: 2,
        fid_parametro_padre: 74,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 92
      {
        id_parametro: 92,
        grupo: 'disability',
        sigla: '',
        nombre: 'auditoryIntellectual',
        descripcion: '',
        orden: 2,
        fid_parametro_padre: 74,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 93
      {
        id_parametro: 93,
        grupo: 'disability',
        sigla: '',
        nombre: 'visualIntellectual',
        descripcion: '',
        orden: 2,
        fid_parametro_padre: 74,
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 94
      {
        id_parametro: 94,
        grupo: 'disability',
        sigla: '',
        nombre: 'other',
        descripcion: '',
        orden: 2,
        fid_parametro_padre: 74,
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
