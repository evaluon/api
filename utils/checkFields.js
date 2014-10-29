var q = require('q'),
    _ = require('underscore');

module.exports = function(required, object){

    return q.fcall(function(){

        missingFields = [];
        for(field in required){

            rField = required[field];
            if(!(_.has(object, rField) && object[rField])) {
                log.debug(rField);
                missingFields.push(rField);
            }

        }
        if(missingFields.length > 0){

            throw {
                message: "There are some missing fields",
                missingFields: missingFields,
                statusCode: 400
            };

        }

    });

}
