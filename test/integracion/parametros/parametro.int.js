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

  // Ruta: /api/v1/parametrosRude
  it('>>> Devuelve todos los parámetros para regro RUDE', (done) => {
    request(server)
      .get(`/api/v1/parametrosRude`)
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
});
