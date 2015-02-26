module.exports = function(app){

    var Dao = app.dao.testResults,
        responseView = require('../views/jsonSuccessResponse');

    return {

        retrieveResults: function(req, res, next){

            Dao.retrieveResults(
                req.params.id, req.query.evaluee
            ).then(function(test){
                responseView(test, res);
            }).catch(next);

        }

    }

}
