module.exports = function(app){

    var _ = app.utils._,
        log = app.utils.log,

        Dao = app.dao.groupEvaluee,
        responseView = require('../views/jsonSuccessResponse');

    return {

        groupEvaluees: function(req, res, next){

            Dao.groupEvaluees(req.params.id).then(function(evaluees){
                responseView(evaluees, res);
            }).catch(next);

        },

        addEvaluees: function(req, res, next){

            Dao.addEvaluees(req.body.users, req.params.id).then(function(){
                responseView(false, res);
            }).catch(next);

        },

        deleteEvaluee: function(req, res, next){

            Dao.deleteEvaluee(req.query.user, req.params.id).then(function(){
                responseView(false, res);
            }).catch(next);

        }

    }
}
