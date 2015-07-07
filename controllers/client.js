module.exports = function(app){

    var log = app.utils.log,
        Dao = app.dao.client,
        responseView = require('../views/jsonSuccessResponse');

    return {

        create: function(req, res, next){

            if(req.user.role == 'admin'){
                Dao.createClient(req.body).then(function(client){
                    responseView(client, res);
                }).catch(next);
            } else {
                throw {
                    message: "insuficient_privileges",
                    statusCode: 401
                };
            }

        }

    };

};
