/**
 * Módulo que mapea las unidad_educativaS existentes, cada unidad_educativa sólo debería estar
 * registrada una vez en esta tabla.
 *
 * @module
 *
 */

const Q = require('q');

module.exports = (sequelize, DataType) => {
  const unidad_educativa = sequelize.define('unidad_educativa', {
    id_unidad_educativa: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      xlabel: 'Id de la unidad_educativa',
    },
    sie: {
      type: DataType.STRING(25),
      xlabel: 'SIE',
      allowNull: false,
      unique: 'uniqueSelectedItem',
      validate: {
        len: {args: [5, 25], msg: "El campo 'SIE' permite un mínimo de 5 caracteres y un máximo de 25 caracteres"},
        notEmpty: {args: [true], msg: 'El campo SIE es obligatorio.'},
      },
    },
    nombre: {
      type: DataType.STRING(100),
      xlabel: 'Nombre',
      allowNull: true,
      validate: {
        len: {args: [1, 100], msg: "El campo 'Nombre' permite un mínimo de 1 caracter y un máximo de 100 caracteres"},
        is: {args: /^[A-Z|Á|É|Í|Ó|Ú|À|È|Ì|Ò|Ù|Ä|Ë|Ï|Ö|Ü|Â|Ê|Î|Ô|Û|Ñ|'|´| ]+$/i, msg: "El campo 'Nombre' permite sólo letras"},
      },
    },
    dependencia: {
      type: DataType.STRING(25),
      xlabel: 'Dependencia',
      validate: {
        len: {args: [1, 5], msg: "El campo 'Dependencia' permite un mínimo de 1 caracter y un máximo de 25 caracteres"},
        is: {args: /^[A-Z|-|-|.]+$/i, msg: "El campo 'Dependencia' permite sólo letras."},
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
        unidad_educativa.belongsToMany(models.estudiante, { through: models.unidad_educativa_estudiante });
      },
    },
    tableName: 'unidad_educativa',
  });

  return unidad_educativa;
};
