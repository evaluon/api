module.exports = function(app){

    var log = app.utils.log,
        User = app.db.User,
        Student = app.db.Student,
        OtherZone = app.db.OtherZone;

    return {

        retrieveUser: function(user){
            return User.find({
                where: user
            });
        },

        findByMail: function(mail){
            return User.find({
                where: {
                    mail: mail
                }
            })
        },

        createUser: function(options){
            return User.create(options).then(function(user){
                return user.updateAttributes({ RoleId: 'user' });
            }).then(function(user){
                return Student.create({ UserId: user.id });
            }).then(function(student){
                return Student.user;
            });
        },

        updateUser: function(options){
            return User.find(options.user.id).then(function(user){
                return user.updateAttributes(options.body);
            });
        }

    };

}
