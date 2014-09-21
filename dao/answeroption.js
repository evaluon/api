module.exports = function(app){

    var AnswerOption = app.db.AnswerOption;

    return {

        create: function(answerOption){

            return AnswerOption.create(answerOption);

        }

    };

};
