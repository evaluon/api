module.exports = function(app){

    var responseView = require('../views/jsonSuccessResponse'),
        Dao = app.dao.user,
        log = app.utils.log;

    return {

        retrieveUser: function(req, res, next){
            responseView(req.user, res);
        },

        createUser: function(req, res, next){
            if(req.user.RoleId == 'admin'){
                Dao.createUser(req.body).then(function(user){
                    responseView(user, res);
                }).catch(next).error(next);
            } else {
                throw new Error("Forbidden");
            }

        },

        updateUser: function(req, res, next){
            Dao.updateUser(req.body).then(function(user){
                responseView(user, res);
            }).catch(next).error(next);
        },

        deleteUser: function(req, res, next){
            Dao.updateUser(req.body).then(function(user){
                responseView(user, res);
            }).catch(next).error(next);
        }

    };

};
