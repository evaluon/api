module.exports = function(app){

    var checkFields = app.utils.checkFields,
        log = app.utils.log,
        Actors = app.db.Actors;

    return {

        setEvaluator: function(user){
            return checkFields(['user'], { user: user }).then(function(){
                return Actors.setEvaluator(user);
            });
        },

        evaluatorGroups: function(user){
            return checkFields(['user'], { user: user }).then(function(){
                return Actors.evaluatorGroups(user);
            });
        },

        setEvaluee: function(user, options){
            return Actors.setEvaluee(user, options.disabled);
        },

        evalueeGroups: function(user){
            return checkFields(['user'], { user: user }).then(function(){
                return Actors.evalueeGroups(user);
            });
        }

    }

}
