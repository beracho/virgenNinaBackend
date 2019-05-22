/**
* Lógica del Negocio -> ConfiguracionBL
*/
const dao = require('../../dao/dao');
const Q = require('q');

module.exports = app => {
  const models = app.src.db.models;

  const informesPorArea = (body) => {
    const deferred = Q.defer();
    const area = [];
    body.area.forEach(element => {
      const aux = {
        area: {
          $like: element.toLowerCase()
        }
      }
      area.push(aux);
    });
    let maxDate = new Date(body.fechaFinal);
    maxDate.setDate(maxDate.getDate() + 1);
    maxDate = maxDate -1;
    const params = {
      where: {
        tipo: body.tipoInforme == 'evaluation' ? 'especialidad': 'simple',
        $or: area,
        _fecha_creacion: {
          $between: [new Date(body.fechaInicial), new Date(maxDate)]
        }
      },
      order: '_fecha_creacion'
    }
    dao.listarRegistros(models.registro, params)
    .then(respuestaRegistros => {
      let dataset = [];
      let labels = [];
      let posicion = 0;
      labels[posicion] = new Date(body.fechaInicial);
      body.area.forEach(element => {
        let datos = {
          label: element,
          data: [0]
        }
        dataset.push(datos)
      });
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
                if (element.label.toLowerCase() == registro.area) {
                  element.data[posicion] ++;
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
                if (element.label.toLowerCase() == registro.area) {
                  element.data[posicion] ++;
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
                if (element.label.toLowerCase() == registro.area) {
                  element.data[posicion] ++;
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
                if (element.label.toLowerCase() == registro.area) {
                  element.data[posicion] ++;
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

  const getNextDay = (fecha) => {
    if (!fecha) {
      fecha = new Date();
    } else {
      fecha = new Date(fecha);
    }
    let nuevaFecha = new Date(Date.UTC(fecha.getFullYear(), fecha.getMonth(), fecha.getUTCDate() +1 ));
    return nuevaFecha;
  }

  const getNextWeek = (fecha) => {
    if (!fecha) {
      fecha = new Date();
    } else {
      fecha = new Date(fecha);
    }
    let nuevaFecha = new Date(Date.UTC(fecha.getFullYear(), fecha.getMonth(), fecha.getUTCDate() +7 ));
    return nuevaFecha;
  }

  const getNextMonth = (fecha) => {
    if (!fecha) {
      fecha = new Date();
    } else {
      fecha = new Date(fecha);
    }
    let nuevaFecha = new Date(Date.UTC(fecha.getFullYear(), fecha.getMonth() + 1, fecha.getUTCDate()));
    return nuevaFecha;
  }

  const getNextYear = (fecha) => {
    if (!fecha) {
      fecha = new Date();
    } else {
      fecha = new Date(fecha);
    }
    let nuevaFecha = new Date(Date.UTC(fecha.getFullYear() + 1, fecha.getMonth(), fecha.getUTCDate()));
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
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getUTCDate() ));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    var dayNo = Math.ceil( ( (d - yearStart) / 86400000) + 1);
    return [d.getUTCFullYear(), dayNo];
  }

  const estadisticasBL = {
    informesPorArea
  };

  return estadisticasBL;
};