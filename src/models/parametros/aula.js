module.exports = function (sequelize, DataTypes) {
  return sequelize.define('aula', {
    id_aula: {
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
    capacidad: {
      type: DataTypes.INTEGER,
      xlabel: 'Capacidad',
      allowNull: true
    },
  }, {
      timestamps: false,
      paranoid: true,
      freezeTableName: true,
      classMethods: {
        associate: (models) => {
          // models.aula.belongsTo(models.aula, {as: 'aula_superior', foreignKey: {name:'fid_aula_superior', targetKey: 'id_aula', allowNull: true}});
          // models.aula.hasMany(models.aula, {as: 'subaula', foreignKey: {name:'fid_aula_superior', allowNull: true}});
        },
        // filterTo: () => [{ "type": "fk", "field": "aula" }],
      },
    });
};
