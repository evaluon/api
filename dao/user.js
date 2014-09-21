module.exports = function(app){

    var log = app.utils.log,
        User = app.db.User,
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
                if(options.other){
                    var otherZone = { description: options.other };
                    otherZone.UserId = user.id;
                    return OtherZone.create(otherZone).then(function(other){
                        return user.setOtherZone(other);
                    });
                } else {
                    return user;
                }
            });
        },

        updateUser: function(options){
            return User.find(options.user.id).then(function(user){
                return user.updateAttributes(options.body);
            });
        }

    };

}
