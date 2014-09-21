module.exports = function(sequelize, DataTypes){

    return sequelize.define('ClientToken', {}, {

        timestamps: false,

        classMethods : {

            associate: function(models){

                models.Client
                    .hasMany(models.Token, { through: models.ClientToken });

                models.Token
                    .hasMany(models.Client, { through: models.ClientToken });

                models.ClientToken
                    .belongsTo(models.Token, { foreignKeyConstraint: true })
                    .belongsTo(models.Client, { foreignKeyConstraint: true });

            }

        }

    });

};
