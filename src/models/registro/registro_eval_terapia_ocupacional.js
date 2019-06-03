module.exports = function (sequelize, DataTypes) {
  const reg_to =  sequelize.define('reg_to', {
      id_reg_to: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      ducha_realiza: {
        type: DataTypes.BOOLEAN,
        xlabel: 'Se ducha',
        allowNull: true
      },
      ducha_observacion: {
        type: DataTypes.STRING(300),
        xlabel: 'Observacion de ducha',
        allowNull: true
      },
      controlEsfinter_realiza: {
        type: DataTypes.BOOLEAN,
        xlabel: 'Se ducha',
        allowNull: true
      },
      controlEsfinter_observacion: {
        type: DataTypes.STRING(300),
        xlabel: 'Observacion de ducha',
        allowNull: true
      },
      vestidoDesvestido_realiza: {
        type: DataTypes.BOOLEAN,
        xlabel: 'Se ducha',
        allowNull: true
      },
      vestidoDesvestido_observacion: {
        type: DataTypes.STRING(300),
        xlabel: 'Observacion de ducha',
        allowNull: true
      },
      masticarTragar_realiza: {
        type: DataTypes.BOOLEAN,
        xlabel: 'Se ducha',
        allowNull: true
      },
      masticarTragar_observacion: {
        type: DataTypes.STRING(300),
        xlabel: 'Observacion de ducha',
        allowNull: true
      },
      comerSolo_realiza: {
        type: DataTypes.BOOLEAN,
        xlabel: 'Se ducha',
        allowNull: true
      },
      comerSolo_observacion: {
        type: DataTypes.STRING(300),
        xlabel: 'Observacion de ducha',
        allowNull: true
      },
      movilidadFuncional_realiza: {
        type: DataTypes.BOOLEAN,
        xlabel: 'Se ducha',
        allowNull: true
      },
      movilidadFuncional_observacion: {
        type: DataTypes.STRING(300),
        xlabel: 'Observacion de ducha',
        allowNull: true
      },
      higienePersonalAseo_realiza: {
        type: DataTypes.BOOLEAN,
        xlabel: 'Se ducha',
        allowNull: true
      },
      higienePersonalAseo_observacion: {
        type: DataTypes.STRING(300),
        xlabel: 'Observacion de ducha',
        allowNull: true
      },
      higieneInodoro_realiza: {
        type: DataTypes.BOOLEAN,
        xlabel: 'Se ducha',
        allowNull: true
      },
      higieneInodoro_observacion: {
        type: DataTypes.STRING(300),
        xlabel: 'Observacion de ducha',
        allowNull: true
      },
      comprension_realiza: {
        type: DataTypes.BOOLEAN,
        xlabel: 'Se ducha',
        allowNull: true
      },
      comprension_observacion: {
        type: DataTypes.STRING(300),
        xlabel: 'Observacion de ducha',
        allowNull: true
      },
      expresion_realiza: {
        type: DataTypes.BOOLEAN,
        xlabel: 'Se ducha',
        allowNull: true
      },
      expresion_observacion: {
        type: DataTypes.STRING(300),
        xlabel: 'Observacion de ducha',
        allowNull: true
      },
      interaccionSocial_realiza: {
        type: DataTypes.BOOLEAN,
        xlabel: 'Se ducha',
        allowNull: true
      },
      interaccionSocial_observacion: {
        type: DataTypes.STRING(300),
        xlabel: 'Observacion de ducha',
        allowNull: true
      },
      solProblemas_realiza: {
        type: DataTypes.BOOLEAN,
        xlabel: 'Se ducha',
        allowNull: true
      },
      solProblemas_observacion: {
        type: DataTypes.STRING(300),
        xlabel: 'Observacion de ducha',
        allowNull: true
      },
      memoria_realiza: {
        type: DataTypes.BOOLEAN,
        xlabel: 'Se ducha',
        allowNull: true
      },
      memoria_observacion: {
        type: DataTypes.STRING(300),
        xlabel: 'Observacion de ducha',
        allowNull: true
      },
      atencion_realiza: {
        type: DataTypes.BOOLEAN,
        xlabel: 'Se ducha',
        allowNull: true
      },
      atencion_observacion: {
        type: DataTypes.STRING(300),
        xlabel: 'Observacion de ducha',
        allowNull: true
      },
      orientacion_realiza: {
        type: DataTypes.BOOLEAN,
        xlabel: 'Se ducha',
        allowNull: true
      },
      orientacion_observacion: {
        type: DataTypes.STRING(300),
        xlabel: 'Observacion de ducha',
        allowNull: true
      },
      reconocimiento_realiza: {
        type: DataTypes.BOOLEAN,
        xlabel: 'Se ducha',
        allowNull: true
      },
      reconocimiento_observacion: {
        type: DataTypes.STRING(300),
        xlabel: 'Observacion de ducha',
        allowNull: true
      },
      secuenciacion_realiza: {
        type: DataTypes.BOOLEAN,
        xlabel: 'Se ducha',
        allowNull: true
      },
      secuenciacion_observacion: {
        type: DataTypes.STRING(300),
        xlabel: 'Observacion de ducha',
        allowNull: true
      },
      calculo_realiza: {
        type: DataTypes.BOOLEAN,
        xlabel: 'Se ducha',
        allowNull: true
      },
      calculo_observacion: {
        type: DataTypes.STRING(300),
        xlabel: 'Observacion de ducha',
        allowNull: true
      },
      lenguaje_realiza: {
        type: DataTypes.BOOLEAN,
        xlabel: 'Se ducha',
        allowNull: true
      },
      lenguaje_observacion: {
        type: DataTypes.STRING(300),
        xlabel: 'Observacion de ducha',
        allowNull: true
      },
      escritura_realiza: {
        type: DataTypes.BOOLEAN,
        xlabel: 'Se ducha',
        allowNull: true
      },
      escritura_observacion: {
        type: DataTypes.STRING(300),
        xlabel: 'Observacion de ducha',
        allowNull: true
      },
      sedestacion_realiza: {
        type: DataTypes.BOOLEAN,
        xlabel: 'sedestacion_realiza',
        allowNull: true
      },
      sedestacion_equilibrio: {
        type: DataTypes.BOOLEAN,
        xlabel: 'sedestacion_equilibrio',
        allowNull: true
      },
      sedestacion_estatico: {
        type: DataTypes.BOOLEAN,
        xlabel: 'sedestacion_estatico',
        allowNull: true
      },
      sedestacion_dinamico: {
        type: DataTypes.BOOLEAN,
        xlabel: 'sedestacion_dinamico',
        allowNull: true
      },
      bipedestacion_realiza: {
        type: DataTypes.BOOLEAN,
        xlabel: 'bipedestacion_realiza',
        allowNull: true
      },
      bipedestacion_equilibrio: {
        type: DataTypes.BOOLEAN,
        xlabel: 'bipedestacion_equilibrio',
        allowNull: true
      },
      bipedestacion_estatico: {
        type: DataTypes.BOOLEAN,
        xlabel: 'bipedestacion_estatico',
        allowNull: true
      },
      bipedestacion_dinamico: {
        type: DataTypes.BOOLEAN,
        xlabel: 'bipedestacion_dinamico',
        allowNull: true
      },
      marcha_realiza: {
        type: DataTypes.BOOLEAN,
        xlabel: 'marcha_realiza',
        allowNull: true
      },
      marcha_observacion: {
        type: DataTypes.STRING(300),
        xlabel: 'marcha_observacion',
        allowNull: true
      },
      marcha_dinamico: {
        type: DataTypes.BOOLEAN,
        xlabel: 'marcha_dinamico',
        allowNull: true
      },
      observacionesMovilidadFuncional: {
        type: DataTypes.STRING(300),
        xlabel: 'observacionesMovilidadFuncional',
        allowNull: true
      },
      pinzaGruesa_cilindricaDerecha: {
        type: DataTypes.BOOLEAN,
        xlabel: 'pinzaGruesa_cilindricaDerecha',
        allowNull: true
      },
      pinzaGruesa_cilindricaIzquierda: {
        type: DataTypes.BOOLEAN,
        xlabel: 'pinzaGruesa_cilindricaIzquierda',
        allowNull: true
      },
      pinzaGruesa_esfericaDerecha: {
        type: DataTypes.BOOLEAN,
        xlabel: 'pinzaGruesa_esfericaDerecha',
        allowNull: true
      },
      pinzaGruesa_esfericaIzquierda: {
        type: DataTypes.BOOLEAN,
        xlabel: 'pinzaGruesa_esfericaIzquierda',
        allowNull: true
      },
      pinzaGruesa_engancheDerecha: {
        type: DataTypes.BOOLEAN,
        xlabel: 'pinzaGruesa_engancheDerecha',
        allowNull: true
      },
      pinzaGruesa_engancheIzquierda: {
        type: DataTypes.BOOLEAN,
        xlabel: 'pinzaGruesa_engancheIzquierda',
        allowNull: true
      },
      pinzaGruesa_observaciones: {
        type: DataTypes.STRING(300),
        xlabel: 'pinzaGruesa_observaciones',
        allowNull: true
      },
      pinzaFina_subTerminalDerecha: {
        type: DataTypes.BOOLEAN,
        xlabel: 'pinzaFina_subTerminalDerecha',
        allowNull: true
      },
      pinzaFina_subTerminalIzquierda: {
        type: DataTypes.BOOLEAN,
        xlabel: 'pinzaFina_subTerminalIzquierda',
        allowNull: true
      },
      pinzaFina_terminoTerminalDerecha: {
        type: DataTypes.BOOLEAN,
        xlabel: 'pinzaFina_terminoTerminalDerecha',
        allowNull: true
      },
      pinzaFina_terminoTerminalIzquierda: {
        type: DataTypes.BOOLEAN,
        xlabel: 'pinzaFina_terminoTerminalIzquierda',
        allowNull: true
      },
      pinzaFina_lateralDerecha: {
        type: DataTypes.BOOLEAN,
        xlabel: 'pinzaFina_lateralDerecha',
        allowNull: true
      },
      pinzaFina_lateralIzquierda: {
        type: DataTypes.BOOLEAN,
        xlabel: 'pinzaFina_lateralIzquierda',
        allowNull: true
      },
      pinzaFina_tripodeDerecha: {
        type: DataTypes.BOOLEAN,
        xlabel: 'pinzaFina_tripodeDerecha',
        allowNull: true
      },
      pinzaFina_tripodeIzquierda: {
        type: DataTypes.BOOLEAN,
        xlabel: 'pinzaFina_tripodeIzquierda',
        allowNull: true
      },
      pinzaFina_interdigitalDerecha: {
        type: DataTypes.BOOLEAN,
        xlabel: 'pinzaFina_interdigitalDerecha',
        allowNull: true
      },
      pinzaFina_interdigitalIzquierda: {
        type: DataTypes.BOOLEAN,
        xlabel: 'pinzaFina_interdigitalIzquierda',
        allowNull: true
      },
      pinzaFina_lateroLateralDerecha: {
        type: DataTypes.BOOLEAN,
        xlabel: 'pinzaFina_lateroLateralDerecha',
        allowNull: true
      },
      pinzaFina_lateroLateralIzquierda: {
        type: DataTypes.BOOLEAN,
        xlabel: 'pinzaFina_lateroLateralIzquierda',
        allowNull: true
      },
      pinzaFina_multipulparDerecha: {
        type: DataTypes.BOOLEAN,
        xlabel: 'pinzaFina_multipulparDerecha',
        allowNull: true
      },
      pinzaFina_multipulparIzquierda: {
        type: DataTypes.BOOLEAN,
        xlabel: 'pinzaFina_multipulparIzquierda',
        allowNull: true
      },
      pinzaFina_observaciones: {
        type: DataTypes.STRING(300),
        xlabel: 'pinzaFina_observaciones',
        allowNull: true
      },
      barrerasArquitectonicas: {
        type: DataTypes.STRING(300),
        xlabel: 'barrerasArquitectonicas',
        allowNull: true
      },
      objetivosIntervención_objetivos: {
        type: DataTypes.STRING(300),
        xlabel: 'objetivosIntervención_objetivos',
        allowNull: true
      },
      objetivosIntervención_observaciones: {
        type: DataTypes.STRING(300),
        xlabel: 'objetivosIntervención_observaciones',
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
            reg_to.hasOne(models.registro, {as: 'reg_to', foreignKey: {name: 'fid_reg_to', allowNull: true}});
          },
        },
      });

      return reg_to;
  };
  