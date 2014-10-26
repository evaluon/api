module.exports = function(app){

    var log = app.utils.log,
        _ = app.utils._,
        GroupEvaluee = app.db.GroupEvaluee;

    return {

        groupEvaluees: function(group_id){
            if(group_id){
                log.debug("Start fetching");
                return GroupEvaluee.groupEvaluees(group_id);
            } else {
                throw {
                    message: "Specify a group id",
                    missingFields: [":id"]
                };
            }

        },

        addEvaluees: function(users, group_id){
            if(users && group_id){
                return GroupEvaluee.addEvaluees(users, group_id);
            } else {
                throw {
                    message: "Specify which evaluee is going to be added to " +
                        "a specific group.",
                    missingFields: ["users", ":id"]
                }
            }

        }

    }

}
