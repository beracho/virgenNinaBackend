'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    console.log("generando ");
    return queryInterface.sequelize.query(`
    insert into ruta (ruta, descripcion, method_get, method_post, method_put, method_delete, estado, _usuario_creacion, _fecha_creacion, _fecha_modificacion) 
    values ('/api/v1/existePersona', 'Verifica existencia de persona', true, false, false, false, 'ACTIVO', 'SISTEMA', ${new Date()}, ${new Date()}),
    ('/api/v1/generaCodigo', 'Genera código correspondiente', false, false, true, false, 'ACTIVO', 'SISTEMA', ${new Date()}, ${new Date()});
    insert into rol_ruta (fid_ruta, fid_rol, method_get, method_post, method_put, method_delete, estado, _usuario_creacion, _fecha_creacion, _fecha_modificacion) 
    values (41, 3, true, false, false, false, 'ACTIVO', 'SISTEMA', ${new Date()}, ${new Date()}),
    (42, 3, false, false, true, false, 'ACTIVO', 'SISTEMA', ${new Date()}, ${new Date()});
    `);
  },
  down: (queryInterface, Sequelize) => {

  },
};