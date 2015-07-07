module.exports = function(app){

    var log = app.utils.log,
        Dao = app.dao.disabilities,
        responseView = require('../views/jsonSuccessResponse');

    return {

        findAll: function(req, res, next){
            Dao.findAll().then(function(disabilities){
                responseView(disabilities, res);
            }).catch(next);
        }

    };

};
