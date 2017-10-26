'use strict';

module.exports = {
  up (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('plantilla', [
      {
        nombre: 'USUARIO_REGISTRO',
        remitente: 'Centro Virgen Niña',
        origen: 'virgenniña@epdb.com',
        asunto: 'REGISTRO DE USUARIO - VIRGEN NIÑA',
        contenido: `<html><head>  <meta http-equiv="content-type" content="text/html; charset=UTF-8">  <meta charset="utf-8"> </head><body style="background-color: #F1EEEE;">  <div style='background-color: #fff; width: 450px; margin: 5px auto; text-align: justify; line-height: 1.5; font-size: 14px;'>    <!-- DF0101 6E6E6E #E30522-->    <div style='border-bottom: 2px solid #E40F2B; text-align: center; color: #A4A4A4; padding: 10px 10px; font-size: 25px; font-weight: bold;'>    <img style="width: 100%; max-width: 320px;" src="urlLogoMinisterio" title="Centro Virgen Niña - EPDB"        alt="Centro Virgen Niña - EPDB"> </div>    <div style="padding: 30px 10px 0; text-align: center;">    <span style="color: #6E6E6E; font-weight: 700;"> Bienvenido al Sistema </span> </div>    <div style='margin: 10px; padding: 5px 15px 10px;'>    <br>      <p>Hola {{nombre}},</p>      <p>Su cuenta de usuario fue creada exitosamente. A continuación, le enviamos sus datos de acceso para ingresar al sistema.        Recuerde que éstos datos son confidenciales. </p> <br>      <div> <span style="background-color: #ffffff;"> <strong> <div style="width: 150px; float: left;"><span>Usuario:</span></div>      <span style="color:#E30522;">{{usuario}}</span> </strong>      </span>    </div> <br>    <div>      <p>Para ingresar al Sistema por <strong>primera vez y activar su cuenta</strong> utilice el siguiente enlace:</p>    </div>    <div style="text-align:center; font-size:20px;"> <a style="color: #E30522; font-weight: bold;" href="{{urlSistemaActivacion}}">Ingresar</a> </div> <br>    <div>      <p>Si ya activó su cuenta y desea ingresar al Sistema nuevamente puede utilizar el siguiente enlace:</p>    </div>    <div style="text-align:center; font-size:20px;"> <a style="color: #E30522; font-weight: bold;" href="{{urlSistema}}">Ingresar</a> </div> <br> <br>    <div>      <p style="margin: 0;">Saludos cordiales.</p>      <p style="margin: 0;">Ministerio de Desarrollo Productivo y Economía Plural</p>    </div>  </div>  </div></body></html>`,
        tipo: 'EMAIL',
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      // {
      //   nombre: 'USUARIO_RECUPERAR',
      //   remitente: 'PROBOLIVIA',
      //   origen: 'probolivia@agetic.gob.bo',
      //   asunto: 'RECUPERAR CUENTA - PROBOLIVIA',
      //   contenido: `<html> <head> <meta http-equiv="content-type" content="text/html; charset=UTF-8"> <meta charset="utf-8"> </head> <body style="background-color: #F1EEEE;"> <div style='background-color: #fff; width: 450px; margin: 5px auto; text-align: justify; line-height: 1.5; font-size: 14px;'> <!-- DF0101 6E6E6E #E30522--> <div style='border-bottom: 2px solid #E40F2B; text-align: center; color: #A4A4A4; padding: 10px 10px; font-size: 25px; font-weight: bold;'> <img style="width: 100%; max-width: 320px;" src="urlLogoMinisterio" title="Ministerio de Desarrollo Productivo y Economía Plural" alt="Ministerio de Desarrollo Productivo y Economía Plural"> </div> <div style='padding: 30px 10px 0; text-align: center;'> <strong> <span style='color: #6E6E6E;'> Recuperación de cuenta </span> </strong> </div> <div style='margin: 10px; padding: 5px 15px 10px;'> <br> <p>Hola {{nombre}},</p> <p>Ha solicitado la recuperación de su cuenta. Copie el siguiente código en el formulario donde inició la solicitud de recuperación de contraseña: <p/> <br> <div style="font-size:16px"> <span style="background-color: #ffffff;"> <strong> <div style="width: 150px; float: left;"><span>Código:</span></div> <span style="color:#E30522; font-size:18px">{{contrasena}}</span> </strong> </span> </div> <br> <div> <p>O ingrese al siguiente enlace y posteriormente establezca una nueva contraseña:</p> </div> <div style="text-align:center; font-size:20px;"> <a style="color: #E30522; font-weight: bold;" href="{{urlSistemaRecuperar}}">Ingresar</a> </div> <br> <br> <div style="text-align:center;"> <p>Recuerde que éstos datos son confidenciales</p> </div> <br> <br> <div> <strong>Si usted no realizó esta solicitud, es posible que alguien más esté intentando acceder a su cuenta. Elimine el mensaje y no comparta esta información con nadie.</strong> </div> <br> <br> <div> <p style="margin: 0;">Saludos cordiales.</p> <p style="margin: 0;">Ministerio de Desarrollo Productivo y Economía Plural</p> </div> </div> </div> </body> </html> `,
      //   tipo: 'EMAIL',
      //   estado: 'ACTIVO',
      //   _usuario_creacion: 1,
      //   _fecha_creacion: new Date(),
      //   _fecha_modificacion: new Date(),
      // }, {
      //   nombre: 'USUARIO_CONFIRMAR_NIT',
      //   remitente: 'PROBOLIVIA',
      //   origen: 'probolivia@agetic.gob.bo',
      //   asunto: 'CÓDIGO DE ACTIVACIÓN - PROBOLIVIA',
      //   contenido: `<html> <head> <meta http-equiv="content-type" content="text/html; charset=UTF-8"> <meta charset="utf-8"> </head> <body style="background-color: #F1EEEE;"> <div style='background-color: #fff; width: 450px; margin: 5px auto; text-align: justify; line-height: 1.5; font-size: 14px;'> <!-- DF0101 6E6E6E #E30522--> <div style='border-bottom: 2px solid #E40F2B; text-align: center; color: #A4A4A4; padding: 10px 10px; font-size: 25px; font-weight: bold;'> <img style="width: 100%; max-width: 320px;" src="urlLogoMinisterio" title="Ministerio de Desarrollo Productivo y Economía Plural" alt="Ministerio de Desarrollo Productivo y Economía Plural"> </div> <div style="padding: 30px 10px 0; text-align: center;"> <span style="color: #6E6E6E; font-weight: 700;"> Bienvenido al Sistema </span> </div> <div style="margin: 10px; padding: 5px 15px 10px;"> <p>Hola {{nombre}},</p> <p>Si ha recibido este correo es porque su cuenta de usuario <strong>{{nombre}}</strong> con NIT <strong>{{nit}}</strong> necesita confirmación. Por favor, utilice el siguiente código de activación:</p> <p> <br> <div style="font-size:16px; text-align: center;"> <span style="background-color: #ffffff;"> <strong> <span style="color:#E30522; font-size:16px">{{codigo}}</span> </strong> </span> </div> <div style="text-align:center;"> <p>Recuerde que éstos datos son confidenciales</p> </div> <br> <div> <p style="margin: 0;">Saludos cordiales.</p> <p style="margin: 0;">Ministerio de Desarrollo Productivo y Economía Plural</p> </div> </div> </div> <!-- </div> --> </body> </html> `,
      //   tipo: 'EMAIL',
      //   estado: 'ACTIVO',
      //   _usuario_creacion: 1,
      //   _fecha_creacion: new Date(),
      //   _fecha_modificacion: new Date(),

      // },{
      //   nombre: 'CERTIFICACION_OBSERVAR',
      //   remitente: 'PROBOLIVIA',
      //   origen: 'probolivia@agetic.gob.bo',
      //   asunto: 'CERTIFICACIÓN OBSERVADA - PROBOLIVIA',
      //   contenido: `<html> <head> <meta http-equiv="content-type" content="text/html; charset=UTF-8"> <meta charset="utf-8"> </head> <body style="background-color: #F1EEEE;"> <div style="background-color: #fff; width: 450px; margin: 5px auto; text-align: justify; line-height: 1.5; font-size: 14px;"> <div style="border-bottom: 2px solid #E40F2B; text-align: center; color: #A4A4A4; padding: 10px 10px; font-size: 25px; font-weight: bold;"> <img style="width: 100%; max-width: 320px;" src="urlLogoMinisterio" title="Ministerio de Desarrollo Productivo y Economía Plural" alt="Ministerio de Desarrollo Productivo y Economía Plural"> </div> <div style="padding: 30px 10px 0; text-align: center;"> <strong> <span style="color: #6E6E6E;"> Solicitud Observada </span> </strong> </div> <div style="margin: 10px; padding: 5px 15px 10px; text-align: left;"> <br> <p>Hola {{nombre}},</p> <p>Su trámite de {{tipo}} de {{formulario}} tiene la siguiente observación:</p> <p> <i style="font-weight: 600; color: #6E6E6E;">{{observaciones}} <ol> {{#each detalles}} <li>{{this}}</li> {{/each}} </ol> </i> </p><br> <div> Por favor comuníquese con PROBOLIVIA para obtener más información. </div> <br> <br> <div> <p style="margin: 0;">Saludos cordiales.</p> <p style="margin: 0;">Ministerio de Desarrollo Productivo y Economía Plural</p> <a style="color: #6E6E6E;" href="{{urlSistema}}">{{urlSistema}}</a> </div> </div> </div> </body> </html> `,
      //   tipo: 'EMAIL',
      //   estado: 'ACTIVO',
      //   _usuario_creacion: 1,
      //   _fecha_creacion: new Date(),
      //   _fecha_modificacion: new Date(),
      // }, {
      //   nombre: 'CERTIFICACION_APROBAR',
      //   remitente: 'PROBOLIVIA',
      //   origen: 'probolivia@agetic.gob.bo',
      //   asunto: 'CERTIFICACIÓN APROBADA',
      //   contenido: `<html> <head> <meta http-equiv="content-type" content="text/html; charset=UTF-8"> <meta charset="utf-8"> </head> <body style="background-color: #F1EEEE;"> <div style="background-color: #fff; width: 450px; margin: 5px auto; text-align: justify; line-height: 1.5; font-size: 14px;"> <div style="border-bottom: 2px solid #E40F2B; text-align: center; color: #A4A4A4; padding: 10px 10px; font-size: 25px; font-weight: bold;"> <img style="width: 100%; max-width: 320px;" src="urlLogoMinisterio" title="Ministerio de Desarrollo Productivo y Economía Plural" alt="Ministerio de Desarrollo Productivo y Economía Plural"> </div> <div style="padding: 30px 10px 0; text-align: center;"> <strong> <span style="color: #6E6E6E;"> APROBACIÓN de Declaración Jurada PROBOLIVIA </span> </strong> </div> <div style="margin: 10px; padding: 5px 15px 10px; text-align: left;"> <br> <p>Felicidades! Su trámite ha concluído exitosamente.</p> <br> <div> Favor dirigirse a oficinas de PROBOLIVIA para obtener su certificado. </div> <br> <br> <div> <p style="margin: 0;">Saludos cordiales.</p> <p style="margin: 0;">Ministerio de Desarrollo Productivo y Economía Plural</p> </div> </div> </div> </body> </html> `,
      //   tipo: 'EMAIL',
      //   estado: 'ACTIVO',
      //   _usuario_creacion: 1,
      //   _fecha_creacion: new Date(),
      //   _fecha_modificacion: new Date(),
      // },
      // {
      //   nombre: 'USUARIO_CONFIRMAR',
      //   remitente: 'PROBOLIVIA',
      //   origen: 'probolivia@agetic.gob.bo',
      //   asunto: 'CÓDIGO DE ACTIVACIÓN - PROBOLIVIA',
      //   contenido: `<html> <head> <meta http-equiv="content-type" content="text/html; charset=UTF-8"> <meta charset="utf-8"> </head> <body style="background-color: #F1EEEE;"> <div style='background-color: #fff; width: 450px; margin: 5px auto; text-align: justify; line-height: 1.5; font-size: 14px;'> <!-- DF0101 6E6E6E #E30522--> <div style='border-bottom: 2px solid #E40F2B; text-align: center; color: #A4A4A4; padding: 10px 10px; font-size: 25px; font-weight: bold;'> <img style="width: 100%; max-width: 320px;" src="urlLogoMinisterio" title="Ministerio de Desarrollo Productivo y Economía Plural" alt="Ministerio de Desarrollo Productivo y Economía Plural"> </div> <div style="padding: 30px 10px 0; text-align: center;"> <span style="color: #6E6E6E; font-weight: 700;"> Bienvenido al Sistema </span> </div> <div style="margin: 10px; padding: 5px 15px 10px;"> <p>Hola {{nombre}},</p> <p>Si ha recibido este correo es porque ha registrado una cuenta con usuario <strong>{{nombre}}</strong> que necesita confirmación. Por favor, utilice el siguiente código de activación:</p> <p> <br> <div style="font-size:16px; text-align: center;"> <span style="background-color: #ffffff;"> <strong> <span style="color:#E30522; font-size:16px">{{codigo}}</span> </strong> </span> </div> <div style="text-align:center;"> <p>Recuerde que éstos datos son confidenciales</p> </div> <br> <div> <p style="margin: 0;">Saludos cordiales.</p> <p style="margin: 0;">Ministerio de Desarrollo Productivo y Economía Plural</p> </div> </div> </div> <!-- </div> --> </body> </html> `,
      //   tipo: 'EMAIL',
      //   estado: 'ACTIVO',
      //   _usuario_creacion: 1,
      //   _fecha_creacion: new Date(),
      //   _fecha_modificacion: new Date(),
      // },
      // {
      //   nombre: 'CERTIFICACION_NOTIFICAR_CON_NIT',
      //   remitente: 'PROBOLIVIA',
      //   origen: 'probolivia@agetic.gob.bo',
      //   asunto: 'APROBACIÓN DE DECLARACIÓN JURADA',
      //   contenido: `<html> <head> <meta http-equiv="content-type" content="text/html; charset=UTF-8"> <meta charset="utf-8"> </head> <body style="background-color: #F1EEEE;"> <div style='background-color: #fff; width: 450px; margin: 5px auto; text-align: justify; line-height: 1.5; font-size: 14px;'> <!-- DF0101 6E6E6E #E30522--> <div style='border-bottom: 2px solid #E40F2B; text-align: center; color: #A4A4A4; padding: 10px 10px; font-size: 25px; font-weight: bold;'> <img style="width: 100%; max-width: 320px;" src="urlLogoMinisterio" title="Ministerio de Desarrollo Productivo y Economía Plural" alt="Ministerio de Desarrollo Productivo y Economía Plural"> </div> <div style="padding: 30px 10px 0; text-align: center;"> <span style="color: #6E6E6E; font-weight: 700;"> Aprobación de Declaración Jurada </span> </div> <div style="margin: 10px; padding: 5px 15px 10px;"> <br/><p>¡Felicidades! Su trámite ha sido aprobado.</p> <p>Favor realizar los siguientes pasos:</p> <ol> <li>Efectuar el depósito de Bs. {{monto}} por el costo del trámite en la cuenta del Banco Unión N° {{cuenta}} (en bolivianos).</li> <li>Registrar en el sistema <a href="{{urlSistema}}">{{urlSistema}}</a> los datos de la boleta de depósito. <img src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAABcAAAAPCAIAAACAzcMBAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QYUDQIv0MibZwAAAnFJREFUOMudUzFPKkEQnt290JCYQKTWrCYWEgsL7TDSUdiQaGFhLL3GH0BjaO2MjZ2GcFhSkkBz2BgIhIRWi4tRhKCQE9HcnrtjsbzzzKve2+qb7Ow3M99+Q9LptOM48L+HUnpycmKEKTY2NlZXV8NJhBAAQEQNAlwoFL6+vgBAKeU4jhF+Y5pmKpUKQsdxbNsGgO3t7YWFhXBmp9PpdDoaG4bBYrGYDnZ2dg4PDz8/Pz3PE0JcXl6aplmv129uborFYiQSWVlZEUL4vu/7fjKZrFQqQgg9AXDODw4O6vU6Ir6+vj49PT0+Ptq2zTnPZDLD4dB1Xc750tKSbdu9Xq/X6z0/Pwsh+v2+ZVmc89PTUwoA6+vrqVRKd0EIYYxZlkUpvbi4mJ+fn5ub03JYlkUIUUoppVzXTSQS+/v7M40BQEo5Go1c16WUahVbrZZSKpfLDQaDfr+vU9vttpQSERHR9/2XlxfXdX+xeJ4XKIeIHx8fAHB7ext8EwBMp1ONKaWUUinldDr9YQkeI6LGnPO/rcE5J4TofgkhQfIPC/45uvju7i4AlEolpZSUslQqZbPZvb09RKSUaptoxpmtOOfxeHxzc9M0zVgsputEo9FsNut5npQSABhjiUTi6urq7e2NMaar1mq1crnc7XaPjo4oAIxGo0qlcnx87Pu+7kgpdX19nUwm39/fJ5PJ2tra2dmZUioYoVqt5vP5brc7M17YqY1GY2trCwA8z4vH4+fn58GtUmo8HhuGoRUpFothyX5tQLlcvru7C9YsEokYhoGIUkohRLiXh4eHXyzLy8v39/c6aDabzWbzn3aaMba4uPgN1khmiy1sY8EAAAAASUVORK5CYII="/></li> <li>Dirigirse a oficinas de PROBOLIVIA para obtener su certificado.</li> </ol> <p> <br> <div> <p style="margin: 0;">Saludos cordiales.</p> <p style="margin: 0;">Ministerio de Desarrollo Productivo y Economía Plural</p> </div> </p> </div> </div> <!-- </div> --> </body> </html> `,
      //   tipo: 'EMAIL',
      //   estado: 'ACTIVO',
      //   _usuario_creacion: 1,
      //   _fecha_creacion: new Date(),
      //   _fecha_modificacion: new Date(),
      // },
      // {
      //   nombre: 'CERTIFICACION_NOTIFICAR_SIN_NIT',
      //   remitente: 'PROBOLIVIA',
      //   origen: 'probolivia@agetic.gob.bo',
      //   asunto: 'APROBACIÓN DE DECLARACIÓN JURADA',
      //   contenido: `<html> <head> <meta http-equiv="content-type" content="text/html; charset=UTF-8"> <meta charset="utf-8"> </head> <body style="background-color: #F1EEEE;"> <div style='background-color: #fff; width: 450px; margin: 5px auto; text-align: justify; line-height: 1.5; font-size: 14px;'> <!-- DF0101 6E6E6E #E30522--> <div style='border-bottom: 2px solid #E40F2B; text-align: center; color: #A4A4A4; padding: 10px 10px; font-size: 25px; font-weight: bold;'> <img style="width: 100%; max-width: 320px;" src="urlLogoMinisterio" title="Ministerio de Desarrollo Productivo y Economía Plural" alt="Ministerio de Desarrollo Productivo y Economía Plural"> </div> <div style="padding: 30px 10px 0; text-align: center;"> <span style="color: #6E6E6E; font-weight: 700;"> Aprobación de Declaración Jurada </span> </div> <div style="margin: 10px; padding: 5px 15px 10px;"> <br/><p>¡Felicidades! Su trámite ha sido aprobado.</p> <p>Favor realizar los siguientes pasos:</p> <ol> <li>Efectuar el depósito de Bs. {{monto}} por el costo del trámite en la cuenta del Banco Unión N° {{cuenta}} (en bolivianos).</li> <li>Dirigirse a oficinas de PROBOLIVIA para obtener su certificado portando su comprobante del depósito realizado. </li> </ol> <p> <br> <div> <p style="margin: 0;">Saludos cordiales.</p> <p style="margin: 0;">Ministerio de Desarrollo Productivo y Economía Plural</p> </div> </p> </div> </div> <!-- </div> --> </body> </html> `,
      //   tipo: 'EMAIL',
      //   estado: 'ACTIVO',
      //   _usuario_creacion: 1,
      //   _fecha_creacion: new Date(),
      //   _fecha_modificacion: new Date(),
      // },
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
