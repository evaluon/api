module.exports = function(app){

    var checkFields = app.utils.checkFields,
        SelfTest = app.db.SelfTest;

    return {

        find: function(evaluee){
            return checkFields([ 'user' ], { user: evaluee }).then(function(){
                return SelfTest.find(evaluee);
            });
        },

        findAll: function(evaluee){
            return checkFields([ 'user' ], { user: evaluee }).then(function(){
                return SelfTest.findAll(evaluee);
            });
        },

        create: function(evaluee){
            return checkFields([ 'user' ], { user: evaluee }).then(function(){
                return SelfTest.create(
                    evaluee,
                    {
                        description: 'Evaluate',
                        create_date: new Date,
                        start_date: new Date
                    }
                );
            });
        }

    }

}
