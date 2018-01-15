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

describe('====================== APIREST UNIDAD EDUCATIVA ======================', () => { // nos autenticamos inicialmente
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

  // Ruta: /unidadesEducativas
  it('>>> Deberia devolver datos de una unidad educativa a partir de su codigo sie ', (done) => {
    request(server)
      .get(`/api/v1/unidadEducativa/111`)
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
        res.body.datos.sie.should.be.equal('111');
        done();
      });
  });

  // Ruta: /unidadesEducativas
  it('>>> Deberia listar las unidades educativas existentes ', (done) => {
    request(server)
      .get(`/api/v1/unidadesEducativas`)
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
        done();
      });
  });
  // it('>>> Debería autenticarse con un usuario común (rol Inscripciones) a través de un usuario y contraseña ', (done) => {
  //   const objSend = {
  //     usuario: "inscripciones",
  //     contrasena: "Developer",
  //     pathLogin: "login",
  //   };
  //   request(server)
  //     .post(`/autenticar`)
  //     .send(objSend)
  //     .set('Authorization', `Bearer ${token}`)
  //     .expect(200)
  //     .end((err, res) => {
  //       if (err) {
  //         return done(err);
  //       }
  //       res.body.should.be.an.Object();
  //       should(res.body.payload).be.ok;
  //       // res.body.payload.should.be.an.Object();
  //       // should(res.body.payload.usuario).be.ok;
  //       // res.body.payload.usuario.should.be.equal(objSend.usuario);
  //       // should(res.body.token).be.ok;
  //       // res.body.user.id_rol.should.be.equal(ROL_TECNICO);
  //       done();
  //     });
  // });
});
