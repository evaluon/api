module.exports = function(app){

    var log = app.utils.log,
        Question = app.db.Question;

    return {

        retrieveQuestion: function(id){

            return Question.find(id);

        },

        createQuestion: function(question){

            return Question.create(question);

        },

        updateQuestion: function(id, options){

            return Question.find(id).then(function(question){
                return question.updateAttributes(options);
            })

        },

        deleteQuestion: function(id){

            return Question.find(id).then(function(question){
                return question.destroy();
            })

        }

    };

};
