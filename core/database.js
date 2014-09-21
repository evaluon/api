var fs = require('fs'),
path = require('path'),
Sequelize = require('sequelize');

module.exports = function(app){

    var preferredConfig = app.config.db[app.config.db.preferred],
    _ = app.utils._,
    log = app.utils.log;

    var sequelize = new Sequelize(
        preferredConfig.db,
        preferredConfig.user,
        preferredConfig.password,
        _.extend(
            {
                logging: false,
                syncOnAssociation: true,
            },
            preferredConfig.options
        )
    );

    db = {};

    var modelFiles = fs.readdirSync('models');
    for(file in modelFiles) {
        file = modelFiles[file];
        var model = sequelize.import(path.join('../models', file));
        db[model.name] = model
    };

    var models = Object.keys(db);

    for(modelName in db) {
        if ('associate' in db[modelName]) {
            db[modelName].associate(db)
        }
    };

    db = _.extend({
        sequelize: sequelize,
        Sequelize: Sequelize
    }, db);

    app = _.extend({db: db}, app);

    return app;

};
