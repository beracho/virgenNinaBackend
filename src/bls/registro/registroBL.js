/**
* Lógica del Negocio -> ConfiguracionBL
*/
const dao = require('../../dao/dao');
const Q = require('q');

module.exports = app => {
  const models = app.src.db.models;
  const rolBL = app.src.bls.autenticacion.rolBL;
  const estudianteBL = app.src.bls.inscripcion.estudianteBL;

  const listaRegistroPorArea = (query, body) => {
    const deferred = Q.defer();
    const params = {
      where: {
        estado: 'ACTIVO'
      }
    };
    if (query.gestion == 'actual')
      params.where.gestion = (new Date()).getFullYear() + '';
    if (query.limit && query.page) {
      params.limit = query.limit,
      params.page = query.page
    };
    if (query.order) {
      params.order = query.order;
    };
    dao.listarRegistros(models.curso, params)
    .then(respuesta => deferred.resolve(respuesta))
    .catch(error => {
      console.log(error);
      deferred.reject(error)
    });
    return deferred.promise;
  };

  const editaRegistro = (body) => {
    const deferred = Q.defer();
    const idCurso = body.id_curso;
    const parametrosCurso = {
      nombre: body.nombre,
      paralelo: body.paralelo,
      gestion: body.gestion,
      maestro: body.maestro,
      descripcion: body.descripcion,
      criterio_edad: body.criterio_edad,
      tipo_discapacidad: body.tipo_discapacidad,
      grado: body.grado,
      _usuario_modificacion: body.audit_usuario.id_usuario
    };
    dao.obtenerRegistro(models.curso, {
      where: {
        nombre:parametrosCurso.nombre,
        paralelo:parametrosCurso.paralelo,
        gestion:parametrosCurso.gestion
      }
    })
    .then(respuestaBusqueda => {
      if(respuestaBusqueda && respuestaBusqueda.id_curso !== idCurso)
        throw new Error("courseNameRepeated");
      else if(parametrosCurso.paralelo.length > 1)
        throw new Error("invalidParalelFormat");
      else if(idCurso === undefined)
        throw new Error("noIdCourseSend");
      else
        return dao.modificarRegistro(models.curso, idCurso, parametrosCurso)
    })
    .then(respuestaModificacion => deferred.resolve(respuestaModificacion))
    .catch(error => {
      console.log(error);
      deferred.reject(error)
    });
    return deferred.promise;
  }

  const creaRegistroSimple = (body) => {
    const deferred = Q.defer();
    const parametrosRegistroSimple = {
      observacion: body.observacion,
      intervencion: body.intervencion,
      _usuario_creacion: body.audit_usuario.id_usuario,
      _usuario_modificacion: body.audit_usuario.id_usuario
    };
    const parametrosRegistro = {
      tipo: 'simple',
      _usuario_creacion: body.audit_usuario.id_usuario,
      _usuario_modificacion: body.audit_usuario.id_usuario
    }
    models.sequelize.transaction().then((transaccion) => {
      dao.crearRegistro(models.registro_simple, parametrosRegistroSimple, false, transaccion)
      .then(respuestaCreacionRegistroSimple => {
        parametrosRegistro.fid_registro_simple = respuestaCreacionRegistroSimple.id_registro_simple;
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

  const registroBL = {
    listaRegistroPorArea,
    editaRegistro,
    creaRegistroSimple
  };

  return registroBL;
};