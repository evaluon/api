module.exports = function(app, sql){

    var log = app.utils.log;

    return {

        makeResponse: function(evaluee, test, question, answer, text){

            var row = {
                evaluee_id: evaluee,
                test_id: test,
                question_id: question,
                answer_id: answer
            };

            return sql.insert('response', row).then(function(res){

                return sql.selectOne(
                    'question', { id: question }
                ).then(function(q){
                    if(q.open) {
                        return sql.insert(
                            'text_answer',
                            {
                                response_id: res.insertId,
                                answer_text: text,
                                right: null
                            }
                        )
                    }
                    return true;
                });

            });


        },

        score: function(answer, mark){
            return sql.update('text_answer', { right: mark }, { id: answer });
        }


    }

}
