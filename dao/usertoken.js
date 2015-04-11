module.exports = function(app){

    var _ = app.utils._
    ,   log = app.utils.log
    ,   User = app.db.User
    ,   UserToken = app.db.UserToken
    ,   Token = require('./token')(app)
    ,   DaoActors = require('./actors')(app)
    ,   DaoInstitution = require('./institution')(app);

    var Dao = {

        findUserToken: function(rToken){
            return Token.retrieveRefreshToken(rToken).then(function(token){
                if(token){
                    return UserToken.find({
                        token_id: token.id
                    }).then(function(token){
                        return token || false;
                    });
                } else {
                    return false;
                }
            });
        },

        associateToken: function(association){
            return UserToken.create(association);
        },

        retrieveUser: function(accessToken){
            return Token.retrieveToken(accessToken).then(function(token){
                return token ? (
                    UserToken.find({ token_id: token.id })
                ) : false;
            }).then(function(userToken){
                return userToken ? (
                    User.find({ id: userToken.user_id })
                ) : false;
            }).then(function(user){
                user = _.omit(user, "password");

                if(user.role_id == 'admin'){
                    user.role = 8;
                    return user;
                } else {
                    return DaoActors.actorRole(user).then(function(role){
                        user.role = role;
                        if(role == 4){
                            return DaoInstitution.findInstitution(
                                { evaluator_id: user.id }
                            ).then(function(institution){
                                user.institution_id = institution.id;
                                return user;
                            });
                        } else if(role == 1){
                            return DaoActors.isEvaluee(
                                user.id
                            ).then(function(evaluee){
                                user.evaluee = evaluee;
                                return user;
                            });
                        } else {
                            return user;
                        }
                    });
                }
            });
        },

        retrieveToken: function(user){

            return UserToken.findActive(
                user.id
            ).then(function(token){

                return token || Token.createToken().then(function(token){
                    return Dao.associateToken({
                        token_id: token.id,
                        user_id: user.id
                    }).then(function(){
                        return token;
                    });
                });

            });

        }

    };

    return Dao;

};
