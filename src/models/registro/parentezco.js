/**
 * Modelo para la tabla parentezco
 * @param {type} sequelize
 * @param {type} DataType
 * @returns parentezco
 */
module.exports = (sequelize, DataType) => {
  const parentezco = sequelize.define("parentezco", {
    id_parentezco: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      xlabel: 'Id parentezco',
    },
    relacion: {
      type: DataType.STRING(100),
      field: 'relacion',
      xlabel: 'Relacion',
      allowNull: false,
      validate: {
        len: {args: [3, 100], msg: "El campo 'Relacion' permite un mínimo de 3 caracteres y un máximo de 100 caracteres"},
      },
      notEmpty: {args: [true], msg: 'El campo Nombre es obligatorio.'},
    },
    descripcion: {
      type: DataType.STRING(200),
      field: 'descripcion',
      xlabel: 'Descripción',
      allowNull: true,
      validate: {
        len: {args: [0, 200], msg: "El campo 'Descripción' permite un máximo de 200 caracteres"},
      },
    },
    vive_con_ninio: {
      type: DataType.BOOLEAN,
      xlabel: 'Vive con el niño',
      defaultValue: false,
    },
    _usuario_creacion: {
      type: DataType.STRING(50),
      field: '_usuario_creacion',
      xlabel: 'Usuario de creación',
      allowNull: false,
    },
    _usuario_modificacion: {
      type: DataType.STRING(50),
      field: '_usuario_modificacion',
      xlabel: 'Usuario de modificación',
      allowNull: true,
    },
  },{
    createdAt: '_fecha_creacion',
    updatedAt: '_fecha_modificacion',
    classMethods: {
      associate: (models) => {
        parentezco.belongsTo(models.persona, {as: 'persona_es', foreignKey: {name: 'fid_persona_es'}});
        parentezco.belongsTo(models.persona, {as: 'persona_de', foreignKey: {name: 'fid_persona_de'}});
      },
      tableName: 'parentezco',
      comment: `Tabla para almacenar parentezcos de personas dentro del sistema.`,
      paranoid: true,
      buscar: (condicion) => parentezco.findAll({
        attributes: ["id_parentezco", "nombre", "descripcion", "peso", "estado"],
        where: condicion,
        order: '_fecha_creacion ASC',
      }),
    },
  });
  return parentezco;
};
