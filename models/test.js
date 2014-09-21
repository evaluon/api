module.exports = function(sequelize, DataTypes){

    return sequelize.define('Test', {

    }, {

        createdAt: "startDate",
        updatedAt: false,

        classMethods: {

            associate: function(models){
                
            }

        }

    });

};
