module.exports = function(app, sql){

    var _ = app.utils._,
        q = app.utils.q;

    var self = {

        create: function(user, question){
            return sql.selectOne('evaluator', { id: user }).then(function(u){
                if(!u) throw {
                    message: "not_an_evaluator",
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
                    message: "unabled_institution",
                    statusCode: 403
                }
                return sql.insert('question', question)
            }).then(function(res){
                return self.find(res.insertId);
            })
        },

        findBy: function(criteria){
            return sql.select('question', criteria).then(function(questions){

                var qs = [];

                for(question in questions){

                    qs.push(
                        (function(question){
                            if(question.public){
                                return sql.query(
                                    "SELECT a.* FROM " + (
                                        "answer a, answer_options o"
                                    ) +
                                    "WHERE " + (
                                        "a.id = o.answer_id AND " +
                                        "o.question_id = ?"
                                    ), [question.id]
                                ).then(function(answers){
                                    question.answers = answers;
                                    return question;
                                });
                            } else {
                                return question;
                            }
                        })(questions[question]);
                    );

                }

                return q.all(qs);

            });
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
