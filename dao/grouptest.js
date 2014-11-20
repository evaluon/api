module.exports = function(app){

    var checkFields = app.utils.checkFields,
        GroupTest = app.db.GroupTest,
        Actors = app.db.Actors;

    return {

        findActive: function(group_id, evaluee_id){

            return checkFields(
                [':id', 'user'], { ':id': group_id, user: evaluee_id}
            ).then(function(){
                return Actors.isEvaluee(evaluee_id);
            }).then(function(evaluee){
                if(!evaluee) throw {
                    statusCode: 403,
                    message: "insuficient_privileges"
                }
                return GroupTest.findActive(group_id, evaluee_id);
            });

        },

        findAll: function(group_id, evaluee_id){

            return checkFields(
                [':id','user'], { user: evaluee_id, ':id': group_id }
            ).then(function(){
                return GroupTest.findAll(group_id, evaluee_id);
            });

        },

        create: function(object){

            return checkFields(
                [ 'test_id', 'group_id'],
                { test_id: object.test_id, group_id: object.group_id }
            ).then(function(){
                return GroupTest.create(object);
            });

        }

    }

}
