module.exports = function(app, sql){

    var _ = app.utils._,
        log = app.utils.log;

    function createImage(image){
        return sql.insert('image', image).then(function(res){
            return res.insertId;
        });
    }

    var self = {

        create: function(image){
            return sql.insert('image', image).then(function(res){
                return res.insertId;
            });
        },

        retrieve: function(id){
            return sql.selectOne('image', { id: id });
        },

        update: function(id, image){
            return sql.update('image', image, { id: id }).then(function(){
                return self.retrieve(id);
            });
        }

    }

    return self;

}
