'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    console.log("generando ");
    return queryInterface.sequelize.query(`
    UPDATE persona set fid_estudiante= 1 where id_persona = 14;
    UPDATE persona set fid_estudiante= 2 where id_persona = 15;
    `);
  },
  down: (queryInterface, Sequelize) => {

  },
};