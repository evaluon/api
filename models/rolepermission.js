module.exports = function(sequelize, DataTypes){

    return sequelize.define('RolePermission', {

    }, {

        timestamps: false,

        classMethods: {

            associate: function(models){

                models.RolePermission
                    .belongsTo(models.Role, { foreignKeyconstraint: true })
                    .belongsTo(models.Permission, { foreignKeyConstraint: true });

            }

        }

    })

}
