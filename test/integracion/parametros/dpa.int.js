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

describe('====================== APIREST DPA ======================', () => { // nos autenticamos inicialmente
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

  // Ruta: /api/v1/codigoDeptos
  it('>>> Deberia devolver id y abreviación de departamentos', (done) => {
    request(server)
      .get(`/api/v1/codigoDeptos`)
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
        res.body.datos.length.should.be.equal(9);
        done();
      });
  });

  // Ruta: /api/v1/dpaNivel
  it('>>> Deberia devolver los dpa de un nivel dado', (done) => {
    request(server)
      .get(`/api/v1/dpaNivel?nivel=2`)
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
        res.body.datos.length.should.be.equal(9);
        done();
      });
  });

  it('>>> Deberia devolver dar error por nivel inexistente', (done) => {
    request(server)
      .get(`/api/v1/dpaNivel?nivel=5`)
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
        res.body.mensaje.should.be.equal('incorrectLevel');
        done();
      });
  });

  // Ruta: /api/v1/dpaHijos
  it('>>> Deberia devolver los hijos de un dpa dado', (done) => {
    request(server)
      .get(`/api/v1/dpaHijos?id_dpa=2`)
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

  it('>>> Deberia devolver error por no tener hijos', (done) => {
    request(server)
      .get(`/api/v1/dpaHijos?id_dpa=126`)
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
        res.body.mensaje.should.be.equal('dpaHasNoChild');
        done();
      });
  });

  // Ruta: /api/v1/dpaPadre
  it('>>> Deberia devolver el padre del dpa dado', (done) => {
    request(server)
      .get(`/api/v1/dpaPadre?id_dpa=126`)
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

  it('>>> Deberia devolver el padre del dpa dado', (done) => {
    request(server)
      .get(`/api/v1/dpaPadre?id_dpa=1`)
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
        res.body.mensaje.should.be.equal('dpaHasNoParent');
        done();
      });
  });
});
