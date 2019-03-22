module.exports = function (sequelize, DataTypes) {
  const registro =  sequelize.define('registro', {
      id_registro: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      area: {
        type: DataTypes.STRING(20),
        xlabel: 'Área',
        allowNull: false,
        values: ['psicomotricidad', 'psicologia', 'trabajo social', 'fisioterapia', 'fonoaudiologia', 'nutricion', 'odontologia', 'psicopedagogia', 'educacion', 'direccion'],
        validate: {
          isIn: {args: [['psicomotricidad', 'psicologia', 'trabajo social', 'fisioterapia', 'fonoaudiologia', 'nutricion', 'odontologia', 'psicopedagogia', 'educacion', 'direccion']], msg: "El campo área sólo permite valores: 'psicomotricidad', 'psicologia', 'trabajo social', 'fisioterapia', 'fonoaudiologia', 'nutricion', 'odontologia', 'psicopedagogia', 'educacion' o 'direccion'"},
        },
      },
      tipo: {
        type: DataTypes.STRING(50),
        xlabel: 'Tipo',
        allowNull: false,
        values: ['simple', 'especialidad', 'semestral'],
        validate: {
          isIn: {args: [['simple', 'especialidad', 'semestral']], msg: "El campo registro sólo permite valores: 'simple', 'especialidad', 'semestral'"},
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
            registro.belongsTo(models.registro_simple, { as: 'registros_simple', foreignKey: { name: 'fid_registro_simple', allowNull: true } });
            registro.belongsTo(models.estudiante, { as: 'estudiantes', foreignKey: { name: 'fid_estudiante', allowNull: false } });
          },
        },
      });

      return registro;
  };
  