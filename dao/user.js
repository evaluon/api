module.exports = function(app){

    var checkFields = app.utils.checkFields,
        log = app.utils.log,
        User = app.db.User;

    return {

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
        }

    };

}
