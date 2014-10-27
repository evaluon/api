module.exports = function(app){

    var responseView = require('../views/jsonSuccessResponse'),
        Dao = app.dao.user,
        log = app.utils.log,
        _ = app.utils._;

    return {

        retrieveUser: function(req, res, next){
            responseView(req.user, res);
        },

        createUser: function(req, res, next){
            if(req.user.role_id == 'admin'){

                var user = _.extend(
                    {
                        role_id: 'user',
                        register_date: new Date()
                    },
                    req.body
                );

                Dao.createUser(user).then(function(user){
                    responseView(user, res);
                }).catch(next);
            } else {
                throw new Error("Forbidden");
            }

        },

        updateUser: function(req, res, next){
            Dao.updateUser(req.user, req.body).then(function(user){
                responseView(user, res);
            }).catch(next);
        },

        deleteUser: function(req, res, next){
            Dao.updateUser(req.body).then(function(user){
                responseView(user, res);
            }).catch(next);
        }

    };

};
