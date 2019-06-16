module.exports = function (sequelize, DataTypes) {
  return sequelize.define('categoria', {
    id_categoria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    descripcion: {
      type: DataTypes.STRING(150),
      xlabel: 'Descripción',
      allowNull: true
    },
    area: {
      type: DataTypes.STRING(20),
      xlabel: 'Área',
      allowNull: false,
      values: ['psicomotricidad', 'psicologia', 'trabajo social', 'fisioterapia', 'fonoaudiologia', 'nutricion', 'odontologia', 'psicopedagogia', 'medicina general', 'educacion', 'direccion', 'terapia ocupacional'],
      validate: {
        isIn: {args: [['psicomotricidad', 'psicologia', 'trabajo social', 'fisioterapia', 'fonoaudiologia', 'nutricion', 'odontologia', 'psicopedagogia', 'medicina general', 'educacion', 'direccion', 'terapia ocupacional']], msg: "El campo área sólo permite valores: 'psicomotricidad', 'psicologia', 'trabajo social', 'fisioterapia', 'fonoaudiologia', 'nutricion', 'odontologia', 'psicopedagogia', 'medicina general', 'educacion' o 'direccion'"},
      },
    },
    estado: {
      type: DataTypes.STRING(30),
      xlabel: 'Estado',
      allowNull: false,
      defaultValue: 'ACTIVO',
      validate: {
        isIn: {args: [['ACTIVO', 'INACTIVO']], msg: "El campo estado sólo permite valores: 'ACTIVO' o 'INACTIVO'."},
      },
    },
    _usuario_creacion: {
      type: DataTypes.INTEGER,
      xlabel: 'Usuario de creación',
      allowNull: false,
    },
    _usuario_modificacion: {
      type: DataTypes.INTEGER,
      xlabel: 'Usuario de modificación',
    },
  }, {
      createdAt: '_fecha_creacion',
      updatedAt: '_fecha_modificacion',
      paranoid: true,
      freezeTableName: true,
      classMethods: {
        associate: (models) => {
          // models.curso.belongsTo(models.profesor, {as: 'profesor', foreignKey: {name:'fid_profesor', allowNull: true}});
          models.categoria.belongsToMany(models.registro_simple, {
            through: {
              model: models.categoria_registro_simple,
              unique: false,
              // scope: {
              //   taggable: 'categoria'
              // }
            },
            foreignKey: 'fid_categoria',
            constraints: false
          });
        },
        // filterTo: () => [{ "type": "fk", "field": "curso" }],
      },
    });
};
