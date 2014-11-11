module.exports = function(app){

    var log = app.utils.log,
        Dao = app.dao.question,
        Image = app.dao.image,
        responseView = require('../views/jsonSuccessResponse');

    return {

        create: function(req, res, next){
            Dao.create(req.user.id, req.body).then(function(question){
                responseView(question, res);
            }).catch(next);
        },

        addImage: function(req, res, next){
            Image.addQuestionImage(req.params.id, req.body).then(function(){
                responseView(false, res);
            }).catch(next);
        }

    };

}
