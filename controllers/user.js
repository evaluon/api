module.exports = function(app){

    var responseView = require('../views/jsonSuccessResponse'),
        Dao = app.dao.user,
        DaoActors = app.dao.actors,
        DaoInstitution = app.dao.institution,
        log = app.utils.log,
        _ = app.utils._;

    return {

        retrieveUser: function(req, res, next){
            var user = _.omit(req.user, 'password');
            if(user.role_id == 'admin'){
                user.role = 8;
                responseView(user, res);
            } else {
                DaoActors.actorRole(user).then(function(role){
                    user.role = role;
                    if(role == 4){
                        return DaoInstitution.findInstitution(
                            { evaluator_id: user.id }
                        ).then(function(institution){
                            user.institution_id = institution.id;
                            return user;
                        });
                    } else {
                        return user;
                    }
                }).then(function(user){
                    responseView(user, res);
                });
            }

        },

        createUser: function(req, res, next){
            if(req.user.role_id == 'admin'){

                var user = _.extend(
                    {
                        role_id: req.body.role_id || 'user',
                        register_date: new Date()
                    },
                    req.body
                );

                Dao.createUser(user).then(function(user){
                    responseView(user, res);
                }).catch(next);
            } else {
                throw {
                    message: "invalid_permissions",
                    statusCode: 403
                }
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
