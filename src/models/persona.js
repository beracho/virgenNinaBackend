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
        len: {args: [1, 5], msg: "El campo 'Documento de identidad' permite un mínimo de 1 caracter y un máximo de 5 caracteres"},
        is: {args: /^[A-Z|-|-|.]+$/i, msg: "El campo 'Lugar de documento de identidad' permite sólo letras."},
        notEmpty: {args: [true], msg: 'El campo Documento de Identidad es obligatorio.'},
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
    rude: {
      type: DataType.STRING(20),
      xlabel: 'RUDE',
      allowNull: true,
      validate: {
        len: {args: [3, 25], msg: "El campo 'Documento de identidad' permite un mínimo de 3 caracteres y un máximo de 25 caracteres"},
        is: {args: /^[0-9]+$/i, msg: "El campo 'Documento de identidad' permite sólo números."},
      },
    },
    carnet_discapacidad: {
      type: DataType.STRING(20),
      xlabel: 'Carnet de discapacidad',
      allowNull: true,
      validate: {
        len: {args: [3, 25], msg: "El campo 'Documento de identidad' permite un mínimo de 3 caracteres y un máximo de 25 caracteres"},
        is: {args: /^[0-9]+$/i, msg: "El campo 'Documento de identidad' permite sólo números."},
      },
    },
    fecha_nacimiento: {
      type: DataType.DATE,
      xlabel: 'Fecha de nacimiento',
      unique: 'uniqueSelectedItem',
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
    direccion: {
      type: DataType.STRING(1000),
      xlabel: 'Dirección',
      allowNull: true,
    },
    telefono: {
      type: DataType.STRING(25),
      xlabel: 'Teléfono',
      allowNull: true,
      validate: {
        len: {args: [5, 25], msg: "El campo 'Teléfono' permite un mínimo de 5 caracteres y un máximo de 25 caracteres"},
        isInt: {args: [true], msg: "El campo 'Teléfono' sólo permite valores numéricos."},
      },
    },
    estado: {
      type: DataType.STRING(30),
      xlabel: 'Estado',
      allowNull: false,
      defaultValue: 'ACTIVO',
      validate: {
        isIn: {args: [['ACTIVO', 'INACTIVO']], msg: "El campo estado sólo permite valores: ACTIVO o INACTIVO."},
      },
    },
    tipo_documento: {
      type: DataType.ENUM,
      xlabel: 'Tipo de Documento',
      allowNull: false,
      values: ['CARNET_IDENTIDAD', 'PASAPORTE'],
      defaultValue: 'CARNET_IDENTIDAD',
      validate: {
        isIn: {args: [['CARNET_IDENTIDAD', 'PASAPORTE']], msg: "El campo estado sólo permite valores: 'CARNET_IDENTIDAD' o 'PASAPORTE'"},
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
