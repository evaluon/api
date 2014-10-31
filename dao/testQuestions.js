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

        addQuestion: function(test, question){

            return checkFields(
                [':id', 'question_id'], { ':id': test, question_id: question }
            ).then(function(){
                return TestQuestion.add(test, question);
            })
        }

    }

}
