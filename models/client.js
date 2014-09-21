module.exports = function(sequelize, DataTypes){

    return sequelize.define('Client', {

        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        secret: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        }

    }, {

        timestamps: false,

        classMethods: {

            associate: function(models){

                models.Client
                    .hasMany(models.Token, { through: models.ClientToken })
                    .belongsTo(models.Role, { foreignKeyConstraint: true });

            }

        }

    });

};
