/**
 * Modelo para la tabla registro
 * @param {type} sequelize
 * @param {type} DataType
 * @returns empresa
 */
'use strict';
module.exports = (sequelize, DataType) => {
  const registro = sequelize.define('registro', {
    id_registro: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      xlabel: 'ID',
    },
    // tipo: {
    //   type: DataType.ENUM,
    //   xlabel: 'Tipo',
    //   allowNull: false,
    //   defaultValue: 'REGISTRO',
    //   values: ['REGISTRO', 'RENOVACION', 'DUPLICACION'],
    //   validate: {
    //     isIn: {args: [['REGISTRO', 'RENOVACION', 'DUPLICACION']], msg: "El campo 'Tipo' sólo permite valores: REGISTRO, RENOVACION o DUPLICACION."},
    //   },
    // },
    // gestion: {
    //   type: DataType.INTEGER,
    //   xlabel: 'Gestión',
    //   allowNull: true,
    //   validate: {
    //     isInt: {args: [true], msg: "El campo 'Gestión' sólo permite valores numéricos."},
    //     min: {args: [2017], msg: "El campo 'Gestión' sólo permite valores numéricos mayores o iguales a 2017."},
    //   },
    // },
    rude: {
      type: DataType.STRING(20),
      xlabel: 'RUDE',
      allowNull: true,
      validate: {
        len: {args: [3, 25], msg: "El campo 'Documento de identidad' permite un mínimo de 3 caracteres y un máximo de 25 caracteres"},
        is: {args: /^[0-9]+$/i, msg: "El campo 'Documento de identidad' permite sólo números."},
      },
    },
    // lote_duplicado: {
    //   type: DataType.INTEGER,
    //   xlabel: 'Lote duplicado',
    //   allowNull: true,
    //   validate: {
    //     isInt: {args: [true], msg: "El campo 'Lote duplicado' sólo permite valores numéricos."},
    //     min: {args: [1], msg: "El campo 'Lote duplicado' sólo permite valores numéricos mayores o iguales a 1."},
    //   },
    // },
    vigente: {
      type: DataType.BOOLEAN,
      xlabel: 'Vigente',
      allowNull: false,
      defaultValue: false,
    },
    base64: {
      type: DataType.TEXT,
      xlabel: 'Ruta documento',
      allowNull: true,
    },
    // cuce: {
    //   type: DataType.STRING(30),
    //   xlabel: 'Codigo CUCE',
    //   allowNull: true,
    // },
    // observaciones: {
    //   type: DataType.STRING(300),
    //   xlabel: 'Observaciones',
    //   allowNull: true,
    //   validate: {
    //     len: {args: [0, 300], msg: "El campo 'Observaciones' permite un máximo de 300 caracteres."},
    //   },
    // },
    // observaciones_secciones: {
    //   type: DataType.TEXT,
    //   xlabel: 'Observaciones de secciones',
    //   allowNull: true,
    // },
    estado: {
      type: DataType.STRING(30),
      xlabel: 'Estado',
      allowNull: false,
      defaultValue: 'ACTIVO',
      validate: {
        isIn: {args: [['ACTIVO', 'INACTIVO']], msg: "El campo estado sólo permite valores: ACTIVO o INACTIVO."},
      },
    },
    // estado_firma: {
    //   type: DataType.ENUM,
    //   xlabel: 'Estado firma',
    //   allowNull: false,
    //   defaultValue: 'PENDIENTE',
    //   values: ['PENDIENTE', 'FIRMADO'],
    //   validate: {
    //     isIn: {args: [['PENDIENTE', 'FIRMADO']], msg: "El campo 'Tipo' sólo permite valores: PENDIENTE y FIRMADO."},
    //   },
    // },
    // _fecha_firma: {
    //   type: DataType.DATE,
    //   xlabel: 'Fecha de firma',
    //   allowNull: true,
    // },
    // ruta_certificado: {
    //   type: DataType.STRING(500),
    //   xlabel: 'Ruta Certificado',
    //   allowNull: true,
    // },
    ruta_reporte: {
      type: DataType.STRING(500),
      xlabel: 'Ruta Reporte',
      allowNull: true,
    },
    _fecha_envio: {
      type: DataType.DATE,
      xlabel: 'Fecha de envío',
      allowNull: true,
    },
    // _fecha_notificacion: {
    //   type: DataType.DATE,
    //   xlabel: 'Fecha de notificación',
    //   allowNull: true,
    // },
    _fecha_pago: {
      type: DataType.DATE,
      xlabel: 'Fecha de Pago',
      allowNull: true,
    },
    // _fecha_aprobacion: {
    //   type: DataType.DATE,
    //   xlabel: 'Fecha de aprobación',
    //   allowNull: true,
    // },
    // _fecha_firma: {
    //   type: DataType.DATE,
    //   xlabel: 'Fecha de firma',
    //   allowNull: true,
    // },
    _fecha_fin: {
      type: DataType.DATE,
      xlabel: 'Fecha de finalización',
      allowNull: true,
    },
    // _usuario_notificacion: {
    //   type: DataType.INTEGER,
    //   xlabel: 'Usuario de notificación',
    //   allowNull: true,
    // },
    // _usuario_pago: {
    //   type: DataType.INTEGER,
    //   xlabel: 'Usuario de pago',
    //   allowNull: true,
    // },
    // _usuario_aprobacion: {
    //   type: DataType.INTEGER,
    //   xlabel: 'Usuario de aprobación',
    //   allowNull: true,
    // },
    // _usuario_observacion: {
    //   type: DataType.INTEGER,
    //   xlabel: 'Usuario de observación',
    //   allowNull: true,
    // },
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
    // _usuario_firma: {
    //   type: DataType.INTEGER,
    //   xlabel: 'Usuario de firma',
    //   allowNull: true,
    // },
    impreso: {
      type: new DataType.VIRTUAL(DataType.BOOLEAN),
      get: function () {
        return this.get("ruta_certificado") !== null;
      },
      xlabel: "¿Certificado impreso?"
    },
    codigo_archivo: {
      type: new DataType.VIRTUAL(DataType.TEXT),
      get: function () {
        const Hashids = require('hashids');
        const hashids = new Hashids("PROMUEVE", 15, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
        const id = hashids.encode(this.get("id_registro"));
        return id;
      },
      xlabel: "Código de archivo"
    },
    
  },{
    createdAt: '_fecha_creacion',
    updatedAt: '_fecha_modificacion',
    deletedAt: '_fecha_eliminacion',
    paranoid: true,
    classMethods: {
      associate: (models) => {
        registro.belongsTo(models.formulario, {as: 'formulario', foreignKey: {name: 'fid_formulario', allowNull: false}});
        registro.belongsTo(models.persona, {as: 'persona', foreignKey: {name: 'fid_persona', allowNull: false}});
        // registro.belongsTo(models.registro, {as: 'certificacin_origen', foreignKey: {name: 'fid_registro_origen', allowNull: true}});
        // registro.hasMany(models.registro_pago, {as: 'registroes_pagos', foreignKey: {name: 'fid_registro', allowNull: false}});
        // registro.hasMany(models.producto, {as: 'producto', foreignKey: {name: 'fid_registro', allowNull: true}});
        // registro.hasOne(models.sello_bolivia, {as: 'sello_bolivia', foreignKey: {name: 'fid_registro', allowNull: true}});
      },
    },
    tableName: 'registro',
    comment: 'Tabla para almacenar las declaraciones juradas de los usuarios empresarios/artesanos del sistema.',
  });

  return registro;
};
