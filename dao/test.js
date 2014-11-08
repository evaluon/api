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
                        throw { message: "Test not found", statusCode: 404 }
                    });
                })

            })

        },

        create: function(options){
            if(options.start_date && options.stop_date && options.description){
                return Test.create(options);
            } else {
                throw {
                    message: "There are some missing fields",
                    missingFields: ["start_date", "stop_date", "description"]
                }
            }
        },

        update: function(id, options){
            if(!id) throw {
                message: "Test ID is missing",
                missingFields: [":id"]
            }
            return Test.update(id, options);
        }

    }

}
