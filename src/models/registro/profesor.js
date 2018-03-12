module.exports = function (sequelize, DataTypes) {
  return sequelize.define('profesor', {
    id_profesor: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    especialidad: {
      type: DataTypes.STRING(50),
      xlabel: 'Especialidad',
      allowNull: true
    },
    normalista: {
      type: DataTypes.BOOLEAN,
      xlabel: 'Normalista',
      allowNull: true
    },
    titular: {
      type: DataTypes.BOOLEAN,
      xlabel: 'Titular',
      allowNull: true
    },
    item: {
      type: DataTypes.BOOLEAN,
      xlabel: 'Item',
      allowNull: true
    },
    estado: {
      type: DataTypes.STRING(15),
      xlabel: 'Estado',
      allowNull: true,
      validate: {
        isIn: {args: [['ACTIVO', 'INACTIVO', 'SUSPENDIDO']], msg: "El campo estado sólo permite valores: ACTIVO, INACTIVO, SUSPENDIDO."},
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
          models.profesor.belongsTo(models.persona, {as: 'persona', foreignKey: {name:'fid_persona', allowNull: true}});
          models.profesor.belongsTo(models.curso, {as: 'curso', foreignKey: {name:'fid_curso', allowNull: true}});
        },
      },
    });
};
