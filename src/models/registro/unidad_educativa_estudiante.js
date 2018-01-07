/**
 * Modelo para la tabla unidad_educativa_estudiante
 * @param {type} sequelize
 * @param {type} DataType
 * @returns empresa
 */
'use strict';

module.exports = (sequelize, DataType) => {
  const unidad_educativa_estudiante = sequelize.define('unidad_educativa_estudiante', {
    id_unidad_educativa_estudiante: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      xlabel: 'ID',
    },
  }, {
      createdAt: '_fecha_creacion',
      updatedAt: '_fecha_modificacion',
      deletedAt: '_fecha_eliminacion',
      paranoid: true,
      classMethods: {
        // associate: (models) => {
        //   unidad_educativa_estudiante.belongsTo(models.nim, { as: 'nim', foreignKey: { name: 'fid_nim', allowNull: false } });
        // },
        tableName: 'unidad_educativa_estudiante',
        comment: 'Tabla para almacenar las asociaciones de unidad_educativa_estudiantees por departamento de una API.',
      }
    });

  return unidad_educativa_estudiante;
};