/**
* Lógica del Negocio -> ConfiguracionBL
*/
const dao = require('../../dao/dao');
const Q = require('q');

module.exports = app => {
  const models = app.src.db.models;

  const informesPorArea = (body) => {
    const deferred = Q.defer();
    let maxDate = new Date(body.fechaFinal);
    maxDate.setDate(maxDate.getDate() + 1);
    maxDate = maxDate -1;
    const params = {
      where: {
        tipo: body.tipoInforme == 'evaluation' ? 'especialidad': 'simple',
        _fecha_creacion: {
          $between: [new Date(body.fechaInicial), new Date(maxDate)]
        }
      },
      order: '_fecha_creacion'
    }
    if (body.area) {
      const area = [];
      body.area.forEach(element => {
        const aux = {
          area: {
            $like: element.toLowerCase()
          }
        }
        area.push(aux);
      });
      params.where.$or = area;
    }
    if (body.usuario) {
      const usuario = [];
      body.usuario.forEach(element => {
        const aux = {
          _usuario_creacion: {
            $eq: element
          }
        }
        usuario.push(aux);
      });
      params.where.$or = usuario;
    }
    dao.listarRegistros(models.registro, params)
    .then(respuestaRegistros => {
      let dataset = [];
      let labels = [];
      let posicion = 0;
      labels[posicion] = new Date(body.fechaInicial);
      if (body.area) {
        body.area.forEach(element => {
          let datos = {
            label: element,
            data: [0]
          }
          dataset.push(datos)
        });
      }
      if (body.usuario) {
        body.usuario.forEach(element => {
          let datos = {
            label: element,
            data: [0]
          }
          dataset.push(datos)
        });
      }
      respuestaRegistros.forEach(registro => {
        let fecha = new Date(registro._fecha_creacion);
        switch (body.frecuencia) {
          case 'day':
            while (getDayNumber(fecha)[1] > getDayNumber(labels[posicion])[1]) {
              posicion ++;
              labels[posicion] = getNextDay(labels[posicion-1]);
              dataset.forEach(element => {
                element.data[posicion] = 0;
              });
            }
            if (getDayNumber(fecha)[1] == getDayNumber(labels[posicion])[1] && getDayNumber(fecha)[0] == getDayNumber(labels[posicion])[0]) {
              dataset.forEach(element => {
                if (body.area) {
                  if (element.label.toLowerCase() == registro.area) {
                    element.data[posicion] ++;
                  }
                }
                if (body.usuario) {
                  if (element.label == registro._usuario_creacion) {
                    element.data[posicion] ++;
                  }
                }
                if (body.usuario) {
                  if (element.label == registro._usuario_creacion) {
                    element.data[posicion] ++;
                  }
                }
              });
            }
            break;
          case 'week':
            while (getWeekNumber(fecha)[1] > getWeekNumber(labels[posicion])[1]) {
              posicion ++;
              labels[posicion] = getNextWeek(labels[posicion-1]);
              dataset.forEach(element => {
                element.data[posicion] = 0;
              });
            }
            if (getWeekNumber(fecha)[1] == getWeekNumber(labels[posicion])[1] && getWeekNumber(fecha)[0] == getWeekNumber(labels[posicion])[0]) {
              dataset.forEach(element => {
                if (body.area) {
                  if (element.label.toLowerCase() == registro.area) {
                    element.data[posicion] ++;
                  }
                }
                if (body.usuario) {
                  if (element.label == registro._usuario_creacion) {
                    element.data[posicion] ++;
                  }
                }
              });
            }
            break;
          case 'month':
            while (fecha.getMonth() > labels[posicion].getMonth()) {
              posicion ++;
              labels[posicion] = getNextMonth(labels[posicion-1]);
              dataset.forEach(element => {
                element.data[posicion] = 0;
              });
            }
            if (fecha.getMonth() == labels[posicion].getMonth() && fecha.getMonth() == labels[posicion].getMonth()) {
              dataset.forEach(element => {
                if (body.area) {
                  if (element.label.toLowerCase() == registro.area) {
                    element.data[posicion] ++;
                  }
                }
                if (body.usuario) {
                  if (element.label == registro._usuario_creacion) {
                    element.data[posicion] ++;
                  }
                }
              });
            }
            break;
          case 'year':
            while (fecha.getFullYear() > labels[posicion].getFullYear()) {
              posicion ++;
              labels[posicion] = getNextYear(labels[posicion-1]);
              dataset.forEach(element => {
                element.data[posicion] = 0;
              });
            }
            if (fecha.getFullYear() == labels[posicion].getFullYear() && fecha.getFullYear() == labels[posicion].getFullYear()) {
              dataset.forEach(element => {
                if (body.area) {
                  if (element.label.toLowerCase() == registro.area) {
                    element.data[posicion] ++;
                  }
                }
                if (body.usuario) {
                  if (element.label == registro._usuario_creacion) {
                    element.data[posicion] ++;
                  }
                }
              });
            }
            break;
          default:
            break;
        }
      });
      deferred.resolve({labels, dataset});
    })
    .catch(error => {
      console.log(error);
      deferred.reject(error)
    });
    return deferred.promise;
  };

  const informesEstudiantes = (body) => {
    const deferred = Q.defer();
    let busqueda = {};
    if (body.discapacidad == 'withDisability') {
      busqueda.carnet_discapacidad = {
        $notLike: ''
      }
    }
    if (body.discapacidad == 'withoutDisability') {
      busqueda.carnet_discapacidad = {
        $like: ''
      }
    }
    if (body.genero == 'male') {
      busqueda.genero = {
        $like: 'M'
      }
    }
    if (body.genero == 'female') {
      busqueda.genero = {
        $like: 'F'
      }
    }
    const studentModel = {
      model: models.estudiante,
      as: 'estudiante',
      required: true
    };
    if (body.curso != 'none') {
      studentModel.where = {
        fid_curso: body.curso
      }
      studentModel.include = [{
        model: models.curso,
        as: 'curso'
      }]
    }
    params = {
      where: busqueda,
      include: [studentModel],
      order: 'fecha_nacimiento'
    };
    let estudiantes
    let dataset = [];
    let labels = [];
    for (let index = body.minimalAge; index <= body.maximalAge; index++) {
      labels.push(index);
    }
    dao.listarRegistros(models.persona, params)
    .then(respuestaEstudiantes => {
      if (body.curso != 'none') {
        // body.curso.forEach(element => {
          let datos = {
            label: body.curso,
            data: []
          }
          for (let index = body.minimalAge; index <= body.maximalAge; index++) {
            datos.data.push(0);
          }
          dataset.push(datos)
        // });
        respuestaEstudiantes.forEach(student => {
          const studentAge = getAge(student.fecha_nacimiento)
          let posicion = 0;
          labels.forEach(lab => {
            if (lab === studentAge) {
              dataset.forEach(element => {
                if (element.label == student.estudiante.fid_curso) {
                  element.data[posicion] ++;
                }
              });
            }
            posicion++;
          });
        });
        return;
      } else {
        estudiantes = respuestaEstudiantes;
        paramsUniEduEst = {
          where: {
            gestion: body.gestion + ''
          }
        };
        return dao.listarRegistros(models.unidad_educativa_estudiante, paramsUniEduEst);
      }
    })
    .then(respuestaUnidadEducativaEstudiante => {
      if (body.curso == 'none') {
        // body.gestion.forEach(element => {
          let datos = {
            label: body.gestion,
            data: []
          }
          for (let index = body.minimalAge; index <= body.maximalAge; index++) {
            datos.data.push(0);
          }
          dataset.push(datos)
        // });
        estudiantes.forEach(student => {
          respuestaUnidadEducativaEstudiante.forEach(unidEdu => {
            if (student.fid_estudiante == unidEdu.fid_estudiante) {
              const studentAge = getAge(student.fecha_nacimiento)
              let posicion = 0;
              labels.forEach(lab => {
                if (lab === studentAge) {
                  dataset.forEach(element => {
                    if (element.label == unidEdu.gestion) {
                      element.data[posicion] ++;
                    }
                  });
                }
                posicion++;
              });
            }
          })
        });
      }
      deferred.resolve({labels, dataset});
    })
    .catch(error => {
      console.log(error);
      deferred.reject(error)
    });
    return deferred.promise;
  };

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

  const getNextDay = (fecha) => {
    if (!fecha) {
      fecha = new Date();
    } else {
      fecha = new Date(fecha);
    }
    let nuevaFecha = new Date(Date.UTC(fecha.getFullYear(), fecha.getUTCMonth(), fecha.getUTCDate() +1));
    return nuevaFecha;
  }

  const getNextWeek = (fecha) => {
    if (!fecha) {
      fecha = new Date();
    } else {
      fecha = new Date(fecha);
    }
    let nuevaFecha = new Date(Date.UTC(fecha.getFullYear(), fecha.getUTCMonth(), fecha.getUTCDate() +7 ));
    return nuevaFecha;
  }

  const getNextMonth = (fecha) => {
    if (!fecha) {
      fecha = new Date();
    } else {
      fecha = new Date(fecha);
    }
    let nuevaFecha = new Date(Date.UTC(fecha.getFullYear(), fecha.getUTCMonth() + 1, fecha.getUTCDate()));
    return nuevaFecha;
  }

  const getNextYear = (fecha) => {
    if (!fecha) {
      fecha = new Date();
    } else {
      fecha = new Date(fecha);
    }
    let nuevaFecha = new Date(Date.UTC(fecha.getFullYear() + 1, fecha.getUTCMonth(), fecha.getUTCDate()));
    return nuevaFecha;
  }

  const getWeekNumber = (d) => {
    d = new Date(d);
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    return [d.getUTCFullYear(), weekNo];
  }

  const getDayNumber = (d) => {
    d = new Date(Date.UTC(d.getFullYear(), d.getUTCMonth(), d.getUTCDate() ));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    var dayNo = Math.ceil( ( (d - yearStart) / 86400000) + 1);
    return [d.getUTCFullYear(), dayNo];
  }

  const estadisticasBL = {
    informesPorArea,
    informesEstudiantes
  };

  return estadisticasBL;
};