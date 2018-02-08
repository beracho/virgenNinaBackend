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
        done();
      });
  });
  
    // Ruta: /unidadEducativa
    it('>>> Deberia crear una unidad educativa nueva', (done) => {
      const datos = {
        sie: '541',
        nombre: 'Colegio Boliviano Escoces',
        dependencia: 'convein',
        distrito: 'oruro'
      };
      request(server)
        .post(`/api/v1/unidadEducativa`)
        .send(datos)
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

    it('>>> Deberia dar error por dependencia incorrecta', (done) => {
      const datos = {
        sie: '251',
        nombre: 'Colegio Boliviano Escoces',
        dependencia: 'convenio',
        distrito: 'oruro'
      };
      request(server)
        .post(`/api/v1/unidadEducativa`)
        .send(datos)
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
          res.body.mensaje.should.be.equal('notAllowedDependency');
          done();
        });
    });
    
    // it('>>> Deberia dar error por sie repetido', (done) => {
    //   const datos = {
    //     sie: '541',
    //     nombre: 'Colegio Boliviano Escoces',
    //     dependencia: 'public',
    //     distrito: 'oruro'
    //   };
    //   request(server)
    //     .post(`/api/v1/unidadEducativa`)
    //     .send(datos)
    //     .set('Authorization', `Bearer ${token}`)
    //     .expect(412)
    //     .end((err, res) => {
    //       if (err) {
    //         return done(err);
    //       }
    //       should(res.body.finalizado).be.ok;
    //       should(res.body.mensaje).be.ok;
    //       should(res.body.datos).be.ok;
    //       res.body.finalizado.should.be.equal(false);
    //       res.body.mensaje.should.be.equal('sieInUse');
    //       done();
    //     });
    // });
});
