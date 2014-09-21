module.exports = function(sequelize, DataTypes){

    return sequelize.define('TestResponse', {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }

    }, {

        timestamps: false,

        classMethods: {

            associate: function(models){

                models.Student
                    .hasMany(models.Test, { through: models.TestResponse });

                models.Test
                    .hasMany(models.Student, { through: models.TestResponse });

                models.TestResponse
                    .belongsTo(models.Student, { foreignKeyConstraint: true })
                    .belongsTo(models.Test, { foreignKeyConstraint: true });


            }

        }

    })

}
