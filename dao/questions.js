module.exports = function(app){

    var Test = app.db.Test,
        Question = app.db.Question,
        AnswerOption = app.db.AnswerOption,
        UserAnswer = app.db.UserAnswer;


    return {

        retrieveQuestions: function(testId){

            return Test.findAll({
                include: [
                {
                    model: Question,
                    include: [ AnswerOption ]
                }
                ],
                where: {
                    id: testId
                }
            });

        },

        answerQuestion: function(options){

            return UserAnswer.create(options).then(function(){
                return;
            })

        }

    };

};
