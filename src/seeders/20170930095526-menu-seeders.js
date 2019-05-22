'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('menu', [
      // --------------------- ADMINISTRACIÓN -------------------------------
      {
        // 1
        nombre: 'ADMINISTRACIÓN',
        descripcion: 'Administración',
        orden: 1,
        ruta: 'administration',
        icono: 'settings',
        method_get: false,
        method_post: false,
        method_put: false,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        visible: true,
      },
      {
        // 2
        nombre: 'USUARIOS',
        descripcion: 'Administración de usuarios',
        orden: 5,
        ruta: 'usuarios',
        icono: 'group',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_menu_padre: 1,
        visible: true,
      },
      {
        // 3
        nombre: 'PARÁMETROS',
        descripcion: 'Configuración',
        orden: 10,
        ruta: 'configuracion',
        icono: 'settings',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_menu_padre: 1,
        visible: true,
      },
      {
        // 4
        nombre: 'SERVICIOS',
        descripcion: 'Servicios',
        orden: 15,
        ruta: 'servicios',
        icono: 'settings',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'INACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_menu_padre: 1,
        visible: true,
      },
      // --------------------- INSCRIPCIONES -------------------------------
      {
        // 5
        nombre: 'INSCRIPCIONES',
        descripcion: 'Registro de niños',
        orden: 1,
        ruta: 'inscriptions',
        icono: 'file',
        method_get: false,
        method_post: false,
        method_put: false,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        visible: true,
      },
      {
        // 6
        nombre: 'CURSOS',
        descripcion: 'Administración de cursos',
        orden: 1,
        ruta: 'cursos',
        icono: 'book',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_menu_padre: 5,
        visible: true,
      },
      {
        // 7
        nombre: 'INSCRITOS',
        descripcion: 'INSCRITOS',
        orden: 1,
        ruta: 'bandejaInscritos',
        icono: 'group',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_menu_padre: 5,
        visible: true,
      },
      {
        // 8
        nombre: 'NUEVO REGISTRO',
        descripcion: 'NUEVO REGISTRO',
        orden: 2,
        ruta: 'registroInscripcion',
        icono: 'assignment',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_menu_padre: 5,
        visible: true,
      },
      // --------------------- Citas Médicas -------------------------------
      {
        // 9
        nombre: 'LISTA DE NIÑOS',
        descripcion: 'Listado de niños',
        orden: 1,
        ruta: 'listaNinos',
        icono: 'format_list_bulleted',
        method_get: false,
        method_post: false,
        method_put: false,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        visible: true,
      },
      {
        // 10
        nombre: 'BÚSQUEDA',
        descripcion: 'Búsqueda de niños',
        orden: 1,
        ruta: 'busquedaNino',
        icono: 'search',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_menu_padre: 9,
        visible: true,
      },
      {
        // 11
        nombre: 'SEGUIMIENTO MEDICO',
        descripcion: 'SEGUIMIENTO MEDICO',
        orden: 1,
        ruta: 'medicalFollowUp',
        icono: 'filter_vintage',
        method_get: false,
        method_post: false,
        method_put: false,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        visible: false,
      },
      {
        // 12
        nombre: 'DATOS',
        descripcion: 'DATOS',
        orden: 1,
        ruta: 'datosEstudiante',
        icono: 'perm_contact_calendar',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_menu_padre: 11,
        visible: true,
      },
      {
        // 13
        nombre: 'ARCHIVADO',
        descripcion: 'ARCHIVADO',
        orden: 1,
        ruta: 'registrosArchivados',
        icono: 'bookmarks',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_menu_padre: 11,
        visible: true,
      },
      {
        // 14
        nombre: 'REGISTRO SIMPLE',
        descripcion: 'REGISTRO SIMPLE',
        orden: 1,
        ruta: 'registroSimple',
        icono: 'receipt',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_menu_padre: 11,
        visible: true,
      },
      {
        // 15
        nombre: 'REGISTRO EVALUACION EDUCACION',
        descripcion: 'REGISTRO EVALUACION EDUCACION',
        orden: 1,
        ruta: 'registroEvaluacionEducacion',
        icono: 'star_rate',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_menu_padre: 11,
        visible: true,
      },
      {
        // 16
        nombre: 'REGISTRO EVALUACION FISIOTERAPIA',
        descripcion: 'REGISTRO EVALUACION FISIOTERAPIA',
        orden: 1,
        ruta: 'registroEvaluacionFisioterapia',
        icono: 'star_rate',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_menu_padre: 11,
        visible: true,
      },
      {
        // 17
        nombre: 'REGISTRO EVALUACION FONOAUDIOLOGIA',
        descripcion: 'REGISTRO EVALUACION FONOAUDIOLOGIA',
        orden: 1,
        ruta: 'registroEvaluacionFonoaudiologia',
        icono: 'star_rate',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_menu_padre: 11,
        visible: true,
      },
      {
        // 18
        nombre: 'REGISTRO EVALUACION MEDICINA GENERAL',
        descripcion: 'REGISTRO EVALUACION MEDICINA GENERAL',
        orden: 1,
        ruta: 'registroEvaluacionMedicinaGeneral',
        icono: 'star_rate',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_menu_padre: 11,
        visible: true,
      },
      {
        // 19
        nombre: 'REGISTRO EVALUACION NUTRICION',
        descripcion: 'REGISTRO EVALUACION NUTRICION',
        orden: 1,
        ruta: 'registroEvaluacionNutricion',
        icono: 'star_rate',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_menu_padre: 11,
        visible: true,
      },
      {
        // 20
        nombre: 'REGISTRO EVALUACION ODONTOLOGIA',
        descripcion: 'REGISTRO EVALUACION ODONTOLOGIA',
        orden: 1,
        ruta: 'registroEvaluacionOdontologia',
        icono: 'star_rate',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_menu_padre: 11,
        visible: true,
      },
      {
        // 21
        nombre: 'REGISTRO EVALUACION PSICOLOGIA',
        descripcion: 'REGISTRO EVALUACION PSICOLOGIA',
        orden: 1,
        ruta: 'registroEvaluacionPsicologia',
        icono: 'star_rate',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_menu_padre: 11,
        visible: true,
      },
      {
        // 22
        nombre: 'REGISTRO EVALUACION PSICOMOTRICIDAD',
        descripcion: 'REGISTRO EVALUACION PSICOMOTRICIDAD',
        orden: 1,
        ruta: 'registroEvaluacionPsicomotricidad',
        icono: 'star_rate',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_menu_padre: 11,
        visible: true,
      },
      {
        // 23
        nombre: 'REGISTRO EVALUACION PSICOPEDAGOGIA',
        descripcion: 'REGISTRO EVALUACION PSICOPEDAGOGIA',
        orden: 1,
        ruta: 'registroEvaluacionPsicopedagogia',
        icono: 'star_rate',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_menu_padre: 11,
        visible: true,
      },
      {
        // 24
        nombre: 'REGISTRO EVALUACION TERAPIA OCUPACIONAL',
        descripcion: 'REGISTRO EVALUACION TERAPIA OCUPACIONAL',
        orden: 1,
        ruta: 'registroEvaluacionTerapiaOcupacional',
        icono: 'star_rate',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_menu_padre: 11,
        visible: true,
      },
      {
        // 25
        nombre: 'REGISTRO EVALUACION TRABAJO SOCIAL',
        descripcion: 'REGISTRO EVALUACION TRABAJO SOCIAL',
        orden: 1,
        ruta: 'registroEvaluacionTrabajoSocial',
        icono: 'star_rate',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_menu_padre: 11,
        visible: true,
      },
      {
        // 26
        nombre: 'REGISTRO SEMESTRAL',
        descripcion: 'REGISTRO SEMESTRAL',
        orden: 1,
        ruta: 'registroSemestral',
        icono: 'chrome_reader_mode',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_menu_padre: 11,
        visible: true,
      },
      {
        // 27
        nombre: 'REGISTROS POR AREA',
        descripcion: 'REGISTROS POR AREA',
        orden: 1,
        ruta: 'registrosPorArea',
        icono: 'assessment',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_menu_padre: 11,
        visible: true,
      },
      {
        // 28
        nombre: 'REGISTROS',
        descripcion: 'REGISTROS',
        orden: 1,
        ruta: 'registrosDireccion',
        icono: 'folder_shared',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion:1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_menu_padre: 11,
        visible: true,
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
