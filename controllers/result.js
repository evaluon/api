module.exports = function(app){

    var _ = app.utils._,
        log = app.utils.log,
        Dao = app.dao.result,
        responseView = require('../views/jsonSuccessResponse');

    return {

        /**
        * Retrieves a results list for an active period of time, in all tests
        * evaluee has taken in institutions
        **/
        actualPeriod: function(req, res, next){
            Dao.results_actualPeriod(req.user.id).then(function(results){
                responseView(results, res);
            }).catch(next);
        },

        /**
        * Retrieves a results list for an specific institution (identified by
        * id) in active period for all tests evaluee has taken
        **/
        actualPeriod_byInstitution: function(req, res, next){

            Dao.results_actualPeriod_institution(
                req.user.id, req.params.institution_id
            ).then(function(results){
                responseView(results, res);
            }).catch(next)


        },



    }

}
