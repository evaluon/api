module.exports = function(app){

    var Actors = app.db.Actors;

    return {

        setEvaluator: function(user){
            return Actors.setEvaluator(user);
        },

        setEvaluee: function(user, options){
            return Actors.setEvaluee(user, options.disabled);
        }

    }

}
