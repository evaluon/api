module.exports = function(app){

    var log = app.utils.log,
        Dao = app.dao.evalueesInTest,
        responseView = require('../views/jsonSuccessResponse');

    return {

        evalueesInTest: function(req, res, next){
            Dao.evalueesInTest(
                req.query.group, req.query.test
            ).then(function(evaluees){
                responseView(evaluees, res);
            }).catch(next);
        }

    };

};
