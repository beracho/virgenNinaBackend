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

describe('====================== APIREST CURSOS ======================', () => { // nos autenticamos inicialmente
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

  // Ruta: /cursos
  it('>>> Deberia devolver datos de los cursos', (done) => {
    request(server)
      .get(`/api/v1/cursos`)
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
        res.body.datos.length.should.be.equal(22);
        done();
      });
  });

  // Ruta: /Cursos
  it('>>> Deberia listar 10 cursos ordenados por criterio de edad', (done) => {
    request(server)
      .get(`/api/v1/cursos?limit=10&page=1&order=criterio_edad`)
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
        res.body.datos.rows.length.should.be.equal(10);
        res.body.datos.rows[0].nombre.should.be.equal('PRI SOC');
        done();
      });
  });
  
    // Ruta: /unidadEducativa
    // it('>>> Deberia crear una unidad educativa nueva', (done) => {
    //   const datos = {
    //     sie: '541',
    //     nombre: 'Colegio Boliviano Escoces',
    //     dependencia: 'convein',
    //     distrito: 'oruro'
    //   };
    //   request(server)
    //     .post(`/api/v1/unidadEducativa`)
    //     .send(datos)
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

    // it('>>> Deberia dar error por dependencia incorrecta', (done) => {
    //   const datos = {
    //     sie: '251',
    //     nombre: 'Colegio Boliviano Escoces',
    //     dependencia: 'convenio',
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
    //       res.body.mensaje.should.be.equal('notAllowedDependency');
    //       done();
    //     });
    // });
});
