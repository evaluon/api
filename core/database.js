var fs = require('fs'),
path = require('path'),
mysql = require('mysql'),
mysql_wrap = require('../utils/mysql-wrap');

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
            _.extend({ connectionLimit: 1000 }, preferredConfig)
        ),
        sql = mysql_wrap(connection);

    db = loadModels(app, sql);

    app = _.extend({ db: db }, app);

    return app;

};
