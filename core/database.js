var fs = require('fs'),
path = require('path'),
mysql = require('mysql'),
mysql_wrap = require('mysql-wrap');

/**
* Setup a client to automatically replace itself if it is disconnected.
*
* @param {Connection} client
*   A MySQL connection instance.
*/
function replaceClientOnDisconnect(client) {
    client.on("error", function (err) {
        if (!err.fatal) {
            return;
        }

        if (err.code !== "PROTOCOL_CONNECTION_LOST") {
            throw err;
        }

        // client.config is actually a ConnectionConfig instance, not the original
        // configuration. For most situations this is fine, but if you are doing
        // something more advanced with your connection configuration, then
        // you should check carefully as to whether this is actually going to do
        // what you think it should do.
        client = mysql.createConnection(client.config);
        replaceClientOnDisconnect(client);
        connection.connect(function (error) {
            if (error) {
                // Well, we tried. The database has probably fallen over.
                // That's fairly fatal for most applications, so we might as
                // call it a day and go home.
                process.exit(1);
            }
        });
    });
}

function loadModels(app, sql){

    var log = app.utils.log,
    util = app.utils.util,
    _ = app.utils._;

    var component = {};

    var files = fs.readdirSync('models', { followLinks: false });

    for(file in files){

        var filename = files[file].split(".");
        var comp = filename[0];
        var ext = filename[1];

        if(ext != 'js'){
            continue;
        }

        var route = util.format("../%s/%s", 'models', comp);
        log.info("Loading model %s.%s", route, ext);

        var exported = require(route)(app, sql);

        var object = _.object([[comp, exported]]),
        component = _.extend(component, object);
    }

    return component;

}

module.exports = function(app){

    var preferredConfig = app.config.db[app.config.db.preferred],
    _ = app.utils._,
    log = app.utils.log;

    var connection = mysql.createPool(
            _.extend({ connectionLimit: 10 }, preferredConfig)
        ),
        sql = mysql_wrap(connection);

    db = loadModels(app, sql);

    app = _.extend({ connection: connection, db: db, sql: sql }, app);

    return app;

};
