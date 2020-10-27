'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    console.log("generando ");
    return queryInterface.sequelize.query(`
    UPDATE persona set fid_estudiante= 1, fid_direccion = 1, fid_lugar_nacimiento = 3 where id_persona = 14;
    UPDATE persona set fid_estudiante= 2, fid_direccion = 2, fid_lugar_nacimiento = 4 where id_persona = 15;
    `);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.resolve();
  },
};