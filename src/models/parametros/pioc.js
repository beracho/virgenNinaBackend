/**
 * Modelo para la tabla pioc
 * @param {type} sequelize
 * @param {type} DataType
 * @returns empresa
 */
'use strict';

module.exports = (sequelize, DataType) => {
  const pioc = sequelize.define('pioc', {
    id_pioc: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      xlabel: 'ID',
    },
    nombre: {
      type: DataType.STRING(30),
      xlabel: 'Nombre',
      allowNull: true,
      validate: {
        len: {args: [3, 30], msg: "El campo 'Nombre' permite un mínimo de 3 caracteres y un máximo de 30 caracteres"},
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
      allowNull: true,
    },
  }, {
      createdAt: '_fecha_creacion',
      updatedAt: '_fecha_modificacion',
      deletedAt: '_fecha_eliminacion',
      paranoid: true,
      classMethods: {
        // associate: (models) => {
        //   pioc.belongsTo(models.nim, { as: 'nim', foreignKey: { name: 'fid_nim', allowNull: false } });
        // },
        tableName: 'pioc',
        comment: 'Tabla para almacenar las asociaciones de pioces por departamento de una API.',
      }
    });

  return pioc;
};