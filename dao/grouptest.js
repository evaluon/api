module.exports = function(app){

    var checkFields = app.utils.checkFields,
        GroupTest = app.db.GroupTest;

    return {

        findActive: function(group_id, evaluee_id){

            return checkFields(
                [':id', 'user'], { ':id': group_id, user: evaluee_id}
            ).then(function(){
                return GroupTest.findActive(group_id, evaluee_id);
            });

        },

        findAll: function(group_id){

            return checkFields([':id'], { ':id': group_id }).then(function(){
                return GroupTest.findAll(group_id);
            });

        },

        create: function(object){

            return checkFields(
                [ 'test_id', 'group_id', 'period_id'],
                {
                    test_id: object.test_id,
                    group_id: object.group_id,
                    period_id: object.period_id
                }
            ).then(function(){
                return sql.create(object);
            });


        }

    }

}
