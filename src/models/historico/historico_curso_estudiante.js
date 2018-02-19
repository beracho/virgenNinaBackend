module.exports = function (sequelize, DataTypes) {
  return sequelize.define('historico_curso_estudiante', {
    id_historico_curso_estudiante: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    estado: {
      type: DataTypes.STRING(15),
      xlabel: 'Estado',
      allowNull: true,
      validate: {
        isIn: {args: [['ACTIVO', 'INACTIVO']], msg: "El campo estado sólo permite valores: ACTIVO, INACTIVO."},
      },
    },
    fecha_ingreso: {
      type: DataTypes.DATE,
      xlabel: 'Fecha de ingreso',
      allowNull: true
    },
    fecha_salida: {
      type: DataTypes.DATE,
      xlabel: 'Fecha de salida',
      allowNull: true
    },
  }, {
      timestamps: false,
      paranoid: true,
      freezeTableName: true,
      classMethods: {
        associate: (models) => {
          models.historico_curso_estudiante.belongsTo(models.estudiante, {as: 'estudiante', foreignKey: {name:'fid_estudiante', allowNull: false}});
          models.historico_curso_estudiante.belongsTo(models.curso, {as: 'curso', foreignKey: {name:'fid_curso', allowNull: false}});
        },
      },
    });
};
