module.exports = function(app){

    var log = app.utils.log,
        Dao = app.dao.openedTests,
        responseView = require('../views/jsonSuccessResponse');

    return {

        openTest: function(req, res, next){
            Dao.openTest(
                req.user.id, req.params.id, req.body.hotp
            ).then(function(d){
                responseView(d, res);
            }).catch(next);
        },

        closeTest: function(req, res, next){
            Dao.closeTest(req.user.id, req.params.id).then(function(d){
                responseView(d, res);
            }).catch(next);
        }

    }

}
