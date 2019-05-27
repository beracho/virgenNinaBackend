/**
* Lógica del Negocio -> ConfiguracionBL
*/
const dao = require('../../dao/dao');
const Q = require('q');

module.exports = app => {
  const models = app.src.db.models;
  const rolBL = app.src.bls.autenticacion.rolBL;
  const estudianteBL = app.src.bls.inscripcion.estudianteBL;

  const creaRegistroEvalTerapiaOcupacional = (body) => {
    const deferred = Q.defer();
    const parametrosRegistroEvalTerapiaOcupacional = {
      ducha_realiza: body.ducha.realiza,
      ducha_observacion: body.ducha.observacion,
      controlEsfinter_realiza: body.controlEsfinter.realiza,
      controlEsfinter_observacion: body.controlEsfinter.observacion,
      vestidoDesvestido_realiza: body.vestidoDesvestido.realiza,
      vestidoDesvestido_observacion: body.vestidoDesvestido.observacion,
      masticarTragar_realiza: body.masticarTragar.realiza,
      masticarTragar_observacion: body.masticarTragar.observacion,
      comerSolo_realiza: body.comerSolo.realiza,
      comerSolo_observacion: body.comerSolo.observacion,
      movilidadFuncional_realiza: body.movilidadFuncional.realiza,
      movilidadFuncional_observacion: body.movilidadFuncional.observacion,
      higienePersonalAseo_realiza: body.higienePersonalAseo.realiza,
      higienePersonalAseo_observacion: body.higienePersonalAseo.observacion,
      higieneInodoro_realiza: body.higieneInodoro.realiza,
      higieneInodoro_observacion: body.higieneInodoro.observacion,
      comprension_realiza: body.comprension.realiza,
      comprension_observacion: body.comprension.observacion,
      expresion_realiza: body.expresion.realiza,
      expresion_observacion: body.expresion.observacion,
      interaccionSocial_realiza: body.interaccionSocial.realiza,
      interaccionSocial_observacion: body.interaccionSocial.observacion,
      solProblemas_realiza: body.solProblemas.realiza,
      solProblemas_observacion: body.solProblemas.observacion,
      memoria_realiza: body.memoria.realiza,
      memoria_observacion: body.memoria.observacion,
      atencion_realiza: body.atencion.realiza,
      atencion_observacion: body.atencion.observacion,
      orientacion_realiza: body.orientacion.realiza,
      orientacion_observacion: body.orientacion.observacion,
      reconocimiento_realiza: body.reconocimiento.realiza,
      reconocimiento_observacion: body.reconocimiento.observacion,
      secuenciacion_realiza: body.secuenciacion.realiza,
      secuenciacion_observacion: body.secuenciacion.observacion,
      calculo_realiza: body.calculo.realiza,
      calculo_observacion: body.calculo.observacion,
      lenguaje_realiza: body.lenguaje.realiza,
      lenguaje_observacion: body.lenguaje.observacion,
      escritura_realiza: body.escritura.realiza,
      escritura_observacion: body.escritura.observacion,
      sedestacion_realiza: body.sedestacion.realiza,
      sedestacion_equilibrio: body.sedestacion.equilibrio,
      sedestacion_estatico: body.sedestacion.estatico,
      sedestacion_dinamico: body.sedestacion.dinamico,
      bipedestacion_realiza: body.bipedestacion.realiza,
      bipedestacion_equilibrio: body.bipedestacion.equilibrio,
      bipedestacion_estatico: body.bipedestacion.estatico,
      bipedestacion_dinamico: body.bipedestacion.dinamico,
      marcha_realiza: body.marcha.realiza,
      marcha_observacion: body.marcha.observacion,
      marcha_dinamico: body.marcha.dinamico,
      observacionesMovilidadFuncional: body.observacionesMovilidadFuncional,
      pinzaGruesa_cilindricaDerecha: body.pinzaGruesa.cilindricaDerecha,
      pinzaGruesa_cilindricaIzquierda: body.pinzaGruesa.cilindricaIzquierda,
      pinzaGruesa_esfericaDerecha: body.pinzaGruesa.esfericaDerecha,
      pinzaGruesa_esfericaIzquierda: body.pinzaGruesa.esfericaIzquierda,
      pinzaGruesa_engancheDerecha: body.pinzaGruesa.engancheDerecha,
      pinzaGruesa_engancheIzquierda: body.pinzaGruesa.engancheIzquierda,
      pinzaGruesa_observaciones: body.pinzaGruesa.observaciones,
      pinzaFina_subTerminalDerecha: body.pinzaFina.subTerminalDerecha,
      pinzaFina_subTerminalIzquierda: body.pinzaFina.subTerminalIzquierda,
      pinzaFina_terminoTerminalDerecha: body.pinzaFina.terminoTerminalDerecha,
      pinzaFina_terminoTerminalIzquierda: body.pinzaFina.terminoTerminalIzquierda,
      pinzaFina_lateralDerecha: body.pinzaFina.lateralDerecha,
      pinzaFina_lateralIzquierda: body.pinzaFina.lateralIzquierda,
      pinzaFina_tripodeDerecha: body.pinzaFina.tripodeDerecha,
      pinzaFina_tripodeIzquierda: body.pinzaFina.tripodeIzquierda,
      pinzaFina_interdigitalDerecha: body.pinzaFina.interdigitalDerecha,
      pinzaFina_interdigitalIzquierda: body.pinzaFina.interdigitalIzquierda,
      pinzaFina_lateroLateralDerecha: body.pinzaFina.lateroLateralDerecha,
      pinzaFina_lateroLateralIzquierda: body.pinzaFina.lateroLateralIzquierda,
      pinzaFina_multipulparDerecha: body.pinzaFina.multipulparDerecha,
      pinzaFina_multipulparIzquierda: body.pinzaFina.multipulparIzquierda,
      pinzaFina_observaciones: body.pinzaFina.observaciones,
      barrerasArquitectonicas: body.barrerasArquitectonicas,
      objetivosIntervención_objetivos: body.objetivosIntervención.objetivos,
      objetivosIntervención_observaciones: body.objetivosIntervención.observaciones,
      _usuario_creacion: body.audit_usuario.id_usuario,
      _usuario_modificacion: body.audit_usuario.id_usuario
    };
    const parametrosRegistro = {
      tipo: 'especialidad',
      _usuario_creacion: body.audit_usuario.id_usuario,
      _usuario_modificacion: body.audit_usuario.id_usuario
    }
    models.sequelize.transaction().then((transaccion) => {
      dao.crearRegistro(models.reg_to, parametrosRegistroEvalTerapiaOcupacional, false, transaccion)
      .then(respuestaCreacionRegistroEvalTerapiaOcupacional => {
        parametrosRegistro.fid_reg_to = respuestaCreacionRegistroEvalTerapiaOcupacional.id_reg_to;
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
          case 'PROF_TERAPIA_OCUPACIONAL':
            parametrosRegistro.area = 'terapia ocupacional';
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
        console.log(error);
        transaccion.rollback().then(res => deferred.reject(error))
      });
    })
    .catch(error => deferred.reject(error));
    return deferred.promise;
  }

  const editaRegistroEvalTerapiaOcupacional = (body) => {
    const deferred = Q.defer();
    const parametrosRegistroEvalTerapiaOcupacional = {
      ducha_realiza: body.ducha.realiza,
      ducha_observacion: body.ducha.observacion,
      controlEsfinter_realiza: body.controlEsfinter.realiza,
      controlEsfinter_observacion: body.controlEsfinter.observacion,
      vestidoDesvestido_realiza: body.vestidoDesvestido.realiza,
      vestidoDesvestido_observacion: body.vestidoDesvestido.observacion,
      masticarTragar_realiza: body.masticarTragar.realiza,
      masticarTragar_observacion: body.masticarTragar.observacion,
      comerSolo_realiza: body.comerSolo.realiza,
      comerSolo_observacion: body.comerSolo.observacion,
      movilidadFuncional_realiza: body.movilidadFuncional.realiza,
      movilidadFuncional_observacion: body.movilidadFuncional.observacion,
      higienePersonalAseo_realiza: body.higienePersonalAseo.realiza,
      higienePersonalAseo_observacion: body.higienePersonalAseo.observacion,
      higieneInodoro_realiza: body.higieneInodoro.realiza,
      higieneInodoro_observacion: body.higieneInodoro.observacion,
      comprension_realiza: body.comprension.realiza,
      comprension_observacion: body.comprension.observacion,
      expresion_realiza: body.expresion.realiza,
      expresion_observacion: body.expresion.observacion,
      interaccionSocial_realiza: body.interaccionSocial.realiza,
      interaccionSocial_observacion: body.interaccionSocial.observacion,
      solProblemas_realiza: body.solProblemas.realiza,
      solProblemas_observacion: body.solProblemas.observacion,
      memoria_realiza: body.memoria.realiza,
      memoria_observacion: body.memoria.observacion,
      atencion_realiza: body.atencion.realiza,
      atencion_observacion: body.atencion.observacion,
      orientacion_realiza: body.orientacion.realiza,
      orientacion_observacion: body.orientacion.observacion,
      reconocimiento_realiza: body.reconocimiento.realiza,
      reconocimiento_observacion: body.reconocimiento.observacion,
      secuenciacion_realiza: body.secuenciacion.realiza,
      secuenciacion_observacion: body.secuenciacion.observacion,
      calculo_realiza: body.calculo.realiza,
      calculo_observacion: body.calculo.observacion,
      lenguaje_realiza: body.lenguaje.realiza,
      lenguaje_observacion: body.lenguaje.observacion,
      escritura_realiza: body.escritura.realiza,
      escritura_observacion: body.escritura.observacion,
      sedestacion_realiza: body.sedestacion.realiza,
      sedestacion_equilibrio: body.sedestacion.equilibrio,
      sedestacion_estatico: body.sedestacion.estatico,
      sedestacion_dinamico: body.sedestacion.dinamico,
      bipedestacion_realiza: body.bipedestacion.realiza,
      bipedestacion_equilibrio: body.bipedestacion.equilibrio,
      bipedestacion_estatico: body.bipedestacion.estatico,
      bipedestacion_dinamico: body.bipedestacion.dinamico,
      marcha_realiza: body.marcha.realiza,
      marcha_observacion: body.marcha.observacion,
      marcha_dinamico: body.marcha.dinamico,
      observacionesMovilidadFuncional: body.observacionesMovilidadFuncional,
      pinzaGruesa_cilindricaDerecha: body.pinzaGruesa.cilindricaDerecha,
      pinzaGruesa_cilindricaIzquierda: body.pinzaGruesa.cilindricaIzquierda,
      pinzaGruesa_esfericaDerecha: body.pinzaGruesa.esfericaDerecha,
      pinzaGruesa_esfericaIzquierda: body.pinzaGruesa.esfericaIzquierda,
      pinzaGruesa_engancheDerecha: body.pinzaGruesa.engancheDerecha,
      pinzaGruesa_engancheIzquierda: body.pinzaGruesa.engancheIzquierda,
      pinzaGruesa_observaciones: body.pinzaGruesa.observaciones,
      pinzaFina_subTerminalDerecha: body.pinzaFina.subTerminalDerecha,
      pinzaFina_subTerminalIzquierda: body.pinzaFina.subTerminalIzquierda,
      pinzaFina_terminoTerminalDerecha: body.pinzaFina.terminoTerminalDerecha,
      pinzaFina_terminoTerminalIzquierda: body.pinzaFina.terminoTerminalIzquierda,
      pinzaFina_lateralDerecha: body.pinzaFina.lateralDerecha,
      pinzaFina_lateralIzquierda: body.pinzaFina.lateralIzquierda,
      pinzaFina_tripodeDerecha: body.pinzaFina.tripodeDerecha,
      pinzaFina_tripodeIzquierda: body.pinzaFina.tripodeIzquierda,
      pinzaFina_interdigitalDerecha: body.pinzaFina.interdigitalDerecha,
      pinzaFina_interdigitalIzquierda: body.pinzaFina.interdigitalIzquierda,
      pinzaFina_lateroLateralDerecha: body.pinzaFina.lateroLateralDerecha,
      pinzaFina_lateroLateralIzquierda: body.pinzaFina.lateroLateralIzquierda,
      pinzaFina_multipulparDerecha: body.pinzaFina.multipulparDerecha,
      pinzaFina_multipulparIzquierda: body.pinzaFina.multipulparIzquierda,
      pinzaFina_observaciones: body.pinzaFina.observaciones,
      barrerasArquitectonicas: body.barrerasArquitectonicas,
      objetivosIntervención_objetivos: body.objetivosIntervención.objetivos,
      objetivosIntervención_observaciones: body.objetivosIntervención.observaciones,
      _usuario_modificacion: body.audit_usuario.id_usuario
    };
    const parametrosRegistro = {
      _usuario_modificacion: body.audit_usuario.id_usuario
    }
    models.sequelize.transaction().then((transaccion) => {
      dao.modificarRegistro(models.reg_to, body.idRegistroTerapiaOcupacional, parametrosRegistroEvalTerapiaOcupacional, transaccion)
      .then(respuestaCreacionRegistroEvalTerapiaOcupacional => {
        parametrosRegistro.fid_reg_to = respuestaCreacionRegistroEvalTerapiaOcupacional.id_reg_to;
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

  const eliminaRegistroEvalTerapiaOcupacional = (body) => {
    const deferred = Q.defer();
    models.sequelize.transaction().then((transaccion) => {
      dao.eliminarRegistro(models.reg_to, body.reg_to.id_reg_to, transaccion)
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

  const registroEvalTerapiaOcupacionalBL = {
    creaRegistroEvalTerapiaOcupacional,
    editaRegistroEvalTerapiaOcupacional,
    eliminaRegistroEvalTerapiaOcupacional
  };

  return registroEvalTerapiaOcupacionalBL;
};