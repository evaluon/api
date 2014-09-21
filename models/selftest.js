module.exports = function(sequelize, DataTypes){

    return sequelize.define('SelfTest', {
    }, {

        updatedAt: false,

        classMethods: {

            associate: function(models){

                models.Student
                    .hasMany(models.Test, { through: models.SelfTest });

                models.Test
                    .hasMany(models.Student, { through: models.SelfTest });

                models.SelfTest
                    .belongsTo(models.Student, { foreignKeyConstraint: true })
                    .belongsTo(models.Test, { foreignKeyConstraint: true });

            }

        }

    })

}
