module.exports = function(app){

    var SelfTest = app.dao.selftest,
        responseView = require('../views/jsonSuccessResponse');

    return {

        setSelfTest: function(req, res, next){
            SelfTest.create(req.user.id).then(function(test){
                responseView(test, res);
            }).catch(next);
        },

        find: function(req, res, next){
            SelfTest.find(req.user.id).then(function(test){
                responseView(test, res);
            }).catch(next);
        },

        findAll: function(req, res, next){
            SelfTest.findAll(req.user.id).then(function(test){
                responseView(test, res);
            }).catch(next);
        }

    }

}
