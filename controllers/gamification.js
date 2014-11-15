module.exports = function(app){

    var log = app.utils.log,
        Dao = app.dao.gamification,
        responseView = require('../views/jsonSuccessResponse');

    return {

        indicators: function(req, res, next){
            Dao.indicators(req.user.id).then(function(indicators){
                responseView(indicators, res);
            }).catch(next);
        }

    }

}
