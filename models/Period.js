module.exports = function(app, sql){

    self = {

        find: function(values){
            return sql.selectOne('period', values);
        },

        findAll: function(values){
            return sql.select('period', values);
        },

        create: function(object){
            return sql.insert('period', object).then(function(){
                return self.find({id: object.id});
            });
        },

        update: function(id, object){
            return sql.update('period', object, { id: id });
        },

        destroy: function(id){
            return sql.delete('period', { id: id });
        }

    };

    return self;

}
