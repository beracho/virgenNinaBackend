console.log("configuracion de desarrollo activada");

module.exports = {
  database: "viniapododb",
  username: "postgres",
  password: "postgres",
  timezone: 'America/La_Paz',
  params: {
    dialect: "postgres",
    port: 5432,
    host: "127.0.0.1",
    sync: {force: process.env.FORCE || false},
    define: {
      underscored: true,
      freezeTableName: true,
    },
  },
  sistema:{
    tiempo_token: 240
  },
  puerto: 4000,
  //configuracion con jwt poner una palabra secreta segura
  jwtSecret: "BERACHO",
  jwtSession: { session: false },
  urlNotificaciones: "http://192.168.20.113:8001",
  timeoutConexionNotificaciones: 5000, // Milisegundos
  pathNotificacionCorreo: "/api/v1/correos",
  tokenCorreo:"tokenAccesoApiCorreo",
};