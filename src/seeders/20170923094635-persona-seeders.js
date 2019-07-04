'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('persona', [
      // 1
      {
        documento_identidad: '0000001',
        lugar_documento_identidad: 'LP',
        complemento_documento: '00',
        fecha_nacimiento: '1980/01/01',
        nombres: 'VirgenNiña',
        primer_apellido: 'VirgenNiña',
        segundo_apellido: 'VirgenNiña',
        nombre_completo: 'VirgenNiña VirgenNiña VirgenNiña',
        genero: 'M',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        tipo_documento: 'CARNET_IDENTIDAD',
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
