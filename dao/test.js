module.exports = function(app){

    var _ = app.utils._,
        log = app.utils.log,
        checkFields = app.utils.checkFields,

        Actors = app.db.Actors,
        Test = app.db.Test;

    return {

        findAll: function(){
            return Test.findAll();
        },

        find: function(user, id){
            return checkFields([':id'], { ':id': id }).then(function(){
                return Actors.isEvaluee(user).then(function(is){
                    if(is) return Test.find_evaluee;
                    else return Test.find_evaluator;
                }).then(function(func){
                    return func(id).then(function(data){
                        if(data) return data;
                        throw { message: "test_not_found", statusCode: 404 };
                    });
                })
            });
        },

        create: function(options){
            return checkFields(
                ['description', 'start_date', 'stop_date'], options
            ).then(function(){
                return Test.create(options);
            });
        },

        update: function(id, options){
            return checkFields([':id'], id).then(function(){
                return Test.update(id, options);
            });
        }

    }

}
