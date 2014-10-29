module.exports = function(app){

    var Actors = app.db.Actors;

    function checkFields(required, object){

        missingFields = [];
        for(field in required){

            rField = required[field];
            if(!(_.contains(object, rField) && object[rField])) {
                missingFields.push(rField);
            }

        }
        if(missingFields.length > 0){

            throw {
                message: "There are some missing fields",
                missingFields: missingFields,
                statusCode: 400
            }
            return false;

        }
        return true;

    }

    return {

        setEvaluator: function(user){
            return checkFields(['user'], { user: user }).then(function(){
                return Actors.setEvaluator(user);
            });
        },

        evaluatorGroups: function(user){
            return checkFields(['user'], { user: user }).then(function(){
                return Actors.evaluatorGroups(user);
            });
        },

        setEvaluee: function(user, options){
            return Actors.setEvaluee(user, options.disabled);
        },

        evalueeGroups: function(user){
            return checkFields(['user'], { user: user }).then(function(){
                return Actors.evalueeGroups(user);
            });
        }

    }

}
