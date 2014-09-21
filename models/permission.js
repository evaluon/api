module.exports = function(sequelize, DataTypes){

    return sequelize.define('Permission', {

        name: {
            type: DataTypes.STRING(10),
            allowNull: false
        }

    }, {

        timestamps: false,
        classMethods: {

            associate: function(models){

                models.Permission
                    .hasMany(models.Role, { through: models.RolePermission });
                    
            }
        }

    });

};
