/**
 * Módulo que mapea las ubicacionS existentes, cada ubicacion sólo debería estar
 * registrada una vez en esta tabla.
 *
 * @module
 *
 */

const Q = require('q');

module.exports = (sequelize, DataType) => {
  const ubicacion = sequelize.define('ubicacion', {
    id_ubicacion: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      xlabel: 'Id de la ubicacion',
    },
    zona: {
      type: DataType.STRING(25),
      xlabel: 'zona',
      allowNull: false,
    },
    calle: {
      type: DataType.STRING(25),
      xlabel: 'calle',
      allowNull: false,
    },
    numero: {
      type: DataType.STRING(5),
      xlabel: 'Número',
      allowNull: true,
      validate: {
        len: {args: [1, 5], msg: "El campo 'Número permite un mínimo de 1 caracteres y un máximo de 5 caracteres"},
        isInt: {args: [true], msg: "El campo 'Número sólo permite valores numéricos."},
      },
    },
    telefono: {
      type: DataType.STRING(35),
      xlabel: 'Teléfono',
      allowNull: true,
      validate: {
        len: {args: [5, 35], msg: "El campo 'Teléfono' permite un mínimo de 5 caracteres y un máximo de 35 caracteres"},
        isInt: {args: [true], msg: "El campo 'Teléfono' sólo permite valores numéricos."},
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
    paranoid: true,
    classMethods: {
      // Creando asociaciones para la entidad
      associate: (models) => {
        ubicacion.belongsTo(models.dpa, {as: 'dpa', foreignKey: {name: 'fid_dpa', allowNull: false}});
      },
    },
    tableName: 'ubicacion',
  });

  return ubicacion;
};
