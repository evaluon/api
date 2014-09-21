module.exports = function(app){

    var user = app.controllers.user,
        log = app.utils.log;

    return [

        {
            url: '/user',
            method: 'get',
            action: user.retrieveUser,
            cors: true
        },
        {
            url: '/user',
            method: 'post',
            action: user.createUser,
            cors: true
        },
        {
            url: '/user',
            method: 'put',
            action: user.updateUser,
            cors: true
        },
        {
            url: '/user',
            method: 'delete',
            action: user.deleteUser,
            cors: true
        }

    ];

};
