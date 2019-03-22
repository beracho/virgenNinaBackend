module.exports = function (sequelize, DataTypes) {
    const registro_simple =  sequelize.define('registro_simple', {
        id_registro_simple: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
        },
        observacion: {
          type: DataTypes.TEXT,
          xlabel: 'Observación',
          allowNull: false
        },
        intervencion: {
          type: DataTypes.TEXT,
          xlabel: 'Intervención',
          allowNull: true
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
              registro_simple.hasOne(models.registro, {as: 'registros_simple', foreignKey: {name: 'fid_registro_simple', allowNull: true}});
            },
          },
        });
  
        return registro_simple;
    };
    