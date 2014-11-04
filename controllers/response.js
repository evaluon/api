module.exports = function(app){

    var log = app.utils.log,
        Dao = app.dao.response,
        responseView = require('../views/jsonSuccessResponse');

    return {

        makeResponse: function(req, res, next){
            // TODO: Add restrictions to avoid an user whose test isn't active
            // respond a question
            Dao.makeResponse(
                req.user.id,
                req.body.test_id,
                req.body.question_id,
                req.body.answer_id
            ).then(function(){
                responseView(false, res);
            }).catch(next);
        }

    }

}
