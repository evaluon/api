module.exports = function(app){

    var _ = app.utils._,
        log = app.utils.log,
        Dao = app.dao.openedTests,
        responseView = require('../views/jsonSuccessResponse');

    return {

        openTest: function(req, res, next){
            Dao.openTest(
                req.user.id, req.params.id, req.body.hotp
            ).then(function(){
                responseView(false, res);
            }).catch(next);
        },

        closeTest: function(req, res, next){
            Dao.closeTest(req.user.id, req.params.id).then(function(){
                responseView(false, res);
            }).catch(next);
        },

        feedback: function(req, res, next){
            Dao.feedback(
                _.extend({ test: req.params.id }, req.body)
            ).then(function(){
                responseView(false, res);
            }).catch(next);
        }

    }

}
