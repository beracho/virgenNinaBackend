/**
 * Módulo que mapea los FORMULARIO existentes
 *
 * @module
 *
 **/

module.exports = (sequelize, DataType) => {
  const formulario = sequelize.define('formulario', {
    id_formulario: {
      type: DataType.INTEGER,
      primaryKey: true,
      xlabel: 'ID',
      autoIncrement: true,
    },
    ambito: {
      type: DataType.ENUM,
      field: 'ambito',
      xlabel: 'Ámbito de formulario',
      allowNull: false,
      values: ['PROBOLIVIA', 'PROMUEVE', 'SELLO_BOLIVIA'],
      validate: {
        isIn: {args: [['PROBOLIVIA', 'PROMUEVE', 'SELLO_BOLIVIA']], msg: "El campo 'Ámbito' sólo permite valores: PROBOLIVIA', 'PROMUEVE' o 'SELLO_BOLIVIA'."},
      },
    },
    tipo: {
      type: DataType.ENUM,
      field: 'tipo',
      xlabel: 'Tipo de formulario',
      allowNull: false,
      values: ['UNIDAD_PRODUCTIVA', 'ARTESANO', 'PROVEEDOR', 'ICAP', 'COSTO_BRUTO', 'BIEN_PRODUCIDO', 'SHB_UNIDAD','SHB_PRODUCTO'],
      validate: {
        isIn: {args: [['UNIDAD_PRODUCTIVA', 'ARTESANO', 'PROVEEDOR', 'ICAP', 'COSTO_BRUTO', 'BIEN_PRODUCIDO', 'SHB_UNIDAD','SHB_PRODUCTO']], msg: "El campo 'Nombre' sólo permite valores: 'UNIDAD_PRODUCTIVA', 'ARTESANO', 'PROVEEDOR', 'ICAP', 'COSTO_BRUTO',  'BIEN_PRODUCIDO', 'SHB_UNIDAD' o 'SHB_PRODUCTO'."},
      },
    },
    nombre: {
      type: DataType.STRING(150),
      field: 'nombre',
      xlabel: 'Nombre',
      allowNull: false,
      validate: {
        len: {args: [0, 150], msg: "El campo 'Nombre' permite un máximo de 150 caracteres."},
      },
    },
    descripcion: {
      type: DataType.TEXT,
      field: 'descripcion',
      xlabel: 'Descripción',
      allowNull: false,
    },
    duracion: {
      type: DataType.INTEGER,
      field: 'duracion',
      xlabel: 'Duración',
      defaultValue: 1,
      allowNull: false,
    },

    nro_cuenta: {
      type: DataType.STRING(50),
      xlabel: 'Nro. de Cuenta',
      allowNull: true,
      validate: {
        len: {args: [0, 50], msg: "El campo 'Nro. de Cuenta' permite un máximo de 50 caracteres."},
      },
    },
    plazo_dias: {
      type: DataType.INTEGER,
      xlabel: 'Plazo (días)',
      defaultValue: 1,
      allowNull: false,
      validate: {
        isInt: {args: [true], msg: "El campo 'Plazo (días)' sólo permite valores numéricos."},
        min: {args: [1], msg: "El campo 'Plazo (días)' sólo permite valores numéricos mayores o iguales a 1."},
      },
    },
    fecha_inicio: {
      type: DataType.DATE,
      xlabel: 'Fecha de Inicio',
      allowNull: true,
    },
    secciones: {
      type: DataType.JSONB,
      field: 'secciones',
      xlabel: 'Secciones',
      allowNull: false,
    },
    pdf_reporte: {
      type: DataType.TEXT,
      xlabel: 'Reporte',
      allowNull: false,
    },
    pdf_certificado: {
      type: DataType.TEXT,
      xlabel: 'Certificado',
      allowNull: false,
    },
    estado: {
      type: DataType.ENUM,
      field: 'estado',
      xlabel: 'Estado',
      allowNull: false,
      defaultValue: 'ACTIVO',
      values: ['ACTIVO', 'INACTIVO'],
      validate: {
        isIn: {args: [['ACTIVO', 'INACTIVO']], msg: "El campo 'Estado' sólo permite valores: ACTIVO o INACTIVO."},
      },
    },
    _usuario_creacion: {
      type: DataType.INTEGER,
      field: '_usuario_creacion',
      xlabel: 'Usuario de creación',
      allowNull :false,
    },
    _usuario_modificacion: {
      type: DataType.INTEGER,
      field: '_usuario_modificacion',
      xlabel: 'Usuario de modificación',
    },
  },{
    createdAt: '_fecha_creacion',
    updatedAt: '_fecha_modificacion',
    deletedAt: '_fecha_eliminacion',
    paranoid: true,
    classMethods: {
      associate: (models) => {
        // formulario.hasMany(models.certificacion, {as: 'certificaciones', foreignKey: {name: 'fid_formulario', allowNull: true}});
        // formulario.hasMany(models.escala_pago, {as: 'costo', foreignKey: {name: 'fid_formulario', allowNull: true}});
      },
    },
    tableName: 'formulario',
  });
  return formulario;
};
