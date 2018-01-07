/**
 * Módulo que mapea las estudianteS existentes, cada estudiante sólo debería estar
 * registrada una vez en esta tabla.
 *
 * @module
 *
 */

const Q = require('q');

module.exports = (sequelize, DataType) => {
  const estudiante = sequelize.define('estudiante', {
    id_estudiante: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      xlabel: 'Id del estudiante',
    },
    rude: {
      type: DataType.STRING(25),
      xlabel: 'RUDE',
      allowNull: false,
      unique: 'uniqueSelectedItem',
      validate: {
        len: {args: [5, 25], msg: "El campo 'RUDE' permite un mínimo de 5 caracteres y un máximo de 25 caracteres"},
        notEmpty: {args: [true], msg: 'El campo RUDE es obligatorio.'},
      },
    },
    discapacidad_comunicacion: {
      type: DataType.BOOLEAN,
      xlabel: 'Discapacidad de comunicación',
      defaultValue: false,
    },
    discapacidad_motriz: {
      type: DataType.BOOLEAN,
      xlabel: 'Discapacidad motriz',
      defaultValue: false,
    },
    discapacidad_mental: {
      type: DataType.BOOLEAN,
      xlabel: 'Discapacidad mental',
      defaultValue: false,
    },
    discapacidad_origen: {
      type: DataType.STRING(30),
      xlabel: 'Discapacidad origen',
      validate: {
        isIn: {args: [['NACIMIENTO', 'ADQUIRIDO', 'HEREDADO']], msg: "El campo 'Discapacidad origen' sólo permite valores: 'NACIMIENTO', 'ADQUIRIDO' o 'HEREDADO'."},
        len: {args: [0, 30], msg: "El campo 'Grupo' permite un máximo de 30 caracteres."},
      },
    },
    discapacidad_otra: {
      type: DataType.STRING(25),
      xlabel: 'Otra discapacidad',
      validate: {
        len: {args: [1, 5], msg: "El campo 'Otra discapacidad' permite un mínimo de 1 caracter y un máximo de 25 caracteres"},
        is: {args: /^[A-Z|-|-|.]+$/i, msg: "El campo 'Otra discapacidad' permite sólo letras."},
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
        estudiante.belongsToMany(models.unidad_educativa, { through: models.unidad_educativa_estudiante });
      },
    },
    tableName: 'estudiante',
  });

  return estudiante;
};
