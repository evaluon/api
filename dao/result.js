module.exports = function(app){

    var Test = app.db.Test,
        TestResponse = app.db.TestResponse,
        Question = app.db.Question,
        Answer = app.db.Answer,
        AnswerOption = app.db.AnswerOption,
        UserAnswer = app.db.UserAnswer;

    return {

        testResults: function(testResponseId){

            var sql = "SELECT t.* " +
                    "FROM Test t, TestResponse tr " +
                    "WHERE t.id = tr.TestId";

            return TestResponse.findAll({
                include: [
                {
                    model: Test,
                    include: [
                    {
                        model: Question,
                        include: [
                        {
                            model: AnswerOption,
                            include: [
                            {
                                model: Answer,
                                include: [ UserAnswer ]
                            }
                            ]
                        }
                        ]
                    }
                    ]
                }
                ],
                where: {
                    id: testResponseId
                }
            })


        }

    };

};
