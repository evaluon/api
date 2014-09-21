module.exports = function(sequelize, DataTypes){

    return sequelize.define('User', {

        firstName : {
            type: DataTypes.STRING(96),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(96),
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING(10),
            unique: true,
            allowNull: false
        },
        mail: {
            type: DataTypes.STRING(128),
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(40),
            allowNull: false
        }

    }, {

        timestamps: false,
        classMethods : {

            associate: function(models){

                models.User
                    .hasOne(models.Student)
                    .belongsTo(models.Role, { foreignKeyConstriant: true });

            }

        }
    });

};
