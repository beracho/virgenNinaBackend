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
        area: query.area
      },
      include: [{
        model: models.registro_simple,
        as: 'registros_simple',
        required: false
      }, {
        model: models.registro_eval_trabajo_social,
        as: 'registro_eval_trabajo_social',
        required: false
      }]
    };
    let usuarios = {};
    if (query.limit && query.page) {
      params.limit = query.limit,
      params.page = query.page
    };
    if (query.order) {
      params.order = query.order;
    };
    estudianteBL.estudiantePorCodigo(query.estudiante, models)
    .then(respuestaEstudiante => {
      if (respuestaEstudiante && respuestaEstudiante.id_estudiante)
        params.where.fid_estudiante = respuestaEstudiante.id_estudiante;
      return dao.listarRegistros(models.usuario, {
        include: [{
          model: models.persona,
          as: 'persona',
          required: true
        },{
          attributes: ['fid_rol'],
          model: models.usuario_rol,
          as: 'usuarios_roles',
          required: true,
          include: [{
            attributes: ['area'],
            model: models.rol,
            as: 'rol',
          }],
        }]
      });
    })
    .then(respuestaUsuarios => {
      usuarios = respuestaUsuarios;
      return dao.listarRegistros(models.registro, params);
    })
    .then(respuestaRegistro => {
      respuestaRegistro.forEach((registroItem, index) => {
        usuarios.forEach(userItem => {
          if (registroItem._usuario_creacion === userItem.id_usuario) {
            respuestaRegistro[index].dataValues.usuario = {
              nombre: userItem.persona.nombres,
              primer_apellido: userItem.persona.primer_apellido,
              segundo_apellido: userItem.persona.segundo_apellido,
              nombre_completo: userItem.persona.nombre_completo
            };
            respuestaRegistro[index].dataValues.area = userItem.usuarios_roles[0].rol.area;
          }
        });
      });
      deferred.resolve(respuestaRegistro)
    })
    .catch(error => {
      console.log(error);
      deferred.reject(error)
    });
    return deferred.promise;
  };

  const editaRegistroSimple = (body) => {
    const deferred = Q.defer();
    const parametrosRegistroSimple = {
      observacion: body.observacion,
      intervencion: body.intervencion,
      _usuario_modificacion: body.audit_usuario.id_usuario
    };
    const parametrosRegistro = {
      _usuario_modificacion: body.audit_usuario.id_usuario
    }
    models.sequelize.transaction().then((transaccion) => {
      dao.modificarRegistro(models.registro_simple, body.idRegistroSimple, parametrosRegistroSimple, transaccion)
      .then(respuestaCreacionRegistroSimple => {
        parametrosRegistro.fid_registro_simple = respuestaCreacionRegistroSimple.id_registro_simple;
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
    creaRegistroSimple,
    editaRegistroSimple
  };

  return registroBL;
};