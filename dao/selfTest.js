module.exports = function(app){

    var _ = app.utils._,
        SelfTest = app.db.SelfTest;

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

        findAll: function(evaluee){

            return checkFields(
                [ 'user' ], { user: evaluee }
            ).then(function(){
                return SelfTest.findAll()
            });

        },

        find: function(evaluee){

            return checkFields(
                [ 'user' ], { user: evaluee }
            ).then(function(){
                return SelfTest.find(evaluee);
            });

        },

        create: function(evaluee){

            return checkFields(
                [ 'user' ], { user: evaluee }
            ).then(function(){
                return SelfTest.create(evaluee);
            });

        }

    }

}
