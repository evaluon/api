module.exports = function(app){

    var log = app.utils.log,
        Dao = app.dao.question,
        responseView = require('../views/jsonSuccessResponse');

    return {

        create: function(req, res, next){
            Dao.create(req.user.id, req.body).then(function(question){
                responseView(question, res);
            }).catch(next);
        }

    };

}
