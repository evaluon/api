module.exports = function(app, sql){

    var self = {

        find: function(values){
            return sql.selectOne('client', values);
        },

        findAll: function(values){
            return sql.select('client', values);
        },

        create: function(object){
            return sql.insert('client', object).then(function(){
                return self.find({id: object.id});
            });
        },

        update: function(id, object){
            return sql.update('client', object, { id: id });
        },

        destroy: function(id){
            return sql.delete('client', { id: id });
        }

    };

    return self;

}
