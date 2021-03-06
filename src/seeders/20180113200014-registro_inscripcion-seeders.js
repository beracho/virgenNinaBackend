'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('registro_inscripcion', [
      // 1
      {
        oficialia: 'ofi_14',
        libro: 14,
        partida: 14,
        folio: 14,
        centro_salud: true,
        frecuencia_medica: 4,
        origen_agua: 'well',
        acceso_electricidad: true,
        destino_agua: 'sewer',
        actividad_laboral: 'none',
        dias_trabajo: 0,
        salario: false,
        acceso_internet: 'domicilio',
        frecuencia_internet: 'onceAWeek',
        medio_transporte: 'foot',
        duracion_transporte: 'twoOrMore',
        vigente: true,
        ruta_reporte: '/home/Downloads/elSuperReporte.pdf',
        lugar_envio: 'La Paz',
        _fecha_envio: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_pioc: 1
      },
      // 2
      {
        oficialia: 'ofi_15',
        libro: 15,
        partida: 15,
        folio: 15,
        centro_salud: true,
        frecuencia_medica: 6,
        origen_agua: 'netConexion',
        acceso_electricidad: true,
        destino_agua: 'blindWell',
        actividad_laboral: 'publicTransport',
        dias_trabajo: 0,
        salario: false,
        acceso_internet: 'escuela',
        frecuencia_internet: 'daily',
        medio_transporte: 'bicycle',
        duracion_transporte: 'halfHour',
        vigente: true,
        ruta_reporte: '/home/Downloads/elSuperReporte.pdf',
        lugar_envio: 'La Paz',
        _fecha_envio: new Date(),
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_pioc: 4
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
