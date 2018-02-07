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
      allowNull: true,
      values: ['INICIAL', 'PRIMARIA', 'SECUNDARIA', 'REZAGO'],
      defaultValue: 'PRIMARIA',
      validate: {
        isIn: {args: [['INICIAL', 'PRIMARIA', 'SECUNDARIA', 'REZAGO']], msg: "El campo estado sólo permite valores: 'INICIAL', 'PRIMARIA', 'SECUNDARIA' o 'REZAGO'"},
      },
    },
    grado: {
      type: DataType.CHAR(1),
      xlabel: 'Grado',
      allowNull: true,
      validate: {
        is: {args: /^[0-6]+$/i, msg: "El campo 'Grado' permite sólo números."},
      },
    },
    gestion: {
      type: DataType.STRING(4),
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
      allowNull: true,
      values: ['MAÑANA', 'TARDE', 'NOCHE'],
      defaultValue: 'MAÑANA',
      validate: {
        isIn: {args: [['MAÑANA', 'TARDE', 'NOCHE']], msg: "El campo estado sólo permite valores: 'MAÑANA', 'TARDE' o 'NOCHE'"},
      },
    },
    _usuario_creacion: {
      type: DataType.INTEGER,
      xlabel: 'Usuario de creación',
      allowNull: false,
    },
    _usuario_modificacion: {
      type: DataType.INTEGER,
      xlabel: 'Usuario de modificación',
    },
  }, {
      createdAt: '_fecha_creacion',
      updatedAt: '_fecha_modificacion',
      deletedAt: '_fecha_eliminacion',
      paranoid: true,
      classMethods: {
        associate: (models) => {
          unidad_educativa_estudiante.belongsTo(models.estudiante, { as: 'estudiantes', foreignKey: { name: 'fid_estudiante', allowNull: true } });
          unidad_educativa_estudiante.belongsTo(models.unidad_educativa, {as: 'unidad_educativa', foreignKey: {name: 'fid_unidad_educativa', allowNull: true}});
        },
        tableName: 'unidad_educativa_estudiante',
        comment: 'Tabla para almacenar las asociaciones de unidad_educativa_estudiantees por departamento de una API.',
      }
    });

  return unidad_educativa_estudiante;
};