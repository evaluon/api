module.exports = function(sequelize, DataTypes){

    return sequelize.define('Answer', {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        right: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }

    }, {

        timestamps: false,

        classMethods: {

            associate: function(models){

                models.Question
                    .hasMany(models.AnswerOption, { through: models.Answer });

                models.AnswerOption
                    .hasMany(models.Question, { through: models.Answer });

                models.Answer
                    .belongsTo(models.Question, { foreignKeyConstraint: true })
                    .belongsTo(models.AnswerOption, { foreignKeyConstraint: true });

            }

        }

    });

}
