module.exports = function(sequelize, DataTypes){

    return sequelize.define('UserToken', {}, {

        timestamps: false,

        classMethods : {

            associate: function(models){

                models.Token
                    .hasMany(models.User, { through: models.UserToken });

                models.Client
                    .hasMany(models.User, { through: models.UserToken });

                models.User
                    .hasMany(models.Token, { through: models.UserToken })
                    .hasMany(models.Client, { through: models.UserToken });

                models.UserToken
                    .belongsTo(models.User, { foreignKeyConstraint: true })
                    .belongsTo(models.Token, { foreignKeyConstraint: true })
                    .belongsTo(models.Client, { foreignKeyConstraint: true });

            }

        }

    });

};
