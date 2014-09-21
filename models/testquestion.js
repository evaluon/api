module.exports = function(sequelize, DataTypes){

    return sequelize.define('TestQuestion', {

    }, {

        timestamps: false,

        classMethods: {

            associate: function(models){

                models.Test
                    .hasMany(models.Question, { through: models.TestQuestion })

                models.Question
                    .hasMany(models.Test, { through: models.TestQuestion })

                models.TestQuestion
                    .belongsTo(models.Test, { foreignKeyConstraint: true })
                    .belongsTo(models.Question, { foreignKeyConstriant: true });

            }

        }

    });

};
