module.exports = function(app){

    var log = app.utils.log,
        User = app.db.User;

    return {

        retrieveUser: function(user){
            return User.find(user);
        },

        findByMail: function(mail){
            return User.find({ mail: mail });
        },

        createUser: function(options){
            return User.create(options);
        },

        updateUser: function(oUser, user){
            return User.update(oUser.id, user);
        }

    };

}
