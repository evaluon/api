module.exports = function(app){

    var log = app.utils.log,
        Dao = app.dao.answer,
        responseView = require('../views/jsonSuccessResponse');


    return {

        create: function(req, res, next){

            Dao.create(req.body).then(function(answers){
                responseView(answers, res);
            }).catch(next);

        },

        addToQuestion: function(req, res, next){

            Dao.addToQuestion(req.params.id, req.params.answer).then(function(){
                responseView(false, res);
            }).catch(next);

        },

        score: function(req, res, next){

            Dao.score(req.params.id, req.body.mark).then(function(){
                responseView(false, res);
            }).catch(next);

        },

        update: function(req, res, next){
            Dao.update(req.params.id, req.body).then(function(data){
                responseView(data, res);
            }).catch(next);
        }

    };

};
