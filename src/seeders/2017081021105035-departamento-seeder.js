'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('departamento', [
      {
        // 1
        descripcion: 'Chuquisaca',
        abreviacion: 'CH',
        codigo: '01',
      },{
        // 2
        descripcion: 'La Paz',
        abreviacion: 'LP',
        codigo: '02',
      },{
        // 3
        descripcion: 'Cochabamba',
        abreviacion: 'CBBA',
        codigo: '03',
      },{
        // 4
        descripcion: 'Oruro',
        abreviacion: 'OR',
        codigo: '04',
      },{
        // 5
        descripcion: 'Potosi',
        abreviacion: 'PT',
        codigo: '05',
      },{
        // 6
        descripcion: 'Tarija',
        abreviacion: 'TJ',
        codigo: '06',
      },{
        // 7
        descripcion: 'Santa Cruz',
        abreviacion: 'SC',
        codigo: '07',
      },{
        // 8
        descripcion: 'Beni',
        abreviacion: 'BN',
        codigo: '08',
      },{
        // 9
        descripcion: 'Pando',
        abreviacion: 'PD',
        codigo: '09',
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
