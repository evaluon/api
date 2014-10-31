module.exports = function(app){

    var log = app.utils.log,
        Dao = app.dao.testQuestions,
        responseView = require('../views/jsonSuccessResponse');

    return {

        testQuestions: function(req, res, next){
            Dao.testQuestions(req.params.id).then(function(questions){
                responseView(questions, res);
            }).catch(next);
        },

        testQuestionsByKnowledgeArea: function(req, res, next){
            Dao.testQuestionsByKnowledgeArea(
                req.params.id, req.params.knowledgeArea
            ).then(function(tests){
                log.debug(tests);
                responseView(tests, res);
            }).catch(next);
        },

        addQuestion: function(req, res, next){
            Dao.addQuestion(req.params.id, req.body.question_id).then(function(q){
                responseView(q, res);
            }).catch(next);
        }

    }

}
