module.exports = function(app){

    var _ = app.utils._,
        log = app.utils.log,
        Dao = app.dao.gamification,
        DaoResults = app.dao.result,
        responseView = require('../views/jsonSuccessResponse');

    return {

        indicators: function(req, res, next){
            Dao.indicators(req.user.id).then(function(indicators){

                return DaoResults.results_actualPeriod(
                    req.user.id
                ).then(function(results){

                    return _.extend(
                        { 
                            average: (_.reduce(results,
                                function(a, result){
                                    return a + result.average;
                                }, 0
                            ) / results.length)
                        },
                        indicators
                    );

                });

            }).then(function(response){
                responseView(response, res);
            }).catch(next);
        }

    }

}
