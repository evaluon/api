module.exports = function(sequelize, DataTypes){

    return sequelize.define('Student', {
        id_card: {
            type: DataTypes.STRING(13),
            unique: true,
            allowNull: false
        }
    }, {

        timestamps: false,

        classMethods: {

            associate: function(models){

                models.Student
                    .belongsTo(models.User, { foreignKeyConstraint: true });

            }

        }

    });

};
