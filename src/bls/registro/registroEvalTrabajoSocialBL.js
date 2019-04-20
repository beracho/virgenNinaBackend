/**
* Lógica del Negocio -> ConfiguracionBL
*/
const dao = require('../../dao/dao');
const Q = require('q');

module.exports = app => {
  const models = app.src.db.models;
  const rolBL = app.src.bls.autenticacion.rolBL;
  const estudianteBL = app.src.bls.inscripcion.estudianteBL;

  const creaRegistroEvalTrabajoSocial = (body) => {
    const deferred = Q.defer();
    const parametrosRegistroEvalTrabajoSocial = {
      tipo_de_familia: body.tipoDeFamilia,
      observacion_grupo_familiar: body.observacionGrupoFamiliar,
      dinamica_familiar: body.dinamicaFamiliar,
      proceso_social: body.procesoSocial,
      relato_discapacidad: body.relatoDiscapacidad,
      diagnostico_social: body.diagnosticoSocial,
      conclusion_sugerencia: body.conclusionSugerencia,
      _usuario_creacion: body.audit_usuario.id_usuario,
      _usuario_modificacion: body.audit_usuario.id_usuario
    };
    const parametrosRegistro = {
      tipo: 'especialidad',
      _usuario_creacion: body.audit_usuario.id_usuario,
      _usuario_modificacion: body.audit_usuario.id_usuario
    }
    models.sequelize.transaction().then((transaccion) => {
      dao.crearRegistro(models.registro_eval_trabajo_social, parametrosRegistroEvalTrabajoSocial, false, transaccion)
      .then(respuestaCreacionRegistroEvalTrabajoSocial => {
        parametrosRegistro.fid_registro_eval_trabajo_social = respuestaCreacionRegistroEvalTrabajoSocial.id_registro_eval_trabajo_social;
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

  const editaRegistroEvalTrabajoSocial = (body) => {
    const deferred = Q.defer();
    const parametrosRegistroEvalTrabajoSocial = {
      tipo_de_familia: body.tipoDeFamilia,
      observacion_grupo_familiar: body.observacionGrupoFamiliar,
      dinamica_familiar: body.dinamicaFamiliar,
      proceso_social: body.procesoSocial,
      relato_discapacidad: body.relatoDiscapacidad,
      diagnostico_social: body.diagnosticoSocial,
      conclusion_sugerencia: body.conclusionSugerencia,
      _usuario_modificacion: body.audit_usuario.id_usuario
    };
    const parametrosRegistro = {
      _usuario_modificacion: body.audit_usuario.id_usuario
    }
    models.sequelize.transaction().then((transaccion) => {
      dao.modificarRegistro(models.registro_eval_trabajo_social, body.idRegistroTrabajoSocial, parametrosRegistroEvalTrabajoSocial, transaccion)
      .then(respuestaCreacionRegistroEvalTrabajoSocial => {
        parametrosRegistro.fid_registro_eval_trabajo_social = respuestaCreacionRegistroEvalTrabajoSocial.id_registro_eval_trabajo_social;
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

  const registroEvalTrabajoSocialBL = {
    editaRegistroEvalTrabajoSocial,
    creaRegistroEvalTrabajoSocial
  };

  return registroEvalTrabajoSocialBL;
};