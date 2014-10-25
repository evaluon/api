module.exports = function(app){

    var Test = app.dao.test,
        Questions = app.dao.questions,
        Result = app.dao.result,
        responseView = require('../views/jsonSuccessResponse');

    return {

        addSelfTest: function(req, res, next){

            Test.createSelfTest(req.user).then(function(test){
                responseView(test, res);
            }).catch(next);

        },

        listSelfTest: function(req, res, next){

            Test.listSelfTest(req.user).then(function(test){
                responseView(test, res);
            }).catch(next);

        },

        testDetail: function(req, res, next){

            Questions.retrieveQuestions(req.params.id).then(function(questions){
                responseView(questions, res);
            }).catch(next);

        },

        answerQuestion: function(req, res, next){

            Questions.answerQuestion(req.body).then(function(){
                return responseView(false, res);
            }).catch(next);

        },

        testResult: function(req, res, next){

            Result.testResults(req.params.id).then(function(results){
                responseView(results, res);
            }).catch(next);

        }

    }

}
