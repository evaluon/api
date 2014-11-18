module.exports = function(app){

    var log = app.utils.log,
        Dao = app.dao.actors,
        responseView = require('../views/jsonSuccessResponse');

    return {

        setEvaluator: function(req, res, next){
            Dao.setEvaluator(req.user, req.body).then(function(){
                responseView(false, res);
            }).catch(next);
        },

        evaluatorGroups: function(req, res, next){
            Dao.evaluatorGroups(req.user).then(function(groups){
                responseView(groups, res);
            }).catch(next);
        },

        evaluatorList: function(req, res, next){
            Dao.evaluatorList(req.user.id).then(function(evaluators){
                responseView(evaluators, res);
            }).catch(next);
        }

        setEvaluee: function(req, res, next){
            Dao.setEvaluee(req.user, req.body).then(function(){
                responseView(false, res);
            }).catch(next);
        },

        evalueeList: function(req, res, next){
            Dao.evalueeList().then(function(evaluees){
                responseView(evaluees, res);
            }).catch(next);
        },

        evalueeGroups: function(req, res, next){
            Dao.evalueeGroups(req.user).then(function(groups){
                responseView(groups, res);
            }).catch(next)
        }

    }

}
