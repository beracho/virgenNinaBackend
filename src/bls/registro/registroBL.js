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

  const convertirRegistroPdf = (query, body) => {
    const deferred = Q.defer();
    obtenerDatosRegistro(query.idRegistro, query.estudiante, body.audit_usuario.id_usuario)
    .then(jsonDatos => {
      let html = "";
      if (jsonDatos.registro.tipo === 'especialidad') {
        switch (jsonDatos.registro.area) {
          case 'trabajo social':
            html = "src/reports/reporte_trabajo_social.html";
          break;
          default:
          break;
        }
      }
      if (jsonDatos.registro.tipo === 'simple') {
        html = "src/reports/reporte_simple.html";
      }
      const pdf = require('../../libs/pdf_generator');
      // const ruta = 'src/reports/reporte.pdf';
      const config_pagina = {
        format: 'Letter',
        orientation: 'portrait',
        border:
        {
          top: "1.5cm",
          left: "1.5cm",
          right: "1.5cm",
          bottom: "1.9cm",
        },
        footer: {
          height: "10mm",
          contents: {
            // first: '1',
            // 2: 'Second page', // Any page number is working. 1-based index
            default: '<div style="text-align: right;"><span style="color: #444;">{{page}}</span>/<span>{{pages}}</span></div>', // fallback value
            // last: 'Last Page'
          }
        },
      };
      pdf.generarPDFaBuffer(html, jsonDatos, config_pagina)
      .then(filePDF => {
        deferred.resolve(filePDF.toString('base64'));
      })
    })
    .catch(error => {
      console.log(error);
      deferred.reject(error);
    });
    return deferred.promise;
  }

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
      .then(() => {
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

  const eliminaRegistroSimple = (body) => {
    const deferred = Q.defer();
    models.sequelize.transaction().then((transaccion) => {
      dao.eliminarRegistro(models.registro_simple, body.registros_simple.id_registro_simple, transaccion)
      .then(() => {
        return dao.eliminarRegistro(models.registro, body.id_registro, transaccion);
      })
      .then(respuestaCreacion => {
        transaccion.commit().then(res => deferred.resolve(respuestaCreacion))
      })
      .catch(error => {
        transaccion.rollback().then(res => deferred.reject(error))
      });
    })
    .catch(error => {
      console.log(error);
      deferred.reject(error)}
    );
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

  const obtenerDatosRegistro = (idRegistro, codigoEstudiante, idUsuario) => {
    const deferred = Q.defer();
    const params = {
      where: {
        id_registro: idRegistro
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
    let registro = {};
    let estudiante = {};
    let usuarioCreacion = {};
    estudianteBL.obtenerRegistros({codigo: codigoEstudiante}, models)
    .then(respuestaEstudiante => {
      estudiante = respuestaEstudiante;
      if (respuestaEstudiante && respuestaEstudiante.id_estudiante)
        params.where.fid_estudiante = respuestaEstudiante.id_estudiante;
      return dao.listarRegistros(models.registro, params);
    })
    .then(respuestaRegistro => {
      registro = respuestaRegistro;
      const paramsUsuarioCreacion = {
        where: {
          id_usuario: respuestaRegistro[0]._usuario_creacion
        },
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
      };
      return dao.listarRegistros(models.usuario, paramsUsuarioCreacion);
    })
    .then(respuestaUsuarioCreacion => {
      usuarioCreacion = respuestaUsuarioCreacion;
      const paramsUsuarioActual = {
        where: {
          id_usuario: idUsuario
        },
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
      };
      return dao.listarRegistros(models.usuario, paramsUsuarioActual);
    })
    .then(respuestaUsuarioActual => {
      return ordenaDatos(registro, estudiante, usuarioCreacion, respuestaUsuarioActual);
    }).then(datosOrdenados => {
      deferred.resolve(datosOrdenados)
    })
    .catch(error => {
      console.log(error);
      deferred.reject(error)
    });
    return deferred.promise;
  }

  const ordenaDatos = (registro, estudiante, usuarioCreacion, usuarioActual) => {
    const deferred = Q.defer();
    const datosOrdenados = {
      nombreCompleto: estudiante[0].nombre_completo,
      fechaNacimiento: getDate(estudiante[0].fecha_nacimiento),
      edad: getAge(estudiante[0].fecha_nacimiento),
      domicilio: estudiante[0].direccion.calle +', #'+ estudiante[0].direccion.numero,
      zona: estudiante[0].direccion.zona,
      sexo: estudiante[0].genero == 'F' ? 'Femenino' : estudiante[0].genero == 'M' ? 'Masculino' : '',
      telefono: estudiante[0].telefono,
      parientes: [],
      estudiante: {
        codigo: estudiante[0].estudiante.codigo,
        fechaIngreso: getDate(estudiante[0].estudiante._fecha_creacion),
        fechaReingreso: getDate(estudiante[0].estudiante._fecha_modificacion),
      },
      registro: {
        nroRegistro: registro[0].id_registro,
        area: registro[0].area,
        tipo: registro[0].tipo,
        fechaCreacion: getDate(registro[0]._fecha_creacion),
        fechaImpresion: getDate(),
        doctor: usuarioCreacion[0].persona.nombre_completo,
        doctorActual: usuarioActual[0].persona.nombre_completo
      }
    }
    if (registro[0].tipo === 'especialidad') {
      switch (registro[0].area) {
        case 'trabajo social':
        datosOrdenados.registro.tipoFamilia= registro[0].registro_eval_trabajo_social.tipo_de_familia;
        datosOrdenados.registro.observacionGrupoFamiliar= registro[0].registro_eval_trabajo_social.observacion_grupo_familiar;
        datosOrdenados.registro.dinamicaFamiliar= registro[0].registro_eval_trabajo_social.dinamica_familiar;
        datosOrdenados.registro.procesoSocial= registro[0].registro_eval_trabajo_social.proceso_social;
        datosOrdenados.registro.relatoDiscapacidad= registro[0].registro_eval_trabajo_social.relato_discapacidad;
        datosOrdenados.registro.diagnosticoSocial= registro[0].registro_eval_trabajo_social.diagnostico_social;
        datosOrdenados.registro.conclusiones= registro[0].registro_eval_trabajo_social.conclusion_sugerencia;
        estudiante[0].dataValues.persona_de.forEach(pariente => {
          const aux = {
            nombreCompleto: pariente.persona_es.nombre_completo,
            relacion: pariente.relacion,
            edad: pariente.persona_es.edad,
            estadoCivil: pariente.persona_es.estado_civil,
            gradoInstuccion: pariente.persona_es.grado_instruccion,
            ocupacion: pariente.persona_es.ocupacion_actual,
            ingreso: pariente.persona_es.salario_mensual
          }
          datosOrdenados.parientes.push(aux);
        });
        break;
        default:
        break;
      }
    }
    if (registro[0].tipo === 'simple') {
      datosOrdenados.registro.observacion = registro[0].registros_simple.observacion;
      datosOrdenados.registro.intervencion = registro[0].registros_simple.intervencion;
    }
    deferred.resolve(datosOrdenados)
    return deferred.promise;
  }

  let getDate = (dateString) => {
    let date = dateString ? new Date(dateString) : new Date();
    return (date.getDate() + ' - ' + meses[date.getMonth()] + ' - ' + date.getFullYear());
  }

  const meses = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre']

  let getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  const registroBL = {
    listaRegistroPorArea,
    creaRegistroSimple,
    editaRegistroSimple,
    eliminaRegistroSimple,
    convertirRegistroPdf
  };

  return registroBL;
};