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
  
  // Ruta: /cursos
  it('>>> Deberia editar los datos de un curso', (done) => {
    const datos = {
      id_curso: 2,
      nombre: 'AT',
      paralelo: 'C',
      gestion: '2018',
      maestro: 'Lolita Perez del Barrio',
      descripcion: 'Curso nuevo especializado',
      criterio_edad: '5 - 8',
      tipo_discapacidad: 'MULTIPLE',
      grado: 'INDEPENDENCIA PERSONAL'
    };
    request(server)
      .put(`/api/v1/cursos`)
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

  // Ruta: /Cursos
  it('>>> Deberia fallar al editar un curso por nombre repetido', (done) => {
    const datos = {
      id_curso: 2,
      nombre: 'AT',
      paralelo: 'A',
      gestion: '2018',
      maestro: 'Lolita Perez del Barrio',
      descripcion: 'Curso nuevo especializado',
      criterio_edad: '5 - 8',
      tipo_discapacidad: 'MULTIPLE',
      grado: 'INDEPENDENCIA PERSONAL'
    };
    request(server)
      .put(`/api/v1/cursos`)
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
        res.body.mensaje.should.be.equal('courseNameRepeated');
        done();
      });
  });
  
  // Ruta: /Cursos
  it('>>> Deberia fallar al editar un curso por paralelo con más de una letra', (done) => {
    const datos = {
      id_curso: 2,
      nombre: 'AT',
      paralelo: 'CA',
      gestion: '2018',
      maestro: 'Lolita Perez del Barrio',
      descripcion: 'Curso nuevo especializado',
      criterio_edad: '5 - 8',
      tipo_discapacidad: 'MULTIPLE',
      grado: 'INDEPENDENCIA PERSONAL'
    };
    request(server)
      .put(`/api/v1/cursos`)
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
        res.body.mensaje.should.be.equal('invalidParalelFormat');
        done();
      });
  });

  it('>>> Deberia fallar al editar un curso por no enviar id del curso', (done) => {
    const datos = {
      nombre: 'INI 2',
      paralelo: 'D',
      gestion: '2018',
      maestro: 'Lolita Perez del Barrio',
      descripcion: 'Curso nuevo especializado',
      criterio_edad: '5 - 8',
      tipo_discapacidad: 'MULTIPLE',
      grado: 'INDEPENDENCIA PERSONAL'
    };
    request(server)
      .put(`/api/v1/cursos`)
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
        res.body.mensaje.should.be.equal('noIdCourseSend');
        done();
      });
  });
  
  // Ruta: /cursos
  it('>>> Deberia crear un curso nuevo', (done) => {
    const datos = {
      id_curso: 2,
      nombre: 'AT',
      paralelo: 'B',
      gestion: '2018',
      maestro: 'Lolita Perez del Barrio',
      descripcion: 'Curso nuevo especializado',
      criterio_edad: '5 - 8',
      tipo_discapacidad: 'MULTIPLE',
      grado: 'INDEPENDENCIA PERSONAL'
    };
    request(server)
      .post(`/api/v1/cursos`)
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
  
  // Ruta: /Cursos
  it('>>> Deberia fallar al crear un curso por nombre repetido', (done) => {
    const datos = {
      id_curso: 2,
      nombre: 'AT',
      paralelo: 'A',
      gestion: '2018',
      maestro: 'Lolita Perez del Barrio',
      descripcion: 'Curso nuevo especializado',
      criterio_edad: '5 - 8',
      tipo_discapacidad: 'MULTIPLE',
      grado: 'INDEPENDENCIA PERSONAL'
    };
    request(server)
      .post(`/api/v1/cursos`)
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
        res.body.mensaje.should.be.equal('courseNameRepeated');
        done();
      });
  });
  
  // Ruta: /Cursos
  it('>>> Deberia fallar al crear un curso por paralelo con más de una letra', (done) => {
    const datos = {
      id_curso: 2,
      nombre: 'AT',
      paralelo: 'CA',
      gestion: '2018',
      maestro: 'Lolita Perez del Barrio',
      descripcion: 'Curso nuevo especializado',
      criterio_edad: '5 - 8',
      tipo_discapacidad: 'MULTIPLE',
      grado: 'INDEPENDENCIA PERSONAL'
    };
    request(server)
      .post(`/api/v1/cursos`)
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
        res.body.mensaje.should.be.equal('invalidParalelFormat');
        done();
      });
  });
});
