module.exports = function(app, sql){

    return {

        makeResponse: function(evaluee, test, question, answer){
            return sql.insert(
                'response',
                {
                    evaluee_id: evaluee,
                    test_id: test,
                    question_id: question,
                    answer_id: answer
                }
            );
        }

    }

}
