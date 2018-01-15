'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('registro_inscripcion', [
      // 1
      {
        oficialia: 'ofi_14',
        libro: 'lib_14',
        partida: 'par_14',
        folio: 'fol_14',
        centro_salud: true,
        frecuencia_medica: 4,
        origen_agua: 'well',
        acceso_electricidad: true,
        destino_agua: 'sewer',
        actividad_laboral: 'ninguna',
        dias_trabajo: 0,
        salario: false,
        acceso_internet: 'domicilio',
        frecuencia_internet: 'semanal',
        medio_transporte: 'pie',
        duracion_transporte: 'una a dos horas',
        vigente: true,
        estado: 'ACTIVO',
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
        libro: 'lib_15',
        partida: 'par_15',
        folio: 'fol_15',
        centro_salud: true,
        frecuencia_medica: 6,
        origen_agua: 'netConexion',
        acceso_electricidad: true,
        destino_agua: 'blindWell',
        actividad_laboral: 'ninguna',
        dias_trabajo: 0,
        salario: false,
        acceso_internet: 'escuela',
        frecuencia_internet: 'diaria',
        medio_transporte: 'helicoptero',
        duracion_transporte: 'menos de media hora',
        vigente: true,
        estado: 'ACTIVO',
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
