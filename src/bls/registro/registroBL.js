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
      where: {},
      include: [{
        model: models.registro_simple,
        as: 'registros_simple',
        required: false
      }, {
        model: models.reg_tb,
        as: 'reg_tb',
        required: false
      }, {
        model: models.reg_to,
        as: 'reg_to',
        required: false
      }, {
        model: models.reg_pm,
        as: 'reg_pm',
        required: false
      }, {
        model: models.reg_ft,
        as: 'reg_ft',
        required: false
      }]
    };
    if (query.area) {
      params.where.area = {
        $like: '%' + query.area + '%'
      }
    }
    if (query.tipo) {
      params.where.tipo = query.tipo;
    }
    if (query.fechaInicial && query.fechaFinal) {
      params.where._fecha_creacion = {
        $between: [new Date(query.fechaInicial), new Date(query.fechaFinal)]
      }
    }
    let usuarios = {};
    if (query.limit && query.page) {
      params.limit = query.limit,
      params.page = query.page
    };
    if (query.order) {
      params.order = query.order;
    };
    const paramsUsuario = {
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
    dao.listarRegistros(models.usuario, paramsUsuario)
    .then(respuestaUsuarios => {
      usuarios = respuestaUsuarios;
      if (query.estudiante) {
        return estudianteBL.estudiantePorCodigo(query.estudiante, models);
      } else {
        return {}
      }
    })
    .then(respuestaEstudiante => {
      if (query.estudiante && respuestaEstudiante && respuestaEstudiante.id_estudiante)
        params.where.fid_estudiante = respuestaEstudiante.id_estudiante;
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
          case 'terapia ocupacional':
            html = "src/reports/reporte_terapia_ocupacional.html";
          break;
          case 'psicomotricidad':
            html = "src/reports/reporte_psicomotricidad.html";
          break;
          case 'fisioterapia':
            html = "src/reports/reporte_fisioterapia.html";
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
        model: models.reg_tb,
        as: 'reg_tb',
        required: false
      }, {
        model: models.reg_to,
        as: 'reg_to',
        required: false
      }, {
        model: models.reg_pm,
        as: 'reg_pm',
        required: false
      }, {
        model: models.reg_ft,
        as: 'reg_ft',
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
      switch (registro[0].area) {
        case 'trabajo social':
        datosOrdenados.registro.tipoFamilia= registro[0].reg_tb.tipo_de_familia;
        datosOrdenados.registro.observacionGrupoFamiliar= registro[0].reg_tb.observacion_grupo_familiar;
        datosOrdenados.registro.dinamicaFamiliar= registro[0].reg_tb.dinamica_familiar;
        datosOrdenados.registro.procesoSocial= registro[0].reg_tb.proceso_social;
        datosOrdenados.registro.relatoDiscapacidad= registro[0].reg_tb.relato_discapacidad;
        datosOrdenados.registro.diagnosticoSocial= registro[0].reg_tb.diagnostico_social;
        datosOrdenados.registro.conclusiones= registro[0].reg_tb.conclusion_sugerencia;
        break;
        case 'terapia ocupacional':
        datosOrdenados.registro.ducha_realiza = registro[0].reg_to.ducha_realiza ? 'SÍ' : 'NO';
        datosOrdenados.registro.ducha_observacion = registro[0].reg_to.ducha_observacion;
        datosOrdenados.registro.controlEsfinter_realiza = registro[0].reg_to.controlEsfinter_realiza ? 'SÍ' : 'NO';
        datosOrdenados.registro.controlEsfinter_observacion = registro[0].reg_to.controlEsfinter_observacion;
        datosOrdenados.registro.vestidoDesvestido_realiza = registro[0].reg_to.vestidoDesvestido_realiza ? 'SÍ' : 'NO';
        datosOrdenados.registro.vestidoDesvestido_observacion = registro[0].reg_to.vestidoDesvestido_observacion;
        datosOrdenados.registro.masticarTragar_realiza = registro[0].reg_to.masticarTragar_realiza ? 'SÍ' : 'NO';
        datosOrdenados.registro.masticarTragar_observacion = registro[0].reg_to.masticarTragar_observacion;
        datosOrdenados.registro.comerSolo_realiza = registro[0].reg_to.comerSolo_realiza ? 'SÍ' : 'NO';
        datosOrdenados.registro.comerSolo_observacion = registro[0].reg_to.comerSolo_observacion;
        datosOrdenados.registro.movilidadFuncional_realiza = registro[0].reg_to.movilidadFuncional_realiza ? 'SÍ' : 'NO';
        datosOrdenados.registro.movilidadFuncional_observacion = registro[0].reg_to.movilidadFuncional_observacion;
        datosOrdenados.registro.higienePersonalAseo_realiza = registro[0].reg_to.higienePersonalAseo_realiza ? 'SÍ' : 'NO';
        datosOrdenados.registro.higienePersonalAseo_observacion = registro[0].reg_to.higienePersonalAseo_observacion;
        datosOrdenados.registro.higieneInodoro_realiza = registro[0].reg_to.higieneInodoro_realiza ? 'SÍ' : 'NO';
        datosOrdenados.registro.higieneInodoro_observacion = registro[0].reg_to.higieneInodoro_observacion;
        datosOrdenados.registro.comprension_realiza = registro[0].reg_to.comprension_realiza;
        datosOrdenados.registro.comprension_observacion = registro[0].reg_to.comprension_observacion;
        datosOrdenados.registro.expresion_realiza = registro[0].reg_to.expresion_realiza;
        datosOrdenados.registro.expresion_observacion = registro[0].reg_to.expresion_observacion;
        datosOrdenados.registro.interaccionSocial_realiza = registro[0].reg_to.interaccionSocial_realiza;
        datosOrdenados.registro.interaccionSocial_observacion = registro[0].reg_to.interaccionSocial_observacion;
        datosOrdenados.registro.solProblemas_realiza = registro[0].reg_to.solProblemas_realiza;
        datosOrdenados.registro.solProblemas_observacion = registro[0].reg_to.solProblemas_observacion;
        datosOrdenados.registro.memoria_realiza = registro[0].reg_to.memoria_realiza;
        datosOrdenados.registro.memoria_observacion = registro[0].reg_to.memoria_observacion;
        datosOrdenados.registro.atencion_realiza = registro[0].reg_to.atencion_realiza;
        datosOrdenados.registro.atencion_observacion = registro[0].reg_to.atencion_observacion;
        datosOrdenados.registro.orientacion_realiza = registro[0].reg_to.orientacion_realiza;
        datosOrdenados.registro.orientacion_observacion = registro[0].reg_to.orientacion_observacion;
        datosOrdenados.registro.reconocimiento_realiza = registro[0].reg_to.reconocimiento_realiza;
        datosOrdenados.registro.reconocimiento_observacion = registro[0].reg_to.reconocimiento_observacion;
        datosOrdenados.registro.secuenciacion_realiza = registro[0].reg_to.secuenciacion_realiza;
        datosOrdenados.registro.secuenciacion_observacion = registro[0].reg_to.secuenciacion_observacion;
        datosOrdenados.registro.calculo_realiza = registro[0].reg_to.calculo_realiza;
        datosOrdenados.registro.calculo_observacion = registro[0].reg_to.calculo_observacion;
        datosOrdenados.registro.lenguaje_realiza = registro[0].reg_to.lenguaje_realiza;
        datosOrdenados.registro.lenguaje_observacion = registro[0].reg_to.lenguaje_observacion;
        datosOrdenados.registro.escritura_realiza = registro[0].reg_to.escritura_realiza;
        datosOrdenados.registro.escritura_observacion = registro[0].reg_to.escritura_observacion;
        datosOrdenados.registro.sedestacion_realiza = registro[0].reg_to.sedestacion_realiza;
        datosOrdenados.registro.sedestacion_equilibrio = registro[0].reg_to.sedestacion_equilibrio ? 'SI' : 'NO';
        datosOrdenados.registro.sedestacion_estatico = registro[0].reg_to.sedestacion_estatico ? 'SI' : 'NO';
        datosOrdenados.registro.sedestacion_dinamico = registro[0].reg_to.sedestacion_dinamico ? 'SI' : 'NO';
        datosOrdenados.registro.bipedestacion_realiza = registro[0].reg_to.bipedestacion_realiza;
        datosOrdenados.registro.bipedestacion_equilibrio = registro[0].reg_to.bipedestacion_equilibrio ? 'SI' : 'NO';
        datosOrdenados.registro.bipedestacion_estatico = registro[0].reg_to.bipedestacion_estatico ? 'SI' : 'NO';
        datosOrdenados.registro.bipedestacion_dinamico = registro[0].reg_to.bipedestacion_dinamico ? 'SI' : 'NO';
        datosOrdenados.registro.marcha_realiza = registro[0].reg_to.marcha_realiza;
        datosOrdenados.registro.marcha_observacion = registro[0].reg_to.marcha_observacion;
        datosOrdenados.registro.marcha_dinamico = registro[0].reg_to.marcha_dinamico ? 'SI' : 'NO';
        datosOrdenados.registro.observacionesMovilidadFuncional = registro[0].reg_to.observacionesMovilidadFuncional;
        datosOrdenados.registro.pinzaGruesa_cilindricaDerecha = registro[0].reg_to.pinzaGruesa_cilindricaDerecha ? 'SI' : 'NO';
        datosOrdenados.registro.pinzaGruesa_cilindricaIzquierda = registro[0].reg_to.pinzaGruesa_cilindricaIzquierda ? 'SI' : 'NO';
        datosOrdenados.registro.pinzaGruesa_esfericaDerecha = registro[0].reg_to.pinzaGruesa_esfericaDerecha ? 'SI' : 'NO';
        datosOrdenados.registro.pinzaGruesa_esfericaIzquierda = registro[0].reg_to.pinzaGruesa_esfericaIzquierda ? 'SI' : 'NO';
        datosOrdenados.registro.pinzaGruesa_engancheDerecha = registro[0].reg_to.pinzaGruesa_engancheDerecha ? 'SI' : 'NO';
        datosOrdenados.registro.pinzaGruesa_engancheIzquierda = registro[0].reg_to.pinzaGruesa_engancheIzquierda ? 'SI' : 'NO';
        datosOrdenados.registro.pinzaGruesa_observaciones = registro[0].reg_to.pinzaGruesa_observaciones;
        datosOrdenados.registro.pinzaFina_subTerminalDerecha = registro[0].reg_to.pinzaFina_subTerminalDerecha ? 'SI' : 'NO';
        datosOrdenados.registro.pinzaFina_subTerminalIzquierda = registro[0].reg_to.pinzaFina_subTerminalIzquierda ? 'SI' : 'NO';
        datosOrdenados.registro.pinzaFina_terminoTerminalDerecha = registro[0].reg_to.pinzaFina_terminoTerminalDerecha ? 'SI' : 'NO';
        datosOrdenados.registro.pinzaFina_terminoTerminalIzquierda = registro[0].reg_to.pinzaFina_terminoTerminalIzquierda ? 'SI' : 'NO';
        datosOrdenados.registro.pinzaFina_lateralDerecha = registro[0].reg_to.pinzaFina_lateralDerecha ? 'SI' : 'NO';
        datosOrdenados.registro.pinzaFina_lateralIzquierda = registro[0].reg_to.pinzaFina_lateralIzquierda ? 'SI' : 'NO';
        datosOrdenados.registro.pinzaFina_tripodeDerecha = registro[0].reg_to.pinzaFina_tripodeDerecha ? 'SI' : 'NO';
        datosOrdenados.registro.pinzaFina_tripodeIzquierda = registro[0].reg_to.pinzaFina_tripodeIzquierda ? 'SI' : 'NO';
        datosOrdenados.registro.pinzaFina_interdigitalDerecha = registro[0].reg_to.pinzaFina_interdigitalDerecha ? 'SI' : 'NO';
        datosOrdenados.registro.pinzaFina_interdigitalIzquierda = registro[0].reg_to.pinzaFina_interdigitalIzquierda ? 'SI' : 'NO';
        datosOrdenados.registro.pinzaFina_lateroLateralDerecha = registro[0].reg_to.pinzaFina_lateroLateralDerecha ? 'SI' : 'NO';
        datosOrdenados.registro.pinzaFina_lateroLateralIzquierda = registro[0].reg_to.pinzaFina_lateroLateralIzquierda ? 'SI' : 'NO';
        datosOrdenados.registro.pinzaFina_multipulparDerecha = registro[0].reg_to.pinzaFina_multipulparDerecha ? 'SI' : 'NO';
        datosOrdenados.registro.pinzaFina_multipulparIzquierda = registro[0].reg_to.pinzaFina_multipulparIzquierda ? 'SI' : 'NO';
        datosOrdenados.registro.pinzaFina_observaciones = registro[0].reg_to.pinzaFina_observaciones;
        datosOrdenados.registro.barrerasArquitectonicas = registro[0].reg_to.barrerasArquitectonicas;
        datosOrdenados.registro.objetivosIntervención_objetivos = registro[0].reg_to.objetivosIntervención_objetivos;
        datosOrdenados.registro.objetivosIntervención_observaciones = registro[0].reg_to.objetivosIntervención_observaciones;
        break;
        case 'psicomotricidad':
        datosOrdenados.registro.anam_antecedentesFamiliares = registro[0].reg_pm.anam_antecedentesFamiliares;
        datosOrdenados.registro.anam_antecedentesPatologicos = registro[0].reg_pm.anam_antecedentesPatologicos;
        datosOrdenados.registro.anam_perinatal = registro[0].reg_pm.anam_perinatal;
        datosOrdenados.registro.anam_prenatal = registro[0].reg_pm.anam_prenatal;
        datosOrdenados.registro.anam_postnatal = registro[0].reg_pm.anam_postnatal;
        datosOrdenados.registro.anam_controlCefálico = registro[0].reg_pm.anam_controlCefálico;
        datosOrdenados.registro.anam_Sedestación = registro[0].reg_pm.anam_Sedestación;
        datosOrdenados.registro.anam_Arrastre = registro[0].reg_pm.anam_Arrastre;
        datosOrdenados.registro.anam_Gateo = registro[0].reg_pm.anam_Gateo;
        datosOrdenados.registro.anam_Bipedestación = registro[0].reg_pm.anam_Bipedestación;
        datosOrdenados.registro.anam_Marcha = registro[0].reg_pm.anam_Marcha;
        datosOrdenados.registro.anam_razonConsulta = registro[0].reg_pm.anam_razonConsulta;
        datosOrdenados.registro.psico_headUpright = registro[0].reg_pm.psico_headUpright ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_movesHead = registro[0].reg_pm.psico_movesHead ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_holdsObjects = registro[0].reg_pm.psico_holdsObjects ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_playsFeetAndHands = registro[0].reg_pm.psico_playsFeetAndHands ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_locateSounds = registro[0].reg_pm.psico_locateSounds ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_babbles = registro[0].reg_pm.psico_babbles ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_gutturalSounds = registro[0].reg_pm.psico_gutturalSounds ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_stimulusSmile = registro[0].reg_pm.psico_stimulusSmile ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_recognicesMother = registro[0].reg_pm.psico_recognicesMother ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_mouthSounds = registro[0].reg_pm.psico_mouthSounds ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_liftHead = registro[0].reg_pm.psico_liftHead ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_ulnaChange = registro[0].reg_pm.psico_ulnaChange ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_picksCloseObjects = registro[0].reg_pm.psico_picksCloseObjects ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_makesSounds = registro[0].reg_pm.psico_makesSounds ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_callsForAttention = registro[0].reg_pm.psico_callsForAttention ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_repeatsSyllables = registro[0].reg_pm.psico_repeatsSyllables ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_smilesToExtrangers = registro[0].reg_pm.psico_smilesToExtrangers ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_recognicesCaretaker = registro[0].reg_pm.psico_recognicesCaretaker ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_sitsWithoutSupport = registro[0].reg_pm.psico_sitsWithoutSupport ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_drags = registro[0].reg_pm.psico_drags ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_picksAndHitsObjects = registro[0].reg_pm.psico_picksAndHitsObjects ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_takesFoodToMouth = registro[0].reg_pm.psico_takesFoodToMouth ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_likesSongs = registro[0].reg_pm.psico_likesSongs ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_searchsSounds = registro[0].reg_pm.psico_searchsSounds ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_recognicesObjects = registro[0].reg_pm.psico_recognicesObjects ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_criesBeforeExtrangers = registro[0].reg_pm.psico_criesBeforeExtrangers ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_imitatesMovements = registro[0].reg_pm.psico_imitatesMovements ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_sitsWithSupport = registro[0].reg_pm.psico_sitsWithSupport ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_crawl = registro[0].reg_pm.psico_crawl ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_discoversObjects = registro[0].reg_pm.psico_discoversObjects ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_walksWithSupport = registro[0].reg_pm.psico_walksWithSupport ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_wordsWithMeaning = registro[0].reg_pm.psico_wordsWithMeaning ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_embraceAdultChild = registro[0].reg_pm.psico_embraceAdultChild ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_answersToName = registro[0].reg_pm.psico_answersToName ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_meetsSimpleOrders = registro[0].reg_pm.psico_meetsSimpleOrders ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_jumpsWithBothFeet = registro[0].reg_pm.psico_jumpsWithBothFeet ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_throwsBall = registro[0].reg_pm.psico_throwsBall ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_UndressHimself = registro[0].reg_pm.psico_UndressHimself ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_useForkCup = registro[0].reg_pm.psico_useForkCup ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_makesNounVerbPhrases = registro[0].reg_pm.psico_makesNounVerbPhrases ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_useNegatives = registro[0].reg_pm.psico_useNegatives ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_answerQuestions = registro[0].reg_pm.psico_answerQuestions ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_bigAndSmallDifferences = registro[0].reg_pm.psico_bigAndSmallDifferences ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_singChildrenSongs = registro[0].reg_pm.psico_singChildrenSongs ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_exploreEnvironment = registro[0].reg_pm.psico_exploreEnvironment ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_recognicesPhotographs = registro[0].reg_pm.psico_recognicesPhotographs ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_playsSmallGroups = registro[0].reg_pm.psico_playsSmallGroups ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_greetsOnCommand = registro[0].reg_pm.psico_greetsOnCommand ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_performManualActivities = registro[0].reg_pm.psico_performManualActivities ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_runsJumps = registro[0].reg_pm.psico_runsJumps ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_copyLinesAndCircles = registro[0].reg_pm.psico_copyLinesAndCircles ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_identifiesEspatialConcepts = registro[0].reg_pm.psico_identifiesEspatialConcepts ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_acknowledgeHisSex = registro[0].reg_pm.psico_acknowledgeHisSex ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_gerundPluralArticleDifference = registro[0].reg_pm.psico_gerundPluralArticleDifference ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_articlePhonemes = registro[0].reg_pm.psico_articlePhonemes ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_gestureCommunication = registro[0].reg_pm.psico_gestureCommunication ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_talksFirstPerson = registro[0].reg_pm.psico_talksFirstPerson ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_useOralLanguage = registro[0].reg_pm.psico_useOralLanguage ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_showsPersonalPreferences = registro[0].reg_pm.psico_showsPersonalPreferences ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_likesChildAndAnimals = registro[0].reg_pm.psico_likesChildAndAnimals ? '✓ ' : 'x ';
        datosOrdenados.registro.psico_joinsSmallTeams = registro[0].reg_pm.psico_joinsSmallTeams ? '✓ ' : 'x ';
        datosOrdenados.registro.motor_run = registro[0].reg_pm.motor_run == 'initial' ? 'Inicial' : registro[0].reg_pm.motor_run == 'elementary' ? 'Elemental' : 'Maduro';
        datosOrdenados.registro.motor_jump = registro[0].reg_pm.motor_jump == 'initial' ? 'Inicial' : registro[0].reg_pm.motor_jump == 'elementary' ? 'Elemental' : 'Maduro';
        datosOrdenados.registro.motor_throw = registro[0].reg_pm.motor_throw == 'initial' ? 'Inicial' : registro[0].reg_pm.motor_throw == 'elementary' ? 'Elemental' : 'Maduro';
        datosOrdenados.registro.motor_kick = registro[0].reg_pm.motor_kick == 'initial' ? 'Inicial' : registro[0].reg_pm.motor_kick == 'elementary' ? 'Elemental' : 'Maduro';
        datosOrdenados.registro.motor_staticDinamicBalance = registro[0].reg_pm.motor_staticDinamicBalance == 'achievement' ? 'Logro' : registro[0].reg_pm.motor_staticDinamicBalance == 'process' ? 'En proceso' : 'Inicio';
        datosOrdenados.registro.motor_staticBalance = registro[0].reg_pm.motor_staticBalance == 'achievement' ? 'Logro' : registro[0].reg_pm.motor_staticBalance == 'process' ? 'En proceso' : 'Inicio';
        datosOrdenados.registro.motor_partialDisociation = registro[0].reg_pm.motor_partialDisociation == 'achievement' ? 'Logro' : registro[0].reg_pm.motor_partialDisociation == 'process' ? 'En proceso' : 'Inicio';
        datosOrdenados.registro.motor_generalCoordination = registro[0].reg_pm.motor_generalCoordination == 'achievement' ? 'Logro' : registro[0].reg_pm.motor_generalCoordination == 'process' ? 'En proceso' : 'Inicio';
        datosOrdenados.registro.motor_eye_right = registro[0].reg_pm.motor_eye_right ? '✓' : '';
        datosOrdenados.registro.motor_eye_left = registro[0].reg_pm.motor_eye_left ? '✓' : '';
        datosOrdenados.registro.motor_ear_right = registro[0].reg_pm.motor_ear_right ? '✓' : '';
        datosOrdenados.registro.motor_ear_left = registro[0].reg_pm.motor_ear_left ? '✓' : '';
        datosOrdenados.registro.motor_hand_right = registro[0].reg_pm.motor_hand_right ? '✓' : '';
        datosOrdenados.registro.motor_hand_left = registro[0].reg_pm.motor_hand_left ? '✓' : '';
        datosOrdenados.registro.motor_feet_right = registro[0].reg_pm.motor_feet_right ? '✓' : '';
        datosOrdenados.registro.motor_feet_left = registro[0].reg_pm.motor_feet_left ? '✓' : '';
        datosOrdenados.registro.motor_scrash = registro[0].reg_pm.motor_scrash == 'achievement' ? 'Logro' : registro[0].reg_pm.motor_scrash == 'process' ? 'En proceso' : 'Inicio';
        datosOrdenados.registro.motor_button = registro[0].reg_pm.motor_button == 'achievement' ? 'Logro' : registro[0].reg_pm.motor_button == 'process' ? 'En proceso' : 'Inicio';
        datosOrdenados.registro.motor_cut = registro[0].reg_pm.motor_cut == 'achievement' ? 'Logro' : registro[0].reg_pm.motor_cut == 'process' ? 'En proceso' : 'Inicio';
        datosOrdenados.registro.motor_makeTower = registro[0].reg_pm.motor_makeTower == 'achievement' ? 'Logro' : registro[0].reg_pm.motor_makeTower == 'process' ? 'En proceso' : 'Inicio';
        datosOrdenados.registro.motor_threadingNeedle = registro[0].reg_pm.motor_threadingNeedle == 'achievement' ? 'Logro' : registro[0].reg_pm.motor_threadingNeedle == 'process' ? 'En proceso' : 'Inicio';
        datosOrdenados.registro.motor_observaciones = registro[0].reg_pm.motor_observaciones;
        datosOrdenados.registro.cogni_drawsHumanFigure = registro[0].reg_pm.cogni_drawsHumanFigure == 'achievement' ? 'Logro' : registro[0].reg_pm.cogni_drawsHumanFigure == 'process' ? 'En proceso' : 'Inicio';;
        datosOrdenados.registro.cogni_nameHumanParts = registro[0].reg_pm.cogni_nameHumanParts == 'achievement' ? 'Logro' : registro[0].reg_pm.cogni_nameHumanParts == 'process' ? 'En proceso' : 'Inicio';;
        datosOrdenados.registro.cogni_compleateHumanFigure = registro[0].reg_pm.cogni_compleateHumanFigure == 'achievement' ? 'Logro' : registro[0].reg_pm.cogni_compleateHumanFigure == 'process' ? 'En proceso' : 'Inicio';;
        datosOrdenados.registro.cogni_bodyImage = registro[0].reg_pm.cogni_bodyImage == 'achievement' ? 'Logro' : registro[0].reg_pm.cogni_bodyImage == 'process' ? 'En proceso' : 'Inicio';;
        datosOrdenados.registro.cogni_urlPhoto = registro[0].reg_pm.cogni_urlPhoto;
        datosOrdenados.registro.cogni_arriba = registro[0].reg_pm.cogni_arriba ? '✓' : '';
        datosOrdenados.registro.cogni_abajo = registro[0].reg_pm.cogni_abajo ? '✓' : '';
        datosOrdenados.registro.cogni_delante = registro[0].reg_pm.cogni_delante ? '✓' : '';
        datosOrdenados.registro.cogni_detras = registro[0].reg_pm.cogni_detras ? '✓' : '';
        datosOrdenados.registro.cogni_dentro = registro[0].reg_pm.cogni_dentro ? '✓' : '';
        datosOrdenados.registro.cogni_fuera = registro[0].reg_pm.cogni_fuera ? '✓' : '';
        datosOrdenados.registro.cogni_izquierda = registro[0].reg_pm.cogni_izquierda ? '✓' : '';
        datosOrdenados.registro.cogni_derecha = registro[0].reg_pm.cogni_derecha ? '✓' : '';
        datosOrdenados.registro.cogni_inflaGlobo = registro[0].reg_pm.cogni_inflaGlobo;
        datosOrdenados.registro.cogni_encubaHuevos = registro[0].reg_pm.cogni_encubaHuevos;
        datosOrdenados.registro.cogni_plantaFlores = registro[0].reg_pm.cogni_plantaFlores;
        datosOrdenados.registro.cogni_undifferentiatedCrying = registro[0].reg_pm.cogni_undifferentiatedCrying ? '✓ ' : 'x ';
        datosOrdenados.registro.cogni_socialSmile = registro[0].reg_pm.cogni_socialSmile ? '✓ ' : 'x ';
        datosOrdenados.registro.cogni_vocalGame = registro[0].reg_pm.cogni_vocalGame ? '✓ ' : 'x ';
        datosOrdenados.registro.cogni_babbleReflection = registro[0].reg_pm.cogni_babbleReflection ? '✓ ' : 'x ';
        datosOrdenados.registro.cogni_gutturalSound = registro[0].reg_pm.cogni_gutturalSound ? '✓ ' : 'x ';
        datosOrdenados.registro.cogni_gestures = registro[0].reg_pm.cogni_gestures ? '✓ ' : 'x ';
        datosOrdenados.registro.cogni_intentionalSyllable = registro[0].reg_pm.cogni_intentionalSyllable ? '✓ ' : 'x ';
        datosOrdenados.registro.cogni_juxtaposedWord = registro[0].reg_pm.cogni_juxtaposedWord ? '✓ ' : 'x ';
        datosOrdenados.registro.cogni_simplePhrase = registro[0].reg_pm.cogni_simplePhrase ? '✓ ' : 'x ';
        datosOrdenados.registro.cogni_phraseWord = registro[0].reg_pm.cogni_phraseWord ? '✓ ' : 'x ';
        datosOrdenados.registro.cogni_languageInteriorization = registro[0].reg_pm.cogni_languageInteriorization ? '✓ ' : 'x ';
        datosOrdenados.registro.cogni_waitTurn = registro[0].reg_pm.cogni_waitTurn ? '✓ ' : 'x ';
        datosOrdenados.registro.cogni_completePhrase = registro[0].reg_pm.cogni_completePhrase ? '✓ ' : 'x ';
        datosOrdenados.registro.cogni_gramaticalElemmentUse = registro[0].reg_pm.cogni_gramaticalElemmentUse ? '✓ ' : 'x ';
        datosOrdenados.registro.cogni_makeComplexeSentences = registro[0].reg_pm.cogni_makeComplexeSentences ? '✓ ' : 'x ';
        datosOrdenados.registro.cogni_fullfillComplexOrder = registro[0].reg_pm.cogni_fullfillComplexOrder ? '✓ ' : 'x ';
        datosOrdenados.registro.cogni_beginReadingWriting = registro[0].reg_pm.cogni_beginReadingWriting ? '✓ ' : 'x ';
        datosOrdenados.registro.cogni_usePreposition = registro[0].reg_pm.cogni_usePreposition ? '✓ ' : 'x ';
        datosOrdenados.registro.cogni_useAdjectives = registro[0].reg_pm.cogni_useAdjectives ? '✓ ' : 'x ';
        datosOrdenados.registro.cogni_slangLanguage = registro[0].reg_pm.cogni_slangLanguage ? '✓ ' : 'x ';
        datosOrdenados.registro.cogni_useAdjectivesAdverbs = registro[0].reg_pm.cogni_useAdjectivesAdverbs ? '✓ ' : 'x ';
        datosOrdenados.registro.cogni_verbUse = registro[0].reg_pm.cogni_verbUse ? '✓ ' : 'x ';
        datosOrdenados.registro.cogni_fluidCommunication = registro[0].reg_pm.cogni_fluidCommunication ? '✓ ' : 'x ';
        datosOrdenados.registro.cogni_observaciones = registro[0].reg_pm.cogni_observaciones;
        datosOrdenados.registro.socio_plays = convertFrecuencyData(registro[0].reg_pm.socio_plays);
        datosOrdenados.registro.socio_proposeGame = convertFrecuencyData(registro[0].reg_pm.socio_proposeGame);
        datosOrdenados.registro.socio_leaderInGames = convertFrecuencyData(registro[0].reg_pm.socio_leaderInGames);
        datosOrdenados.registro.socio_acceptAnothersGame = convertFrecuencyData(registro[0].reg_pm.socio_acceptAnothersGame);
        datosOrdenados.registro.socio_otherGame = convertFrecuencyData(registro[0].reg_pm.socio_otherGame);
        datosOrdenados.registro.socio_acceptIt = convertFrecuencyData(registro[0].reg_pm.socio_acceptIt);
        datosOrdenados.registro.socio_searchIt = convertFrecuencyData(registro[0].reg_pm.socio_searchIt);
        datosOrdenados.registro.socio_provokesIt = convertFrecuencyData(registro[0].reg_pm.socio_provokesIt);
        datosOrdenados.registro.socio_thanksHim = convertFrecuencyData(registro[0].reg_pm.socio_thanksHim);
        datosOrdenados.registro.socio_waitGrownUpApprovation = convertFrecuencyData(registro[0].reg_pm.socio_waitGrownUpApprovation);
        datosOrdenados.registro.socio_waitOrders = convertFrecuencyData(registro[0].reg_pm.socio_waitOrders);
        datosOrdenados.registro.socio_collaborateWithAdult = convertFrecuencyData(registro[0].reg_pm.socio_collaborateWithAdult);
        datosOrdenados.registro.socio_otherAdult = convertFrecuencyData(registro[0].reg_pm.socio_otherAdult);
        datosOrdenados.registro.socio_observaciones = registro[0].reg_pm.socio_observaciones;
        datosOrdenados.registro.diagnosticoPsicomotriz = registro[0].reg_pm.diagnosticoPsicomotriz;
        datosOrdenados.registro.recomendaciones = registro[0].reg_pm.recomendaciones;
        break;
        case 'fisioterapia':
        datosOrdenados.registro.diagnosticoMedico = registro[0].reg_ft.diagnosticoMedico;
        datosOrdenados.registro.motivoConsulta = registro[0].reg_ft.motivoConsulta;
        datosOrdenados.registro.antecedentesEnfermedadActual = registro[0].reg_ft.antecedentesEnfermedadActual;
        datosOrdenados.registro.ag_numeroEmbarazo = registro[0].reg_ft.ag_numeroEmbarazo;
        datosOrdenados.registro.ag_numeroHijos = registro[0].reg_ft.ag_numeroHijos;
        datosOrdenados.registro.ag_controlPrenatal = registro[0].reg_ft.ag_controlPrenatal;
        datosOrdenados.registro.ag_hospital = registro[0].reg_ft.ag_hospital;
        datosOrdenados.registro.ag_problemasDuranteEmbarazo = registro[0].reg_ft.ag_problemasDuranteEmbarazo;
        datosOrdenados.registro.ag_tiempoGestacional = registro[0].reg_ft.ag_tiempoGestacional;
        datosOrdenados.registro.ag_parto = registro[0].reg_ft.ag_parto;
        datosOrdenados.registro.ag_tipoParto = registro[0].reg_ft.ag_tipoParto;
        datosOrdenados.registro.ag_posicion = registro[0].reg_ft.ag_posicion;
        datosOrdenados.registro.ag_llanto = registro[0].reg_ft.ag_llanto;
        datosOrdenados.registro.ag_movimientos = registro[0].reg_ft.ag_movimientos;
        datosOrdenados.registro.ag_cianosis = registro[0].reg_ft.ag_cianosis;
        datosOrdenados.registro.ag_oxigeno = registro[0].reg_ft.ag_oxigeno;
        datosOrdenados.registro.ag_incubadora = registro[0].reg_ft.ag_incubadora;
        datosOrdenados.registro.ag_tiempoIncubadora = registro[0].reg_ft.ag_tiempoIncubadora;
        datosOrdenados.registro.ag_otros = registro[0].reg_ft.ag_otros;
        datosOrdenados.registro.epf_planoAnterior = registro[0].reg_ft.epf_planoAnterior;
        datosOrdenados.registro.epf_planoPosterior = registro[0].reg_ft.epf_planoPosterior;
        datosOrdenados.registro.epf_planoLateral = registro[0].reg_ft.epf_planoLateral;
        datosOrdenados.registro.epf_otros = registro[0].reg_ft.epf_otros;
        datosOrdenados.registro.epf_tipoRespiracion = registro[0].reg_ft.epf_tipoRespiracion;
        datosOrdenados.registro.epf_patronRespiracion = registro[0].reg_ft.epf_patronRespiracion;
        datosOrdenados.registro.epf_marcha = registro[0].reg_ft.epf_marcha;
        datosOrdenados.registro.epf_Po_thomas = registro[0].reg_ft.epf_Po_thomas;
        datosOrdenados.registro.epf_Po_galeazi = registro[0].reg_ft.epf_Po_galeazi;
        datosOrdenados.registro.epf_Po_ober = registro[0].reg_ft.epf_Po_ober;
        datosOrdenados.registro.epf_Po_ortolani = registro[0].reg_ft.epf_Po_ortolani;
        datosOrdenados.registro.epf_Po_barlow = registro[0].reg_ft.epf_Po_barlow;
        datosOrdenados.registro.epf_Po_asimetriaPliegues = registro[0].reg_ft.epf_Po_asimetriaPliegues;
        datosOrdenados.registro.epf_Po_otros = registro[0].reg_ft.epf_Po_otros;
        datosOrdenados.registro.epf_tono = registro[0].reg_ft.epf_tono;
        datosOrdenados.registro.epf_trofismo = registro[0].reg_ft.epf_trofismo;
        const escalaAshworth = {
          '00': 'Tono muscular normal. No hay espasticidad.',
          '10': 'Leve incremento del tono muscular. Resistencia mínima al final del arco articular al estirar pasivamente el grupo muscular considerado',
          '11': 'Leve incremento del tono muscular. Resistencia a la elongación en menos de la  mitad del arco.',
          '20': 'Incremento del tono mayor. Resistencia a la elongación en casi todo el arco articular. Extremidad movilizable fácilmente.',
          '30': 'Considerable incremento del tono. Es difícil la movilización pasiva de la extremidad.',
          '40': 'Hipertonía de las extremidades en flexión  o en extensión.(aducción, abducción etc.)'
        }
        datosOrdenados.registro.escalaAshworth = escalaAshworth[registro[0].reg_ft.escalaAshworth];
        datosOrdenados.registro.ref_suctionReflection = registro[0].reg_ft.ref_suctionReflection ? 'Presente': 'Ausente';
        datosOrdenados.registro.ref_suctionReflectionText = registro[0].reg_ft.ref_suctionReflectionText;
        datosOrdenados.registro.ref_TRIPLEEXTFLX = registro[0].reg_ft.ref_TRIPLEEXTFLX ? 'Presente': 'Ausente';
        datosOrdenados.registro.ref_TRIPLEEXTFLXText = registro[0].reg_ft.ref_TRIPLEEXTFLXText;
        datosOrdenados.registro.ref_RTCA = registro[0].reg_ft.ref_RTCA ? 'Presente': 'Ausente';
        datosOrdenados.registro.ref_RTCAText = registro[0].reg_ft.ref_RTCAText;
        datosOrdenados.registro.ref_RTCS = registro[0].reg_ft.ref_RTCS ? 'Presente': 'Ausente';
        datosOrdenados.registro.ref_RTCSText = registro[0].reg_ft.ref_RTCSText;
        datosOrdenados.registro.ref_RTL = registro[0].reg_ft.ref_RTL ? 'Presente': 'Ausente';
        datosOrdenados.registro.ref_RTLText = registro[0].reg_ft.ref_RTLText;
        datosOrdenados.registro.ref_RMORO = registro[0].reg_ft.ref_RMORO ? 'Presente': 'Ausente';
        datosOrdenados.registro.ref_RMOROText = registro[0].reg_ft.ref_RMOROText;
        datosOrdenados.registro.ref_RBABINSKI = registro[0].reg_ft.ref_RBABINSKI ? 'Presente': 'Ausente';
        datosOrdenados.registro.ref_RBABINSKIText = registro[0].reg_ft.ref_RBABINSKIText;
        datosOrdenados.registro.ref_REXTCRUZADA = registro[0].reg_ft.ref_REXTCRUZADA ? 'Presente': 'Ausente';
        datosOrdenados.registro.ref_REXTCRUZADAText = registro[0].reg_ft.ref_REXTCRUZADAText;
        datosOrdenados.registro.ref_GALANT = registro[0].reg_ft.ref_GALANT ? 'Presente': 'Ausente';
        datosOrdenados.registro.ref_GALANTText = registro[0].reg_ft.ref_GALANTText;
        datosOrdenados.registro.ref_LANDAU = registro[0].reg_ft.ref_LANDAU ? 'Presente': 'Ausente';
        datosOrdenados.registro.ref_LANDAUText = registro[0].reg_ft.ref_LANDAUText;
        datosOrdenados.registro.ref_DEFENSA = registro[0].reg_ft.ref_DEFENSA ? 'Presente': 'Ausente';
        datosOrdenados.registro.ref_DEFENSAText = registro[0].reg_ft.ref_DEFENSAText;
        datosOrdenados.registro.ref_RPALMAR = registro[0].reg_ft.ref_RPALMAR ? 'Presente': 'Ausente';
        datosOrdenados.registro.ref_RPALMARText = registro[0].reg_ft.ref_RPALMARText;
        datosOrdenados.registro.ref_RPLANTAR = registro[0].reg_ft.ref_RPLANTAR ? 'Presente': 'Ausente';
        datosOrdenados.registro.ref_RPLANTARText = registro[0].reg_ft.ref_RPLANTARText;
        datosOrdenados.registro.ref_RPOSITIVODEAPOYO = registro[0].reg_ft.ref_RPOSITIVODEAPOYO ? 'Presente': 'Ausente';
        datosOrdenados.registro.ref_RPOSITIVODEAPOYOText = registro[0].reg_ft.ref_RPOSITIVODEAPOYOText;
        datosOrdenados.registro.ref_RPARACAIDAS = registro[0].reg_ft.ref_RPARACAIDAS ? 'Presente': 'Ausente';
        datosOrdenados.registro.ref_RPARACAIDASText = registro[0].reg_ft.ref_RPARACAIDASText;
        datosOrdenados.registro.re_laberintico = registro[0].reg_ft.re_laberintico ? 'Presente': 'Ausente';
        datosOrdenados.registro.re_laberinticoText = registro[0].reg_ft.re_laberinticoText;
        datosOrdenados.registro.re_sobreOjos = registro[0].reg_ft.re_sobreOjos ? 'Presente': 'Ausente';
        datosOrdenados.registro.re_sobreOjosText = registro[0].reg_ft.re_sobreOjosText;
        datosOrdenados.registro.ame_decubitoDorsal = registro[0].reg_ft.ame_decubitoDorsal;
        datosOrdenados.registro.ame_decubitoVentral = registro[0].reg_ft.ame_decubitoVentral;
        datosOrdenados.registro.ame_cambioPosicion = registro[0].reg_ft.ame_cambioPosicion;
        datosOrdenados.registro.ame_rolido = registro[0].reg_ft.ame_rolido;
        datosOrdenados.registro.ame_arrastre = registro[0].reg_ft.ame_arrastre;
        datosOrdenados.registro.ame_sedente = registro[0].reg_ft.ame_sedente;
        datosOrdenados.registro.ame_gateo = registro[0].reg_ft.ame_gateo;
        datosOrdenados.registro.ame_arrodillado = registro[0].reg_ft.ame_arrodillado;
        datosOrdenados.registro.ame_bipedo = registro[0].reg_ft.ame_bipedo;
        datosOrdenados.registro.ep_esquemaCorporal = convertProgresLevelData(registro[0].reg_ft.ep_esquemaCorporal);
        datosOrdenados.registro.ep_esquemaCorporalText = registro[0].reg_ft.ep_esquemaCorporalText;
        datosOrdenados.registro.ep_imagenCorporal = convertProgresLevelData(registro[0].reg_ft.ep_imagenCorporal);
        datosOrdenados.registro.ep_imagenCorporalText = registro[0].reg_ft.ep_imagenCorporalText;
        datosOrdenados.registro.ep_conceptoCorporal = convertProgresLevelData(registro[0].reg_ft.ep_conceptoCorporal);
        datosOrdenados.registro.ep_conceptoCorporalText = registro[0].reg_ft.ep_conceptoCorporalText;
        datosOrdenados.registro.ep_estructuracionEspacial = convertProgresLevelData(registro[0].reg_ft.ep_estructuracionEspacial);
        datosOrdenados.registro.ep_estructuracionEspacialText = registro[0].reg_ft.ep_estructuracionEspacialText;
        datosOrdenados.registro.ep_estructuracionTemporal = convertProgresLevelData(registro[0].reg_ft.ep_estructuracionTemporal);
        datosOrdenados.registro.ep_estructuracionTemporalText = registro[0].reg_ft.ep_estructuracionTemporalText;
        datosOrdenados.registro.ep_equilibrioEstatico = convertProgresLevelData(registro[0].reg_ft.ep_equilibrioEstatico);
        datosOrdenados.registro.ep_equilibrioEstaticoText = registro[0].reg_ft.ep_equilibrioEstaticoText;
        datosOrdenados.registro.ep_equilibrioDinamico = convertProgresLevelData(registro[0].reg_ft.ep_equilibrioDinamico);
        datosOrdenados.registro.ep_equilibrioDinamicoText = registro[0].reg_ft.ep_equilibrioDinamicoText;
        datosOrdenados.registro.ep_coordinacionGruesa = convertProgresLevelData(registro[0].reg_ft.ep_coordinacionGruesa);
        datosOrdenados.registro.ep_coordinacionGruesaText = registro[0].reg_ft.ep_coordinacionGruesaText;
        datosOrdenados.registro.ep_coordinacionFina = convertProgresLevelData(registro[0].reg_ft.ep_coordinacionFina);
        datosOrdenados.registro.ep_coordinacionFinaText = registro[0].reg_ft.ep_coordinacionFinaText;
        datosOrdenados.registro.ep_coordinacionOjoMano = convertProgresLevelData(registro[0].reg_ft.ep_coordinacionOjoMano);
        datosOrdenados.registro.ep_coordinacionOjoManoText = registro[0].reg_ft.ep_coordinacionOjoManoText;
        datosOrdenados.registro.ep_coordinacionOjoPie = convertProgresLevelData(registro[0].reg_ft.ep_coordinacionOjoPie);
        datosOrdenados.registro.ep_coordinacionOjoPieText = registro[0].reg_ft.ep_coordinacionOjoPieText;
        datosOrdenados.registro.ep_lateralidad = registro[0].reg_ft.ep_lateralidad;
        datosOrdenados.registro.ep_observacion = registro[0].reg_ft.ep_observacion;
        datosOrdenados.registro.avd_higiene = convertProgresLevelData(registro[0].reg_ft.avd_higiene);
        datosOrdenados.registro.avd_higieneText = registro[0].reg_ft.avd_higieneText;
        datosOrdenados.registro.avd_alimentacion = convertProgresLevelData(registro[0].reg_ft.avd_alimentacion);
        datosOrdenados.registro.avd_alimentacionText = registro[0].reg_ft.avd_alimentacionText;
        datosOrdenados.registro.avd_vestimenta = convertProgresLevelData(registro[0].reg_ft.avd_vestimenta);
        datosOrdenados.registro.avd_vestimentaText = registro[0].reg_ft.avd_vestimentaText;
        datosOrdenados.registro.asa_muestrasAfectivas = convertProgresLevelData(registro[0].reg_ft.asa_muestrasAfectivas);
        datosOrdenados.registro.asa_muestrasAfectivasText = registro[0].reg_ft.asa_muestrasAfectivasText;
        datosOrdenados.registro.asa_comunicacionOral = convertProgresLevelData(registro[0].reg_ft.asa_comunicacionOral);
        datosOrdenados.registro.asa_comunicacionOralText = registro[0].reg_ft.asa_comunicacionOralText;
        datosOrdenados.registro.asa_comunicacionAlternativa = convertProgresLevelData(registro[0].reg_ft.asa_comunicacionAlternativa);
        datosOrdenados.registro.asa_comunicacionAlternativaText = registro[0].reg_ft.asa_comunicacionAlternativaText;
        datosOrdenados.registro.asa_relacionamientoSocial = convertProgresLevelData(registro[0].reg_ft.asa_relacionamientoSocial);
        datosOrdenados.registro.asa_relacionamientoSocialText = registro[0].reg_ft.asa_relacionamientoSocialText;
        datosOrdenados.registro.areaCognitiva = registro[0].reg_ft.areaCognitiva == 'collaborate' ? 'Colabora' :
        registro[0].reg_ft.areaCognitiva == 'doesntCollaborate' ? 'No colabora' :
        registro[0].reg_ft.areaCognitiva == 'understand' ? 'Entiende' :
        registro[0].reg_ft.areaCognitiva == 'doesntUnderstand' ? 'No entiende' : 'No definido';
        datosOrdenados.registro.areaCognitivaText = registro[0].reg_ft.areaCognitivaText;
        datosOrdenados.registro.aa_vision = registro[0].reg_ft.aa_vision == 'normal' ? 'Normal' :
        registro[0].reg_ft.aa_vision == 'altered' ? 'Alterado' :
        registro[0].reg_ft.aa_vision == 'absent' ? 'Ausente' : 'No definido';
        datosOrdenados.registro.aa_visionText = registro[0].reg_ft.aa_visionText;
        datosOrdenados.registro.aa_audicion = registro[0].reg_ft.aa_audicion == 'normal' ? 'Normal' :
        registro[0].reg_ft.aa_audicion == 'hearingLoss' ? 'Hipoacusia' :
        registro[0].reg_ft.aa_audicion == 'deafness' ? 'Sordera' : 'No definido';
        datosOrdenados.registro.aa_audicionText = registro[0].reg_ft.aa_audicionText;
        datosOrdenados.registro.aa_lenguaje = registro[0].reg_ft.aa_lenguaje == 'normal' ? 'Normal' :
        registro[0].reg_ft.aa_lenguaje == 'understandable' ? 'Comprensible' :
        registro[0].reg_ft.aa_lenguaje == 'notUnderstandable' ? 'No comprensible' :
        registro[0].reg_ft.aa_lenguaje == 'absent' ? 'Ausente' :
        registro[0].reg_ft.aa_lenguaje == 'alternative' ? 'Alternativo' : 'No definido';
        datosOrdenados.registro.aa_lenguajeText = registro[0].reg_ft.aa_lenguajeText;
        datosOrdenados.registro.aa_sindromeConvulsivo = registro[0].reg_ft.aa_sindromeConvulsivo == 'absent' ? 'Ausente' :
        registro[0].reg_ft.aa_sindromeConvulsivo == 'present' ? 'Presente' :
        registro[0].reg_ft.aa_sindromeConvulsivo == 'withTreatment' ? 'Con tratamiento' :
        registro[0].reg_ft.aa_sindromeConvulsivo == 'withoutTreatment' ? 'Sin tratamiento' :
        registro[0].reg_ft.aa_sindromeConvulsivo == 'type' ? 'Sordera' : 'Tipo';
        datosOrdenados.registro.aa_sindromeConvulsivoText = registro[0].reg_ft.aa_sindromeConvulsivoText;
        datosOrdenados.registro.aa_memoriaLargoPlazo = registro[0].reg_ft.aa_memoriaLargoPlazo == 'good' ? 'Buena' :
        registro[0].reg_ft.aa_memoriaLargoPlazo == 'regular' ? 'Regular' :
        registro[0].reg_ft.aa_memoriaLargoPlazo == 'bad' ? 'Mala' : 'No definido';
        datosOrdenados.registro.aa_memoriaLargoPlazoText = registro[0].reg_ft.aa_memoriaLargoPlazoText;
        datosOrdenados.registro.aa_memoriaCortoPlazo = registro[0].reg_ft.aa_memoriaCortoPlazo == 'good' ? 'Buena' :
        registro[0].reg_ft.aa_memoriaCortoPlazo == 'regular' ? 'Regular' :
        registro[0].reg_ft.aa_memoriaCortoPlazo == 'bad' ? 'Mala' : 'No definido';
        datosOrdenados.registro.aa_memoriaCortoPlazoText = registro[0].reg_ft.aa_memoriaCortoPlazoText;
        datosOrdenados.registro.aa_estadoEmocional = registro[0].reg_ft.aa_estadoEmocional == 'stable' ? 'Estable' :
        registro[0].reg_ft.aa_estadoEmocional == 'quiet' ? 'Tranquilo' :
        registro[0].reg_ft.aa_estadoEmocional == 'changing' ? 'Cambiante' :
        registro[0].reg_ft.aa_estadoEmocional == 'aggressive' ? 'Agresivo' : 'No definido';
        datosOrdenados.registro.aa_estadoEmocionalText = registro[0].reg_ft.aa_estadoEmocionalText;
        datosOrdenados.registro.aa_estadoNutricional = registro[0].reg_ft.aa_estadoNutricional == 'normal' ? 'Normal' :
        registro[0].reg_ft.aa_estadoNutricional == 'overweight' ? 'Sobrepeso' :
        registro[0].reg_ft.aa_estadoNutricional == 'obesity' ? 'Obesidad' :
        registro[0].reg_ft.aa_estadoNutricional == 'undernourished' ? 'Desnutrido' : 'No definido';
        datosOrdenados.registro.aa_estadoNutricionalText = registro[0].reg_ft.aa_estadoNutricionalText;
        datosOrdenados.registro.aa_sensibilidad = registro[0].reg_ft.aa_sensibilidad == 'normal' ? 'Normal' :
        registro[0].reg_ft.aa_sensibilidad == 'hyposensitive' ? 'Hiposensible' :
        registro[0].reg_ft.aa_sensibilidad == 'hypersensitive' ? 'Hipersensible' : 'No definido';
        datosOrdenados.registro.aa_sensibilidadText = registro[0].reg_ft.aa_sensibilidadText;
        datosOrdenados.registro.aa_estereotipos = registro[0].reg_ft.aa_estereotipos;
        datosOrdenados.registro.conclusiones = registro[0].reg_ft.conclusiones;
        datosOrdenados.registro.diagnostico = registro[0].reg_ft.diagnostico;
        datosOrdenados.registro.objetivos = registro[0].reg_ft.objetivos;
        datosOrdenados.registro.planTratamiento = registro[0].reg_ft.planTratamiento;
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

  let convertProgresLevelData = (frecuencia, tipo) => {
    let nuevoDato = 'No definido';
    switch (frecuencia) {
      case 'structured':
        nuevoDato = 'Estructurado';
        break;
      case 'inProgress':
        nuevoDato = 'En progreso';
        break;
      case 'absent':
        nuevoDato = 'Ausente';
        break;
      case 'good':
        nuevoDato = 'Bueno';
        break;
      case 'deficient':
        nuevoDato = 'Deficiente';
        break;
      case 'present':
        nuevoDato = 'Presente';
        break;
      case 'independent':
        nuevoDato = 'Independiente';
        break;
      case 'withHelp':
        nuevoDato = 'Con ayuda';
        break;
      case 'dependent':
        nuevoDato = 'Dependiente';
        break;
      default:
        break;
    }
    return nuevoDato;
  }

  let convertFrecuencyData = (frecuencia) => {
    let nuevoDato = 'No definido';
    switch (frecuencia) {
      case 'always':
        nuevoDato = 'Siempre';
        break;
      case 'frequently':
        nuevoDato = 'Frecuentemente';
        break;
      case 'ocasionally':
        nuevoDato = 'Ocasionalmente';
        break;
      case 'never':
        nuevoDato = 'Nunca';
        break;
      default:
        break;
    }
    return nuevoDato;
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