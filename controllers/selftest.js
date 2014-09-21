module.exports = function(app){

    var Test = app.dao.test,
        responseView = require('../views/jsonSuccessResponse');

    return {

        addSelfTest: function(req, res, next){

            Test.createSelfTest(req.user).then(function(test){
                responseView(test, res);
            }).catch(next);

        },

        listSelfTest: function(req, res, next){

            Test.listSelfTest(req.user).then(function(test){
                responseView(test, res);
            }).catch(next);

        }

    }

}
