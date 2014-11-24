module.exports = function(app){

    var _ = app.utils._,
        log = app.utils.log,
        checkFields = app.utils.checkFields,
        GroupEvaluee = app.db.GroupEvaluee;

    return {

        groupEvaluees: function(group_id){

            return checkFields(['group'], { group: group_id }).then(function(){
                return GroupEvaluee.groupEvaluees(group_id);
            });

        },

        addEvaluees: function(users, group){

            return checkFields(
                ['users', group ], { users: users, group: group }
            ).then(function(){
                return GroupEvaluee.addEvaluees(users, group);
            });

        },

        deleteEvaluee: function(evaluee, group){

            return checkFields(
                ['evaluee', 'group'], { evaluee: evaluee, group: group }
            ).then(function(){
                return GroupEvaluee.update()
            })

        }

    }

}
