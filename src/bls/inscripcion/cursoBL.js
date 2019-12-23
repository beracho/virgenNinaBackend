/**
* Lógica del Negocio -> ConfiguracionBL
*/
const config = require('konfig')();
const fs = require('fs-extra');
const dao = require('../../dao/dao');
const Q = require('q');
const csv=require('csvtojson')

module.exports = app => {
  const models = app.src.db.models;

  const listaCursos = (query, body) => {
    const deferred = Q.defer();
    const params = {
      where: {
        estado: 'ACTIVO'
      }
    };
    if (query.gestion && query.gestion != '') {
      if (query.gestion == 'actual') {
        params.where.gestion = (new Date()).getFullYear() + '';
      } else {
        params.where.gestion = query.gestion;
      }
    }
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

  const importarCsvDatos = (req) => {
    const deferred = Q.defer();
    const audit_usuario  = req.body.audit_usuario;
    if (!req.files) {
      deferred.reject(new Error(`noCsvSent`));
      return deferred.promise;
    }
    if (!req.files.file) {
      deferred.reject(new Error(`noCsvSent`));
      return deferred.promise;
    }
    const archivo = req.files.file;
    const extension = archivo.name.replace(/^.*\./, '');
    if (!(archivo.mimetype && (archivo.mimetype === MIMETYPE_CSV || extension === 'csv'))) {
      deferred.reject(new Error(`notACsvFile`));
      return deferred.promise;
    }
    const tmpFile = archivo.name;
    const dirEstudiantes = `${config.app.directorios.ruta_estudiantes}`;
    const dirCsv = `${config.app.directorios.ruta_csv}`;
    const dirUsuarioCsv = `${dirCsv}/${audit_usuario.id_usuario}`;
    const rutaArchivo = `${dirUsuarioCsv}/${tmpFile}`;
    if(!fs.existsSync(dirEstudiantes)) {
      fs.mkdirSync(dirEstudiantes);
    }
    if(!fs.existsSync(dirCsv)) {
      fs.mkdirSync(dirCsv);
    }
    if(!fs.existsSync(dirUsuarioCsv)) {
      fs.mkdirSync(dirUsuarioCsv);
    }
    archivo.mv(rutaArchivo, err => {
      if (err) {
        throw new Error(err);
      } else {
        consultaDB()
        .then (objetoAVerificar => {
          return prepararObjetoCreacion(rutaArchivo, objetoAVerificar, audit_usuario)
        })
        .then(objetosCreacion => {
          return models.sequelize.transaction().then((transaccion) => {
            return dao.crearRegistro(models.curso, objetosCreacion, true, transaccion)
            .then(respuesta => {
              transaccion.commit();
              deferred.resolve(objetosCreacion)
            })
            .catch(error => {
              transaccion.rollback();
              console.log(error);
              deferred.reject(error)
            });
          })
        })
        .then(respuesta => deferred.resolve(respuesta))
        .catch(error => {
          console.log(error);
          deferred.reject(error)
        });
      }
    })
    return deferred.promise;
  };

  const prepararObjetoCreacion = (rutaArchivo, objeto, audit_usuario) => {
    const deferred = Q.defer();
    const arrayCols = ['Nombre', 'Paralelo', 'Gestion', 'Maestro', 'Descripcion', 'Min (mes)', 'Min (Año)', 'Max (mes)', 'Max (Año)', 'Discapacidad', 'Grado'];
    const arrayCrear = [];
    csv({delimiter: ';', headers:arrayCols})
    .fromFile(rutaArchivo)
    .on('json',(csvRow, rowIndex) => {
      if(Object.keys(csvRow).length == arrayCols.length) {
        // VALIDA CAMPOS INDIVIDUALES
        // 0 Nombre
        if (csvRow[arrayCols[0]].length === 0) {
          deferred.reject(new Error(`emptyValue@r:${rowIndex + 1},c:${arrayCols[0]}`));
          return deferred.promise;
        }
        // 1 Paralelo
        if (csvRow[arrayCols[1]].length === 0) {
          deferred.reject(new Error(`emptyValue@r:${rowIndex + 1},c:${arrayCols[1]}`));
          return deferred.promise;
        }
        // 2 Gestion
        if (csvRow[arrayCols[2]].length === 0 && csvRow[arrayCols[2]].match(/^\d{4}$/) == null) {
          deferred.reject(new Error(`emptyValue@r:${rowIndex + 1},c:${arrayCols[2]}`));
          return deferred.promise;
        }
        // 3 Maestro
        // if (csvRow[arrayCols[3]].length === 0) {
        //   deferred.reject(new Error(`emptyValue@r:${rowIndex + 1},c:${arrayCols[3]}`));
        //   return deferred.promise;
        // }
        // 4 Descripcion
        // if (csvRow[arrayCols[4]].length != 0) {
        //   deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[4]}`));
        //   return deferred.promise;
        // }
        // 5 Min (mes)
        if (csvRow[arrayCols[5]].match(/^[0-9]+$/) == null) {
          deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[5]}`));
          return deferred.promise;
        }
        // 6 Min (año)
        if (csvRow[arrayCols[6]].match(/^[0-9]+$/) == null) {
          deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[6]}`));
          return deferred.promise;
        }
        // 7 Max (mes)
        if (csvRow[arrayCols[7]].match(/^[0-9]+$/) == null) {
          deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[7]}`));
          return deferred.promise;
        }
        // 8 Max (año)
        if (csvRow[arrayCols[8]].match(/^[0-9]+$/) == null) {
          deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[8]}`));
          return deferred.promise;
        }
        // 9 Discapacidad
        // if (csvRow[arrayCols[9]].length === 0) {
        //   deferred.reject(new Error(`emptyValue@r:${rowIndex + 1},c:${arrayCols[9]}`));
        //   return deferred.promise;
        // }
        // 10 Grado
        // if (csvRow[arrayCols[10]].length != 0) {
        //   deferred.reject(new Error(`wrongFormat@r:${rowIndex + 1},c:${arrayCols[10]}`));
        //   return deferred.promise;
        // }
        // VALIDA CURSO
        let cursoExiste = false;
        let cursoKey;
        if(csvRow[arrayCols[0]] != '' && csvRow[arrayCols[1]] != '' && csvRow[arrayCols[2]] != ''){
          objeto.curso.forEach(function(element) {
            if (element.nombre == csvRow[arrayCols[0]] && element.paralelo == csvRow[arrayCols[1]] && element.gestion == csvRow[arrayCols[2]]) {
              cursoExiste = true;
              cursoKey = element.id
            }
          }, this);
          if (cursoExiste) {
            deferred.reject(new Error(`existentCourse@r:${rowIndex + 1}`));
            return deferred.promise;
          }
        }
        // CREA OBJETO PARA DEVOLVER
        const datosCurso = {
          nombre: csvRow[arrayCols[0]],
          paralelo: csvRow[arrayCols[1]],
          gestion: csvRow[arrayCols[2]],
          maestro: csvRow[arrayCols[3]].toLowerCase(),
          descripcion: csvRow[arrayCols[4]],
          edad_minima: (csvRow[arrayCols[6]] * 12) + parseInt(csvRow[arrayCols[5]]),
          edad_maxima: (csvRow[arrayCols[8]] * 12) + parseInt(csvRow[arrayCols[7]]),
          tipo_discapacidad: csvRow[arrayCols[9]],
          grado: csvRow[arrayCols[10]],
          estado: 'ACTIVO',
          _usuario_creacion: audit_usuario.id_usuario
        };
        arrayCrear.push(datosCurso);
      } else {
        deferred.reject(new Error(`incorrectNumberOfColumns`));
        return deferred.promise;
      }
    })
    .on('error', (error) => {
      deferred.reject(error)
    })
    .on('done',() => {
      const options = {
        validate: false,
        hooks: false,
        individualHooks: false,
        benchmark: true,
      };
      deferred.resolve(arrayCrear);
    })
    return deferred.promise;
  };
  
  const existeCurso = (idCurso) => {
    const deferred = Q.defer();
    dao.obtenerRegistroPorId(models.curso, idCurso, {})
    .then(respuesta => deferred.resolve(respuesta))
    .catch(error => {
      console.log(error);
      deferred.reject(error)
    });
    return deferred.promise;
  }

  const consultaDB = () => {
    let objetoRespuesta = {
      curso: [],
      parametro: [],
      profesor: []
    };
    return dao.listarRegistros(models.curso, {})
    .then(listaCursos => {
      listaCursos.forEach(function(element) {
        const datoCurso = {
          id: element.id_curso,
          nombre: element.nombre,
          paralelo: element.paralelo,
          gestion: element.gestion
        }
        objetoRespuesta.curso.push(datoCurso);
      }, this);
      // Jalar código de maestros existentes
      const params = {
        where: {
          grupo: {
            $or: ['courseName', 'courseParallel', 'courseYear', 'courseDescription', 'courseDissability', 'courseGrade']
          }
        },
        attributes:['grupo', 'nombre', 'estado']
      }
      return dao.listarRegistros(models.parametro, params)
    })
    .then(listaParametros => {
      listaParametros.forEach(function(element) {
        const dato = {
          grupo: element.grupo,
          nombre: element.nombre,
          estado: element.estado
        }
        objetoRespuesta.parametro.push(dato);
      }, this);
      const paramsProfesor = {
        where: {fid_rol: 14},
        include: [{
          attributes:['usuario'],
          model: models.usuario,
          as: 'usuario',
          where: { estado: 'ACTIVO'},
        }],
      }
      return dao.listarRegistros(models.usuario_rol, paramsProfesor)
    })
    .then(objetoProfesores => {
      objetoProfesores.forEach(function(element) {
        objetoRespuesta.profesor.push(element.usuario.usuario);
      }, this);
      return objetoRespuesta;
    })
  }

  const editaCurso = (body) => {
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

  const creaCurso = (body) => {
    const deferred = Q.defer();
    const parametrosCurso = {
      nombre: body.nombre,
      paralelo: body.paralelo,
      gestion: body.gestion,
      maestro: body.maestro,
      descripcion: body.descripcion,
      criterio_edad: body.criterio_edad,
      tipo_discapacidad: body.tipo_discapacidad,
      grado: body.grado,
      _usuario_creacion: body.audit_usuario.id_usuario,
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
      if(respuestaBusqueda)
        throw new Error("courseNameRepeated");
      else if(parametrosCurso.paralelo.length > 1)
        throw new Error("invalidParalelFormat");
      else
        return dao.crearRegistro(models.curso, parametrosCurso)
    })
    .then(respuestaModificacion => deferred.resolve(respuestaModificacion))
    .catch(error => {
      console.log(error);
      deferred.reject(error)
    });
    return deferred.promise;
  }

  const cursoBL = {
    listaCursos,
    editaCurso,
    creaCurso,
    importarCsvDatos
  };

  return cursoBL;
};