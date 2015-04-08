module.exports = function(app){

    var _ = app.utils._
    ,   checkFields = app.utils.checkFields
    ,   log = app.utils.log
    ,   crypto = app.utils.crypto
    ,   User = app.db.User
    ,   DaoActors = require('./actors')(app)
    ,   DaoInstitution = require('./institution')(app);

    return {

        findAll: function(values){
            return User.findAll(values);
        },

        retrieveUser: function(user){
            return User.find(user).then(function(user){
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

        findByMail: function(mail){
            return User.find({ mail: mail });
        },

        createUser: function(user){
            return checkFields(
                [
                'id', 'first_name',
                'last_name', 'mail', 'password'
                ],
                user
            ).then(function(){
                return User.create(user);
            });
        },

        updateUser: function(oUser, user){
            if(user.birth_date) user.birth_date = new Date(user.birth_date);
            return User.update(oUser.id, user);
        },

        delete: function(id){
            return User.destroy(id);
        },

        recoverPassword: function(mail){
            var password = crypto.randomBytes(8).toString('base64'),
                shasum = crypto.createHash('sha1');

            shasum.update(password);

            return this.findByMail(mail).then(function(user){
                return User.update(user.id, { password: shasum.digest('hex') });
            }).then(function(user){
                user.password = password;
                return user;
            });
        }

    };

}
