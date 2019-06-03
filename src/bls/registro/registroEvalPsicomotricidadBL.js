/**
* Lógica del Negocio -> ConfiguracionBL
*/
const dao = require('../../dao/dao');
const Q = require('q');

module.exports = app => {
  const models = app.src.db.models;
  const rolBL = app.src.bls.autenticacion.rolBL;
  const estudianteBL = app.src.bls.inscripcion.estudianteBL;

  const creaRegistroEvalPsicomotricidad = (body) => {
    const deferred = Q.defer();
    const parametrosRegistroEvalPsicomotricidad = {
      anam_antecedentesFamiliares: body.anamnesia.antecedentesFamiliares,
      anam_antecedentesPatologicos: body.anamnesia.antecedentesPatologicos,
      anam_perinatal: body.anamnesia.perinatal,
      anam_prenatal: body.anamnesia.prenatal,
      anam_postnatal: body.anamnesia.postnatal,
      anam_controlCefálico: body.anamnesia.controlCefálico,
      anam_Sedestación: body.anamnesia.Sedestación,
      anam_Arrastre: body.anamnesia.Arrastre,
      anam_Gateo: body.anamnesia.Gateo,
      anam_Bipedestación: body.anamnesia.Bipedestación,
      anam_Marcha: body.anamnesia.Marcha,
      anam_razonConsulta: body.anamnesia.razonConsulta,
      psico_headUpright: body.evaluacionPsicomotriz.headUpright,
      psico_movesHead: body.evaluacionPsicomotriz.movesHead,
      psico_holdsObjects: body.evaluacionPsicomotriz.holdsObjects,
      psico_playsFeetAndHands: body.evaluacionPsicomotriz.playsFeetAndHands,
      psico_locateSounds: body.evaluacionPsicomotriz.locateSounds,
      psico_babbles: body.evaluacionPsicomotriz.babbles,
      psico_gutturalSounds: body.evaluacionPsicomotriz.gutturalSounds,
      psico_stimulusSmile: body.evaluacionPsicomotriz.stimulusSmile,
      psico_recognicesMother: body.evaluacionPsicomotriz.recognicesMother,
      psico_mouthSounds: body.evaluacionPsicomotriz.mouthSounds,
      psico_liftHead: body.evaluacionPsicomotriz.liftHead,
      psico_ulnaChange: body.evaluacionPsicomotriz.ulnaChange,
      psico_picksCloseObjects: body.evaluacionPsicomotriz.picksCloseObjects,
      psico_makesSounds: body.evaluacionPsicomotriz.makesSounds,
      psico_callsForAttention: body.evaluacionPsicomotriz.callsForAttention,
      psico_repeatsSyllables: body.evaluacionPsicomotriz.repeatsSyllables,
      psico_smilesToExtrangers: body.evaluacionPsicomotriz.smilesToExtrangers,
      psico_recognicesCaretaker: body.evaluacionPsicomotriz.recognicesCaretaker,
      psico_sitsWithoutSupport: body.evaluacionPsicomotriz.sitsWithoutSupport,
      psico_drags: body.evaluacionPsicomotriz.drags,
      psico_picksAndHitsObjects: body.evaluacionPsicomotriz.picksAndHitsObjects,
      psico_takesFoodToMouth: body.evaluacionPsicomotriz.takesFoodToMouth,
      psico_likesSongs: body.evaluacionPsicomotriz.likesSongs,
      psico_searchsSounds: body.evaluacionPsicomotriz.searchsSounds,
      psico_recognicesObjects: body.evaluacionPsicomotriz.recognicesObjects,
      psico_criesBeforeExtrangers: body.evaluacionPsicomotriz.criesBeforeExtrangers,
      psico_imitatesMovements: body.evaluacionPsicomotriz.imitatesMovements,
      psico_sitsWithSupport: body.evaluacionPsicomotriz.sitsWithSupport,
      psico_crawl: body.evaluacionPsicomotriz.crawl,
      psico_discoversObjects: body.evaluacionPsicomotriz.discoversObjects,
      psico_walksWithSupport: body.evaluacionPsicomotriz.walksWithSupport,
      psico_wordsWithMeaning: body.evaluacionPsicomotriz.wordsWithMeaning,
      psico_embraceAdultChild: body.evaluacionPsicomotriz.embraceAdultChild,
      psico_answersToName: body.evaluacionPsicomotriz.answersToName,
      psico_meetsSimpleOrders: body.evaluacionPsicomotriz.meetsSimpleOrders,
      psico_jumpsWithBothFeet: body.evaluacionPsicomotriz.jumpsWithBothFeet,
      psico_throwsBall: body.evaluacionPsicomotriz.throwsBall,
      psico_UndressHimself: body.evaluacionPsicomotriz.UndressHimself,
      psico_useForkCup: body.evaluacionPsicomotriz.useForkCup,
      psico_makesNounVerbPhrases: body.evaluacionPsicomotriz.makesNounVerbPhrases,
      psico_useNegatives: body.evaluacionPsicomotriz.useNegatives,
      psico_answerQuestions: body.evaluacionPsicomotriz.answerQuestions,
      psico_bigAndSmallDifferences: body.evaluacionPsicomotriz.bigAndSmallDifferences,
      psico_singChildrenSongs: body.evaluacionPsicomotriz.singChildrenSongs,
      psico_exploreEnvironment: body.evaluacionPsicomotriz.exploreEnvironment,
      psico_recognicesPhotographs: body.evaluacionPsicomotriz.recognicesPhotographs,
      psico_playsSmallGroups: body.evaluacionPsicomotriz.playsSmallGroups,
      psico_greetsOnCommand: body.evaluacionPsicomotriz.greetsOnCommand,
      psico_performManualActivities: body.evaluacionPsicomotriz.performManualActivities,
      psico_runsJumps: body.evaluacionPsicomotriz.runsJumps,
      psico_copyLinesAndCircles: body.evaluacionPsicomotriz.copyLinesAndCircles,
      psico_identifiesEspatialConcepts: body.evaluacionPsicomotriz.identifiesEspatialConcepts,
      psico_acknowledgeHisSex: body.evaluacionPsicomotriz.acknowledgeHisSex,
      psico_gerundPluralArticleDifference: body.evaluacionPsicomotriz.gerundPluralArticleDifference,
      psico_articlePhonemes: body.evaluacionPsicomotriz.articlePhonemes,
      psico_gestureCommunication: body.evaluacionPsicomotriz.gestureCommunication,
      psico_talksFirstPerson: body.evaluacionPsicomotriz.talksFirstPerson,
      psico_useOralLanguage: body.evaluacionPsicomotriz.useOralLanguage,
      psico_showsPersonalPreferences: body.evaluacionPsicomotriz.showsPersonalPreferences,
      psico_likesChildAndAnimals: body.evaluacionPsicomotriz.likesChildAndAnimals,
      psico_joinsSmallTeams: body.evaluacionPsicomotriz.joinsSmallTeams,
      motor_run: body.areaMotora.run,
      motor_jump: body.areaMotora.jump,
      motor_throw: body.areaMotora.throw,
      motor_kick: body.areaMotora.kick,
      motor_staticDinamicBalance: body.areaMotora.staticDinamicBalance,
      motor_staticBalance: body.areaMotora.staticBalance,
      motor_partialDisociation: body.areaMotora.partialDisociation,
      motor_generalCoordination: body.areaMotora.generalCoordination,
      motor_eye_right: body.areaMotora.eye.right,
      motor_eye_left: body.areaMotora.eye.left,
      motor_ear_right: body.areaMotora.ear.right,
      motor_ear_left: body.areaMotora.ear.left,
      motor_hand_right: body.areaMotora.hand.right,
      motor_hand_left: body.areaMotora.hand.left,
      motor_feet_right: body.areaMotora.feet.right,
      motor_feet_left: body.areaMotora.feet.left,
      motor_scrash: body.areaMotora.scrash,
      motor_button: body.areaMotora.button,
      motor_cut: body.areaMotora.cut,
      motor_makeTower: body.areaMotora.makeTower,
      motor_threadingNeedle: body.areaMotora.threadingNeedle,
      motor_observaciones: body.areaMotora.observaciones,
      cogni_drawsHumanFigure: body.areaCognitiva.drawsHumanFigure,
      cogni_nameHumanParts: body.areaCognitiva.nameHumanParts,
      cogni_compleateHumanFigure: body.areaCognitiva.compleateHumanFigure,
      cogni_bodyImage: body.areaCognitiva.bodyImage,
      cogni_urlPhoto: body.areaCognitiva.urlPhoto,
      // cogni_headersPhoto: body.areaCognitiva.headersPhoto,
      cogni_arriba: body.areaCognitiva.arriba,
      cogni_abajo: body.areaCognitiva.abajo,
      cogni_delante: body.areaCognitiva.delante,
      cogni_detras: body.areaCognitiva.detras,
      cogni_dentro: body.areaCognitiva.dentro,
      cogni_fuera: body.areaCognitiva.fuera,
      cogni_izquierda: body.areaCognitiva.izquierda,
      cogni_derecha: body.areaCognitiva.derecha,
      cogni_inflaGlobo: body.areaCognitiva.inflaGlobo,
      cogni_encubaHuevos: body.areaCognitiva.encubaHuevos,
      cogni_plantaFlores: body.areaCognitiva.plantaFlores,
      cogni_undifferentiatedCrying: body.areaCognitiva.undifferentiatedCrying,
      cogni_socialSmile: body.areaCognitiva.socialSmile,
      cogni_vocalGame: body.areaCognitiva.vocalGame,
      cogni_babbleReflection: body.areaCognitiva.babbleReflection,
      cogni_gutturalSound: body.areaCognitiva.gutturalSound,
      cogni_gestures: body.areaCognitiva.gestures,
      cogni_intentionalSyllable: body.areaCognitiva.intentionalSyllable,
      cogni_juxtaposedWord: body.areaCognitiva.juxtaposedWord,
      cogni_simplePhrase: body.areaCognitiva.simplePhrase,
      cogni_phraseWord: body.areaCognitiva.phraseWord,
      cogni_languageInteriorization: body.areaCognitiva.languageInteriorization,
      cogni_waitTurn: body.areaCognitiva.waitTurn,
      cogni_completePhrase: body.areaCognitiva.completePhrase,
      cogni_gramaticalElemmentUse: body.areaCognitiva.gramaticalElemmentUse,
      cogni_makeComplexeSentences: body.areaCognitiva.makeComplexeSentences,
      cogni_fullfillComplexOrder: body.areaCognitiva.fullfillComplexOrder,
      cogni_beginReadingWriting: body.areaCognitiva.beginReadingWriting,
      cogni_usePreposition: body.areaCognitiva.usePreposition,
      cogni_useAdjectives: body.areaCognitiva.useAdjectives,
      cogni_slangLanguage: body.areaCognitiva.slangLanguage,
      cogni_useAdjectivesAdverbs: body.areaCognitiva.useAdjectivesAdverbs,
      cogni_verbUse: body.areaCognitiva.verbUse,
      cogni_fluidCommunication: body.areaCognitiva.fluidCommunication,
      cogni_observaciones: body.areaCognitiva.observaciones,
      socio_plays: body.areaSocioAfectiva.plays,
      socio_proposeGame: body.areaSocioAfectiva.proposeGame,
      socio_leaderInGames: body.areaSocioAfectiva.leaderInGames,
      socio_acceptAnothersGame: body.areaSocioAfectiva.acceptAnothersGame,
      socio_otherGame: body.areaSocioAfectiva.otherGame,
      socio_acceptIt: body.areaSocioAfectiva.acceptIt,
      socio_searchIt: body.areaSocioAfectiva.searchIt,
      socio_provokesIt: body.areaSocioAfectiva.provokesIt,
      socio_thanksHim: body.areaSocioAfectiva.thanksHim,
      socio_waitGrownUpApprovation: body.areaSocioAfectiva.waitGrownUpApprovation,
      socio_waitOrders: body.areaSocioAfectiva.waitOrders,
      socio_collaborateWithAdult: body.areaSocioAfectiva.collaborateWithAdult,
      socio_otherAdult: body.areaSocioAfectiva.otherAdult,
      socio_observaciones: body.areaSocioAfectiva.observaciones,
      diagnosticoPsicomotriz: body.diagnosticoPsicomotriz,
      recomendaciones: body.recomendaciones,
      _usuario_creacion: body.audit_usuario.id_usuario,
      _usuario_modificacion: body.audit_usuario.id_usuario
    };
    const parametrosRegistro = {
      tipo: 'especialidad',
      _usuario_creacion: body.audit_usuario.id_usuario,
      _usuario_modificacion: body.audit_usuario.id_usuario
    }
    models.sequelize.transaction().then((transaccion) => {
      dao.crearRegistro(models.reg_pm, parametrosRegistroEvalPsicomotricidad, false, transaccion)
      .then(respuestaCreacionRegistroEvalPsicomotricidad => {
        parametrosRegistro.fid_reg_pm = respuestaCreacionRegistroEvalPsicomotricidad.id_reg_pm;
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

  const editaRegistroEvalPsicomotricidad = (body) => {
    const deferred = Q.defer();
    const parametrosRegistroEvalPsicomotricidad = {
      anam_antecedentesFamiliares: body.anamnesia.antecedentesFamiliares,
      anam_antecedentesPatologicos: body.anamnesia.antecedentesPatologicos,
      anam_perinatal: body.anamnesia.perinatal,
      anam_prenatal: body.anamnesia.prenatal,
      anam_postnatal: body.anamnesia.postnatal,
      anam_controlCefálico: body.anamnesia.controlCefálico,
      anam_Sedestación: body.anamnesia.Sedestación,
      anam_Arrastre: body.anamnesia.Arrastre,
      anam_Gateo: body.anamnesia.Gateo,
      anam_Bipedestación: body.anamnesia.Bipedestación,
      anam_Marcha: body.anamnesia.Marcha,
      anam_razonConsulta: body.anamnesia.razonConsulta,
      psico_headUpright: body.evaluacionPsicomotriz.headUpright,
      psico_movesHead: body.evaluacionPsicomotriz.movesHead,
      psico_holdsObjects: body.evaluacionPsicomotriz.holdsObjects,
      psico_playsFeetAndHands: body.evaluacionPsicomotriz.playsFeetAndHands,
      psico_locateSounds: body.evaluacionPsicomotriz.locateSounds,
      psico_babbles: body.evaluacionPsicomotriz.babbles,
      psico_gutturalSounds: body.evaluacionPsicomotriz.gutturalSounds,
      psico_stimulusSmile: body.evaluacionPsicomotriz.stimulusSmile,
      psico_recognicesMother: body.evaluacionPsicomotriz.recognicesMother,
      psico_mouthSounds: body.evaluacionPsicomotriz.mouthSounds,
      psico_liftHead: body.evaluacionPsicomotriz.liftHead,
      psico_ulnaChange: body.evaluacionPsicomotriz.ulnaChange,
      psico_picksCloseObjects: body.evaluacionPsicomotriz.picksCloseObjects,
      psico_makesSounds: body.evaluacionPsicomotriz.makesSounds,
      psico_callsForAttention: body.evaluacionPsicomotriz.callsForAttention,
      psico_repeatsSyllables: body.evaluacionPsicomotriz.repeatsSyllables,
      psico_smilesToExtrangers: body.evaluacionPsicomotriz.smilesToExtrangers,
      psico_recognicesCaretaker: body.evaluacionPsicomotriz.recognicesCaretaker,
      psico_sitsWithoutSupport: body.evaluacionPsicomotriz.sitsWithoutSupport,
      psico_drags: body.evaluacionPsicomotriz.drags,
      psico_picksAndHitsObjects: body.evaluacionPsicomotriz.picksAndHitsObjects,
      psico_takesFoodToMouth: body.evaluacionPsicomotriz.takesFoodToMouth,
      psico_likesSongs: body.evaluacionPsicomotriz.likesSongs,
      psico_searchsSounds: body.evaluacionPsicomotriz.searchsSounds,
      psico_recognicesObjects: body.evaluacionPsicomotriz.recognicesObjects,
      psico_criesBeforeExtrangers: body.evaluacionPsicomotriz.criesBeforeExtrangers,
      psico_imitatesMovements: body.evaluacionPsicomotriz.imitatesMovements,
      psico_sitsWithSupport: body.evaluacionPsicomotriz.sitsWithSupport,
      psico_crawl: body.evaluacionPsicomotriz.crawl,
      psico_discoversObjects: body.evaluacionPsicomotriz.discoversObjects,
      psico_walksWithSupport: body.evaluacionPsicomotriz.walksWithSupport,
      psico_wordsWithMeaning: body.evaluacionPsicomotriz.wordsWithMeaning,
      psico_embraceAdultChild: body.evaluacionPsicomotriz.embraceAdultChild,
      psico_answersToName: body.evaluacionPsicomotriz.answersToName,
      psico_meetsSimpleOrders: body.evaluacionPsicomotriz.meetsSimpleOrders,
      psico_jumpsWithBothFeet: body.evaluacionPsicomotriz.jumpsWithBothFeet,
      psico_throwsBall: body.evaluacionPsicomotriz.throwsBall,
      psico_UndressHimself: body.evaluacionPsicomotriz.UndressHimself,
      psico_useForkCup: body.evaluacionPsicomotriz.useForkCup,
      psico_makesNounVerbPhrases: body.evaluacionPsicomotriz.makesNounVerbPhrases,
      psico_useNegatives: body.evaluacionPsicomotriz.useNegatives,
      psico_answerQuestions: body.evaluacionPsicomotriz.answerQuestions,
      psico_bigAndSmallDifferences: body.evaluacionPsicomotriz.bigAndSmallDifferences,
      psico_singChildrenSongs: body.evaluacionPsicomotriz.singChildrenSongs,
      psico_exploreEnvironment: body.evaluacionPsicomotriz.exploreEnvironment,
      psico_recognicesPhotographs: body.evaluacionPsicomotriz.recognicesPhotographs,
      psico_playsSmallGroups: body.evaluacionPsicomotriz.playsSmallGroups,
      psico_greetsOnCommand: body.evaluacionPsicomotriz.greetsOnCommand,
      psico_performManualActivities: body.evaluacionPsicomotriz.performManualActivities,
      psico_runsJumps: body.evaluacionPsicomotriz.runsJumps,
      psico_copyLinesAndCircles: body.evaluacionPsicomotriz.copyLinesAndCircles,
      psico_identifiesEspatialConcepts: body.evaluacionPsicomotriz.identifiesEspatialConcepts,
      psico_acknowledgeHisSex: body.evaluacionPsicomotriz.acknowledgeHisSex,
      psico_gerundPluralArticleDifference: body.evaluacionPsicomotriz.gerundPluralArticleDifference,
      psico_articlePhonemes: body.evaluacionPsicomotriz.articlePhonemes,
      psico_gestureCommunication: body.evaluacionPsicomotriz.gestureCommunication,
      psico_talksFirstPerson: body.evaluacionPsicomotriz.talksFirstPerson,
      psico_useOralLanguage: body.evaluacionPsicomotriz.useOralLanguage,
      psico_showsPersonalPreferences: body.evaluacionPsicomotriz.showsPersonalPreferences,
      psico_likesChildAndAnimals: body.evaluacionPsicomotriz.likesChildAndAnimals,
      psico_joinsSmallTeams: body.evaluacionPsicomotriz.joinsSmallTeams,
      motor_run: body.areaMotora.run,
      motor_jump: body.areaMotora.jump,
      motor_throw: body.areaMotora.throw,
      motor_kick: body.areaMotora.kick,
      motor_staticDinamicBalance: body.areaMotora.staticDinamicBalance,
      motor_staticBalance: body.areaMotora.staticBalance,
      motor_partialDisociation: body.areaMotora.partialDisociation,
      motor_generalCoordination: body.areaMotora.generalCoordination,
      motor_eye_right: body.areaMotora.eye.right,
      motor_eye_left: body.areaMotora.eye.left,
      motor_ear_right: body.areaMotora.ear.right,
      motor_ear_left: body.areaMotora.ear.left,
      motor_hand_right: body.areaMotora.hand.right,
      motor_hand_left: body.areaMotora.hand.left,
      motor_feet_right: body.areaMotora.feet.right,
      motor_feet_left: body.areaMotora.feet.left,
      motor_scrash: body.areaMotora.scrash,
      motor_button: body.areaMotora.button,
      motor_cut: body.areaMotora.cut,
      motor_makeTower: body.areaMotora.makeTower,
      motor_threadingNeedle: body.areaMotora.threadingNeedle,
      motor_observaciones: body.areaMotora.observaciones,
      cogni_drawsHumanFigure: body.areaCognitiva.drawsHumanFigure,
      cogni_nameHumanParts: body.areaCognitiva.nameHumanParts,
      cogni_compleateHumanFigure: body.areaCognitiva.compleateHumanFigure,
      cogni_bodyImage: body.areaCognitiva.bodyImage,
      cogni_urlPhoto: body.areaCognitiva.urlPhoto,
      // cogni_headersPhoto: body.areaCognitiva.headersPhoto,
      cogni_arriba: body.areaCognitiva.arriba,
      cogni_abajo: body.areaCognitiva.abajo,
      cogni_delante: body.areaCognitiva.delante,
      cogni_detras: body.areaCognitiva.detras,
      cogni_dentro: body.areaCognitiva.dentro,
      cogni_fuera: body.areaCognitiva.fuera,
      cogni_izquierda: body.areaCognitiva.izquierda,
      cogni_derecha: body.areaCognitiva.derecha,
      cogni_inflaGlobo: body.areaCognitiva.inflaGlobo,
      cogni_encubaHuevos: body.areaCognitiva.encubaHuevos,
      cogni_plantaFlores: body.areaCognitiva.plantaFlores,
      cogni_undifferentiatedCrying: body.areaCognitiva.undifferentiatedCrying,
      cogni_socialSmile: body.areaCognitiva.socialSmile,
      cogni_vocalGame: body.areaCognitiva.vocalGame,
      cogni_babbleReflection: body.areaCognitiva.babbleReflection,
      cogni_gutturalSound: body.areaCognitiva.gutturalSound,
      cogni_gestures: body.areaCognitiva.gestures,
      cogni_intentionalSyllable: body.areaCognitiva.intentionalSyllable,
      cogni_juxtaposedWord: body.areaCognitiva.juxtaposedWord,
      cogni_simplePhrase: body.areaCognitiva.simplePhrase,
      cogni_phraseWord: body.areaCognitiva.phraseWord,
      cogni_languageInteriorization: body.areaCognitiva.languageInteriorization,
      cogni_waitTurn: body.areaCognitiva.waitTurn,
      cogni_completePhrase: body.areaCognitiva.completePhrase,
      cogni_gramaticalElemmentUse: body.areaCognitiva.gramaticalElemmentUse,
      cogni_makeComplexeSentences: body.areaCognitiva.makeComplexeSentences,
      cogni_fullfillComplexOrder: body.areaCognitiva.fullfillComplexOrder,
      cogni_beginReadingWriting: body.areaCognitiva.beginReadingWriting,
      cogni_usePreposition: body.areaCognitiva.usePreposition,
      cogni_useAdjectives: body.areaCognitiva.useAdjectives,
      cogni_slangLanguage: body.areaCognitiva.slangLanguage,
      cogni_useAdjectivesAdverbs: body.areaCognitiva.useAdjectivesAdverbs,
      cogni_verbUse: body.areaCognitiva.verbUse,
      cogni_fluidCommunication: body.areaCognitiva.fluidCommunication,
      cogni_observaciones: body.areaCognitiva.observaciones,
      socio_plays: body.areaSocioAfectiva.plays,
      socio_proposeGame: body.areaSocioAfectiva.proposeGame,
      socio_leaderInGames: body.areaSocioAfectiva.leaderInGames,
      socio_acceptAnothersGame: body.areaSocioAfectiva.acceptAnothersGame,
      socio_otherGame: body.areaSocioAfectiva.otherGame,
      socio_acceptIt: body.areaSocioAfectiva.acceptIt,
      socio_searchIt: body.areaSocioAfectiva.searchIt,
      socio_provokesIt: body.areaSocioAfectiva.provokesIt,
      socio_thanksHim: body.areaSocioAfectiva.thanksHim,
      socio_waitGrownUpApprovation: body.areaSocioAfectiva.waitGrownUpApprovation,
      socio_waitOrders: body.areaSocioAfectiva.waitOrders,
      socio_collaborateWithAdult: body.areaSocioAfectiva.collaborateWithAdult,
      socio_otherAdult: body.areaSocioAfectiva.otherAdult,
      socio_observaciones: body.areaSocioAfectiva.observaciones,
      diagnosticoPsicomotriz: body.diagnosticoPsicomotriz,
      recomendaciones: body.recomendaciones,
      _usuario_modificacion: body.audit_usuario.id_usuario
    };
    const parametrosRegistro = {
      _usuario_modificacion: body.audit_usuario.id_usuario
    }
    models.sequelize.transaction().then((transaccion) => {
      dao.modificarRegistro(models.reg_pm, body.idRegistroPsicomotricidad, parametrosRegistroEvalPsicomotricidad, transaccion)
      .then(respuestaCreacionRegistroEvalPsicomotricidad => {
        parametrosRegistro.fid_reg_pm = respuestaCreacionRegistroEvalPsicomotricidad.id_reg_pm;
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

  const eliminaRegistroEvalPsicomotricidad = (body) => {
    const deferred = Q.defer();
    models.sequelize.transaction().then((transaccion) => {
      dao.eliminarRegistro(models.reg_pm, body.reg_pm.id_reg_pm, transaccion)
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

  const registroEvalPsicomotricidadBL = {
    creaRegistroEvalPsicomotricidad,
    editaRegistroEvalPsicomotricidad,
    eliminaRegistroEvalPsicomotricidad
  };

  return registroEvalPsicomotricidadBL;
};