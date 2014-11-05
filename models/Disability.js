module.exports = function(app, sql){

    return {

        findAll: function(){
            var data = { disabilities: null, types: null, levels: null };

            return sql.select('disability').then(function(disabilities){
                data.disabilities = disabilities;
                return sql.select('evaluee_type');
            }).then(function(types){
                data.types = types;
                return sql.select('evaluee_level');
            }).then(function(levels){
                data.levels = levels;
                return data;
            });
        }

    }

}
