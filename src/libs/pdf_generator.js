const Q = require('q');
const fs = require('fs-extra');
// import fs from 'fs-extra';

const generarPDFaFile = (urlEjsPlantilla, objParametros, rutaSalidaPDF, config) => {
  return new Promise(function (resolve, reject) {
    var ejs = require("ejs");
    ejs.renderFile(urlEjsPlantilla, objParametros, function (error, result) {
      if (result) {
        var pdf = require("html-pdf");
        var options = config ? config :
          {
            format: 'Letter',
            orientation: 'portrait',
            border:
            {
              top: "2cm",
              left: "1.5cm",
              right: "1.5cm",
              bottom: "2cm"
            }
          };
        options.filename = rutaSalidaPDF;
        pdf.create(result, options).toFile(function (errorGen, bufferPDF) {
          if (errorGen) {
            reject(errorGen);
            return;
          }
          resolve(bufferPDF);
        });
      }
      else {
        reject(error);
      }

    });
  });
};

const generarPDFaBuffer = (urlEjsPlantilla, objParametros, config) => {
  return new Promise(function (resolve, reject) {
    var ejs = require("ejs");
    ejs.renderFile(urlEjsPlantilla, objParametros, function (error, result) {
      if (result) {
        var pdf = require("html-pdf");
        var options = config ? config :
          {
            format: 'Letter',
            orientation: 'portrait',
            border:
            {
              top: "2cm",
              left: "1.5cm",
              right: "1.5cm",
              bottom: "2cm"
            }
          };
        pdf.create(result, options).toBuffer(function (errorGen, bufferPDF) {
          if (errorGen) {
            reject(errorGen);
            return;
          }
          resolve(bufferPDF);
        });
      }
      else
        reject(error);
    });
  });
};

const leerPDF = (res, ruta) => {
  const deferred = Q.defer();
  const file = fs.readFile(`${ruta}`, (error, data) => {
    if (error) {
      deferred.reject(new Error("No se pudo encontrar el documento."));
    } else {
      res.writeHead(200, { "Content-Type": "application/pdf" });
      res.write(data);
      res.end();
    }
  })
  return deferred.promise;
}


module.exports = {
  generarPDFaBuffer,
  generarPDFaFile,
  leerPDF,
};
