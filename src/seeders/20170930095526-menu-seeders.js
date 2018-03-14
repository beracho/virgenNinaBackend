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
        ruta: '',
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
        ruta: '',
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
  //     // --------------------- SOLICITUDES -------------------------------
  //     {
  //       // 8
  //       nombre: 'PROBOLIVIA',
  //       descripcion: 'PROBOLIVIA',
  //       orden: 1,
  //       ruta: '',
  //       icono: 'file-text-o',
  //       method_get: false,
  //       method_post: false,
  //       method_put: false,
  //       method_delete: false,
  //       estado: 'ACTIVO',
  //       _usuario_creacion:1,
  //       _fecha_creacion: new Date(),
  //       _fecha_modificacion: new Date(),
  //       visible: true,

  //     },
  //     {
  //       // 9
  //       nombre: 'SOLICITUDES',
  //       descripcion: 'SOLICITUDES',
  //       orden: 1,
  //       ruta: 'declaracionesJuradas',
  //       icono: 'group',
  //       method_get: true,
  //       method_post: true,
  //       method_put: true,
  //       method_delete: false,
  //       estado: 'ACTIVO',
  //       _usuario_creacion:1,
  //       _fecha_creacion: new Date(),
  //       _fecha_modificacion: new Date(),
  //       fid_menu_padre: 8,
  //       visible: true,
  //     },
  //     /* ----------- PROMUEVE ---------------------- */
  //     {
  //       // 10
  //       nombre: 'PROMUEVE',
  //       descripcion: 'PROMUEVE',
  //       orden: 2,
  //       ruta: '',
  //       icono: 'file',
  //       method_get: false,
  //       method_post: false,
  //       method_put: false,
  //       method_delete: false,
  //       estado: 'ACTIVO',
  //       _usuario_creacion:1,
  //       _fecha_creacion: new Date(),
  //       _fecha_modificacion: new Date(),
  //       visible: true,

  //     },
  //     {
  //       // 11
  //       nombre: 'BANDEJA',
  //       descripcion: 'BANDEJA',
  //       orden: 1,
  //       ruta: 'bandejaPromueve',
  //       icono: 'group',
  //       method_get: true,
  //       method_post: true,
  //       method_put: true,
  //       method_delete: false,
  //       estado: 'ACTIVO',
  //       _usuario_creacion:1,
  //       _fecha_creacion: new Date(),
  //       _fecha_modificacion: new Date(),
  //       fid_menu_padre: 10,
  //       visible: true,
  //     },
  //     {
  //       // 12
  //       nombre: 'DECLARAR PRODUCTO',
  //       descripcion: 'DECLARAR PRODUCTO',
  //       orden: 2,
  //       ruta: 'matriculaPromueve',
  //       icono: 'group',
  //       method_get: true,
  //       method_post: true,
  //       method_put: true,
  //       method_delete: false,
  //       estado: 'ACTIVO',
  //       _usuario_creacion:1,
  //       _fecha_creacion: new Date(),
  //       _fecha_modificacion: new Date(),
  //       fid_menu_padre: 10,
  //       visible: true,
  //     },
  //     {
  //       // 13
  //       nombre: 'CERTIFICADOS',
  //       descripcion: 'CERTIFICADOS',
  //       orden: 3,
  //       ruta: 'certificadosPromueve',
  //       icono: 'group',
  //       method_get: true,
  //       method_post: true,
  //       method_put: true,
  //       method_delete: false,
  //       estado: 'ACTIVO',
  //       _usuario_creacion:1,
  //       _fecha_creacion: new Date(),
  //       _fecha_modificacion: new Date(),
  //       fid_menu_padre: 10,
  //       visible: true,
  //     },
  //     // --------------------- SOLICITUDES PROMUEVE -------------------------------
  //     {
  //       // 14
  //       nombre: 'PROMUEVE',
  //       descripcion: 'PROMUEVE',
  //       orden: 1,
  //       ruta: '',
  //       icono: 'file-text-o',
  //       method_get: false,
  //       method_post: false,
  //       method_put: false,
  //       method_delete: false,
  //       estado: 'ACTIVO',
  //       _usuario_creacion:1,
  //       _fecha_creacion: new Date(),
  //       _fecha_modificacion: new Date(),
  //       visible: true,

  //     },
  //     {
  //       // 15
  //       nombre: 'SOLICITUDES',
  //       descripcion: 'SOLICITUDES',
  //       orden: 1,
  //       ruta: 'declaracionesJuradasPromueve',
  //       icono: 'group',
  //       method_get: true,
  //       method_post: true,
  //       method_put: true,
  //       method_delete: false,
  //       estado: 'ACTIVO',
  //       _usuario_creacion:1,
  //       _fecha_creacion: new Date(),
  //       _fecha_modificacion: new Date(),
  //       fid_menu_padre: 14,
  //       visible: true,
  //     },

  //     {
  //       // 16
  //       nombre: 'NUEVO REGISTRO',
  //       descripcion: 'NUEVO REGISTRO',
  //       orden: 3,
  //       ruta: 'matricula',
  //       icono: 'group',
  //       method_get: true,
  //       method_post: true,
  //       method_put: true,
  //       method_delete: false,
  //       estado: 'ACTIVO',
  //       _usuario_creacion:1,
  //       _fecha_creacion: new Date(),
  //       _fecha_modificacion: new Date(),
  //       fid_menu_padre: 8,
  //       visible: true,
  //     },
  //     {
  //       // 17
  //       nombre: 'DECLARACIONES JURADAS',
  //       descripcion: 'DECLARACIONES JURADAS',
  //       orden: 2,
  //       ruta: 'bandeja',
  //       icono: 'group',
  //       method_get: true,
  //       method_post: true,
  //       method_put: true,
  //       method_delete: false,
  //       estado: 'ACTIVO',
  //       _usuario_creacion:1,
  //       _fecha_creacion: new Date(),
  //       _fecha_modificacion: new Date(),
  //       fid_menu_padre: 8,
  //       visible: true,
  //     },
  //     {
  //       // 18
  //       nombre: 'CERTIFICADOS',
  //       descripcion: 'CERTIFICADOS',
  //       orden: 3,
  //       ruta: 'solicitud',
  //       icono: 'group',
  //       method_get: true,
  //       method_post: true,
  //       method_put: true,
  //       method_delete: false,
  //       estado: 'ACTIVO',
  //       _usuario_creacion:1,
  //       _fecha_creacion: new Date(),
  //       _fecha_modificacion: new Date(),
  //       fid_menu_padre: 10,
  //       visible: true,
  //     },
  //     {
  //       // 19
  //       nombre: 'CERTIFICACIONES',
  //       descripcion: 'CERTIFICACIONES',
  //       orden: 3,
  //       ruta: 'certificaciones',
  //       icono: 'group',
  //       method_get: true,
  //       method_post: true,
  //       method_put: true,
  //       method_delete: false,
  //       estado: 'ACTIVO',
  //       _usuario_creacion:1,
  //       _fecha_creacion: new Date(),
  //       _fecha_modificacion: new Date(),
  //       fid_menu_padre: 14,
  //       visible: true,
  //     },
  //     {
  //       // 20
  //       nombre: 'TRÁMITES CONCLUIDOS',
  //       descripcion: 'TRÁMITES CONCLUIDOS',
  //       orden: 4,
  //       ruta: 'tramitesRechazados',
  //       icono: 'group',
  //       method_get: true,
  //       method_post: true,
  //       method_put: true,
  //       method_delete: false,
  //       estado: 'ACTIVO',
  //       _usuario_creacion:1,
  //       _fecha_creacion: new Date(),
  //       _fecha_modificacion: new Date(),
  //       fid_menu_padre: 14,
  //       visible: true,
  //     },
  //     {
  //       // 21
  //       nombre: 'DUPLICADOS',
  //       descripcion: 'DUPLICADOS',
  //       orden: 3,
  //       ruta: 'bandejaDuplicados',
  //       icono: 'group',
  //       method_get: true,
  //       method_post: true,
  //       method_put: true,
  //       method_delete: false,
  //       estado: 'ACTIVO',
  //       _usuario_creacion:1,
  //       _fecha_creacion: new Date(),
  //       _fecha_modificacion: new Date(),
  //       fid_menu_padre: 8,
  //       visible: true,
  //     },      
  //     {
  //       // 22 Para la unidad productiva
  //       nombre: 'SELLO HECHO EN BOLIVIA',
  //       descripcion: 'SELLO HECHO EN BOLIVIA',
  //       orden: 3,
  //       ruta: '',
  //       icono: 'settings',
  //       method_get: false,
  //       method_post: false,
  //       method_put: false,
  //       method_delete: false,
  //       estado: 'ACTIVO',
  //       _usuario_creacion:1,
  //       _fecha_creacion: new Date(),
  //       _fecha_modificacion: new Date(),
  //       visible: true,
  //     },
  //     {
  //       // 23 Bandeja de unidad productiva para ver estado de sellos
  //       nombre: 'BANDEJA',
  //       descripcion: 'BANDEJA',
  //       orden: 3,
  //       ruta: 'bandejaSello',
  //       icono: 'group',
  //       method_get: true,
  //       method_post: true,
  //       method_put: true,
  //       method_delete: false,
  //       estado: 'ACTIVO',
  //       _usuario_creacion:1,
  //       _fecha_creacion: new Date(),
  //       _fecha_modificacion: new Date(),
  //       fid_menu_padre: 22,
  //       visible: true,
  //     },
  //     {
  //       // 24 Bandeja de unidad productiva
  //       nombre: 'NUEVO REGISTRO',
  //       descripcion: 'NUEVO REGISTRO',
  //       orden: 3,
  //       ruta: 'nuevoRegistroSello',
  //       icono: 'group',
  //       method_get: true,
  //       method_post: true,
  //       method_put: true,
  //       method_delete: false,
  //       estado: 'ACTIVO',
  //       _usuario_creacion:1,
  //       _fecha_creacion: new Date(),
  //       _fecha_modificacion: new Date(),
  //       fid_menu_padre: 22,
  //       visible: true,
  //     },

  //     {
  //       // 25 Para tecnico
  //       nombre: 'SELLO HECHO EN BOLIVIA',
  //       descripcion: 'SELLO HECHO EN BOLIVIA',
  //       orden: 4,
  //       ruta: '',
  //       icono: 'settings',
  //       method_get: false,
  //       method_post: false,
  //       method_put: false,
  //       method_delete: false,
  //       estado: 'ACTIVO',
  //       _usuario_creacion:1,
  //       _fecha_creacion: new Date(),
  //       _fecha_modificacion: new Date(),
  //       visible: true,
  //     },
  //     {
  //       // 26 Para tecnico
  //       nombre: 'BANDEJA',
  //       descripcion: 'BANDEJA',
  //       orden: 1,
  //       ruta: 'bandejaSolSello',
  //       icono: 'group',
  //       method_get: true,
  //       method_post: true,
  //       method_put: true,
  //       method_delete: false,
  //       estado: 'ACTIVO',
  //       _usuario_creacion:1,
  //       _fecha_creacion: new Date(),
  //       _fecha_modificacion: new Date(),
  //       fid_menu_padre: 25,
  //       visible: true,
  //     },
  //     {
  //       // 27
  //       nombre: 'BANCO UNION',
  //       descripcion: 'Administración de credenciales Banco Unión',
  //       orden: 16,
  //       ruta: 'actualizarBancoUnion',
  //       icono: 'group',
  //       method_get: true,
  //       method_post: true,
  //       method_put: true,
  //       method_delete: false,
  //       estado: 'ACTIVO',
  //       _usuario_creacion:1,
  //       _fecha_creacion: new Date(),
  //       _fecha_modificacion: new Date(),
  //       fid_menu_padre: 1,
  //       visible: true,
  //     },
      
  //     // ----------------------------- ADMINISTRACIÓN TECNICO PROMUEVE -------------------------------
  //     {
  //       // 28 Para tecnico administrador PROMUEVE
  //       nombre: 'ADMINISTRACIÓN',
  //       descripcion: 'ADMINISTRACIÓN',
  //       orden: 1,
  //       ruta: '',
  //       icono: 'settings',
  //       method_get: false,
  //       method_post: false,
  //       method_put: false,
  //       method_delete: false,
  //       estado: 'ACTIVO',
  //       _usuario_creacion:1,
  //       _fecha_creacion: new Date(),
  //       _fecha_modificacion: new Date(),
  //       visible: true,
  //     },
  //     {
  //       // 29 Para tecnico
  //       nombre: 'BANCO UNION',
  //       descripcion: 'Administración de credenciales Banco Unión',
  //       orden: 2,
  //       ruta: 'actualizarBancoUnionPromueve',
  //       icono: 'group',
  //       method_get: true,
  //       method_post: true,
  //       method_put: true,
  //       method_delete: false,
  //       estado: 'ACTIVO',
  //       _usuario_creacion:1,
  //       _fecha_creacion: new Date(),
  //       _fecha_modificacion: new Date(),
  //       fid_menu_padre: 28,
  //       visible: true,
  //     },
  //     // -------------------------------- DIRECTOR PROBOLIVIA -------------------------------
  //     // Probolivia
  //     {
  //       // 30
  //       nombre: 'PROBOLIVIA',
  //       descripcion: 'PROBOLIVIA',
  //       orden: 1,
  //       ruta: '',
  //       icono: 'file-text-o',
  //       method_get: false,
  //       method_post: false,
  //       method_put: false,
  //       method_delete: false,
  //       estado: 'INACTIVO',
  //       _usuario_creacion:1,
  //       _fecha_creacion: new Date(),
  //       _fecha_modificacion: new Date(),
  //       visible: true,
  //     },
  //     {
  //       // 31
  //       nombre: 'SOLICITUDES',
  //       descripcion: 'SOLICITUDES',
  //       orden: 1,
  //       ruta: 'solicitudesFirmaProbolivia',
  //       icono: 'group',
  //       method_get: true,
  //       method_post: true,
  //       method_put: true,
  //       method_delete: false,
  //       estado: 'ACTIVO',
  //       _usuario_creacion:1,
  //       _fecha_creacion: new Date(),
  //       _fecha_modificacion: new Date(),
  //       fid_menu_padre: 30,
  //       visible: true,
  //     },
  //     // Promueve
  //     {
  //       // 32
  //       nombre: 'PROMUEVE',
  //       descripcion: 'PROMUEVE',
  //       orden: 2,
  //       ruta: '',
  //       icono: 'file-text-o',
  //       method_get: false,
  //       method_post: false,
  //       method_put: false,
  //       method_delete: false,
  //       estado: 'INACTIVO',
  //       _usuario_creacion:1,
  //       _fecha_creacion: new Date(),
  //       _fecha_modificacion: new Date(),
  //       visible: true,
  //     },
  //     {
  //       // 33
  //       nombre: 'SOLICITUDES',
  //       descripcion: 'SOLICITUDES',
  //       orden: 1,
  //       ruta: 'solicitudesFirmaPromueve',
  //       icono: 'group',
  //       method_get: true,
  //       method_post: true,
  //       method_put: true,
  //       method_delete: false,
  //       estado: 'ACTIVO',
  //       _usuario_creacion:1,
  //       _fecha_creacion: new Date(),
  //       _fecha_modificacion: new Date(),
  //       fid_menu_padre: 32,
  //       visible: true,
  //     },
      
  //     // Sello Hecho en Bolivia
  //     {
  //       // 34 Para tecnico
  //       nombre: 'SELLO HECHO EN BOLIVIA',
  //       descripcion: 'SELLO HECHO EN BOLIVIA',
  //       orden: 3,
  //       ruta: '',
  //       icono: 'settings',
  //       method_get: false,
  //       method_post: false,
  //       method_put: false,
  //       method_delete: false,
  //       estado: 'ACTIVO',
  //       _usuario_creacion:1,
  //       _fecha_creacion: new Date(),
  //       _fecha_modificacion: new Date(),
  //       visible: true,
  //     },
  //     {
  //       // 35 Para tecnico
  //       nombre: 'SOLICITUDES',
  //       descripcion: 'SOLICITUDES',
  //       orden: 1,
  //       ruta: 'solicitudesFirmaSHB',
  //       icono: 'group',
  //       method_get: true,
  //       method_post: true,
  //       method_put: true,
  //       method_delete: false,
  //       estado: 'ACTIVO',
  //       _usuario_creacion:1,
  //       _fecha_creacion: new Date(),
  //       _fecha_modificacion: new Date(),
  //       fid_menu_padre: 25,
  //       visible: true,
  //     },
      
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
