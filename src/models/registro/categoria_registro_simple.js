module.exports = function (sequelize, DataTypes) {
  return sequelize.define('categoria_registro_simple', {
    id_categoria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    fid_categoria: {
      type: DataTypes.INTEGER,
      unique: 'item_categoria_registro_simple',
      allowNull: false,
    },
    fid_registro_simple: {
      type: DataTypes.INTEGER,
      unique: 'item_categoria_registro_simple',
      references: null,
      allowNull: false,
    }
  }, {
      createdAt: '_fecha_creacion',
      updatedAt: '_fecha_modificacion',
      freezeTableName: true,
      // classMethods: {
      //   associate: (models) => {
      //   },
      //   filterTo: () => [{ "type": "fk", "field": "curso" }],
      // },
    });
};

// class ItemTag extends Model {}
// categoria_registro_simple.init({
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   tagId: {
//     type: Sequelize.INTEGER,
//     unique: 'item_tag_taggable'
//   },
//   taggable: {
//     type: Sequelize.STRING,
//     unique: 'item_tag_taggable'
//   },
//   taggableId: {
//     type: Sequelize.INTEGER,
//     unique: 'item_tag_taggable',
//     references: null
//   }
// }, { sequelize, modelName: 'item_tag' });