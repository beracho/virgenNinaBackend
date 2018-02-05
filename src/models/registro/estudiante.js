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
      unique: {
        args: true,
        msg: 'rudeInUse'
      },
      validate: {
        len: {args: [5, 25], msg: "El campo 'RUDE' permite un mínimo de 5 caracteres y un máximo de 25 caracteres"},
        notEmpty: { args: [true], msg: 'El campo RUDE es obligatorio.' },
      }
    },
    codigo: {
      type: DataType.STRING(25),
      xlabel: 'Código',
      allowNull: true,
      unique: true,
      validate: {
        len: {args: [5, 25], msg: "El campo 'Código' permite un mínimo de 5 caracteres y un máximo de 25 caracteres"},
        notEmpty: {args: [true], msg: 'El campo Código es obligatorio.'},
      },
    },
    estado: {
      type: DataType.STRING(30),
      xlabel: 'Estado',
      allowNull: false,
      defaultValue: 'PREINSCRITO',
      validate: {
        isIn: {args: [['PREINSCRITO', 'EN ESPERA', 'INSCRITO']], msg: "El campo estado sólo permite valores: PREINSCRITO, EN ESPERA o INSCRITO."},
      },
    },
    discapacidad_origen: {
      type: DataType.STRING(30),
      xlabel: 'Discapacidad origen',
      defaultValue: 'NINGUNA',
      validate: {
        isIn: {args: [['BORN', 'ADQUIRED', 'INHERITED', 'NONE']], msg: "El campo 'Discapacidad origen' sólo permite valores: 'BORN', 'ADQUIRED', 'INHERITED' o 'NONE'."},
        len: {args: [0, 30], msg: "El campo 'Discapacidad origen' permite un máximo de 30 caracteres."},
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
        estudiante.belongsTo(models.registro_inscripcion, {as: 'registro', foreignKey: {name: 'fid_registro', allowNull: false}});
        estudiante.belongsTo(models.parametro, {as: 'discapacidad', foreignKey: {name: 'fid_discapacidad'}});
      },
    },
    tableName: 'estudiante',
  });

  return estudiante;
};
