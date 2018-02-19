module.exports = function (sequelize, DataTypes) {
  return sequelize.define('curso', {
    id_curso: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      xlabel: 'Nombre',
      allowNull: true
    },
    descripcion: {
      type: DataTypes.TEXT,
      xlabel: 'Descripción',
      allowNull: true
    },
    tipo_discapacidad: {
      type: DataTypes.STRING(50),
      xlabel: 'Tipo de discapacidad',
      allowNull: true
    },
    nivel: {
      type: DataTypes.STRING(50),
      xlabel: 'Nivel',
      allowNull: true
    },
    grado: {
      type: DataTypes.STRING(50),
      xlabel: 'Grado',
      allowNull: true
    },
    paralelo: {
      type: DataTypes.CHAR(1),
      xlabel: 'Paralelo',
      allowNull: true,
      validate: {
        is: {args: /^[A-Z|-|-|.]+$/i, msg: "El campo 'Paralelo' permite sólo letras."},
      },
    },
    hora_entrada: {
      type: DataTypes.TIME,
      xlabel: 'Hora de entrada',
      allowNull: true,
    },
    hora_salida: {
      type: DataTypes.TIME,
      xlabel: 'Hora de salida',
      allowNull: true,
    }
  }, {
      timestamps: false,
      paranoid: true,
      freezeTableName: true,
      classMethods: {
        associate: (models) => {
          models.curso.belongsTo(models.aula, {as: 'aula', foreignKey: {name:'fid_aula', allowNull: true}});
        },
        // filterTo: () => [{ "type": "fk", "field": "curso" }],
      },
    });
};
