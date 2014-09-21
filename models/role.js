module.exports = function(sequelize, DataTypes){

    var _ = require('underscore');

    return sequelize.define('Role', {

        name: {
            type: DataTypes.STRING,
            primaryKey: true
        }

    }, {

        timestamps: false,

        getterMethods: {

            id: function(){
                return _.reduce(this.permissions, function(prev, permissions){
                    return prev | permission.id;
                }, 0);
            }

        },

        classMethods: {

            associate: function(models){

                models.Role
                    .hasMany(models.Permission, { through: models.RolePermission })
                    .hasMany(models.Client, { foreignKeyConstraint: true })
                    .hasMany(models.User, { foreignKeyConstraint: true });

            }

        }

    });

};
