module.exports = function(app, sql){

    return {

        findAll: function(){
            return sql.select('disability');
        }

    }

}
