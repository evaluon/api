module.exports = function(app){

    var _ = app.utils._,
        log = app.utils.log,

        Dao = app.dao.groupEvaluee,
        responseView = require('../views/jsonSuccessResponse');

    return {

        groupEvaluees: function(req, res, next){

            log.debug("Fetching group evaluees for group %d", req.params.id);
            Dao.groupEvaluees(req.params.id).then(function(evaluees){
                log.debug("Fetched\n", evaluees);
                responseView(evaluees, res);
            }).catch(next);

        },

        addEvaluees: function(req, res, next){

            Dao.addEvaluees(req.body.users, req.params.id).then(function(){
                responseView(false, res);
            }).catch(next);

        }

    }
}
