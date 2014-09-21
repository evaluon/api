module.exports = function(sequelize, DataTypes){

    return sequelize.define('Token', {

        accessToken: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        refreshToken: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }

    }, {

        createdAt: false,
        updatedAt: 'issued',
        deletedAt: 'expired',
        paranoid: true,

    });

};
