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
            log.debug(req.user, req.user.role);
            var promise = (
                (
                    req.user.role == 1 &&
                    Dao.userTestQuestionsByKnowledgeArea(
                        req.params.id, req.params.knowledgearea, req.user.id
                    )
                ) ||
                (
                    Dao.testQuestionsByKnowledgeArea(
                        req.params.id, req.params.knowledgearea
                    )
                )
            );

            promise.then(function(tests){
                responseView(tests, res);
            }).catch(next);
        },

        addQuestion: function(req, res, next){
            Dao.addQuestion(
                req.user.id, req.params.id, req.body.question_id
            ).then(function(){
                responseView(false, res);
            }).catch(next);
        }

    };

};
