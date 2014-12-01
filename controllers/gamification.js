module.exports = function(app){

    var log = app.utils.log,
        Dao = app.dao.gamification,
        responseView = require('../views/jsonSuccessResponse');

    return {

        indicators: function(req, res, next){
            Dao.indicators(req.user.id).then(function(indicators){

                Dao.results_actualPeriod(req.user.id).then(function(results){

                    var response = {
                        average: (_.reduce(
                            function(a, result){
                                return a + result.average;
                            }, results, 0
                        ) / results.length),
                        gamification: indicators
                    }
                    responseView(response, res);

                });

            }).catch(next);
        }

    }

}
