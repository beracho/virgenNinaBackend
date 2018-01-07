/**
 * Modelo para la tabla registro_inscripcion
 * @param {type} sequelize
 * @param {type} DataType
 * @returns empresa
 */
'use strict';
module.exports = (sequelize, DataType) => {
  const registro_inscripcion = sequelize.define('registro_inscripcion', {
    id_registro_inscripcion: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      xlabel: 'ID',
    },
    oficialia: {
      type: DataType.STRING(30),
      xlabel: 'Oficialia',
      allowNull: true,
      validate: {
        len: {args: [3, 30], msg: "El campo 'Oficialia' permite un mínimo de 3 caracteres y un máximo de 30 caracteres"},
      },
    },
    libro: {
      type: DataType.STRING(30),
      xlabel: 'Libro',
      allowNull: true,
      validate: {
        len: {args: [3, 30], msg: "El campo 'Libro' permite un mínimo de 3 caracteres y un máximo de 30 caracteres"},
        is: {args: /^[0-9]+$/i, msg: "El campo 'Libro' permite sólo números."},
      },
    },
    partida: {
      type: DataType.STRING(30),
      xlabel: 'Partida',
      allowNull: true,
      validate: {
        len: {args: [3, 30], msg: "El campo 'Partida' permite un mínimo de 3 caracteres y un máximo de 30 caracteres"},
        is: {args: /^[0-9]+$/i, msg: "El campo 'Partida' permite sólo números."},
      },
    },
    folio: {
      type: DataType.STRING(30),
      xlabel: 'Folio',
      allowNull: true,
      validate: {
        len: {args: [3, 30], msg: "El campo 'Folio' permite un mínimo de 3 caracteres y un máximo de 30 caracteres"},
        is: {args: /^[0-9]+$/i, msg: "El campo 'Folio' permite sólo números."},
      },
    },
    centro_salud: {
      type: DataType.BOOLEAN,
      xlabel: 'Centro salud',
      allowNull: false,
      defaultValue: false,
    },
    frecuencia_medica: {
      type: DataType.INTEGER,
      xlabel: 'Frecuencia atención médica',
      allowNull: true,
      validate: {
        isInt: {args: [true], msg: "El campo 'Frecuencia médica' sólo permite valores numéricos."},
      },
    },
    origen_agua: {
      type: DataType.STRING(30),
      xlabel: 'Origen Agua',
      allowNull: true,
      validate: {
        len: {args: [3, 30], msg: "El campo 'Origen Agua' permite un mínimo de 3 caracteres y un máximo de 30 caracteres"},
      },
    },
    acceso_electricidad: {
      type: DataType.BOOLEAN,
      xlabel: 'Acceso electricidad',
      allowNull: false,
      defaultValue: false,
    },
    destino_agua: {
      type: DataType.STRING(30),
      xlabel: 'Destino Agua',
      allowNull: true,
      validate: {
        len: {args: [3, 30], msg: "El campo 'Destino Agua' permite un mínimo de 3 caracteres y un máximo de 30 caracteres"},
      },
    },
    actividad_laboral: {
      type: DataType.STRING(30),
      xlabel: 'Actividad laboral',
      allowNull: true,
      validate: {
        len: {args: [3, 30], msg: "El campo 'Actividad laboral' permite un mínimo de 3 caracteres y un máximo de 30 caracteres"},
      },
    },
    dias_trabajo: {
      type: DataType.INTEGER,
      xlabel: 'Dias de trabajo',
      allowNull: true,
      validate: {
        isInt: {args: [true], msg: "El campo 'Dias de trabajo' sólo permite valores numéricos."},
      },
    },
    salario: {
      type: DataType.BOOLEAN,
      xlabel: 'Salario',
      allowNull: false,
      defaultValue: false,
    },
    acceso_internet: {
      type: DataType.STRING(30),
      xlabel: 'Acceso a internet',
      allowNull: true,
      validate: {
        len: {args: [3, 30], msg: "El campo 'Acceso a internet' permite un mínimo de 3 caracteres y un máximo de 30 caracteres"},
      },
    },
    frecuencia_internet: {
      type: DataType.STRING(30),
      xlabel: 'Frecuencia a internet',
      allowNull: true,
      validate: {
        len: {args: [3, 30], msg: "El campo 'Frecuencia a internet' permite un mínimo de 3 caracteres y un máximo de 30 caracteres"},
      },
    },
    medio_transporte: {
      type: DataType.STRING(30),
      xlabel: 'Medio de transporte',
      allowNull: true,
      validate: {
        len: {args: [3, 30], msg: "El campo 'Medio de transporte' permite un mínimo de 3 caracteres y un máximo de 30 caracteres"},
      },
    },
    duracion_transporte: {
      type: DataType.STRING(30),
      xlabel: 'Duración de transporte',
      allowNull: true,
      validate: {
        len: {args: [3, 30], msg: "El campo 'Duración de transporte' permite un mínimo de 3 caracteres y un máximo de 30 caracteres"},
      },
    },
    vigente: {
      type: DataType.BOOLEAN,
      xlabel: 'Vigente',
      allowNull: false,
      defaultValue: false,
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
    ruta_reporte: {
      type: DataType.STRING(500),
      xlabel: 'Ruta Reporte',
      allowNull: true,
    },
    lugar_envio: {
      type: DataType.STRING(500),
      xlabel: 'Lugar Envío',
      allowNull: true,
    },
    _fecha_envio: {
      type: DataType.DATE,
      xlabel: 'Fecha de envío',
      allowNull: true,
    },
    _fecha_pago: {
      type: DataType.DATE,
      xlabel: 'Fecha de Pago',
      allowNull: true,
    },
    _usuario_creacion: {
      type: DataType.INTEGER,
      xlabel: 'Usuario de creación',
      allowNull: false,
    },
    _usuario_modificacion: {
      type: DataType.INTEGER,
      xlabel: 'Usuario de modificación',
      allowNull: true,
    },
    impreso: {
      type: new DataType.VIRTUAL(DataType.BOOLEAN),
      get: function () {
        return this.get("ruta_certificado") !== null;
      },
      xlabel: "¿Certificado impreso?"
    },
    // codigo_archivo: {
    //   type: new DataType.VIRTUAL(DataType.TEXT),
    //   get: function () {
    //     const Hashids = require('hashids');
    //     const hashids = new Hashids("VIRGEN_NIÑA", 15, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
    //     const id = hashids.encode(this.get("id_registro_inscripcion"));
    //     return id;
    //   },
    //   xlabel: "Código de archivo"
    // },
  },{
    createdAt: '_fecha_creacion',
    updatedAt: '_fecha_modificacion',
    deletedAt: '_fecha_eliminacion',
    paranoid: true,
    classMethods: {
      associate: (models) => {
        models.registro_inscripcion.belongsTo(models.pioc, {as: 'pioc', foreignKey: {name: 'fid_pioc'}});
      },
    },
    tableName: 'registro_inscripcion',
    comment: 'Tabla para almacenar las declaraciones juradas de los usuarios empresarios/artesanos del sistema.',
  });

  return registro_inscripcion;
};
