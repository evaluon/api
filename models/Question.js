module.exports = function(app, sql){

    var self = {

        create: function(question){
            return sql.insert('question', question).then(function(res){
                return self.find(res.insertId);
            })
        },

        findBy: function(criteria){
            return sql.select('question', criteria);
        },

        find: function(id){
            return sql.selectOne('question', { id: id });
        },

        update: function(id, question){
            return sql.update(
                'question', question, { id: id }
            ).then(function(res){
                return self.find(id);
            });
        }

    }

    return self;

}
