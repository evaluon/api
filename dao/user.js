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

        updateUser: function(options){
            return User.update(options.user.id, options.user);
        }

    };

}
