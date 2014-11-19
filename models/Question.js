module.exports = function(app, sql){

    var self = {

        create: function(user, question){
            return sql.selectOne('evaluator', { id: user }).then(function(u){
                if(!u) throw {
                    message: "User is not an evaluator",
                    statusCode: 403
                };
                return sql.selectOne(
                    'group',
                    {
                        institution_id: question.institution_id,
                        evaluator_id: user
                    }
                );
            }).then(function(group){
                if(!group) throw {
                    message: "User can't create questions in name of " +
                    "specified institution",
                    statusCode: 403
                }
                return sql.insert('question', question)
            }).then(function(res){
                return self.find(res.insertId);
            })
        },

        findBy: function(criteria){
            return sql.select('question', criteria);
        },

        find: function(id){
            return sql.selectOne('question', { id: id });
        },

        update: function(question){
            return sql.update(
                'question', question, { id: question.id }
            ).then(function(res){
                return self.find(question.id);
            });
        }

    }

    return self;

}
