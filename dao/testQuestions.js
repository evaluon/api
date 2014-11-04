module.exports = function(app){

    var checkFields = app.utils.checkFields,
        TestQuestion = app.db.TestQuestion;

    return {

        testQuestions: function(test){

            return checkFields([':id'], { ':id': test }).then(function(){
                return TestQuestion.findAll(test);
            });

        },

        testQuestionsByKnowledgeArea: function(test, knowledgeArea){
            return checkFields(
                [':id', ':knowledgeArea'],
                { ':id': test, ':knowledgeArea': knowledgeArea }
            ).then(function(){
                return TestQuestion.findByKnowledgeArea(test, knowledgeArea);
            })
        },

        addQuestion: function(user, test, question){

            return checkFields(
                ['user_id', ':id', 'question_id'],
                { user_id: user, ':id': test, question_id: question }
            ).then(function(){
                return TestQuestion.add(user, test, question);
            })
        }

    }

}
