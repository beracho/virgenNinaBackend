'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('curso', [
      // 1
      {
        nombre: 'AT',
        descripcion: 'APOYO LIMITADO EXTENSO ',
        tipo_discapacidad: 'DISCAPACIDAD INTELECTUAL',
        criterio_edad: '3-5',
        maestro: 'LIDIA CONDORI',
        grado: 'ATENCION TEMPRANA',
        nivel: 0,
        paralelo: 'A',
        gestion: '2018',
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 2
      {
        nombre: 'AT',
        descripcion: 'APOYO LIMITADO INTERMITENTE ',
        tipo_discapacidad: 'DISCAPACIDAD INTELECTUAL',
        criterio_edad: '3-5',
        maestro: 'LUCY  OCHOA ',
        grado: 'ATENCION TEMPRANA',
        nivel: 0,
        paralelo: 'B',
        gestion: '2018',
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 3
      {
        nombre: 'INI 1',
        descripcion: 'APOYO LIMITADO INTERMITENTE ',
        tipo_discapacidad: 'DISCAPACIDAD INTELECTUAL',
        criterio_edad: '4-6',
        maestro: 'MARTHA MAMANI',
        grado: 'ATENCION TEMPRANA',
        nivel: 0,
        paralelo: 'A',
        gestion: '2018',
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 4
      {
        nombre: 'INI 1',
        descripcion: 'APOYO EXTENSO Y GENERALIZADO ',
        tipo_discapacidad: 'DISCAPACIDAD MULTIPLE',
        criterio_edad: '6-7',
        maestro: 'VERONICA CONTRERAS',
        grado: 'ATENCION TEMPRANA',
        nivel: 0,
        paralelo: 'B',
        gestion: '2018',
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 5
      {
        nombre: 'INI 1',
        descripcion: 'APOYO LIMITADO Y EXTENSO ',
        tipo_discapacidad: 'DISCAPACIDAD MULTIPLE',
        criterio_edad: '5-7',
        maestro: 'VERONICA QUISPE',
        grado: 'ATENCION TEMPRANA',
        nivel: 0,
        paralelo: 'C',
        gestion: '2018',
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 6
      {
        nombre: 'INI 1',
        descripcion: 'APOYO LIMITADO INTERMITENTE',
        tipo_discapacidad: 'DISCAPACIDAD MULTIPLE',
        criterio_edad: '5-7',
        maestro: 'FRESIA CALDERON',
        grado: 'ATENCION TEMPRANA',
        nivel: 0,
        paralelo: 'D',
        gestion: '2018',
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 7
      {
        nombre: 'INI 1',
        descripcion: 'APOYO LIMITADO EXTENSO ',
        tipo_discapacidad: 'DISCAPACIDAD INTELECTUAL',
        criterio_edad: '5-7',
        maestro: 'PATRICIA CHOQUE',
        grado: 'ATENCION TEMPRANA',
        nivel: 0,
        paralelo: 'E',
        gestion: '2018',
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 8
      {
        nombre: 'INI 2',
        descripcion: 'APOYO LIMITADO EXTENSO ',
        tipo_discapacidad: 'DISCAPACIDAD MULTIPLE',
        criterio_edad: '2-5',
        maestro: 'EVA CALLISAYA',
        grado: 'INDEPENDENCIA PERSONAL',
        nivel: 1,
        paralelo: 'A',
        gestion: '2018',
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 9
      {
        nombre: 'INI 2',
        descripcion: 'APOYO LIMITADO INTERMITENTE',
        tipo_discapacidad: 'DISCAPACIDAD MULTIPLE',
        criterio_edad: '6-9',
        maestro: 'CRISTINA MAMANI',
        grado: 'INDEPENDENCIA PERSONAL',
        nivel: 1,
        paralelo: 'B',
        gestion: '2018',
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 10
      {
        nombre: 'INI 2',
        descripcion: 'APOYO LIMITADO INTERMITENTE',
        tipo_discapacidad: 'DISCAPACIDAD MULTIPLE',
        criterio_edad: '6-9',
        maestro: 'DENNYS RODRIGUEZ',
        grado: 'INDEPENDENCIA PERSONAL',
        nivel: 1,
        paralelo: 'C',
        gestion: '2018',
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 11
      {
        nombre: 'PRI 1',
        descripcion: 'APOYO EXTENSO Y GENERALIZADO',
        tipo_discapacidad: 'DISCAPACIDAD MULTIPLE',
        criterio_edad: '8-12',
        maestro: 'BASILIA JULI',
        grado: 'INDEPENDENCIA PERSONAL',
        nivel: 1,
        paralelo: 'A',
        gestion: '2018',
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 12
      {
        nombre: 'PRI 1',
        descripcion: 'APOYO EXTENSO Y GENERALIZADO',
        tipo_discapacidad: 'DISCAPACIDAD MULTIPLE',
        criterio_edad: '9-12',
        maestro: 'SAULO ALANOCA',
        grado: 'INDEPENDENCIA PERSONAL',
        nivel: 1,
        paralelo: 'B',
        gestion: '2018',
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 13
      {
        nombre: 'PRI 1',
        descripcion: 'APOYO EXTENSO Y GENERALIZADO',
        tipo_discapacidad: 'DISCAPACIDAD MULTIPLE',
        criterio_edad: '8-12',
        maestro: 'FLORA RUTH',
        grado: 'INDEPENDENCIA PERSONAL',
        nivel: 1,
        paralelo: 'C',
        gestion: '2018',
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 14
      {
        nombre: 'PRI 1',
        descripcion: 'APOYO EXTENSO Y GENERALIZADO',
        tipo_discapacidad: 'DISCAPACIDAD MULTIPLE',
        criterio_edad: '8-10',
        maestro: 'FREDDY SILLERICO',
        grado: 'INDEPENDENCIA PERSONAL',
        nivel: 1,
        paralelo: 'D',
        gestion: '2018',
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 15
      {
        nombre: 'PRI 2',
        descripcion: 'APOYO EXTENSO',
        tipo_discapacidad: 'DISCAPACIDAD INTELECTUAL',
        criterio_edad: '9-12',
        maestro: 'ROSSANA QUISPE',
        grado: 'INDEPENDENCIA PERSONAL',
        nivel: 2,
        paralelo: 'A',
        gestion: '2018',
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 16
      {
        nombre: 'PRI 2',
        descripcion: 'APOYO EXTENSO',
        tipo_discapacidad: 'DISCAPACIDAD MULTIPLE',
        criterio_edad: '2-5',
        maestro: 'ASUNCION APAZA',
        grado: 'INDEPENDENCIA PERSONAL',
        nivel: 2,
        paralelo: 'B',
        gestion: '2018',
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 17
      {
        nombre: 'PRI 2',
        descripcion: 'APOYO LIMITADO',
        tipo_discapacidad: 'DISCAPACIDAD MULTIPLE',
        criterio_edad: '9-12',
        maestro: 'JULIETA AMARU',
        grado: 'INDEPENDENCIA PERSONAL',
        nivel: 2,
        paralelo: 'C',
        gestion: '2018',
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 18
      {
        nombre: 'PRI 2',
        descripcion: 'APOYO LIMITADO E INTERMITENTE',
        tipo_discapacidad: 'DISCAPACIDAD MULTIPLE',
        criterio_edad: '8-10',
        maestro: 'ROSSIO REVILLA',
        grado: 'INDEPENDENCIA PERSONAL',
        nivel: 2,
        paralelo: 'D',
        gestion: '2018',
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 19
      {
        nombre: 'PRI 3',
        descripcion: 'APOYO  LIMITADO INTERMITENTE',
        tipo_discapacidad: 'DISCAPACIDAD MULTIPLE',
        criterio_edad: '8-11',
        maestro: 'GABRIELA TERCEROS',
        grado: 'INDEPENDENCIA PERSONAL',
        nivel: 2,
        paralelo: 'A',
        gestion: '2018',
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 20
      {
        nombre: 'PRI 3',
        descripcion: 'APOYO  LIMITADO INTERMITENTE',
        tipo_discapacidad: 'DISCAPACIDAD MULTIPLE',
        criterio_edad: '8-11',
        maestro: 'PAOLA LAURA',
        grado: 'INDEPENDENCIA PERSONAL',
        nivel: 2,
        paralelo: 'B',
        gestion: '2018',
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 21
      {
        nombre: 'PRI SOC',
        descripcion: 'APOYO LIMITADO',
        tipo_discapacidad: 'DISCAPACIDAD INTELECTUAL',
        criterio_edad: '12-13',
        maestro: 'CELIA GUTIERREZ',
        grado: 'INDEPENDENCIA SOCIAL',
        nivel: 3,
        paralelo: 'A',
        gestion: '2018',
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _usuario_modificacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date()
      },
      // 22
      {
        nombre: 'PRI SOC',
        descripcion: 'APOYO LIMITADO INTERMITENTE',
        tipo_discapacidad: 'DISCAPACIDAD MULTIPLE',
        criterio_edad: '9-12',
        maestro: 'CLAUDINA CHOQUE',
        grado: 'INDEPENDENCIA SOCIAL',
        nivel: 3,
        paralelo: 'B',
        gestion: '2018',
        estado: 'ACTIVO',
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
