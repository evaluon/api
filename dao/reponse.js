module.exports = function(app){

    var checkFields = app.utils.checkFields,
        Response = app.db.Response;

    return {

        makeResponse: function(evalee, test, question, answer){

            return checkFields(
                ['evaluee', 'test', 'question', 'answer'],
                {
                    evaluee: evaluee,
                    test: test,
                    question: question,
                    answer: answer
                }
            ).then(function(){
                // TODO: Add constraint for OPEN but not stop_date filled test
                return Response.makeResponse(evaluee, test, question, answer);
            });

        }

    }

}
