module.exports = function(app){

    var log = app.utils.log,
    _ = app.utils._,
    Period = app.db.Period,
    Institution = app.db.Institution;

    return {

        retrievePeriods: function(institution_id){
            return Period.findAll(institution_id);
        },

        createPeriod: function(options){
            if(options.institution_id){

                if(options.start_date != null && options.stop_date != null){
                    return Period.create(options);
                } else {
                    throw {
                        message: "You must add start and end dates " +
                        "for new period",
                        missingFields: ["start_date", "stop_date"]
                    };
                }

            } else {
                throw {
                    message: "Institution id is missing",
                    missingFields: ["institution_id"]
                };
            }

        }

    };

}
