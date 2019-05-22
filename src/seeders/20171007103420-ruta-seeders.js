'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ruta', [
      {
        // 1
        ruta: '/api/v1/usuarios',
        descripcion: 'Ruta para administrar los usuarios',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        // 2
        ruta: '/api/v1/roles',
        descripcion: 'Ruta para listar los roles',
        method_get: true,
        method_post: false,
        method_put: false,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        // 3
        ruta: '/api/v1/parametros/',
        descripcion: 'Acciones sobre los parámetros.',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: true,
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        // 4
        ruta: '/api/v1/servicios',
        descripcion: 'Acciones sobre los servicios.',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: true,
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        // 5
        ruta: '/api/v1/cambiarRol',
        descripcion: 'Servicio para cambiar rol de un usuario.',
        method_get: false,
        method_post: true,
        method_put: false,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      }, {
        //6
        ruta: '/api/v1/codigoDeptos',
        descripcion: 'Devuelve abreviaturas de departamentos.',
        method_get: true,
        method_post: false,
        method_put: false,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      }, {
        //7
        ruta: '/api/v1/usuarios/:id',
        descripcion: 'Acciones sobre un determinado usuario.',
        method_get: true,
        method_post: false,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      }, 
      {
        //8
        ruta: '/api/v1/usuarios/reenviar',
        descripcion: 'Servicio para reenviar el correo a un usuario.',
        method_get: false,
        method_post: true,
        method_put: false,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      }, 
      {
        //9
        ruta: '/api/v1/mypass',
        descripcion: 'Servicio para cambiar password de un usuario.',
        method_get: false,
        method_post: false,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      }, 
      {
        //10
        ruta: '/api/v1/usuarios/:id/confirmar_correo',
        descripcion: 'Servicio para confirmar el correo electrónico de un usuario.',
        method_get: false,
        method_post: false,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      }, {
        //11
        ruta: '/api/v1/usuarios/:id/confirmar',
        descripcion: 'Servicio para confirmar una cuenta de usuario.',
        method_get: false,
        method_post: false,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      }, {
        //12
        ruta: '/api/v1/unidadEducativa/:id',
        descripcion: 'Servicio para obtener datos de una unidad productiva a partir del SIE.',
        method_get: true,
        method_post: false,
        method_put: false,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      }, {
        //13
        ruta: '/api/v1/unidadesEducativas',
        descripcion: 'Devuelve todas las unidades educativas.',
        method_get: true,
        method_post: false,
        method_put: false,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      }, {
        //14
        ruta: '/api/v1/estudiantes',
        descripcion: 'Obtiene la lista de estudiantes.',
        method_get: true,
        method_post: false,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      }, {
        //15
        ruta: '/api/v1/piocs',
        descripcion: 'Devuelve lista de todos los Pueblos Indigenas Originario Campesinos.',
        method_get: true,
        method_post: false,
        method_put: false,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      }, {
        //16
        ruta: '/api/v1/registroRude',
        descripcion: 'Actualización de datos en registro RUDE.',
        method_get: false,
        method_post: false,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      }, {
        //17
        ruta: '/api/v1/dpaHijos',
        descripcion: 'Devuelve hijos de el DPA enviado.',
        method_get: true,
        method_post: false,
        method_put: false,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      }, {
        //18
        ruta: '/api/v1/dpaPadre',
        descripcion: 'Devuelve el padre del DPA enviado.',
        method_get: true,
        method_post: false,
        method_put: false,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      }, {
        //19
        ruta: '/api/v1/dpaNivel',
        descripcion: 'Devuelve todos los DPA de un mismo nivel.',
        method_get: true,
        method_post: false,
        method_put: false,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      }, {
        //20
        ruta: '/api/v1/parametrosRude',
        descripcion: 'Parametros para el registro Rude.',
        method_get: true,
        method_post: false,
        method_put: false,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      }, {
        //21
        ruta: '/api/v1/unidadEducativa',
        descripcion: 'Crea una unidad educativa.',
        method_get: false,
        method_post: true,
        method_put: false,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      }, {
        //22
        ruta: '/api/v1/importarEstudiantes',
        descripcion: 'Servicio para cargar un archivo CSV.',
        method_get: false,
        method_post: true,
        method_put: false,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      }, {
        //23
        ruta: '/api/v1/cursos/',
        descripcion: 'Servicio para obtener la lista de cursos.',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      }, {
        //24
        ruta: '/api/v1/estudiantesCurso',
        descripcion: 'Servicio para listar estudiantes de un curso determinado.',
        method_get: true,
        method_post: false,
        method_put: false,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      }, {
        //25
        ruta: '/api/v1/registroSimple',
        descripcion: 'Servicio para crear un nuevo registro simple.',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: true,
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      }, {
        //26
        ruta: '/api/v1/registros',
        descripcion: 'Acciones sobre registros.',
        method_get: false,
        method_post: false,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      }, {
        //27
        ruta: '/api/v1/parentezco',
        descripcion: 'Acciones sobre parientes de estudiante.',
        method_get: true,
        method_post: false,
        method_put: true,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      }, {
        //28
        ruta: '/api/v1/registroEvalTrabajoSocial',
        descripcion: 'Acciones sobre registros de evaluación de trabajo social.',
        method_get: true,
        method_post: true,
        method_put: true,
        method_delete: true,
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      }, {
        //29
        ruta: '/api/v1/imprimirRegistro',
        descripcion: 'Crea pdf del registro seleccionado.',
        method_get: true,
        method_post: false,
        method_put: false,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      }, {
        //30
        ruta: '/api/v1/informesPorArea',
        descripcion: 'Estadísticas de reportes.',
        method_get: false,
        method_post: true,
        method_put: false,
        method_delete: false,
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
    ], {});
  },

  down(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  },
};
