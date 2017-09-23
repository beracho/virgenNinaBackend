# Repositorio de backend de la branch de desarrollo #

Pasos para la instalación del backend del sistema de gestion documental "viniapodo"

### Instalación de GIT y descarga del repositorio ###

* Instalar GIT

* Descarga del repositorio

Este repositorio almacena el sistema de control y seguimiento documental virgen niña

### Instalación del sistema ###

* npm install
* npm run setup
* npm install -g nodemon
* crear base de datos
sudo su - postgres
psql postgres 

CREATE ROLE usuario_ninia WITH LOGIN PASSWORD 'micontraseñamuysegura'
CREATE DATABASE viniadobodb WITH OWNER usuario_ninia;


* npm run startdev
* Instalación del test

### Cómo contactarme ###

* gmail
* telf

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines
