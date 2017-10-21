module.exports = function(sequelize, DataTypes) {
  return sequelize.define('departamento', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    abreviacion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    codigo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    timestamps: false,
    paranoid: true,
    freezeTableName: true,
    classMethods: {
      filterTo: () => [{"type": "fk", "field" : "departamento"}],
    },
  });
};
