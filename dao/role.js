module.exports = function(app){

    var log = app.utils.log,
        Role = app.db.Role,
        Permission = require('./permission')(app);

    return {

        createRole: function(role){
            return Role.create(role);
        },

        retrieveRole: function(id){
            return Role.find(id);
        },

        addPermission: function(role, id){

            return Permission.retrievePermission(id).then(function(permission){
                return role.addPermission(permission);
            });
        }
        
    };

}
