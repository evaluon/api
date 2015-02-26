module.exports = function(app, sql){

    return {

        findAll: function(){

            var data = {}

            return sql.select('disability').then(function(disabilities){
                data.disabilities = disabilities;
                return sql.select('gender');
            }).then(function(genders){
                data.genders = genders;
                return sql.select('evaluee_level');
            }).then(function(levels){
                data.levels = levels;
                return sql.select('evaluee_type');
            }).then(function(types){
                data.types = types;
                return data;
            });

        }

    }

}
