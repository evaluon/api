module.exports = function(sequelize, DataTypes){

    return sequelize.define('UserAnswer', {
    }, {

        updatedAt: false,

        classMethods: {

            associate: function(models){

                models.Answer
                    .hasMany(models.TestResponse, { through: models.UserAnswer });

                models.TestResponse
                    .hasMany(models.Answer, { through: models.UserAnswer });

                models.UserAnswer
                    .belongsTo(models.TestResponse, { foreignKeyConstraint: true })
                    .belongsTo(models.Answer, { foreignKeyConstraint: true });


            }

        }

    });

}
