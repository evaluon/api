module.exports = function(app){

    var log = app.utils.log,
        Dao = app.dao.evalueesInTest,
        responseView = require('../views/jsonSuccessResponse');

    return {

        evalueesInTest: function(req, res, next){
            Dao.evalueesInTest(
                req.params.group, req.params.test
            ).then(function(evaluees){
                responseView(evaluees, res);
            }).catch(next);
        }

    };

}
