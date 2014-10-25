module.exports = function(app){

    var log = app.utils.log,
        Dao = app.dao.actors,
        responseView = require('../views/jsonSuccessResponse');

    return {

        setEvaluator: function(req, res, next){
            Dao.setEvaluator(req.user).then(function(){
                responseView(false, res);
            }).catch(next);
        },

        setEvaluee: function(req, res, next){
            Dao.setEvaluee(req.user, req.body).then(function(){
                responseView(false, res);
            }).catch(next);
        }

    }

}
