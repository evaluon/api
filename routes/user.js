module.exports = function(app){

    var user = app.controllers.user,
        log = app.utils.log;

    return [

        {
            url: '/user/admin',
            method: 'get',
            action: user.adminList,
            cors: true
        },
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
            action: user.recoverPassword,
            cors: true
        },
        {
            url: '/user/:id',
            method: 'delete',
            action: user.deleteUser,
            cors: true
        }

    ];

};
