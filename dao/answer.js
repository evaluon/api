module.exports = function(app){

    var _ = app.utils._,
        log = app.utils.log,
        checkFields = app.utils.checkFields,
        Answer = app.db.Answer;

    return {

        create: function(answers){

            return checkFields(
                ['description_text', 'right'], answers
            ).then(function(){
                return Answer.create(answers);
            });

        },

        addToQuestion: function(question, answer){

            return checkFields(
                [':id', ':answer'], { ':id': question, ':answer': answer }
            ).then(function(){
                return Answer.addToQuestion(question, answer);
            });

        },

        score: function(answer, mark){

            return checkFields(
                ['answer', 'mark'], { answer: answer, mark: mark }
            ).then(function(){
                return Answer.score(answer, mark);
            });

        },

        update: function(id, answer){
            return Answer.update(id, answer);
        }

    };

};
