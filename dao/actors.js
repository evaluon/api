module.exports = function(app){

    var _ = app.utils._,
        log = app.utils.log,
        checkFields = app.utils.checkFields,
        Actors = app.db.Actors;

    return {

        actorRole: function(user){
            return Actor.isEvaluator(user).then(function(isEvaluator){
                if(isEvaluator){
                    return Actor.isInstitution(user).then(function(institution){
                        if(institution){
                            return 4;
                        } else {
                            return 2;
                        }
                    });
                } else {
                    return 1;
                }
            })
        },

        setEvaluator: function(user, options){
            var fields = _.extend({ id: user.id }, options);
            return checkFields(['id', 'area'], fields).then(function(){
                return Actors.setEvaluator(fields);
            });
        },

        evaluatorGroups: function(user){
            return checkFields(['user'], { user: user }).then(function(){
                return Actors.evaluatorGroups(user);
            });
        },

        setEvaluee: function(user, options){
            var fields = _.extend({ id: user.id }, options);
            return checkFields(
                ['id', 'disability_id', 'evaluee_type', 'level_id'], fields
            ).then(function(){
                return Actors.setEvaluee(fields);
            });
        },

        evalueeGroups: function(user){
            return checkFields(['user'], { user: user }).then(function(){
                return Actors.evalueeGroups(user);
            });
        }

    }

}
