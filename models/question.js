module.exports = function(sequelize, DataTypes){

    return sequelize.define('Question', {

        text: {
            type: DataTypes.TEXT,
            allowNull: false
        }

    }, {

        timestamps: false,

        classMethods: {

            associate: function(models){

            }

        }

    });

};
