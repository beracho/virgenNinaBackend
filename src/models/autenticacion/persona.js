/**
 * Módulo que mapea las PERSONAS existentes, cada persona sólo debería estar
 * registrada una vez en esta tabla.
 *
 * @module
 *
 */

const Q = require('q');

module.exports = (sequelize, DataType) => {
  const persona = sequelize.define('persona', {
    id_persona: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      xlabel: 'Id de la persona',
    },
    tipo_documento: {
      type: DataType.ENUM,
      xlabel: 'Tipo de Documento',
      allowNull: false,
      unique: 'uniqueSelectedItem',
      values: ['CARNET_IDENTIDAD', 'PASAPORTE'],
      defaultValue: 'CARNET_IDENTIDAD',
      validate: {
        isIn: {args: [['CARNET_IDENTIDAD', 'PASAPORTE']], msg: "El campo estado sólo permite valores: 'CARNET_IDENTIDAD' o 'PASAPORTE'"},
      },
    },
    documento_identidad: {
      type: DataType.STRING(25),
      xlabel: 'Documento de identidad',
      allowNull: false,
      unique: 'uniqueSelectedItem',
      validate: {
        len: {args: [5, 25], msg: "El campo 'Documento de identidad' permite un mínimo de 5 caracteres y un máximo de 25 caracteres"},
        is: {args: /^[0-9]+$/i, msg: "El campo 'Documento de identidad' permite sólo números."},
        notEmpty: {args: [true], msg: 'El campo Documento de Identidad es obligatorio.'},
      },
    },
    lugar_documento_identidad: {
      type: DataType.STRING(25),
      xlabel: 'Procedencia del documento de identidad',
      allowNull: false,
      unique: 'uniqueSelectedItem',
      validate: {
        len: {args: [1, 5], msg: "El campo 'lugar documento de identidad' permite un mínimo de 1 caracter y un máximo de 5 caracteres"},
        is: {args: /^[A-Z|-|-|.]+$/i, msg: "El campo 'Lugar de lugar documento de identidad' permite sólo letras."},
        notEmpty: {args: [true], msg: 'El campo lugar documento de Identidad es obligatorio.'},
      },
    },
    complemento_documento: {
      type: DataType.STRING(20),
      xlabel: 'Complemento del documento',
      unique: 'uniqueSelectedItem',
      validate: {
        len: {args: [0, 20], msg: "El campo 'Complemento del documento' permite un mínimo de 0 caracteres y un máximo de 20 caracteres"},
      },
    },
    carnet_discapacidad: {
      type: DataType.STRING(20),
      xlabel: 'Carnet de discapacidad',
      allowNull: true,
      validate: {
        len: {args: [3, 25], msg: "El campo 'Documento de discapacidad' permite un mínimo de 3 caracteres y un máximo de 25 caracteres"},
        is: {args: /^[0-9]+$/i, msg: "El campo 'Documento de discapacidad' permite sólo números."},
      },
    },
    fecha_nacimiento: {
      type: DataType.DATE,
      xlabel: 'Fecha de nacimiento',
      allowNull: true,
    },
    nombres: {
      type: DataType.STRING(100),
      xlabel: 'Nombres',
      allowNull: true,
      validate: {
        len: {args: [1, 100], msg: "El campo 'Nombres' permite un mínimo de 1 caracter y un máximo de 100 caracteres"},
        is: {args: /^[A-Z|Á|É|Í|Ó|Ú|À|È|Ì|Ò|Ù|Ä|Ë|Ï|Ö|Ü|Â|Ê|Î|Ô|Û|Ñ|'|´| ]+$/i, msg: "El campo 'Nombres' permite sólo letras"},
      },
    },
    primer_apellido: {
      type: DataType.STRING(100),
      xlabel: 'Primer apellido',
      allowNull: true,
      validate: {
        len: {args: [0, 100], msg: "El campo 'Primer apellido' permite un mínimo de 1 caracter y un máximo de 100 caracteres"},
        is: {args: /^([A-Z|Á|É|Í|Ó|Ú|À|È|Ì|Ò|Ù|Ä|Ë|Ï|Ö|Ü|Â|Ê|Î|Ô|Û|Ñ|'|´| ]|)+$/i, msg: "El campo 'Primer apellido' permite sólo letras"},
      },
    },
    segundo_apellido: {
      type: DataType.STRING(100),
      xlabel: 'Segundo apellido',
      allowNull: true,
      validate: {
        len: {args: [0, 100], msg: "El campo 'Segundo apellido' permite un máximo de 100 caracteres"},
        is: {args: /^([A-Z|Á|É|Í|Ó|Ú|À|È|Ì|Ò|Ù|Ä|Ë|Ï|Ö|Ü|Â|Ê|Î|Ô|Û|Ñ|'|´| ]|)+$/i, msg: "El campo 'Segundo apellido' permite solo letras"},
      },
    },
    casada_apellido: {
      type: DataType.STRING(100),
      xlabel: 'Apellido de casada',
      allowNull: true,
      validate: {
        len: {args: [0, 100], msg: "El campo 'Apellido de casada' permite un máximo de 100 caracteres"},
        is: {args: /^([A-Z|Á|É|Í|Ó|Ú|À|È|Ì|Ò|Ù|Ä|Ë|Ï|Ö|Ü|Â|Ê|Î|Ô|Û|Ñ|'|´| ]|)+$/i, msg: "El campo 'Apellido de casada' permite solo letras"},
      },
    },
    genero: {
      type: DataType.CHAR(1),
      xlabel: 'Género',
      allowNull: true,
      validate: {
        isIn: {args: [['M', 'F']], msg: "El campo Género sólo permite valores F(Femenino) y M(Masculino)."},
      },
    },
    nombre_completo: {
      type: DataType.STRING(400),
      xlabel: 'Nombre Completo',
      allowNull: false,
      defaultValue: '',
      validate: {
        len: {args: [0, 100], msg: "El campo 'Nombre completo' permite un mínimo de 1 caracter y un máximo de 100 caracteres"},
        is: {args: /^([A-Z|Á|É|Í|Ó|Ú|À|È|Ì|Ò|Ù|Ä|Ë|Ï|Ö|Ü|Â|Ê|Î|Ô|Û|Ñ|'|´| ]|)+$/i, msg: "El campo 'Primer apellido' permite sólo letras"},
      },
    },
    idioma_materno: {
      type: DataType.STRING(20),
      xlabel: 'Idioma materno',
      allowNull: true,
      validate: {
        len: {args: [0, 20], msg: "El campo 'Idioma Materno' permite un máximo de 20 caracteres"},
      },
    },
    idiomas: {
      type: DataType.STRING(100),
      xlabel: 'Idiomas',
      allowNull: true,
      validate: {
        len: {args: [0, 100], msg: "El campo 'Idiomas' permite un máximo de 100 caracteres"},
      },
    },
    ocupacion_actual: {
      type: DataType.STRING(50),
      xlabel: 'Ocupación actual',
      allowNull: true,
      validate: {
        len: {args: [0, 50], msg: "El campo 'Ocupación actual' permite un máximo de 50 caracteres"},
      },
    },
    grado_instruccion: {
      type: DataType.STRING(50),
      xlabel: 'Grado de Instrucción',
      allowNull: true,
      validate: {
        len: {args: [0, 50], msg: "El campo 'Grado de Instrucción' permite un máximo de 50 caracteres"},
      },
    },
    parentezco: {
      type: DataType.STRING(30),
      xlabel: 'Parentezco',
      allowNull: true,
      validate: {
        len: {args: [0, 30], msg: "El campo 'Parentezco' permite un máximo de 30 caracteres"},
      },
    },
    discapacidad: {
      type: DataType.BOOLEAN,
      xlabel: 'Discapacidad',
      allowNull: false,
      defaultValue: false,
    },
    _usuario_creacion: {
      type: DataType.INTEGER,
      xlabel: 'Usuario de creación',
      allowNull: false,
    },
    _usuario_modificacion: {
      type: DataType.INTEGER,
      xlabel: 'Usuario de modificación',
    },
  }, {
    createdAt: '_fecha_creacion',
    updatedAt: '_fecha_modificacion',
    paranoid: true,
    classMethods: {
      // Creando asociaciones para la entidad
      associate: (models) => {
        persona.hasMany(models.usuario, {as: 'usuarios', foreignKey: {name: 'fid_persona', allowNull: true}});
        persona.belongsTo(models.ubicacion, {as: 'lugar_nacimiento', foreignKey: {name: 'fid_lugar_nacimiento'}});
        persona.belongsTo(models.ubicacion, {as: 'direccion', foreignKey: {name: 'fid_direccion'}});
        persona.belongsTo(models.estudiante, {as: 'estudiante', foreignKey: {name: 'fid_estudiante'}});
        persona.hasMany(models.persona, {as: 'pariente', foreignKey: {name: 'fid_pariente', allowNull: true}});
        persona.belongsTo(models.persona, {as: 'pariente', foreignKey: {name: 'fid_pariente', allowNull: true}});
      },
    },
    tableName: 'persona',
  });

  persona.beforeCreate((instance, option) => {
    instance.nombre_completo = nombreCompleto(instance);
  });

  persona.beforeUpdate((instance, option) => {
    instance.nombre_completo = nombreCompleto(instance);
  });

  function nombreCompleto(instance) {
    if (instance.nombres && (instance.primer_apellido || instance.segundo_apellido || instance.casada_apellido)) {
      instance.nombre_completo = `${instance.primer_apellido ? instance.primer_apellido : ''}`;
      instance.nombre_completo = `${instance.nombre_completo} ${instance.segundo_apellido ? instance.segundo_apellido : ''}`;
      instance.nombre_completo = `${instance.nombre_completo} ${instance.casada_apellido ? instance.casada_apellido : ''}`;
      instance.nombre_completo = `${instance.nombre_completo} ${instance.nombres} `;
      instance.nombre_completo = instance.nombre_completo.replace( /\s\s+/g, ' ' );
      instance.nombre_completo = instance.nombre_completo.trim();
    }
    return instance.nombre_completo;
  }

  return persona;
};
