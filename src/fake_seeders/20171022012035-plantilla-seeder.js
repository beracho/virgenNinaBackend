'use strict';

module.exports = {
  up (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('plantilla', [
      { // Creación de nueva cuenta, envía link para definir contraseña
        nombre: 'USUARIO_REGISTRO',
        remitente: 'Centro Virgen Niña',
        origen: 'virgenniña@epdb.com',
        asunto: 'REGISTRO DE USUARIO - VIRGEN NIÑA',
        contenido: `<html><head><meta http-equiv="content-type" content="text/html; charset=UTF-8"><meta charset="utf-8"></head><body style="background-color:#F1EEEE"><div style="background-color:#fff;width:450px;margin:5px auto;text-align:justify;line-height:1.5;font-size:14px"><!-- DF0101 6E6E6E #E30522--><div style="border-bottom:2px solid #E40F2B;text-align:center;color:#A4A4A4;padding:10px;font-size:25px;font-weight:700"><img style="width:100%;max-width:320px" src="urlLogoMinisterio" title="Centro Virgen Niña - EPDB" alt="Centro Virgen Niña - EPDB"></div><div style="padding:30px 10px 0;text-align:center"><span style="color:#6E6E6E;font-weight:700">Bienvenido al Sistema</span></div><div style="margin:10px;padding:5px 15px 10px"><br><p>Hola {{nombre}},</p><p>Su cuenta de usuario fue creada exitosamente. A continuación, le enviamos sus datos de acceso para ingresar al sistema. Recuerde que éstos datos son confidenciales.</p><br><div><span style="background-color:#fff"><strong><div style="width:150px;float:left"><span>Usuario:</span></div><span style="color:#E30522">{{usuario}}</span></strong></span></div><br><div><p>Para ingresar al Sistema por <strong>primera vez y activar su cuenta</strong> utilice el siguiente enlace:</p></div><div style="text-align:center;font-size:20px"><a style="color:#E30522;font-weight:700" href="{{urlSistemaActivacion}}">Ingresar</a></div><br><div><p>Si ya activó su cuenta y desea ingresar al Sistema nuevamente puede utilizar el siguiente enlace:</p></div><div style="text-align:center;font-size:20px"><a style="color:#E30522;font-weight:700" href="{{urlSistema}}">Ingresar</a></div><br><br><div><p style="margin:0">Saludos cordiales.</p><p style="margin:0">Asociación Centro Virgen Niña</p></div></div></div></body></html>`,
        tipo: 'EMAIL',
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        nombre: 'USUARIO_RECUPERAR',
        remitente: 'VIRGENNIÑA',
        origen: 'recuperacontraseña@virgenniña.com',
        asunto: 'RECUPERAR CUENTA - VIRGEN NIÑA',
        contenido: `<html> <head> <meta http-equiv="content-type" content="text/html; charset=UTF-8"> <meta charset="utf-8"> </head> <body style="background-color: #F1EEEE;"> <div style='background-color: #fff; width: 450px; margin: 5px auto; text-align: justify; line-height: 1.5; font-size: 14px;'> <!-- DF0101 6E6E6E #E30522--> <div style='border-bottom: 2px solid #E40F2B; text-align: center; color: #A4A4A4; padding: 10px 10px; font-size: 25px; font-weight: bold;'> <img style="width: 100%; max-width: 320px;" src="urlLogoMinisterio" title="Centro Virgen Niña - EPDB" alt="Centro Virgen Niña - EPDB"> </div> <div style='padding: 30px 10px 0; text-align: center;'> <strong> <span style='color: #6E6E6E;'> Recuperación de cuenta </span> </strong> </div> <div style='margin: 10px; padding: 5px 15px 10px;'> <br> <p>Hola {{nombre}},</p> <p>Ha solicitado la recuperación de su cuenta. Ingrese al siguiente enlace y posteriormente establezca una nueva contraseña:</p> </div> <div style="text-align:center; font-size:20px;"> <a style="color: #E30522; font-weight: bold;" href="{{urlSistemaRecuperar}}">Ingresar</a> </div> <br> <br> <div style="text-align:center;"> <p>Recuerde que éstos datos son confidenciales</p> </div> <br> <br> <div> <strong>Si usted no realizó esta solicitud, es posible que alguien más esté intentando acceder a su cuenta. Elimine el mensaje y no comparta esta información con nadie.</strong> </div> <br> <br> <div> <p style="margin: 0;">Saludos cordiales.</p> <p style="margin: 0;">Centro Virgen Niña - EPDB</p> </div> </div> </div> </body> </html> `,
        tipo: 'EMAIL',
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      }
    ], {});

  },

  down (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  },
};
