module.exports = function(app, sql){

    var self = {

        find: function(values){
            return sql.selectOne('group', values);
        },

        findAll: function(values){
            return sql.select('group', values);
        },

        create: function(object){
            return sql.insert('group', object).then(function(){
                return self.find({id: object.id});
            });
        },

        update: function(id, object){
            return sql.update('group', object, { id: id });
        },

        destroy: function(id){
            return sql.delete('group', { id: id });
        }

    };

    return self;

}
