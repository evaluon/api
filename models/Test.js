module.exports = function(app, sql){

    var self = {

        find: function(values){
            return sql.selectOne('test', values);
        },

        findAll: function(values){
            return sql.select('test', values);
        },

        create: function(object){
            return sql.insert('test', object).then(function(){
                return self.find({id: object.id});
            });
        },

        update: function(id, object){
            return sql.update('test', object, { id: id });
        },

        destroy: function(id){
            return sql.delete('test', { id: id });
        }

    }

    return self;

}
