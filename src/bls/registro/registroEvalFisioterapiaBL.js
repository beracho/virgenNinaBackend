/**
* Lógica del Negocio -> ConfiguracionBL
*/
const dao = require('../../dao/dao');
const Q = require('q');

module.exports = app => {
  const models = app.src.db.models;
  const rolBL = app.src.bls.autenticacion.rolBL;
  const estudianteBL = app.src.bls.inscripcion.estudianteBL;

  const creaRegistroEvalFisioterapia = (body) => {
    const deferred = Q.defer();
    const parametrosRegistroEvalFisioterapia = {
      diagnosticoMedico: body.diagnosticoMedico,
      motivoConsulta: body.motivoConsulta,
      antecedentesEnfermedadActual: body.antecedentesEnfermedadActual,
      ag_numeroEmbarazo: body.antecedentesGestacionales.numeroEmbarazo,
      ag_numeroHijos: body.antecedentesGestacionales.numeroHijos,
      ag_controlPrenatal: body.antecedentesGestacionales.controlPrenatal,
      ag_hospital: body.antecedentesGestacionales.hospital,
      ag_problemasDuranteEmbarazo: body.antecedentesGestacionales.problemasDuranteEmbarazo,
      ag_tiempoGestacional: body.antecedentesGestacionales.tiempoGestacional,
      ag_parto: body.antecedentesGestacionales.parto,
      ag_tipoParto: body.antecedentesGestacionales.tipoParto,
      ag_posicion: body.antecedentesGestacionales.posicion,
      ag_llanto: body.antecedentesGestacionales.llanto,
      ag_movimientos: body.antecedentesGestacionales.movimientos,
      ag_cianosis: body.antecedentesGestacionales.cianosis,
      ag_oxigeno: body.antecedentesGestacionales.oxigeno,
      ag_incubadora: body.antecedentesGestacionales.incubadora,
      ag_tiempoIncubadora: body.antecedentesGestacionales.tiempoIncubadora,
      ag_otros: body.antecedentesGestacionales.otros,
      epf_planoAnterior: body.exploracionPosturalFisica.planoAnterior,
      epf_planoPosterior: body.exploracionPosturalFisica.planoPosterior,
      epf_planoLateral: body.exploracionPosturalFisica.planoLateral,
      epf_otros: body.exploracionPosturalFisica.otros,
      epf_tipoRespiracion: body.exploracionPosturalFisica.tipoRespiracion,
      epf_patronRespiracion: body.exploracionPosturalFisica.patronRespiracion,
      epf_marcha: body.exploracionPosturalFisica.marcha,
      epf_Po_thomas: body.exploracionPosturalFisica.pruebaOrtopedica.thomas,
      epf_Po_galeazi: body.exploracionPosturalFisica.pruebaOrtopedica.galeazi,
      epf_Po_ober: body.exploracionPosturalFisica.pruebaOrtopedica.ober,
      epf_Po_ortolani: body.exploracionPosturalFisica.pruebaOrtopedica.ortolani,
      epf_Po_barlow: body.exploracionPosturalFisica.pruebaOrtopedica.barlow,
      epf_Po_asimetriaPliegues: body.exploracionPosturalFisica.pruebaOrtopedica.asimetriaPliegues,
      epf_Po_otros: body.exploracionPosturalFisica.pruebaOrtopedica.otros,
      epf_tono: body.exploracionPosturalFisica.tono,
      epf_trofismo: body.exploracionPosturalFisica.trofismo,
      escalaAshworth: body.escalaAshworth,
      ref_suctionReflection: body.reflejos.suctionReflection,
      ref_suctionReflectionText: body.reflejos.suctionReflectionText,
      ref_TRIPLEEXTFLX: body.reflejos.TRIPLEEXTFLX,
      ref_TRIPLEEXTFLXText: body.reflejos.TRIPLEEXTFLXText,
      ref_RTCA: body.reflejos.RTCA,
      ref_RTCAText: body.reflejos.RTCAText,
      ref_RTCS: body.reflejos.RTCS,
      ref_RTCSText: body.reflejos.RTCSText,
      ref_RTL: body.reflejos.RTL,
      ref_RTLText: body.reflejos.RTLText,
      ref_RMORO: body.reflejos.RMORO,
      ref_RMOROText: body.reflejos.RMOROText,
      ref_RBABINSKI: body.reflejos.RBABINSKI,
      ref_RBABINSKIText: body.reflejos.RBABINSKIText,
      ref_REXTCRUZADA: body.reflejos.REXTCRUZADA,
      ref_REXTCRUZADAText: body.reflejos.REXTCRUZADAText,
      ref_GALANT: body.reflejos.GALANT,
      ref_GALANTText: body.reflejos.GALANTText,
      ref_LANDAU: body.reflejos.LANDAU,
      ref_LANDAUText: body.reflejos.LANDAUText,
      ref_DEFENSA: body.reflejos.DEFENSA,
      ref_DEFENSAText: body.reflejos.DEFENSAText,
      ref_RPALMAR: body.reflejos.RPALMAR,
      ref_RPALMARText: body.reflejos.RPALMARText,
      ref_RPLANTAR: body.reflejos.RPLANTAR,
      ref_RPLANTARText: body.reflejos.RPLANTARText,
      ref_RPOSITIVODEAPOYO: body.reflejos.RPOSITIVODEAPOYO,
      ref_RPOSITIVODEAPOYOText: body.reflejos.RPOSITIVODEAPOYOText,
      ref_RPARACAIDAS: body.reflejos.RPARACAIDAS,
      ref_RPARACAIDASText: body.reflejos.RPARACAIDASText,
      re_laberintico: body.reaccionesEnderezamiento.laberintico,
      re_laberinticoText: body.reaccionesEnderezamiento.laberinticoText,
      re_sobreOjos: body.reaccionesEnderezamiento.sobreOjos,
      re_sobreOjosText: body.reaccionesEnderezamiento.sobreOjosText,
      ame_decubitoDorsal: body.actividadMotoraEspontanea.decubitoDorsal,
      ame_decubitoVentral: body.actividadMotoraEspontanea.decubitoVentral,
      ame_cambioPosicion: body.actividadMotoraEspontanea.cambioPosicion,
      ame_rolido: body.actividadMotoraEspontanea.rolido,
      ame_arrastre: body.actividadMotoraEspontanea.arrastre,
      ame_sedente: body.actividadMotoraEspontanea.sedente,
      ame_gateo: body.actividadMotoraEspontanea.gateo,
      ame_arrodillado: body.actividadMotoraEspontanea.arrodillado,
      ame_bipedo: body.actividadMotoraEspontanea.bipedo,
      ep_esquemaCorporal: body.evaluacionPsicomotriz.esquemaCorporal,
      ep_esquemaCorporalText: body.evaluacionPsicomotriz.esquemaCorporalText,
      ep_imagenCorporal: body.evaluacionPsicomotriz.imagenCorporal,
      ep_imagenCorporalText: body.evaluacionPsicomotriz.imagenCorporalText,
      ep_conceptoCorporal: body.evaluacionPsicomotriz.conceptoCorporal,
      ep_conceptoCorporalText: body.evaluacionPsicomotriz.conceptoCorporalText,
      ep_estructuracionEspacial: body.evaluacionPsicomotriz.estructuracionEspacial,
      ep_estructuracionEspacialText: body.evaluacionPsicomotriz.estructuracionEspacialText,
      ep_estructuracionTemporal: body.evaluacionPsicomotriz.estructuracionTemporal,
      ep_estructuracionTemporalText: body.evaluacionPsicomotriz.estructuracionTemporalText,
      ep_equilibrioEstatico: body.evaluacionPsicomotriz.equilibrioEstatico,
      ep_equilibrioEstaticoText: body.evaluacionPsicomotriz.equilibrioEstaticoText,
      ep_equilibrioDinamico: body.evaluacionPsicomotriz.equilibrioDinamico,
      ep_equilibrioDinamicoText: body.evaluacionPsicomotriz.equilibrioDinamicoText,
      ep_coordinacionGruesa: body.evaluacionPsicomotriz.coordinacionGruesa,
      ep_coordinacionGruesaText: body.evaluacionPsicomotriz.coordinacionGruesaText,
      ep_coordinacionFina: body.evaluacionPsicomotriz.coordinacionFina,
      ep_coordinacionFinaText: body.evaluacionPsicomotriz.coordinacionFinaText,
      ep_coordinacionOjoMano: body.evaluacionPsicomotriz.coordinacionOjoMano,
      ep_coordinacionOjoManoText: body.evaluacionPsicomotriz.coordinacionOjoManoText,
      ep_coordinacionOjoPie: body.evaluacionPsicomotriz.coordinacionOjoPie,
      ep_coordinacionOjoPieText: body.evaluacionPsicomotriz.coordinacionOjoPieText,
      ep_lateralidad: body.evaluacionPsicomotriz.lateralidad,
      ep_observacion: body.evaluacionPsicomotriz.observacion,
      avd_higiene: body.actividadesVidaDiaria.higiene,
      avd_higieneText: body.actividadesVidaDiaria.higieneText,
      avd_alimentacion: body.actividadesVidaDiaria.alimentacion,
      avd_alimentacionText: body.actividadesVidaDiaria.alimentacionText,
      avd_vestimenta: body.actividadesVidaDiaria.vestimenta,
      avd_vestimentaText: body.actividadesVidaDiaria.vestimentaText,
      asa_muestrasAfectivas: body.areaSocioAfectiva.muestrasAfectivas,
      asa_muestrasAfectivasText: body.areaSocioAfectiva.muestrasAfectivasText,
      asa_comunicacionOral: body.areaSocioAfectiva.comunicacionOral,
      asa_comunicacionOralText: body.areaSocioAfectiva.comunicacionOralText,
      asa_comunicacionAlternativa: body.areaSocioAfectiva.comunicacionAlternativa,
      asa_comunicacionAlternativaText: body.areaSocioAfectiva.comunicacionAlternativaText,
      asa_relacionamientoSocial: body.areaSocioAfectiva.relacionamientoSocial,
      asa_relacionamientoSocialText: body.areaSocioAfectiva.relacionamientoSocialText,
      areaCognitiva: body.areaCognitiva,
      areaCognitivaText: body.areaCognitivaText,
      aa_vision: body.alteracionesAsociadas.vision,
      aa_visionText: body.alteracionesAsociadas.visionText,
      aa_audicion: body.alteracionesAsociadas.audicion,
      aa_audicionText: body.alteracionesAsociadas.audicionText,
      aa_lenguaje: body.alteracionesAsociadas.lenguaje,
      aa_lenguajeText: body.alteracionesAsociadas.lenguajeText,
      aa_sindromeConvulsivo: body.alteracionesAsociadas.sindromeConvulsivo,
      aa_sindromeConvulsivoText: body.alteracionesAsociadas.sindromeConvulsivoText,
      aa_memoriaLargoPlazo: body.alteracionesAsociadas.memoriaLargoPlazo,
      aa_memoriaLargoPlazoText: body.alteracionesAsociadas.memoriaLargoPlazoText,
      aa_memoriaCortoPlazo: body.alteracionesAsociadas.memoriaCortoPlazo,
      aa_memoriaCortoPlazoText: body.alteracionesAsociadas.memoriaCortoPlazoText,
      aa_estadoEmocional: body.alteracionesAsociadas.estadoEmocional,
      aa_estadoEmocionalText: body.alteracionesAsociadas.estadoEmocionalText,
      aa_estadoNutricional: body.alteracionesAsociadas.estadoNutricional,
      aa_estadoNutricionalText: body.alteracionesAsociadas.estadoNutricionalText,
      aa_sensibilidad: body.alteracionesAsociadas.sensibilidad,
      aa_sensibilidadText: body.alteracionesAsociadas.sensibilidadText,
      aa_estereotipos: body.alteracionesAsociadas.estereotipos,
      conclusiones: body.conclusiones,
      diagnostico: body.diagnostico,
      objetivos: body.objetivos,
      planTratamiento: body.planTratamiento,
      _usuario_creacion: body.audit_usuario.id_usuario,
      _usuario_modificacion: body.audit_usuario.id_usuario
    };
    const parametrosRegistro = {
      tipo: 'especialidad',
      _usuario_creacion: body.audit_usuario.id_usuario,
      _usuario_modificacion: body.audit_usuario.id_usuario
    }
    models.sequelize.transaction().then((transaccion) => {
      dao.crearRegistro(models.reg_ft, parametrosRegistroEvalFisioterapia, false, transaccion)
      .then(respuestaCreacionRegistroEvalFisioterapia => {
        parametrosRegistro.fid_reg_ft = respuestaCreacionRegistroEvalFisioterapia.id_reg_ft;
        return rolBL.listarRoles({},{}, models);
      })
      .then(respuestaRoles => {
        let profArea = '';
        respuestaRoles.forEach(element => {
          if(element.id_rol == body.audit_usuario.id_rol) {
            profArea = element.nombre;
          }
        });
        switch (profArea) {
          case 'PROF_PSICOMOTRICIDAD':
            parametrosRegistro.area = 'psicomotricidad';
            break;
          case 'PROF_FISIOTERAPIA':
            parametrosRegistro.area = 'fisioterapia';
            break;
          case 'PROF_FONOAUDIOLOGIA':
            parametrosRegistro.area = 'fonoaudiologia';
            break;
          case 'PROF_NUTRICION':
            parametrosRegistro.area = 'nutricion';
            break;
          case 'PROF_PSICOLOGIA':
            parametrosRegistro.area = 'psicologia';
            break;
          case 'PROF_ODONTOLOGIA':
            parametrosRegistro.area = 'odontologia';
            break;
          case 'PROF_PSICOPEDAGOGIA':
            parametrosRegistro.area = 'psicopedagogia';
            break;
          case 'PROF_TRABAJO_SOCIAL':
            parametrosRegistro.area = 'trabajo social';
            break;
          case 'PROF_MEDICINA_GENERAL':
            parametrosRegistro.area = 'medicina general';
            break;
        
          default:
            // error, out of boundary
            break;
        }
        return estudianteBL.estudiantePorCodigo(body.codigoEstudiante, models);
      })
      .then(respuestaEstudiante => {
        parametrosRegistro.fid_estudiante = respuestaEstudiante.id_estudiante;
        return dao.crearRegistro(models.registro, parametrosRegistro, false, transaccion)
      })
      .then(respuestaCreacion => {
        transaccion.commit().then(res => deferred.resolve(respuestaCreacion))
      })
      .catch(error => {
        transaccion.rollback().then(res => deferred.reject(error))
      });
    })
    .catch(error => deferred.reject(error));
    return deferred.promise;
  }

  const editaRegistroEvalFisioterapia = (body) => {
    const deferred = Q.defer();
    const parametrosRegistroEvalFisioterapia = {
      diagnosticoMedico: body.diagnosticoMedico,
      motivoConsulta: body.motivoConsulta,
      antecedentesEnfermedadActual: body.antecedentesEnfermedadActual,
      ag_numeroEmbarazo: body.ag.numeroEmbarazo,
      ag_numeroHijos: body.ag.numeroHijos,
      ag_controlPrenatal: body.ag.controlPrenatal,
      ag_hospital: body.ag.hospital,
      ag_problemasDuranteEmbarazo: body.ag.problemasDuranteEmbarazo,
      ag_tiempoGestacional: body.ag.tiempoGestacional,
      ag_parto: body.ag.parto,
      ag_tipoParto: body.ag.tipoParto,
      ag_posicion: body.ag.posicion,
      ag_llanto: body.ag.llanto,
      ag_movimientos: body.ag.movimientos,
      ag_cianosis: body.ag.cianosis,
      ag_oxigeno: body.ag.oxigeno,
      ag_incubadora: body.ag.incubadora,
      ag_tiempoIncubadora: body.ag.tiempoIncubadora,
      ag_otros: body.ag.otros,
      epf_planoAnterior: body.epf.planoAnterior,
      epf_planoPosterior: body.epf.planoPosterior,
      epf_planoLateral: body.epf.planoLateral,
      epf_otros: body.epf.otros,
      epf_tipoRespiracion: body.epf.tipoRespiracion,
      epf_patronRespiracion: body.epf.patronRespiracion,
      epf_marcha: body.epf.marcha,
      epf_Po_thomas: body.epf.Po.thomas,
      epf_Po_galeazi: body.epf.Po.galeazi,
      epf_Po_ober: body.epf.Po.ober,
      epf_Po_ortolani: body.epf.Po.ortolani,
      epf_Po_barlow: body.epf.Po.barlow,
      epf_Po_asimetriaPliegues: body.epf.Po.asimetriaPliegues,
      epf_Po_otros: body.epf.Po.otros,
      epf_tono: body.epf.tono,
      epf_trofismo: body.epf.trofismo,
      escalaAshworth: body.escalaAshworth,
      ref_suctionReflection: body.ref.suctionReflection,
      ref_suctionReflectionText: body.ref.suctionReflectionText,
      ref_TRIPLEEXTFLX: body.ref.TRIPLEEXTFLX,
      ref_TRIPLEEXTFLXText: body.ref.TRIPLEEXTFLXText,
      ref_RTCA: body.ref.RTCA,
      ref_RTCAText: body.ref.RTCAText,
      ref_RTCS: body.ref.RTCS,
      ref_RTCSText: body.ref.RTCSText,
      ref_RTL: body.ref.RTL,
      ref_RTLText: body.ref.RTLText,
      ref_RMORO: body.ref.RMORO,
      ref_RMOROText: body.ref.RMOROText,
      ref_RBABINSKI: body.ref.RBABINSKI,
      ref_RBABINSKIText: body.ref.RBABINSKIText,
      ref_REXTCRUZADA: body.ref.REXTCRUZADA,
      ref_REXTCRUZADAText: body.ref.REXTCRUZADAText,
      ref_GALANT: body.ref.GALANT,
      ref_GALANTText: body.ref.GALANTText,
      ref_LANDAU: body.ref.LANDAU,
      ref_LANDAUText: body.ref.LANDAUText,
      ref_DEFENSA: body.ref.DEFENSA,
      ref_DEFENSAText: body.ref.DEFENSAText,
      ref_RPALMAR: body.ref.RPALMAR,
      ref_RPALMARText: body.ref.RPALMARText,
      ref_RPLANTAR: body.ref.RPLANTAR,
      ref_RPLANTARText: body.ref.RPLANTARText,
      ref_RPOSITIVODEAPOYO: body.ref.RPOSITIVODEAPOYO,
      ref_RPOSITIVODEAPOYOText: body.ref.RPOSITIVODEAPOYOText,
      ref_RPARACAIDAS: body.ref.RPARACAIDAS,
      ref_RPARACAIDASText: body.ref.RPARACAIDASText,
      re_laberintico: body.re.laberintico,
      re_laberinticoText: body.re.laberinticoText,
      re_sobreOjos: body.re.sobreOjos,
      re_sobreOjosText: body.re.sobreOjosText,
      ame_decubitoDorsal: body.ame.decubitoDorsal,
      ame_decubitoVentral: body.ame.decubitoVentral,
      ame_cambioPosicion: body.ame.cambioPosicion,
      ame_rolido: body.ame.rolido,
      ame_arrastre: body.ame.arrastre,
      ame_sedente: body.ame.sedente,
      ame_gateo: body.ame.gateo,
      ame_arrodillado: body.ame.arrodillado,
      ame_bipedo: body.ame.bipedo,
      ep_esquemaCorporal: body.ep.esquemaCorporal,
      ep_esquemaCorporalText: body.ep.esquemaCorporalText,
      ep_imagenCorporal: body.ep.imagenCorporal,
      ep_imagenCorporalText: body.ep.imagenCorporalText,
      ep_conceptoCorporal: body.ep.conceptoCorporal,
      ep_conceptoCorporalText: body.ep.conceptoCorporalText,
      ep_estructuracionEspacial: body.ep.estructuracionEspacial,
      ep_estructuracionEspacialText: body.ep.estructuracionEspacialText,
      ep_estructuracionTemporal: body.ep.estructuracionTemporal,
      ep_estructuracionTemporalText: body.ep.estructuracionTemporalText,
      ep_equilibrioEstatico: body.ep.equilibrioEstatico,
      ep_equilibrioEstaticoText: body.ep.equilibrioEstaticoText,
      ep_equilibrioDinamico: body.ep.equilibrioDinamico,
      ep_equilibrioDinamicoText: body.ep.equilibrioDinamicoText,
      ep_coordinacionGruesa: body.ep.coordinacionGruesa,
      ep_coordinacionGruesaText: body.ep.coordinacionGruesaText,
      ep_coordinacionFina: body.ep.coordinacionFina,
      ep_coordinacionFinaText: body.ep.coordinacionFinaText,
      ep_coordinacionOjoMano: body.ep.coordinacionOjoMano,
      ep_coordinacionOjoManoText: body.ep.coordinacionOjoManoText,
      ep_coordinacionOjoPie: body.ep.coordinacionOjoPie,
      ep_coordinacionOjoPieText: body.ep.coordinacionOjoPieText,
      ep_lateralidad: body.ep.lateralidad,
      ep_observacion: body.ep.observacion,
      avd_higiene: body.avd.higiene,
      avd_higieneText: body.avd.higieneText,
      avd_alimentacion: body.avd.alimentacion,
      avd_alimentacionText: body.avd.alimentacionText,
      avd_vestimenta: body.avd.vestimenta,
      avd_vestimentaText: body.avd.vestimentaText,
      asa_muestrasAfectivas: body.asa.muestrasAfectivas,
      asa_muestrasAfectivasText: body.asa.muestrasAfectivasText,
      asa_comunicacionOral: body.asa.comunicacionOral,
      asa_comunicacionOralText: body.asa.comunicacionOralText,
      asa_comunicacionAlternativa: body.asa.comunicacionAlternativa,
      asa_comunicacionAlternativaText: body.asa.comunicacionAlternativaText,
      asa_relacionamientoSocial: body.asa.relacionamientoSocial,
      asa_relacionamientoSocialText: body.asa.relacionamientoSocialText,
      areaCognitiva: body.areaCognitiva,
      areaCognitivaText: body.areaCognitivaText,
      aa_vision: body.aa.vision,
      aa_visionText: body.aa.visionText,
      aa_audicion: body.aa.audicion,
      aa_audicionText: body.aa.audicionText,
      aa_lenguaje: body.aa.lenguaje,
      aa_lenguajeText: body.aa.lenguajeText,
      aa_sindromeConvulsivo: body.aa.sindromeConvulsivo,
      aa_sindromeConvulsivoText: body.aa.sindromeConvulsivoText,
      aa_memoriaLargoPlazo: body.aa.memoriaLargoPlazo,
      aa_memoriaLargoPlazoText: body.aa.memoriaLargoPlazoText,
      aa_memoriaCortoPlazo: body.aa.memoriaCortoPlazo,
      aa_memoriaCortoPlazoText: body.aa.memoriaCortoPlazoText,
      aa_estadoEmocional: body.aa.estadoEmocional,
      aa_estadoEmocionalText: body.aa.estadoEmocionalText,
      aa_estadoNutricional: body.aa.estadoNutricional,
      aa_estadoNutricionalText: body.aa.estadoNutricionalText,
      aa_sensibilidad: body.aa.sensibilidad,
      aa_sensibilidadText: body.aa.sensibilidadText,
      aa_estereotipos: body.aa.estereotipos,
      conclusiones: body.conclusiones,
      diagnostico: body.diagnostico,
      objetivos: body.objetivos,
      planTratamiento: body.planTratamiento,
      _usuario_modificacion: body.audit_usuario.id_usuario
    };
    const parametrosRegistro = {
      _usuario_modificacion: body.audit_usuario.id_usuario
    }
    models.sequelize.transaction().then((transaccion) => {
      dao.modificarRegistro(models.reg_ft, body.idRegistroFisioterapia, parametrosRegistroEvalFisioterapia, transaccion)
      .then(respuestaCreacionRegistroEvalFisioterapia => {
        parametrosRegistro.fid_reg_ft = respuestaCreacionRegistroEvalFisioterapia.id_reg_ft;
        return dao.modificarRegistro(models.registro, body.idRegistro, parametrosRegistro, transaccion)
      })
      .then(respuestaCreacion => {
        transaccion.commit().then(res => deferred.resolve(respuestaCreacion))
      })
      .catch(error => {
        transaccion.rollback().then(res => deferred.reject(error))
      });
    })
    .catch(error => deferred.reject(error));
    return deferred.promise;
  }

  const eliminaRegistroEvalFisioterapia = (body) => {
    const deferred = Q.defer();
    models.sequelize.transaction().then((transaccion) => {
      dao.eliminarRegistro(models.reg_ft, body.reg_ft.id_reg_ft, transaccion)
      .then(() => {
        return dao.eliminarRegistro(models.registro, body.id_registro, transaccion)
      })
      .then(respuestaCreacion => {
        transaccion.commit().then(res => deferred.resolve(respuestaCreacion))
      })
      .catch(error => {
        transaccion.rollback().then(res => deferred.reject(error))
      });
    })
    .catch(error => deferred.reject(error));
    return deferred.promise;
  }

  const registroEvalFisioterapiaBL = {
    creaRegistroEvalFisioterapia,
    editaRegistroEvalFisioterapia,
    eliminaRegistroEvalFisioterapia
  };

  return registroEvalFisioterapiaBL;
};