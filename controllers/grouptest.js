module.exports = function(app){

    var _ = app.utils._,
        log = app.utils.log,

        Dao = app.dao.grouptest,
        responseView = require('../views/jsonSuccessResponse');

    return {

        findActive: function(req, res, next){
            Dao.findActive(req.params.id, req.user.id).then(function(test){
                responseView(test, res);
            }).catch(next);
        },

        findAll: function(req, res, next){
            Dao.findAll(req.params.id, req.user.id).then(function(tests){
                responseView(tests, res);
            }).catch(next);
        },

        create: function(req, res, next){
            Dao.create(req.body).then(function(test){
                responseView(test, res);
            }).catch(next);
        }

    }

}
