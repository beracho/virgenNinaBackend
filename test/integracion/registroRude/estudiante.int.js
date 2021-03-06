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

describe('====================== APIREST ESTUDIANTE ======================', () => { // nos autenticamos inicialmente
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

  // Ruta: /api/v1/estudiantes
  it('>>> Deberia devolver datos de los estudiantes', (done) => {
    request(server)
      .get(`/api/v1/estudiantes`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        should(res.body.finalizado).be.ok;
        should(res.body.mensaje).be.ok;
        should(res.body.datos).be.ok;
        res.body.finalizado.should.be.equal(true);
        res.body.datos.should.not.be.equal(null);
        res.body.datos.should.not.be.equal(undefined);
        res.body.datos.count.should.be.equal(2);
        done();
      });
  });

  it('>>> Deberia devolver el estudiante que cumpla con los parámetros.', (done) => {
    request(server)
      .get(`/api/v1/estudiantes?tipo_documento=CARNET_IDENTIDAD&documento_identidad=0000015&lugar_documento_identidad=LP`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        should(res.body.finalizado).be.ok;
        should(res.body.mensaje).be.ok;
        should(res.body.datos).be.ok;
        res.body.finalizado.should.be.equal(true);
        res.body.datos.should.not.be.equal(null);
        res.body.datos.should.not.be.equal(undefined);
        if (res.body.datos) {
          res.body.datos.length.should.be.equal(1);
        }
        done();
      });
  });

  it('>>> Deberia devolver error de estudiante no existente', (done) => {
    request(server)
      .get(`/api/v1/estudiantes?tipo_documento=CARNET_IDENTIDAD&documento_identidad=0000004&lugar_documento_identidad=LP`)
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
        res.body.mensaje.should.be.equal('noData');
        done();
      });
  });
  
  it('>>> Deberia listar estudiantes pertenecientes al curso enviado', (done) => {
    request(server)
      .get(`/api/v1/estudiantesCurso?idCurso=1`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        should(res.body.finalizado).be.ok;
        should(res.body.mensaje).be.ok;
        should(res.body.datos).be.ok;
        res.body.finalizado.should.be.equal(true);
        res.body.datos.length.should.be.equal(0);
        done();
      });
  });

  it('>>> Deberia dar error por curso no existente', (done) => {
    request(server)
      .get(`/api/v1/estudiantesCurso?idCurso=50`)
      .set('Authorization', `Bearer ${token}`)
      .expect(412)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        should(res.body.finalizado).be.ok;
        should(res.body.mensaje).be.ok;
        should(res.body.datos).be.ok;
        res.body.finalizado.should.be.equal(false);
        res.body.mensaje.should.be.equal('noCourse');
        done();
      });
  });
  
  it('>>> Deberia editar el curso del estudiante a partir de su id.', (done) => {
    request(server)
      .put(`/api/v1/estudiantes`)
      .send({id_estudiante: 2, fid_curso: 2})
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        should(res.body.finalizado).be.ok;
        should(res.body.mensaje).be.ok;
        should(res.body.datos).be.ok;
        res.body.finalizado.should.be.equal(true);
        done();
      });
  });
  
  it('>>> Deberia editar el curso del estudiante a partir de su código.', (done) => {
    request(server)
      .put(`/api/v1/estudiantes`)
      .send({codigo: 'ej-001', fid_curso: 2})
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        should(res.body.finalizado).be.ok;
        should(res.body.mensaje).be.ok;
        should(res.body.datos).be.ok;
        res.body.finalizado.should.be.equal(true);
        done();
      });
  });

  it('>>> Deberia devolver error de código de estudiante no existente', (done) => {
    request(server)
      .put(`/api/v1/estudiantes`)
      .send({codigo: 'ej-003', fid_curso: 2})
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
        res.body.mensaje.should.be.equal('invalidData');
        done();
      });
  });
  
  it('>>> Deberia devolver error de id de estudiante no existente', (done) => {
    request(server)
      .put(`/api/v1/estudiantes`)
      .send({id_estudiante: 5, fid_curso: 2})
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
        res.body.mensaje.should.be.equal('invalidData');
        done();
      });
  });
});
