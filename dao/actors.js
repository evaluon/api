module.exports = function(app){

    var _ = app.utils._,
        log = app.utils.log,
        checkFields = app.utils.checkFields,
        Actors = app.db.Actors;

    return {

        isEvaluee: function(user){
            return Actors.isEvaluee(user).then(function(is){
                return !!is;
            });
        },

        actorRole: function(user){
            return Actors.isEvaluator(user).then(function(isEvaluator){
                if(isEvaluator){
                    return Actors.isInstitution(user).then(function(institution){
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

        evaluatorList: function(user){
            return Actors.evaluatorList(user);
        },

        evaluatorGroups: function(user, institution){
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

        evalueeList: function(institution){
            return Actors.evalueeList(
                institution ? { institution_id: institution } : {}
            );
        },

        evalueeGroups: function(user, institution){
            return checkFields(
                ['user', 'institution'],
                { user: user, institution: institution }
            ).then(function(){
                return Actors.evalueeGroups(user, institution);
            });
        },

        blockEvaluee: function(filter){
            return checkFields(
                ['evaluee_id', 'group_id'], filter
            ).then(function(){
                return Actors.blockEvaluee(filter);
            });
        }

    }

}
