module.exports = function (sequelize, DataTypes) {
  const reg_pm =  sequelize.define('reg_pm', {
      id_reg_pm: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      anam_antecedentesFamiliares: {
        type: DataTypes.TEXT,
        xlabel: 'anamnesia antecedentesFamiliares',
        allowNull: true
      },
      anam_antecedentesPatologicos: {
        type: DataTypes.TEXT,
        xlabel: 'anamnesia antecedentesPatologicos',
        allowNull: true
      },
      anam_perinatal: {
        type: DataTypes.TEXT,
        xlabel: 'anamnesia perinatal',
        allowNull: true
      },
      anam_prenatal: {
        type: DataTypes.TEXT,
        xlabel: 'anamnesia prenatal',
        allowNull: true
      },
      anam_postnatal: {
        type: DataTypes.TEXT,
        xlabel: 'anamnesia postnatal',
        allowNull: true
      },
      anam_controlCefálico: {
        type: DataTypes.TEXT,
        xlabel: 'anamnesia controlCefálico',
        allowNull: true
      },
      anam_Sedestación: {
        type: DataTypes.TEXT,
        xlabel: 'anamnesia Sedestación',
        allowNull: true
      },
      anam_Arrastre: {
        type: DataTypes.TEXT,
        xlabel: 'anamnesia Arrastre',
        allowNull: true
      },
      anam_Gateo: {
        type: DataTypes.TEXT,
        xlabel: 'anamnesia Gateo',
        allowNull: true
      },
      anam_Bipedestación: {
        type: DataTypes.TEXT,
        xlabel: 'anamnesia Bipedestación',
        allowNull: true
      },
      anam_Marcha: {
        type: DataTypes.TEXT,
        xlabel: 'anamnesia Marcha',
        allowNull: true
      },
      anam_razonConsulta: {
        type: DataTypes.TEXT,
        xlabel: 'anamnesia razonConsulta',
        allowNull: true
      },
      psico_headUpright: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz headUpright',
        allowNull: true
      },
      psico_movesHead: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz movesHead',
        allowNull: true
      },
      psico_holdsObjects: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz holdsObjects',
        allowNull: true
      },
      psico_playsFeetAndHands: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz playsFeetAndHands',
        allowNull: true
      },
      psico_locateSounds: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz locateSounds',
        allowNull: true
      },
      psico_babbles: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz babbles',
        allowNull: true
      },
      psico_gutturalSounds: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz gutturalSounds',
        allowNull: true
      },
      psico_stimulusSmile: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz stimulusSmile',
        allowNull: true
      },
      psico_recognicesMother: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz recognicesMother',
        allowNull: true
      },
      psico_mouthSounds: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz mouthSounds',
        allowNull: true
      },
      psico_liftHead: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz liftHead',
        allowNull: true
      },
      psico_ulnaChange: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz ulnaChange',
        allowNull: true
      },
      psico_picksCloseObjects: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz picksCloseObjects',
        allowNull: true
      },
      psico_makesSounds: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz makesSounds',
        allowNull: true
      },
      psico_callsForAttention: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz callsForAttention',
        allowNull: true
      },
      psico_repeatsSyllables: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz repeatsSyllables',
        allowNull: true
      },
      psico_smilesToExtrangers: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz smilesToExtrangers',
        allowNull: true
      },
      psico_recognicesCaretaker: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz recognicesCaretaker',
        allowNull: true
      },
      psico_sitsWithoutSupport: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz sitsWithoutSupport',
        allowNull: true
      },
      psico_drags: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz drags',
        allowNull: true
      },
      psico_picksAndHitsObjects: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz picksAndHitsObjects',
        allowNull: true
      },
      psico_takesFoodToMouth: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz takesFoodToMouth',
        allowNull: true
      },
      psico_likesSongs: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz likesSongs',
        allowNull: true
      },
      psico_searchsSounds: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz searchsSounds',
        allowNull: true
      },
      psico_recognicesObjects: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz recognicesObjects',
        allowNull: true
      },
      psico_criesBeforeExtrangers: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz criesBeforeExtrangers',
        allowNull: true
      },
      psico_imitatesMovements: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz imitatesMovements',
        allowNull: true
      },
      psico_sitsWithSupport: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz sitsWithSupport',
        allowNull: true
      },
      psico_crawl: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz crawl',
        allowNull: true
      },
      psico_discoversObjects: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz discoversObjects',
        allowNull: true
      },
      psico_walksWithSupport: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz walksWithSupport',
        allowNull: true
      },
      psico_wordsWithMeaning: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz wordsWithMeaning',
        allowNull: true
      },
      psico_embraceAdultChild: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz embraceAdultChild',
        allowNull: true
      },
      psico_answersToName: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz answersToName',
        allowNull: true
      },
      psico_meetsSimpleOrders: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz meetsSimpleOrders',
        allowNull: true
      },
      psico_jumpsWithBothFeet: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz jumpsWithBothFeet',
        allowNull: true
      },
      psico_throwsBall: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz throwsBall',
        allowNull: true
      },
      psico_UndressHimself: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz UndressHimself',
        allowNull: true
      },
      psico_useForkCup: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz useForkCup',
        allowNull: true
      },
      psico_makesNounVerbPhrases: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz makesNounVerbPhrases',
        allowNull: true
      },
      psico_useNegatives: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz useNegatives',
        allowNull: true
      },
      psico_answerQuestions: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz answerQuestions',
        allowNull: true
      },
      psico_bigAndSmallDifferences: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz bigAndSmallDifferences',
        allowNull: true
      },
      psico_singChildrenSongs: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz singChildrenSongs',
        allowNull: true
      },
      psico_exploreEnvironment: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz exploreEnvironment',
        allowNull: true
      },
      psico_recognicesPhotographs: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz recognicesPhotographs',
        allowNull: true
      },
      psico_playsSmallGroups: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz playsSmallGroups',
        allowNull: true
      },
      psico_greetsOnCommand: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz greetsOnCommand',
        allowNull: true
      },
      psico_performManualActivities: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz performManualActivities',
        allowNull: true
      },
      psico_runsJumps: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz runsJumps',
        allowNull: true
      },
      psico_copyLinesAndCircles: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz copyLinesAndCircles',
        allowNull: true
      },
      psico_identifiesEspatialConcepts: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz identifiesEspatialConcepts',
        allowNull: true
      },
      psico_acknowledgeHisSex: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz acknowledgeHisSex',
        allowNull: true
      },
      psico_gerundPluralArticleDifference: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz gerundPluralArticleDifference',
        allowNull: true
      },
      psico_articlePhonemes: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz articlePhonemes',
        allowNull: true
      },
      psico_gestureCommunication: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz gestureCommunication',
        allowNull: true
      },
      psico_talksFirstPerson: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz talksFirstPerson',
        allowNull: true
      },
      psico_useOralLanguage: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz useOralLanguage',
        allowNull: true
      },
      psico_showsPersonalPreferences: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz showsPersonalPreferences',
        allowNull: true
      },
      psico_likesChildAndAnimals: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz likesChildAndAnimals',
        allowNull: true
      },
      psico_joinsSmallTeams: {
        type: DataTypes.BOOLEAN,
        xlabel: 'evaluacionPsicomotriz joinsSmallTeams',
        allowNull: true
      },
      motor_run: {
        type: DataTypes.TEXT,
        xlabel: 'areaMotora run',
        allowNull: true
      },
      motor_jump: {
        type: DataTypes.TEXT,
        xlabel: 'areaMotora jump',
        allowNull: true
      },
      motor_throw: {
        type: DataTypes.TEXT,
        xlabel: 'areaMotora throw',
        allowNull: true
      },
      motor_kick: {
        type: DataTypes.TEXT,
        xlabel: 'areaMotora kick',
        allowNull: true
      },
      motor_staticDinamicBalance: {
        type: DataTypes.TEXT,
        xlabel: 'areaMotora staticDinamicBalance',
        allowNull: true
      },
      motor_staticBalance: {
        type: DataTypes.TEXT,
        xlabel: 'areaMotora staticBalance',
        allowNull: true
      },
      motor_partialDisociation: {
        type: DataTypes.TEXT,
        xlabel: 'areaMotora partialDisociation',
        allowNull: true
      },
      motor_generalCoordination: {
        type: DataTypes.TEXT,
        xlabel: 'areaMotora generalCoordination',
        allowNull: true
      },
      motor_eye_right: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaMotora.eye right',
        allowNull: true
      },
      motor_eye_left: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaMotora.eye left',
        allowNull: true
      },
      motor_ear_right: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaMotora.ear right',
        allowNull: true
      },
      motor_ear_left: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaMotora.ear left',
        allowNull: true
      },
      motor_hand_right: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaMotora.hand right',
        allowNull: true
      },
      motor_hand_left: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaMotora.hand left',
        allowNull: true
      },
      motor_feet_right: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaMotora.feet right',
        allowNull: true
      },
      motor_feet_left: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaMotora.feet left',
        allowNull: true
      },
      motor_scrash: {
        type: DataTypes.TEXT,
        xlabel: 'areaMotora scrash',
        allowNull: true
      },
      motor_button: {
        type: DataTypes.TEXT,
        xlabel: 'areaMotora button',
        allowNull: true
      },
      motor_cut: {
        type: DataTypes.TEXT,
        xlabel: 'areaMotora cut',
        allowNull: true
      },
      motor_makeTower: {
        type: DataTypes.TEXT,
        xlabel: 'areaMotora makeTower',
        allowNull: true
      },
      motor_threadingNeedle: {
        type: DataTypes.TEXT,
        xlabel: 'areaMotora threadingNeedle',
        allowNull: true
      },
      motor_observaciones: {
        type: DataTypes.TEXT,
        xlabel: 'areaMotora observaciones',
        allowNull: true
      },
      cogni_drawsHumanFigure: {
        type: DataTypes.TEXT,
        xlabel: 'areaCognitiva drawsHumanFigure',
        allowNull: true
      },
      cogni_nameHumanParts: {
        type: DataTypes.TEXT,
        xlabel: 'areaCognitiva nameHumanParts',
        allowNull: true
      },
      cogni_compleateHumanFigure: {
        type: DataTypes.TEXT,
        xlabel: 'areaCognitiva compleateHumanFigure',
        allowNull: true
      },
      cogni_bodyImage: {
        type: DataTypes.TEXT,
        xlabel: 'areaCognitiva bodyImage',
        allowNull: true
      },
      cogni_urlPhoto: {
        type: DataTypes.TEXT,
        xlabel: 'areaCognitiva urlPhoto',
        allowNull: true
      },
      // cogni_headersPhoto: {
      //   type: DataTypes.TEXT,
      //   xlabel: 'areaCognitiva headersPhoto',
      //   allowNull: true
      // },
      cogni_arriba: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaCognitiva arriba',
        allowNull: true
      },
      cogni_abajo: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaCognitiva abajo',
        allowNull: true
      },
      cogni_delante: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaCognitiva delante',
        allowNull: true
      },
      cogni_detras: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaCognitiva detras',
        allowNull: true
      },
      cogni_dentro: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaCognitiva dentro',
        allowNull: true
      },
      cogni_fuera: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaCognitiva fuera',
        allowNull: true
      },
      cogni_izquierda: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaCognitiva izquierda',
        allowNull: true
      },
      cogni_derecha: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaCognitiva derecha',
        allowNull: true
      },
      cogni_inflaGlobo: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaCognitiva inflaGlobo',
        allowNull: true
      },
      cogni_encubaHuevos: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaCognitiva encubaHuevos',
        allowNull: true
      },
      cogni_plantaFlores: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaCognitiva plantaFlores',
        allowNull: true
      },
      cogni_undifferentiatedCrying: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaCognitiva undifferentiatedCrying',
        allowNull: true
      },
      cogni_socialSmile: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaCognitiva socialSmile',
        allowNull: true
      },
      cogni_vocalGame: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaCognitiva vocalGame',
        allowNull: true
      },
      cogni_babbleReflection: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaCognitiva babbleReflection',
        allowNull: true
      },
      cogni_gutturalSound: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaCognitiva gutturalSound',
        allowNull: true
      },
      cogni_gestures: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaCognitiva gestures',
        allowNull: true
      },
      cogni_intentionalSyllable: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaCognitiva intentionalSyllable',
        allowNull: true
      },
      cogni_juxtaposedWord: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaCognitiva juxtaposedWord',
        allowNull: true
      },
      cogni_simplePhrase: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaCognitiva simplePhrase',
        allowNull: true
      },
      cogni_phraseWord: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaCognitiva phraseWord',
        allowNull: true
      },
      cogni_languageInteriorization: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaCognitiva languageInteriorization',
        allowNull: true
      },
      cogni_waitTurn: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaCognitiva waitTurn',
        allowNull: true
      },
      cogni_completePhrase: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaCognitiva completePhrase',
        allowNull: true
      },
      cogni_gramaticalElemmentUse: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaCognitiva gramaticalElemmentUse',
        allowNull: true
      },
      cogni_makeComplexeSentences: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaCognitiva makeComplexeSentences',
        allowNull: true
      },
      cogni_fullfillComplexOrder: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaCognitiva fullfillComplexOrder',
        allowNull: true
      },
      cogni_beginReadingWriting: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaCognitiva beginReadingWriting',
        allowNull: true
      },
      cogni_usePreposition: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaCognitiva usePreposition',
        allowNull: true
      },
      cogni_useAdjectives: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaCognitiva useAdjectives',
        allowNull: true
      },
      cogni_slangLanguage: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaCognitiva slangLanguage',
        allowNull: true
      },
      cogni_useAdjectivesAdverbs: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaCognitiva useAdjectivesAdverbs',
        allowNull: true
      },
      cogni_verbUse: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaCognitiva verbUse',
        allowNull: true
      },
      cogni_fluidCommunication: {
        type: DataTypes.BOOLEAN,
        xlabel: 'areaCognitiva fluidCommunication',
        allowNull: true
      },
      cogni_observaciones: {
        type: DataTypes.TEXT,
        xlabel: 'areaCognitiva observaciones',
        allowNull: true
      },
      socio_plays: {
        type: DataTypes.TEXT,
        xlabel: 'areaSocioAfectiva plays',
        allowNull: true
      },
      socio_proposeGame: {
        type: DataTypes.TEXT,
        xlabel: 'areaSocioAfectiva proposeGame',
        allowNull: true
      },
      socio_leaderInGames: {
        type: DataTypes.TEXT,
        xlabel: 'areaSocioAfectiva leaderInGames',
        allowNull: true
      },
      socio_acceptAnothersGame: {
        type: DataTypes.TEXT,
        xlabel: 'areaSocioAfectiva acceptAnothersGame',
        allowNull: true
      },
      socio_otherGame: {
        type: DataTypes.TEXT,
        xlabel: 'areaSocioAfectiva otherGame',
        allowNull: true
      },
      socio_acceptIt: {
        type: DataTypes.TEXT,
        xlabel: 'areaSocioAfectiva acceptIt',
        allowNull: true
      },
      socio_searchIt: {
        type: DataTypes.TEXT,
        xlabel: 'areaSocioAfectiva searchIt',
        allowNull: true
      },
      socio_provokesIt: {
        type: DataTypes.TEXT,
        xlabel: 'areaSocioAfectiva provokesIt',
        allowNull: true
      },
      socio_thanksHim: {
        type: DataTypes.TEXT,
        xlabel: 'areaSocioAfectiva thanksHim',
        allowNull: true
      },
      socio_waitGrownUpApprovation: {
        type: DataTypes.TEXT,
        xlabel: 'areaSocioAfectiva waitGrownUpApprovation',
        allowNull: true
      },
      socio_waitOrders: {
        type: DataTypes.TEXT,
        xlabel: 'areaSocioAfectiva waitOrders',
        allowNull: true
      },
      socio_collaborateWithAdult: {
        type: DataTypes.TEXT,
        xlabel: 'areaSocioAfectiva collaborateWithAdult',
        allowNull: true
      },
      socio_otherAdult: {
        type: DataTypes.TEXT,
        xlabel: 'areaSocioAfectiva otherAdult',
        allowNull: true
      },
      socio_observaciones: {
        type: DataTypes.TEXT,
        xlabel: 'areaSocioAfectiva observaciones',
        allowNull: true
      },
      diagnosticoPsicomotriz: {
        type: DataTypes.TEXT,
        xlabel: 'diagnosticoPsicomotriz',
        allowNull: true
      },
      recomendaciones: {
        type: DataTypes.TEXT,
        xlabel: 'recomendaciones',
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
            reg_pm.hasOne(models.registro, {as: 'reg_pm', foreignKey: {name: 'fid_reg_pm', allowNull: true}});
          },
        },
      });

      return reg_pm;
  };
  