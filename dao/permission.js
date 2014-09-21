module.exports = function(app){

    var Permission = app.db.Permission;

    return {

        createPermission: function(permission){
            return Permission.create(permission);
        },

        retrievePermissions: function(){
            return Permission.all();
        },

        retrievePermission: function(id){
            return Permission.find(id);
        }

    }


}
