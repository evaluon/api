module.exports = function(app){

    var _ = app.utils._,
        log = app.utils.log,
        checkFields = app.utils.checkFields,
        Actors = app.db.Actors,
        Result = app.db.Result;

    return {

        results_actualPeriod: function(evaluee){

            return checkFields(['user'], { user: evaluee }).then(function(){
                return Actors.isEvaluee(evaluee);
            }).then(function(isEvaluee){
                if(!isEvaluee) throw {
                    statusCode: 404,
                    message: "results_not_found"
                }
                return Result.actualPeriod(evaluee);
            });

        },

        results_actualPeriod_institution: function(evaluee, institution){

            return checkFields(
                ['user', ':institution_id'],
                { user: evaluee, ':institution_id': institution }
            ).then(function(){
                return Actors.isEvaluee(evaluee);
            }).then(function(isEvaluee){
                if(!isEvaluee) throw {
                    statusCode: 404,
                    message: "results_not_found"
                }
                return Result.actualPeriod_byInstitution(evaluee, institution);
            });

        }

    }

}
