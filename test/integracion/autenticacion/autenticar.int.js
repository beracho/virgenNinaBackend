/**
* Tests de integración para Parámetros
*/
'use strict';
const request = require('supertest');
const should = require('should');
const sequelize = require('sequelize');

require('../../registrarBabel');
let token = '';
let usuarioCreado = {};
const user = { usuario: "admin", contrasena: "Developer"};

describe('====================== APIREST AUTENTICAR ======================', () => { // nos autenticamos inicialmente
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
  // Ruta: /autenticar
  let tokenNuevo = null;
  it('>>> Debería autenticarse con un usuario común (rol admin) a través de un usuario y contraseña ', (done) => {
    const objSend = {
      usuario: "admin",
      contrasena: "Developer",
      pathLogin: "login",
    };
    request(server)
      .post(`/autenticar`)
      .send(objSend)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.should.be.an.Object();
        should(res.body.payload).be.ok;
        // res.body.payload.should.be.an.Object();
        // should(res.body.payload.usuario).be.ok;
        // res.body.payload.usuario.should.be.equal(objSend.usuario);
        // should(res.body.token).be.ok;
        // res.body.user.id_rol.should.be.equal(ROL_ADMINISTRADOR);
        done();
      });
  });
  it('>>> Debería autenticarse con un usuario común (rol Inscripciones) a través de un usuario y contraseña ', (done) => {
    const objSend = {
      usuario: "inscripciones",
      contrasena: "Developer",
      pathLogin: "login",
    };
    request(server)
      .post(`/autenticar`)
      .send(objSend)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.should.be.an.Object();
        should(res.body.payload).be.ok;
        // res.body.payload.should.be.an.Object();
        // should(res.body.payload.usuario).be.ok;
        // res.body.payload.usuario.should.be.equal(objSend.usuario);
        // should(res.body.token).be.ok;
        // res.body.user.id_rol.should.be.equal(ROL_TECNICO);
        done();
      });
  });
  it('>>> Debería devolver error al tener contraseña incorrecta ', (done) => {
    const objSend = {
      usuario: "inscripciones",
      contrasena: "Na q wear",
      pathLogin: "login",
    };
    request(server)
      .post(`/autenticar`)
      .send(objSend)
      .set('Authorization', `Bearer ${token}`)
      .expect(412)
      .end((err, res) => {
        if (err) return done(err);
        res.body.mensaje.should.be.equal('Los datos de acceso son incorrectos.');
        done();
      });
  });

  // Ruta: GET /api/v1/usuarios
  it('>>> Deberia devolver la lista de usuarios del sistema', (done) => {
    request(server)
      .get(`/api/v1/usuarios`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        should(res.body.finalizado).be.ok;
        should(res.body.mensaje).be.ok;
        should(res.body.datos).be.ok;
        done();
      });
  });
  it('>>> Deberia devolver la lista de usuarios del sistema con solo 5 usuarios', (done) => {
    request(server)
      .get(`/api/v1/usuarios?limit=5&page=1`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        should(res.body.finalizado).be.ok;
        should(res.body.mensaje).be.ok;
        should(res.body.datos).be.ok;
        res.body.datos.count.should.be.equal(10);
        res.body.datos.rows.length.should.be.equal(5);
        done();
      });
  });
  // Ruta: GET /api/v1/codigoDeptos
  it('>>> Deberia listar los departamentos con sus codigos', (done) => {
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
        should(res.body.datos).be.not.ok;
        res.body.datos.length.should.be.equal(9);
        res.body.datos[0].codigo_ine.should.be.equal('LP');
        done();
      });
  });
  // RUta: GET /api/v1/roles
  it('>>> Deberia listar los roles de usuario', (done) => {
    request(server)
      .get(`/api/v1/roles`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        should(res.body.finalizado).be.ok;
        should(res.body.mensaje).be.ok;
        should(res.body.datos).be.not.ok;
        res.body.datos[0].nombre.should.be.equal('ADMINISTRADOR');
        done();
      });
  });
  // RUTA: POST /api/v1/usuarios/
  it('>>> Debería crear un nuevo usuario con rol de inscripciones', (done) => {
    const objSend = {
      persona: {
        ci: '3216547',
        lugar: 'LP',
        fecha_nacimiento: '1991/01/01',
        genero: 'M',
        nombres: 'Adrian Marcelo',
        primer_apellido: 'Berazain',
        segundo_apellido: 'Mallea'
      },
      usuario: {
        email: 'b.beracho@gmail.com',
        fid_rol: '3'
      },
    };
    request(server)
      .post(`/api/v1/usuarios`)
      .send(objSend)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        should(res.body.finalizado).be.ok;
        should(res.body.mensaje).be.ok;
        should(res.body.datos).be.ok;
        res.body.datos.estado.should.be.equal('PENDIENTE');
        // should send mail
        done();
      });
  });
  it('>>> Debería devolver error por correo repetido', (done) => {
    const objSend = {
      persona: {
        ci: '3216547',
        lugar: 'LP',
        fecha_nacimiento: '1991/01/01',
        genero: 'M',
        nombres: 'Adrian Marcelo',
        primer_apellido: 'Berazain',
        segundo_apellido: 'Mallea'
      },
      usuario: {
        email: 'b.beracho@gmail.com',
        fid_rol: '3'
      },
    };
    request(server)
      .post(`/api/v1/usuarios`)
      .send(objSend)
      .set('Authorization', `Bearer ${token}`)
      .expect(412)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        should(res.body.finalizado).be.ok;
        should(res.body.mensaje).be.ok;
        should(res.body.datos).be.not.ok;
        res.body.mensaje.should.be.equal('Ya existe un usuario registrado con el correo electrónico b.beracho@gmail.com.');
        done();
      });
  });
  it('>>> Debería devolver error por ser menor de edad', (done) => {
    const objSend = {
      persona: {
        ci: '1234567',
        lugar: 'LP',
        fecha_nacimiento: '2010/01/01',
        genero: 'M',
        nombres: 'Adrian Marcelo',
        primer_apellido: 'Berazain',
        segundo_apellido: 'Mallea'
      },
      usuario: {
        email: 'adrian.beracho@gmail.com',
        fid_rol: '3'
      },
    };
    request(server)
      .post(`/api/v1/usuarios`)
      .send(objSend)
      .set('Authorization', `Bearer ${token}`)
      .expect(412)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        should(res.body.finalizado).be.ok;
        should(res.body.mensaje).be.ok;
        should(res.body.datos).be.not.ok;
        res.body.mensaje.should.be.equal('El usuario ingresado es menor de edad.');
        done();
      });
  });
  // Ruta: /api/v1/usuarios/reenviar
  it('>>> Deberia enviar email para activación del usuario', (done) => {
    const objSend = {
      usuario: {
        id_usuario: 13
      }
    };
    request(server)
      .post(`/api/v1/usuarios/reenviar`)
      .send(objSend)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        should(res.body.finalizado).be.ok;
        should(res.body.mensaje).be.ok;
        should(res.body.datos).be.ok;
        // should send mail
        done();
      });
  });

  it('>>> MODIFICACION de contraseña con error -> PUT usuario: /api/v1/usuarios/:id', (done) => {
    const usuarioModificar1 = {
      "contrasena": "nuevaContrasena",
      "contrasena_nueva": "nuevaContrasena",
    };
    request(server)
      .put(`/api/v1/mypass`)
      .set('Authorization', `Bearer ${tokenNuevo}`)
      .send(usuarioModificar1)
      .expect('Content-Type', /json/)
      .expect(412)
      .end((err, res) => {
        if (err) return done(err);
        res.body.mensaje.should.be.equal('No se puede cambiar la contraseña de un usuario que tiene acceso por Interoperabilidad.');
        done();
      });
  });

  // it('>>> 2. Debería autenticarse con un NIT de Impuestos y crear un usuario en estado PENDIENTE con ROL UNIDAD PRODUCTIVA ', (done) => {
  //   const objSend = {
  //     nit: "4272199013",
  //     usuario: "user",
  //     contrasena: "abc.123",
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
  //       usuarioCreado = res.body.user;
  //       usuarioCreado.estado.should.be.equal(ESTADO_PENDIENTE);
  //       usuarioCreado.id_rol.should.be.equal(ROL_UNIDAD_PRODUCTIVA);
  //       done();
  //     });
  // });

  // it('>>> 3. Debería autenticarse con un NIT de Impuestos y crear un usuario en estado PENDIENTE con ROL UNIDAD PRODUCTIVA ', (done) => {
  //   const objSend = {
  //     nit: "4314836019",
  //     usuario: "user",
  //     contrasena: "abc.123",
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
  //       usuarioCreado = res.body.user;
  //       usuarioCreado.estado.should.be.equal(ESTADO_PENDIENTE);
  //       usuarioCreado.id_rol.should.be.equal(ROL_UNIDAD_PRODUCTIVA);
  //       done();
  //     });
  // });

  // it('>>> Debería autenticarse con un NIT de Impuestos y crear un usuario en estado PENDIENTE con ROL UNIDAD PRODUCTIVA ', (done) => {
  //   const objSend = {
  //     nit: "1844384012",
  //     usuario: "user",
  //     contrasena: "abc.123",
  //   };
  //   request(server)
  //     .post(`/autenticar`)
  //     .send(objSend)
  //     .set('Authorization', `Bearer ${token}`)
  //     .expect(412)
  //     .end((err, res) => {
  //       if (err) {
  //         return done(err);
  //       }
  //       res.body.finalizado.should.be.equal(false);
  //       done();
  //     });
  // });
  // it('>>> Debería Arrojar un error al crear un Usuario SIN NIT porque falta ingresar email ', (done) => {
  //   const objSend = {
  //     contrasena: "Developer",
  //     tipo: USUARIO_TIPO_ARTESANO,
  //   };
  //   request(server)
  //     .post(`/crear_cuenta`)
  //     .send(objSend)
  //     .expect(412)
  //     .end((err, res) => {
  //       if (err) {
  //         return done(err);
  //       }
  //       res.body.finalizado.should.be.equal(false);
  //       res.body.mensaje.should.be.equal('Solicitud incompleta: falta ingresar correo electrónico');
  //       done();
  //     });
  // });
  it('>>> Debería Arrojar un error al crear un Usuario SIN NIT porque falta ingresar contraseña ', (done) => {
    const objSend = {
      email: 'b.beracho@gmail.com',
      tipo: INSCRIPCIONES,
    };
    request(server)
      .post(`/crear_cuenta`)
      .send(objSend)
      .expect(412)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.body.finalizado.should.be.equal(false);
        res.body.mensaje.should.be.equal('Solicitud incompleta: falta ingresar contraseña para la cuenta');
        done();
      });
  });
  let usuarioArtesano = {};
  it('>>> Debería crear un SIN NIT exitosamente ', (done) => {
    const objSend = {
      email: "b.beracho@gmail.com",
      contrasena: "Developer",
    };
    request(server)
      .post(`/crear_cuenta`)
      .send(objSend)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        usuarioArtesano = res.body.datos.user;
        should(res.body.token).be.ok;
        usuarioArtesano.estado.should.be.equal(ESTADO_PENDIENTE);
        usuarioArtesano.id_rol.should.be.equal(ROL_UNIDAD_PRODUCTIVA);
        usuarioArtesano.usuario.should.be.equal(objSend.email);
        done();
      });
  });


  let usuarioEmpresario = {};
  it('>>> Debería crear un SEGUNDO usuario SIN NIT exitosamente ', (done) => {
    const objSend = {
      email: "ronald.vallejos@gmail.com",
      contrasena: "Developer",
      tipo: USUARIO_TIPO_EMPRESARIO,
    };
    request(server)
      .post(`/crear_cuenta`)
      .send(objSend)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        usuarioEmpresario = res.body.datos.user;
        should(res.body.token).be.ok;
        usuarioEmpresario.estado.should.be.equal(ESTADO_PENDIENTE);
        usuarioEmpresario.id_rol.should.be.equal(ROL_UNIDAD_PRODUCTIVA);
        usuarioEmpresario.usuario.should.be.equal(objSend.email);
        done();
      });
  });
});
