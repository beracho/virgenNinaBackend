var express = require('express');
var app = express();
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.listen(3000, function () {
    console.log("");
    console.log("                   '         '                ");
    console.log("   ;,,,             '       '             ,,,;");
    console.log("   'Y888888bo.       :     :      .od8888888Y'");
    console.log("     888888888Sb.     :   :     .d8888888888     Bienvenidos al sitema!");
    console.log("     88888Y'  'Y8b.   '   '   .d8Y'  'Y88888  ");
    console.log("    j88888  .db.  Yb. '   ' .dY  .db.  88888k    Autores:");
    console.log("      '888  YSSY    'b ( ) d'    YSSY  888'      -Adrian Marcelo");
    console.log("       888b  '°        ,',        °'  d888        Berazain Mallea");
    console.log("      j888888db8gf°'   ':'   '°?g8bd888888k      -Alejandra la ruda");
    console.log("        'Y'   .8'     d' 'b     '8.   'Y'     ");
    console.log("         !   .8' db  d'; ;'b  db '8.   !      ");
    console.log("            d88  ''  8 ; ; 8  ''  88b            Servidor funcionando:");
    console.log("           d888b   .g8 ',' 8g.   d888b               Host: 127.0.0.1:3000");
    console.log("          :888888888Y'     'Y888888888:       ");
    console.log("          '! 8888888'       '8888888 !'       ");
    console.log("             '8Y  'Y         Y'  Y8'          ");
    console.log("              Y                   Y           ");
    console.log("              !                   !           ");
});