module.exports = function(app){

    log = app.utils.log,
        Dao = app.dao.period,
        responseView = require('../views/jsonSuccessResponse');

    return {

        retrievePeriods: function(req, res, next){
            Dao.retrievePeriods(req.params.id).then(function(periods){
                responseView(periods, res);
            }).catch(next);
        },

        createPeriod: function(req, res, next){
            Dao.createPeriod(req.body).then(function(period){
                responseView(period, res);
            }).catch(next);
        }

    };

}
