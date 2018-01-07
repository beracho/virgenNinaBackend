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
    nivel: {
      type: DataType.ENUM,
      xlabel: 'Nivel',
      allowNull: false,
      values: ['INICIAL', 'PRIMARIA', 'SECUNDARIA'],
      defaultValue: 'PRIMARIA',
      validate: {
        isIn: {args: [['INICIAL', 'PRIMARIA', 'SECUNDARIA']], msg: "El campo estado sólo permite valores: 'INICIAL', 'PRIMARIA' o 'SECUNDARIA'"},
      },
    },
    grado: {
      type: DataType.CHAR(1),
      xlabel: 'Grado',
      allowNull: true,
      validate: {
        is: {args: /^[0-9]+$/i, msg: "El campo 'Grado' permite sólo números."},
      },
    },
    gestion: {
      type: DataType.DATE,
      xlabel: 'Gestión',
      allowNull: true,
    },
    paralelo: {
      type: DataType.CHAR(1),
      xlabel: 'Paralelo',
      allowNull: true,
      validate: {
        is: {args: /^[A-Z|-|-|.]+$/i, msg: "El campo 'Paralelo' permite sólo letras."},
      },
    },
    turno: {
      type: DataType.ENUM,
      xlabel: 'Turno',
      allowNull: false,
      values: ['MAÑANA', 'TARDE', 'NOCHE'],
      defaultValue: 'MAÑANA',
      validate: {
        isIn: {args: [['MAÑANA', 'TARDE', 'NOCHE']], msg: "El campo estado sólo permite valores: 'MAÑANA', 'TARDE' o 'NOCHE'"},
      },
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