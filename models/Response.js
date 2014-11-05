module.exports = function(app, sql){

    var log = app.utils.log;

    return {

        makeResponse: function(evaluee, test, question, answer){

            var row = {
                evaluee_id: evaluee,
                test_id: test,
                question_id: question,
                answer_id: answer
            };

            log.debug(row);

            return sql.insert('response', row);
        }

    }

}
