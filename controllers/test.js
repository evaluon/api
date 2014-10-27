module.exports = function(app){

    var _ = app.utils._,
        log = app.utils.log,

        Dao = app.dao.test,
        responseView = require('../views/jsonSuccessResponse');

    return {

        findAll: function(req, res, next){
            Dao.findAll().then(function(response){
                responseView(response, res);
            }).catch(next);
        },

        find: function(req, res, next){
            Dao.find(req.params.id).then(function(test){
                responseView(test, res);
            }).catch(next);
        },

        create: function(req, res, next){
            Dao.create(req.body).then(function(test){
                responseView(test, res);
            }).catch(next);
        },

        update: function(req, res, next){
            Dao.update(req.params.id, req.body).then(function(test){
                responseView(test, res);
            }).catch(next);
        }

    }

}
