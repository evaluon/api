module.exports = function(app, sql){

    var log = app.utils.log,
        _ = app.utils._;

    self = {

        find: function(values){
            return sql.selectOne('institution', values);
        },

        findAll: function(values){
            return sql.select('institution', values);
        },

        create: function(institution){
            return sql.insert('institution', institution).then(function(res){
                return self.find({ id: res.insertId });
            });
        },

        update: function(id, institution){
            return sql.update('institution', institution, { id: id });
        },

        destroy: function(id){
            return sql.delete('institution', { id: id });
        }

    };

    return self;

}
