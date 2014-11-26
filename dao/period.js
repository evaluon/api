module.exports = function(app){

    var log = app.utils.log,
        _ = app.utils._,
        checkFields = app.utils.checkFields,
        Period = app.db.Period,
        Institution = app.db.Institution;

    return {

        retrievePeriods: function(institution_id){
            return Period.findAll(institution_id);
        },

        createPeriod: function(options){

            return checkFields(
                ["start_date", "stop_date", "institution_id"], options
            ).then(function(){
                return Period.create(options);
            });

        }

    };

}
