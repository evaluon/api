module.exports = function(app){

    var log = app.utils.log,
        _ = app.utils._,
        Group = app.db.Group,
        Actors = app.db.Actors;

    var self = {

        findGroups: function(institution_id){
            if(institution_id) {
                return Group.findAll({ institution_id: institution_id });
            } else {
                throw {
                    message: "Specify an institution id",
                    missingFields: [":id"]
                }
            }
        },

        findGroup: function(institution_id, group_id){
            if(institution_id && group_id){
                return Group.find({
                    institution_id: institution_id,
                    id: group_id
                });
            } else {
                throw {
                    message: "Tell me which group you are talking about, and "
                    + "where"
                    , missingFields: [":inst_id", ":id"]
                }
            }
        },

        createGroup: function(options){
            if(options.institution_id && options.evaluator_id){
                return Group.create(options);
            } else {
                throw {
                    message: "Specify which institution and evaluator manages " +
                        "this group",
                    missingFields: ["institution_id", "evaluator_id"]
                }
            }
        },

        updateGroup: function(options){
            if(options.id){
                return Group.create(options.id, options);
            } else {
                throw {
                    message: "Specify which group is going to be upated",
                    missingFields: ["id"]
                }
            }
        }

    }

    return self;

}
