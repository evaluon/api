module.exports = function(app){

    var log = app.utils.log,
        Dao = app.dao.answer,
        responseView = require('../views/jsonSuccessResponse');


    return {

        create: function(req, res, next){

            Dao.create(req.body).then(function(answers){
                responseView(answers, res);
            }).catch(next);

        }

    }

}
