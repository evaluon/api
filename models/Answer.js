module.exports = function(app, sql){

    var Q = app.utils.q;

    var self = {

        create: function(answers){

            qs = [];

            for(var answer in answers){
                answer = answers[answer];

                qs.push(
                    sql.insert('answer', answer).then(function(res){
                        return self.find({ id: res.insertId });
                    }).then(function(answer){
                        return answer.id;
                    })
                );
            }

            return Q.all(qs);

        },

        find: function(criteria){
            return sql.selectOne('answer', criteria);
        },

        addToQuestion: function(question, answer){
            return sql.insert(
                'answer_options', { question_id: question, answer_id: answer }
            );
        },

        score: function(answer, mark){
            return sql.update('text_answer', { right: mark }, { id: answer });
        },

        update: function(id, answer){
            return sql.update('answer', answer, { id: id }).then(function(res){
                self.find({ id: id });
            });
        }


    };

    return self;

};
