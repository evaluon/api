module.exports = function(app){

    var checkFields = app.utils.checkFields,
        log = app.utils.log,
        crypto = app.utils.crypto,
        User = app.db.User;

    return {

        findAll: function(values){
            return User.findAll(values);
        },

        retrieveUser: function(user){
            return User.find(user);
        },

        findByMail: function(mail){
            return User.find({ mail: mail });
        },

        createUser: function(user){
            return checkFields(
                [
                'id', 'first_name',
                'last_name', 'birth_date',
                'mail', 'password'
                ],
                user
            ).then(function(){
                return User.create(user);
            });
        },

        updateUser: function(oUser, user){
            return User.update(oUser.id, user);
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
