/**
* Tests de integración para Parámetros
*/
'use strict';
const request = require('supertest');
const should = require('should');
const sequelize = require('sequelize');

let token = '';
let usuarioCreado = {};
const user = { usuario: "inscripciones", contrasena: "Developer"};

describe('====================== APIREST REGISTRO INSCRIPCION ======================', () => { // nos autenticamos inicialmente
  before((done) => {
    request(server)
      .post('/autenticar')
      .send(user)
      .end((err, res) => {
        const result = res.body;
        token = result.token;
        done();
      });
  });
  // Ruta: /creaRegistroRude
  // it('>>> Deberia crear un registro RUDE vacío ', (done) => {
  //   const objSend = {
  //     usuario: "admin",
  //     contrasena: "Developer",
  //     pathLogin: "login",
  //   };
  //   request(server)
  //     .post(`/api/v1/creaRegistroRude`)
  //     .send(objSend)
  //     .set('Authorization', `Bearer ${token}`)
  //     .expect(200)
  //     .end((err, res) => {
  //       if (err) {
  //         return done(err);
  //       }
  //       should(res.body.finalizado).be.ok;
  //       should(res.body.mensaje).be.ok;
  //       should(res.body.datos).be.ok;
  //       res.body.finalizado.should.be.equal(true);
  //       done();
  //     });
  // });
  
  // Ruta: /api/v1/registroRude
  it('>>> Deberia actualizar el registro RUDE de un estudiante inscrito', (done) => {
    const datos = {
      "unidadEducativa": {
        "dependencia": "public",
        "nombre": 1,
        "distrito": "el alto",
        "sie": "111"
      },
      "unidadEducativaAnterior": {
        "id": 1,
        "codSie": "",
        "nombreUnidad": ""
      },
      "persona": {
        "nombres": "Juana",
        "primer_apellido": "Mamani",
        "segundo_apellido": "Quispe",
        "tipo_documento": "CARNET_IDENTIDAD",
        "documento_identidad": "0000015",
        "lugar_documento_identidad": "LP",
        "carnet_discapacidad": "",
        "pioc": 4,
        "codrude": "11111015",
        "casada_apellido": null,
        "genero": "F",
        "discapacidad": ""
      },
      "nacimiento": {
        "fecha_nacimiento": "2012-11-10",
        "pais": 1,
        "departamento": 2,
        "provincia": 39,
        "municipio": 127,
        "nOficialia": "ofi_15",
        "nLibro": "15",
        "nPartida": "15",
        "nFolio": "15"
      },
      "direccion": {
        "pais": 1,
        "departamento": 2,
        "provincia": 86,
        "municipio": 126,
        "zona": "los sauces",
        "calle": "calle 8",
        "numero": "888",
        "telefono": "84581684",
        "celular": null
      },
      "registroInscripcion": {
        "idioma": "Aymara",
        "idiomas": "Aymara, Quechua",
        "internetAcces": "",
        "internetFrecuency": "",
        "transportWay": "",
        "transportTime": ""
      },
      "salud": {
        "centro_salud": true,
        "frecuencia_medica": 6,
        "tipo_discapacidad": 71,
        "subtipo_discapacidad": 76,
        "discapacidad_origen": "INHERITED"
      },
      "servicios_basicos": {
        "origen_agua": "netConexion",
        "acceso_electricidad": true,
        "destino_agua": "blindWell"
      },
      "empleo": {
        "actividad_laboral": "ninguna",
        "dias_trabajo": 0,
        "salario": false
      },
      "comunicacion_transporte": {
        "acceso_internet": "escuela",
        "frecuencia_internet": "diaria",
        "medio_transporte": "helicoptero",
        "duracion_transporte": "menos de media hora"
      },
      "relacionEstudiante": {},
      "apoderados": [
        {
          "id_parentezco": 2,
          "relacion": "padre",
          "descripcion": null,
          "_usuario_creacion": "1",
          "_usuario_modificacion": "1",
          "_fecha_creacion": "2018-01-30T18:16:08.384Z",
          "_fecha_modificacion": "2018-01-30T18:16:08.384Z",
          "fid_persona_es": 16,
          "fid_persona_de": 15,
          "persona_es": {
            "id_persona": 16,
            "tipo_documento": "CARNET_IDENTIDAD",
            "documento_identidad": "0000016",
            "lugar_documento_identidad": "LP",
            "complemento_documento": "00",
            "tipo_documento_discapacidad": "CODEPEDIS",
            "carnet_discapacidad": null,
            "fecha_nacimiento": "1957-11-10T00:00:00.000Z",
            "nombres": "Mario",
            "primer_apellido": "Apaza",
            "segundo_apellido": "Choquehuanca",
            "casada_apellido": null,
            "genero": "M",
            "nombre_completo": "Mario Apaza Choquehuanca",
            "idioma_materno": "Aymara",
            "idiomas": "Aymara, Castellano",
            "ocupacion_actual": null,
            "grado_instruccion": null,
            "discapacidad": false,
            "_usuario_creacion": 1,
            "_usuario_modificacion": null,
            "_fecha_creacion": "2018-01-30T18:16:08.093Z",
            "_fecha_modificacion": "2018-01-30T18:16:08.093Z",
            "deleted_at": null,
            "fid_lugar_nacimiento": null,
            "fid_direccion": null,
            "fid_estudiante": null
          }
        }
      ],
    }
    request(server)
      .put(`/api/v1/registroRude`)
      .send(datos)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        should(res.body.finalizado).be.ok;
        should(res.body.mensaje).be.ok;
        should(res.body.datos).be.not.ok;
        res.body.finalizado.should.be.equal(true);
        res.body.mensaje.should.be.equal('Almacenamiento de datos exitoso.');
        done();
      });
  });

  it('>>> Deberia dar error de rude en eso', (done) => {
    const datos = {
      "unidadEducativa": {
        "dependencia": "public",
        "nombre": 1,
        "distrito": "el alto",
        "sie": "111"
      },
      "unidadEducativaAnterior": {
        "codSie": "",
        "nombreUnidad": ""
      },
      "persona": {
        "nombres": "Juana",
        "primer_apellido": "Mamani",
        "segundo_apellido": "Quispe",
        "tipo_documento": "CARNET_IDENTIDAD",
        "documento_identidad": "0000020",
        "lugar_documento_identidad": "LP",
        "carnet_discapacidad": "",
        "pioc": 4,
        "codrude": "11111015",
        "casada_apellido": null,
        "genero": "F",
        "discapacidad": ""
      },
      "nacimiento": {
        "fecha_nacimiento": "2012-11-10",
        "pais": 1,
        "departamento": 2,
        "provincia": 39,
        "municipio": 127,
        "nOficialia": "ofi_15",
        "nLibro": "15",
        "nPartida": "15",
        "nFolio": "15"
      },
      "direccion": {
        "pais": 1,
        "departamento": 2,
        "provincia": 86,
        "municipio": 126,
        "zona": "los sauces",
        "calle": "calle 8",
        "numero": "888",
        "telefono": "84581684",
        "celular": null
      },
      "registroInscripcion": {
        "idioma": "Aymara",
        "idiomas": "Aymara, Quechua",
        "internetAcces": "",
        "internetFrecuency": "",
        "transportWay": "",
        "transportTime": ""
      },
      "salud": {
        "centro_salud": true,
        "frecuencia_medica": 6,
        "discapacidad_comunicacion": false,
        "discapacidad_motriz": true,
        "discapacidad_mental": false,
        "discapacidad_otra": "",
        "discapacidad_origen": "INHERITED"
      },
      "servicios_basicos": {
        "origen_agua": "netConexion",
        "acceso_electricidad": true,
        "destino_agua": "blindWell"
      },
      "empleo": {
        "actividad_laboral": "ninguna",
        "dias_trabajo": 0,
        "salario": false
      },
      "comunicacion_transporte": {
        "acceso_internet": "escuela",
        "frecuencia_internet": "diaria",
        "medio_transporte": "helicoptero",
        "duracion_transporte": "menos de media hora"
      },
      "relacionEstudiante": {},
      "apoderados": [
        {
          "id_parentezco": 2,
          "relacion": "padre",
          "descripcion": null,
          "_usuario_creacion": "1",
          "_usuario_modificacion": "1",
          "_fecha_creacion": "2018-01-30T18:16:08.384Z",
          "_fecha_modificacion": "2018-01-30T18:16:08.384Z",
          "fid_persona_es": 16,
          "fid_persona_de": 15,
          "persona_es": {
            "id_persona": 16,
            "tipo_documento": "CARNET_IDENTIDAD",
            "documento_identidad": "0000016",
            "lugar_documento_identidad": "LP",
            "complemento_documento": "00",
            "tipo_documento_discapacidad": "CODEPEDIS",
            "carnet_discapacidad": null,
            "fecha_nacimiento": "1957-11-10T00:00:00.000Z",
            "nombres": "Mario",
            "primer_apellido": "Apaza",
            "segundo_apellido": "Choquehuanca",
            "casada_apellido": null,
            "genero": "M",
            "nombre_completo": "Mario Apaza Choquehuanca",
            "idioma_materno": "Aymara",
            "idiomas": "Aymara, Castellano",
            "ocupacion_actual": null,
            "grado_instruccion": null,
            "discapacidad": false,
            "_usuario_creacion": 1,
            "_usuario_modificacion": null,
            "_fecha_creacion": "2018-01-30T18:16:08.093Z",
            "_fecha_modificacion": "2018-01-30T18:16:08.093Z",
            "deleted_at": null,
            "fid_lugar_nacimiento": null,
            "fid_direccion": null,
            "fid_estudiante": null
          }
        }
      ],
    }
    request(server)
      .put(`/api/v1/registroRude`)
      .send(datos)
      .set('Authorization', `Bearer ${token}`)
      .expect(412)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        should(res.body.finalizado).be.ok;
        should(res.body.mensaje).be.ok;
        should(res.body.datos).be.not.ok;
        res.body.finalizado.should.be.equal(false);
        res.body.mensaje.should.be.equal('rudeInUse');
        done();
      });
  });


  it('>>> Deberia crear un registro RUDE de un estudiante', (done) => {
    const datos = {
      "unidadEducativa": {
        "dependencia": "public",
        "nombre": 1,
        "distrito": "el alto",
        "sie": "111"
      },
      "unidadEducativaAnterior": {
        "id": 1,
        "codSie": "",
        "nombreUnidad": ""
      },
      "persona": {
        "nombres": "Juana",
        "primer_apellido": "Mamani",
        "segundo_apellido": "Quispe",
        "tipo_documento": "CARNET_IDENTIDAD",
        "documento_identidad": "0000020",
        "lugar_documento_identidad": "LP",
        "carnet_discapacidad": "",
        "pioc": 4,
        "codrude": "11111020",
        "casada_apellido": null,
        "genero": "F",
        "discapacidad": ""
      },
      "nacimiento": {
        "fecha_nacimiento": "2012-11-10",
        "pais": 1,
        "departamento": 2,
        "provincia": 39,
        "municipio": 127,
        "nOficialia": "ofi_15",
        "nLibro": "15",
        "nPartida": "15",
        "nFolio": "15"
      },
      "direccion": {
        "pais": 1,
        "departamento": 2,
        "provincia": 86,
        "municipio": 126,
        "zona": "los sauces",
        "calle": "calle 8",
        "numero": "888",
        "telefono": "84581684",
        "celular": null
      },
      "registroInscripcion": {
        "idioma": "Aymara",
        "idiomas": "Aymara, Quechua",
        "internetAcces": "",
        "internetFrecuency": "",
        "transportWay": "",
        "transportTime": ""
      },
      "salud": {
        "centro_salud": true,
        "frecuencia_medica": 6,
        "discapacidad_comunicacion": false,
        "discapacidad_motriz": true,
        "discapacidad_mental": false,
        "discapacidad_otra": "",
        "discapacidad_origen": "INHERITED"
      },
      "servicios_basicos": {
        "origen_agua": "netConexion",
        "acceso_electricidad": true,
        "destino_agua": "blindWell"
      },
      "empleo": {
        "actividad_laboral": "ninguna",
        "dias_trabajo": 0,
        "salario": false
      },
      "comunicacion_transporte": {
        "acceso_internet": "escuela",
        "frecuencia_internet": "diaria",
        "medio_transporte": "helicoptero",
        "duracion_transporte": "menos de media hora"
      },
      "relacionEstudiante": {},
      "apoderados": [
        {
          "id_parentezco": 2,
          "relacion": "padre",
          "descripcion": null,
          "_usuario_creacion": "1",
          "_usuario_modificacion": "1",
          "_fecha_creacion": "2018-01-30T18:16:08.384Z",
          "_fecha_modificacion": "2018-01-30T18:16:08.384Z",
          "fid_persona_es": 16,
          "fid_persona_de": 15,
          "persona_es": {
            "id_persona": 16,
            "tipo_documento": "CARNET_IDENTIDAD",
            "documento_identidad": "0000016",
            "lugar_documento_identidad": "LP",
            "complemento_documento": "00",
            "tipo_documento_discapacidad": "CODEPEDIS",
            "carnet_discapacidad": null,
            "fecha_nacimiento": "1957-11-10T00:00:00.000Z",
            "nombres": "Mario",
            "primer_apellido": "Apaza",
            "segundo_apellido": "Choquehuanca",
            "casada_apellido": null,
            "genero": "M",
            "nombre_completo": "Mario Apaza Choquehuanca",
            "idioma_materno": "Aymara",
            "idiomas": "Aymara, Castellano",
            "ocupacion_actual": null,
            "grado_instruccion": null,
            "discapacidad": false,
            "_usuario_creacion": 1,
            "_usuario_modificacion": null,
            "_fecha_creacion": "2018-01-30T18:16:08.093Z",
            "_fecha_modificacion": "2018-01-30T18:16:08.093Z",
            "deleted_at": null,
            "fid_lugar_nacimiento": null,
            "fid_direccion": null,
            "fid_estudiante": null
          }
        }
      ],
    }
    request(server)
      .put(`/api/v1/registroRude`)
      .send(datos)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        should(res.body.finalizado).be.ok;
        should(res.body.mensaje).be.ok;
        should(res.body.datos).be.not.ok;
        res.body.finalizado.should.be.equal(true);
        res.body.mensaje.should.be.equal('Almacenamiento de datos exitoso.');
        done();
      });
  });

  it('>>> Deberia devolver error por no tener el nombre de la persona', (done) => {
    const datos = {
      "persona": {},
      "nacimiento": {}
    }
    request(server)
      .put(`/api/v1/registroRude`)
      .send(datos)
      .set('Authorization', `Bearer ${token}`)
      .expect(412)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        should(res.body.finalizado).be.ok;
        should(res.body.mensaje).be.ok;
        should(res.body.datos).be.not.ok;
        res.body.finalizado.should.be.equal(false);
        res.body.mensaje.should.be.equal('noNamesValue');
        done();
      });
  });
});
