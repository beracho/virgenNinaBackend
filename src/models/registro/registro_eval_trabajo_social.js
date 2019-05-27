module.exports = function (sequelize, DataTypes) {
    const reg_tb =  sequelize.define('reg_tb', {
        id_reg_tb: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
        },
        tipo_de_familia: {
          type: DataTypes.TEXT,
          xlabel: 'Tipo de familia',
          allowNull: true
        },
        observacion_grupo_familiar: {
          type: DataTypes.TEXT,
          xlabel: 'Observación al grupo familiar',
          allowNull: true
        },
        dinamica_familiar: {
          type: DataTypes.TEXT,
          xlabel: 'Dinámica familiar',
          allowNull: true
        },
        proceso_social: {
          type: DataTypes.TEXT,
          xlabel: 'Proceso social',
          allowNull: true
        },
        relato_discapacidad: {
          type: DataTypes.TEXT,
          xlabel: 'Relato de discapacidad',
          allowNull: true
        },
        diagnostico_social: {
          type: DataTypes.TEXT,
          xlabel: 'Diagnóstico social',
          allowNull: true
        },
        conclusion_sugerencia: {
          type: DataTypes.TEXT,
          xlabel: 'Conclusión y sugerencia',
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
              reg_tb.hasOne(models.registro, {as: 'reg_tb', foreignKey: {name: 'fid_reg_tb', allowNull: true}});
            },
          },
        });
  
        return reg_tb;
    };
    