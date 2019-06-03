module.exports = function (sequelize, DataTypes) {
  const reg_ft =  sequelize.define('reg_ft', {
      id_reg_ft: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      diagnosticoMedico: {
        type: DataTypes.STRING(300),
        xlabel: 'diagnosticoMedico',
        allowNull: true
      },
      motivoConsulta: {
        type: DataTypes.STRING(300),
        xlabel: 'motivoConsulta',
        allowNull: true
      },
      antecedentesEnfermedadActual: {
        type: DataTypes.STRING(300),
        xlabel: 'antecedentesEnfermedadActual',
        allowNull: true
      },
      ag_numeroEmbarazo: {
        type: DataTypes.STRING(300),
        xlabel: 'ag numeroEmbarazo',
        allowNull: true
      },
      ag_numeroHijos: {
        type: DataTypes.STRING(300),
        xlabel: 'ag numeroHijos',
        allowNull: true
      },
      ag_controlPrenatal: {
        type: DataTypes.BOOLEAN,
        xlabel: 'ag controlPrenatal',
        allowNull: true
      },
      ag_hospital: {
        type: DataTypes.STRING(300),
        xlabel: 'ag hospital',
        allowNull: true
      },
      ag_problemasDuranteEmbarazo: {
        type: DataTypes.STRING(300),
        xlabel: 'ag problemasDuranteEmbarazo',
        allowNull: true
      },
      ag_tiempoGestacional: {
        type: DataTypes.STRING(300),
        xlabel: 'ag tiempoGestacional',
        allowNull: true
      },
      ag_parto: {
        type: DataTypes.STRING(300),
        xlabel: 'ag parto',
        allowNull: true
      },
      ag_tipoParto: {
        type: DataTypes.STRING(300),
        xlabel: 'ag tipoParto',
        allowNull: true
      },
      ag_posicion: {
        type: DataTypes.STRING(300),
        xlabel: 'ag posicion',
        allowNull: true
      },
      ag_llanto: {
        type: DataTypes.STRING(300),
        xlabel: 'ag llanto',
        allowNull: true
      },
      ag_movimientos: {
        type: DataTypes.BOOLEAN,
        xlabel: 'ag movimientos',
        allowNull: true
      },
      ag_cianosis: {
        type: DataTypes.BOOLEAN,
        xlabel: 'ag cianosis',
        allowNull: true
      },
      ag_oxigeno: {
        type: DataTypes.BOOLEAN,
        xlabel: 'ag oxigeno',
        allowNull: true
      },
      ag_incubadora: {
        type: DataTypes.BOOLEAN,
        xlabel: 'ag incubadora',
        allowNull: true
      },
      ag_tiempoIncubadora: {
        type: DataTypes.STRING(300),
        xlabel: 'ag tiempoIncubadora',
        allowNull: true
      },
      ag_otros: {
        type: DataTypes.STRING(300),
        xlabel: 'ag otros',
        allowNull: true
      },
      epf_planoAnterior: {
        type: DataTypes.STRING(300),
        xlabel: 'epf planoAnterior',
        allowNull: true
      },
      epf_planoPosterior: {
        type: DataTypes.STRING(300),
        xlabel: 'epf planoPosterior',
        allowNull: true
      },
      epf_planoLateral: {
        type: DataTypes.STRING(300),
        xlabel: 'epf planoLateral',
        allowNull: true
      },
      epf_otros: {
        type: DataTypes.STRING(300),
        xlabel: 'epf otros',
        allowNull: true
      },
      epf_tipoRespiracion: {
        type: DataTypes.STRING(300),
        xlabel: 'epf tipoRespiracion',
        allowNull: true
      },
      epf_patronRespiracion: {
        type: DataTypes.STRING(300),
        xlabel: 'epf patronRespiracion',
        allowNull: true
      },
      epf_marcha: {
        type: DataTypes.STRING(300),
        xlabel: 'epf marcha',
        allowNull: true
      },
      epf_Po_thomas: {
        type: DataTypes.STRING(300),
        xlabel: 'epf Po thomas',
        allowNull: true
      },
      epf_Po_galeazi: {
        type: DataTypes.STRING(300),
        xlabel: 'epf Po galeazi',
        allowNull: true
      },
      epf_Po_ober: {
        type: DataTypes.STRING(300),
        xlabel: 'epf Po ober',
        allowNull: true
      },
      epf_Po_ortolani: {
        type: DataTypes.STRING(300),
        xlabel: 'epf Po ortolani',
        allowNull: true
      },
      epf_Po_barlow: {
        type: DataTypes.STRING(300),
        xlabel: 'epf Po barlow',
        allowNull: true
      },
      epf_Po_asimetriaPliegues: {
        type: DataTypes.STRING(300),
        xlabel: 'epf Po asimetriaPliegues',
        allowNull: true
      },
      epf_Po_otros: {
        type: DataTypes.STRING(300),
        xlabel: 'epf Po otros',
        allowNull: true
      },
      epf_tono: {
        type: DataTypes.STRING(300),
        xlabel: 'epf tono',
        allowNull: true
      },
      epf_trofismo: {
        type: DataTypes.STRING(300),
        xlabel: 'epf trofismo',
        allowNull: true
      },
      escalaAshworth: {
        type: DataTypes.STRING(300),
        xlabel: 'escalaAshworth',
        allowNull: true
      },
      ref_suctionReflection: {
        type: DataTypes.BOOLEAN,
        xlabel: 'ref suctionReflection',
        allowNull: true
      },
      ref_suctionReflectionText: {
        type: DataTypes.STRING(300),
        xlabel: 'ref suctionReflectionText',
        allowNull: true
      },
      ref_TRIPLEEXTFLX: {
        type: DataTypes.BOOLEAN,
        xlabel: 'ref TRIPLEEXTFLX',
        allowNull: true
      },
      ref_TRIPLEEXTFLXText: {
        type: DataTypes.STRING(300),
        xlabel: 'ref TRIPLEEXTFLXText',
        allowNull: true
      },
      ref_RTCA: {
        type: DataTypes.BOOLEAN,
        xlabel: 'ref RTCA',
        allowNull: true
      },
      ref_RTCAText: {
        type: DataTypes.STRING(300),
        xlabel: 'ref RTCAText',
        allowNull: true
      },
      ref_RTCS: {
        type: DataTypes.BOOLEAN,
        xlabel: 'ref RTCS',
        allowNull: true
      },
      ref_RTCSText: {
        type: DataTypes.STRING(300),
        xlabel: 'ref RTCSText',
        allowNull: true
      },
      ref_RTL: {
        type: DataTypes.BOOLEAN,
        xlabel: 'ref RTL',
        allowNull: true
      },
      ref_RTLText: {
        type: DataTypes.STRING(300),
        xlabel: 'ref RTLText',
        allowNull: true
      },
      ref_RMORO: {
        type: DataTypes.BOOLEAN,
        xlabel: 'ref RMORO',
        allowNull: true
      },
      ref_RMOROText: {
        type: DataTypes.STRING(300),
        xlabel: 'ref RMOROText',
        allowNull: true
      },
      ref_RBABINSKI: {
        type: DataTypes.BOOLEAN,
        xlabel: 'ref RBABINSKI',
        allowNull: true
      },
      ref_RBABINSKIText: {
        type: DataTypes.STRING(300),
        xlabel: 'ref RBABINSKIText',
        allowNull: true
      },
      ref_REXTCRUZADA: {
        type: DataTypes.BOOLEAN,
        xlabel: 'ref REXTCRUZADA',
        allowNull: true
      },
      ref_REXTCRUZADAText: {
        type: DataTypes.STRING(300),
        xlabel: 'ref REXTCRUZADAText',
        allowNull: true
      },
      ref_GALANT: {
        type: DataTypes.BOOLEAN,
        xlabel: 'ref GALANT',
        allowNull: true
      },
      ref_GALANTText: {
        type: DataTypes.STRING(300),
        xlabel: 'ref GALANTText',
        allowNull: true
      },
      ref_LANDAU: {
        type: DataTypes.BOOLEAN,
        xlabel: 'ref LANDAU',
        allowNull: true
      },
      ref_LANDAUText: {
        type: DataTypes.STRING(300),
        xlabel: 'ref LANDAUText',
        allowNull: true
      },
      ref_DEFENSA: {
        type: DataTypes.BOOLEAN,
        xlabel: 'ref DEFENSA',
        allowNull: true
      },
      ref_DEFENSAText: {
        type: DataTypes.STRING(300),
        xlabel: 'ref DEFENSAText',
        allowNull: true
      },
      ref_RPALMAR: {
        type: DataTypes.BOOLEAN,
        xlabel: 'ref RPALMAR',
        allowNull: true
      },
      ref_RPALMARText: {
        type: DataTypes.STRING(300),
        xlabel: 'ref RPALMARText',
        allowNull: true
      },
      ref_RPLANTAR: {
        type: DataTypes.BOOLEAN,
        xlabel: 'ref RPLANTAR',
        allowNull: true
      },
      ref_RPLANTARText: {
        type: DataTypes.STRING(300),
        xlabel: 'ref RPLANTARText',
        allowNull: true
      },
      ref_RPOSITIVODEAPOYO: {
        type: DataTypes.BOOLEAN,
        xlabel: 'ref RPOSITIVODEAPOYO',
        allowNull: true
      },
      ref_RPOSITIVODEAPOYOText: {
        type: DataTypes.STRING(300),
        xlabel: 'ref RPOSITIVODEAPOYOText',
        allowNull: true
      },
      ref_RPARACAIDAS: {
        type: DataTypes.BOOLEAN,
        xlabel: 'ref RPARACAIDAS',
        allowNull: true
      },
      ref_RPARACAIDASText: {
        type: DataTypes.STRING(300),
        xlabel: 'ref RPARACAIDASText',
        allowNull: true
      },
      re_laberintico: {
        type: DataTypes.BOOLEAN,
        xlabel: 're laberintico',
        allowNull: true
      },
      re_laberinticoText: {
        type: DataTypes.STRING(300),
        xlabel: 're laberinticoText',
        allowNull: true
      },
      re_sobreOjos: {
        type: DataTypes.BOOLEAN,
        xlabel: 're sobreOjos',
        allowNull: true
      },
      re_sobreOjosText: {
        type: DataTypes.STRING(300),
        xlabel: 're sobreOjosText',
        allowNull: true
      },
      ame_decubitoDorsal: {
        type: DataTypes.STRING(300),
        xlabel: 'ame decubitoDorsal',
        allowNull: true
      },
      ame_decubitoVentral: {
        type: DataTypes.STRING(300),
        xlabel: 'ame decubitoVentral',
        allowNull: true
      },
      ame_cambioPosicion: {
        type: DataTypes.STRING(300),
        xlabel: 'ame cambioPosicion',
        allowNull: true
      },
      ame_rolido: {
        type: DataTypes.STRING(300),
        xlabel: 'ame rolido',
        allowNull: true
      },
      ame_arrastre: {
        type: DataTypes.STRING(300),
        xlabel: 'ame arrastre',
        allowNull: true
      },
      ame_sedente: {
        type: DataTypes.STRING(300),
        xlabel: 'ame sedente',
        allowNull: true
      },
      ame_gateo: {
        type: DataTypes.STRING(300),
        xlabel: 'ame gateo',
        allowNull: true
      },
      ame_arrodillado: {
        type: DataTypes.STRING(300),
        xlabel: 'ame arrodillado',
        allowNull: true
      },
      ame_bipedo: {
        type: DataTypes.STRING(300),
        xlabel: 'ame bipedo',
        allowNull: true
      },
      ep_esquemaCorporal: {
        type: DataTypes.STRING(300),
        xlabel: 'ep esquemaCorporal',
        allowNull: true
      },
      ep_esquemaCorporalText: {
        type: DataTypes.STRING(300),
        xlabel: 'ep esquemaCorporalText',
        allowNull: true
      },
      ep_imagenCorporal: {
        type: DataTypes.STRING(300),
        xlabel: 'ep imagenCorporal',
        allowNull: true
      },
      ep_imagenCorporalText: {
        type: DataTypes.STRING(300),
        xlabel: 'ep imagenCorporalText',
        allowNull: true
      },
      ep_conceptoCorporal: {
        type: DataTypes.STRING(300),
        xlabel: 'ep conceptoCorporal',
        allowNull: true
      },
      ep_conceptoCorporalText: {
        type: DataTypes.STRING(300),
        xlabel: 'ep conceptoCorporalText',
        allowNull: true
      },
      ep_estructuracionEspacial: {
        type: DataTypes.STRING(300),
        xlabel: 'ep estructuracionEspacial',
        allowNull: true
      },
      ep_estructuracionEspacialText: {
        type: DataTypes.STRING(300),
        xlabel: 'ep estructuracionEspacialText',
        allowNull: true
      },
      ep_estructuracionTemporal: {
        type: DataTypes.STRING(300),
        xlabel: 'ep estructuracionTemporal',
        allowNull: true
      },
      ep_estructuracionTemporalText: {
        type: DataTypes.STRING(300),
        xlabel: 'ep estructuracionTemporalText',
        allowNull: true
      },
      ep_equilibrioEstatico: {
        type: DataTypes.STRING(300),
        xlabel: 'ep equilibrioEstatico',
        allowNull: true
      },
      ep_equilibrioEstaticoText: {
        type: DataTypes.STRING(300),
        xlabel: 'ep equilibrioEstaticoText',
        allowNull: true
      },
      ep_equilibrioDinamico: {
        type: DataTypes.STRING(300),
        xlabel: 'ep equilibrioDinamico',
        allowNull: true
      },
      ep_equilibrioDinamicoText: {
        type: DataTypes.STRING(300),
        xlabel: 'ep equilibrioDinamicoText',
        allowNull: true
      },
      ep_coordinacionGruesa: {
        type: DataTypes.STRING(300),
        xlabel: 'ep coordinacionGruesa',
        allowNull: true
      },
      ep_coordinacionGruesaText: {
        type: DataTypes.STRING(300),
        xlabel: 'ep coordinacionGruesaText',
        allowNull: true
      },
      ep_coordinacionFina: {
        type: DataTypes.STRING(300),
        xlabel: 'ep coordinacionFina',
        allowNull: true
      },
      ep_coordinacionFinaText: {
        type: DataTypes.STRING(300),
        xlabel: 'ep coordinacionFinaText',
        allowNull: true
      },
      ep_coordinacionOjoMano: {
        type: DataTypes.STRING(300),
        xlabel: 'ep coordinacionOjoMano',
        allowNull: true
      },
      ep_coordinacionOjoManoText: {
        type: DataTypes.STRING(300),
        xlabel: 'ep coordinacionOjoManoText',
        allowNull: true
      },
      ep_coordinacionOjoPie: {
        type: DataTypes.STRING(300),
        xlabel: 'ep coordinacionOjoPie',
        allowNull: true
      },
      ep_coordinacionOjoPieText: {
        type: DataTypes.STRING(300),
        xlabel: 'ep coordinacionOjoPieText',
        allowNull: true
      },
      ep_lateralidad: {
        type: DataTypes.STRING(300),
        xlabel: 'ep lateralidad',
        allowNull: true
      },
      ep_observacion: {
        type: DataTypes.STRING(300),
        xlabel: 'ep observacion',
        allowNull: true
      },
      avd_higiene: {
        type: DataTypes.STRING(300),
        xlabel: 'avd higiene',
        allowNull: true
      },
      avd_higieneText: {
        type: DataTypes.STRING(300),
        xlabel: 'avd higieneText',
        allowNull: true
      },
      avd_alimentacion: {
        type: DataTypes.STRING(300),
        xlabel: 'avd alimentacion',
        allowNull: true
      },
      avd_alimentacionText: {
        type: DataTypes.STRING(300),
        xlabel: 'avd alimentacionText',
        allowNull: true
      },
      avd_vestimenta: {
        type: DataTypes.STRING(300),
        xlabel: 'avd vestimenta',
        allowNull: true
      },
      avd_vestimentaText: {
        type: DataTypes.STRING(300),
        xlabel: 'avd vestimentaText',
        allowNull: true
      },
      asa_muestrasAfectivas: {
        type: DataTypes.STRING(300),
        xlabel: 'asa muestrasAfectivas',
        allowNull: true
      },
      asa_muestrasAfectivasText: {
        type: DataTypes.STRING(300),
        xlabel: 'asa muestrasAfectivasText',
        allowNull: true
      },
      asa_comunicacionOral: {
        type: DataTypes.STRING(300),
        xlabel: 'asa comunicacionOral',
        allowNull: true
      },
      asa_comunicacionOralText: {
        type: DataTypes.STRING(300),
        xlabel: 'asa comunicacionOralText',
        allowNull: true
      },
      asa_comunicacionAlternativa: {
        type: DataTypes.STRING(300),
        xlabel: 'asa comunicacionAlternativa',
        allowNull: true
      },
      asa_comunicacionAlternativaText: {
        type: DataTypes.STRING(300),
        xlabel: 'asa comunicacionAlternativaText',
        allowNull: true
      },
      asa_relacionamientoSocial: {
        type: DataTypes.STRING(300),
        xlabel: 'asa relacionamientoSocial',
        allowNull: true
      },
      asa_relacionamientoSocialText: {
        type: DataTypes.STRING(300),
        xlabel: 'asa relacionamientoSocialText',
        allowNull: true
      },
      areaCognitiva: {
        type: DataTypes.STRING(300),
        xlabel: 'areaCognitiva',
        allowNull: true
      },
      areaCognitivaText: {
        type: DataTypes.STRING(300),
        xlabel: 'areaCognitivaText',
        allowNull: true
      },
      aa_vision: {
        type: DataTypes.STRING(300),
        xlabel: 'aa vision',
        allowNull: true
      },
      aa_visionText: {
        type: DataTypes.STRING(300),
        xlabel: 'aa visionText',
        allowNull: true
      },
      aa_audicion: {
        type: DataTypes.STRING(300),
        xlabel: 'aa audicion',
        allowNull: true
      },
      aa_audicionText: {
        type: DataTypes.STRING(300),
        xlabel: 'aa audicionText',
        allowNull: true
      },
      aa_lenguaje: {
        type: DataTypes.STRING(300),
        xlabel: 'aa lenguaje',
        allowNull: true
      },
      aa_lenguajeText: {
        type: DataTypes.STRING(300),
        xlabel: 'aa lenguajeText',
        allowNull: true
      },
      aa_sindromeConvulsivo: {
        type: DataTypes.STRING(300),
        xlabel: 'aa sindromeConvulsivo',
        allowNull: true
      },
      aa_sindromeConvulsivoText: {
        type: DataTypes.STRING(300),
        xlabel: 'aa sindromeConvulsivoText',
        allowNull: true
      },
      aa_memoriaLargoPlazo: {
        type: DataTypes.STRING(300),
        xlabel: 'aa memoriaLargoPlazo',
        allowNull: true
      },
      aa_memoriaLargoPlazoText: {
        type: DataTypes.STRING(300),
        xlabel: 'aa memoriaLargoPlazoText',
        allowNull: true
      },
      aa_memoriaCortoPlazo: {
        type: DataTypes.STRING(300),
        xlabel: 'aa memoriaCortoPlazo',
        allowNull: true
      },
      aa_memoriaCortoPlazoText: {
        type: DataTypes.STRING(300),
        xlabel: 'aa memoriaCortoPlazoText',
        allowNull: true
      },
      aa_estadoEmocional: {
        type: DataTypes.STRING(300),
        xlabel: 'aa estadoEmocional',
        allowNull: true
      },
      aa_estadoEmocionalText: {
        type: DataTypes.STRING(300),
        xlabel: 'aa estadoEmocionalText',
        allowNull: true
      },
      aa_estadoNutricional: {
        type: DataTypes.STRING(300),
        xlabel: 'aa estadoNutricional',
        allowNull: true
      },
      aa_estadoNutricionalText: {
        type: DataTypes.STRING(300),
        xlabel: 'aa estadoNutricionalText',
        allowNull: true
      },
      aa_sensibilidad: {
        type: DataTypes.STRING(300),
        xlabel: 'aa sensibilidad',
        allowNull: true
      },
      aa_sensibilidadText: {
        type: DataTypes.STRING(300),
        xlabel: 'aa sensibilidadText',
        allowNull: true
      },
      aa_estereotipos: {
        type: DataTypes.STRING(300),
        xlabel: 'aa estereotipos',
        allowNull: true
      },
      conclusiones: {
        type: DataTypes.STRING(300),
        xlabel: 'conclusiones',
        allowNull: true
      },
      diagnostico: {
        type: DataTypes.STRING(300),
        xlabel: 'diagnostico',
        allowNull: true
      },
      objetivos: {
        type: DataTypes.STRING(300),
        xlabel: 'objetivos',
        allowNull: true
      },
      planTratamiento: {
        type: DataTypes.STRING(300),
        xlabel: 'planTratamiento',
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
            reg_ft.hasOne(models.registro, {as: 'reg_ft', foreignKey: {name: 'fid_reg_ft', allowNull: true}});
          },
        },
      });

      return reg_ft;
  };
  