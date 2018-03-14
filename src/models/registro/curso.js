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
      allowNull: false,
      values: ['AT', 'INI 1', 'INI 2', 'PRI 1', 'PRI 2', 'PRI 3', 'PRI SOC'],
      unique: 'uniqueCurso',
      validate: {
        isIn: {args: [['AT', 'INI 1', 'INI 2', 'PRI 1', 'PRI 2', 'PRI 3', 'PRI SOC']], msg: "El campo estado sólo permite valores: 'AT', 'INI 1', 'INI 2', 'PRI 1', 'PRI 2', 'PRI 3' o 'PRI SOC'"},
      },
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
    criterio_edad: {
      type: DataTypes.STRING(50),
      xlabel: 'Criterio de edad',
      allowNull: true
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
    maestro: {
      type: DataTypes.STRING(50),
      xlabel: 'Nombre del maestro',
      allowNull: true
    },
    grado: {
      type: DataTypes.STRING(50),
      xlabel: 'Grado',
      allowNull: true,
      values: ['ATENCION TEMPRANA', 'INDEPENDENCIA PERSONAL', 'INDEPENDENCIA SOCIAL', 'INICIAL', 'PRIMARIA', 'SECUNDARIA'],
      validate: {
        isIn: {args: [['ATENCION TEMPRANA', 'INDEPENDENCIA PERSONAL', 'INDEPENDENCIA SOCIAL', 'INICIAL', 'PRIMARIA', 'SECUNDARIA']], msg: "El campo estado sólo permite valores: 'ATENCION TEMPRANA', 'INDEPENDENCIA PERSONAL', 'INDEPENDENCIA SOCIAL', 'INICIAL', 'PRIMARIA' o 'SECUNDARIA'"},
      },
    },
    nivel: {
      type: DataTypes.INTEGER,
      xlabel: 'Nivel',
      allowNull: true,
      validate: {
        max: {args: 6, msg: "maxValue6"},
        min: {args: 0, msg: "minValue0"},
      }
    },
    paralelo: {
      type: DataTypes.CHAR(1),
      xlabel: 'Paralelo',
      allowNull: false,
      unique: 'uniqueCurso',
      validate: {
        is: {args: /^[A-Z]+$/i, msg: "El campo 'Paralelo' permite sólo letras."},
      },
    },
    gestion: {
      type: DataTypes.STRING(4),
      xlabel: 'Gestion',
      allowNull: false,
      unique: 'uniqueCurso'
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
        },
        // filterTo: () => [{ "type": "fk", "field": "curso" }],
      },
    });
};
