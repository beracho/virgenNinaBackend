require('babel-core/register');

module.exports = {
  "development": {
    "username": "postgres",
    "password": "postgres",
    "database": "virgenniniadb",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "pool": {
      "max": 15,
      "min": 0,
      "idle": 10000,
    },
  },
  "test": {
    "username": "usuariodb",
    "password": "usuariopassdb",
    "database": "virgenniniadb_test",
    "host": "localhost",
    "dialect": "postgres",
    "pool": {
      "max": 15,
      "min": 0,
      "idle": 10000,
    },
  },
  "production": {
    "username": "usuariodb",
    "password": "usuariopassdb",
    "database": "virgenniniadb_db",
    "host": "localhost",
    "dialect": "postgres",
    "pool": {
      "max": 15,
      "min": 0,
      "idle": 10000,
    },
  },
};
