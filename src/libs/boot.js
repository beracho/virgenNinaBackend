import http from "http";

module.exports = app => {
    const config = app.src.config.config;

    process.env.TZ = config.timezone;

    if (process.env.NODE_ENV !== "test") {
        app.src.db.sequelize.sync().done(() => {
            if (process.env.FORCE || false) {
                process.exit(0);
            } else {
                const server = app.listen(app.get("port"), () => {
                    console.log("  ");
                    console.log(" °:########.                                           :##                  ");
                    console.log("  '##     '##                                          '##                  ");
                    console.log("   ##      ##       __          _      __        __     ##            __    ");
                    console.log("   ##      ##    ,######. ###.####> ,######.  ,######.  ##  ___     ,#####. ");
                    console.log("   ########:.    ##:  :## '###' '#  #:   '##  ##:  :##  ##.######. ,##' '##.");
                    console.log("   ##     '###.  ##    ##  ##    '    ___,##  ##        ###' '###! ##    '##");
                    console.log("   ##        ##  #######:  ##       .#######  ##        ##'   '##  ##     ##");
                    console.log("   ##        ##  ##'       ##       ##'  '##  ##'       ##     ##  ##     ##");
                    console.log("   ##        ##  ##        ##       ##    ##  ##        ##     ##  ##.   ,##");
                    console.log("   ##_______.##  .#:._,##  ##       ##.__:##. .#:._,## ,##.   ,##. :#:._,##'");
                    console.log(" ,:##########'    ######   ##       '#####'##  ######  ####   #### ':#####' ");
                    console.log("                                                                            ");
                    console.log("  AUTOR: Adrian Marcelo Berazaín Mallea                                     ");
                    console.log("                                                                            ");
                    console.log("  Servidor funcionando:                                                     ");
                    console.log("      Host: 127.0.0.1:3000                                                  ");
                });
            }
        });
    } else if (typeof (global.server) === 'undefined') {
        app.src.db.sequelize.sync().done(() => {
            if (process.env.FORCE || false) {
                process.exit(0);
            }
        });
    }
};