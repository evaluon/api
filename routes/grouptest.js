module.exports = function(app){

    var GroupTest = app.controllers.grouptest;

    return [
    {
        method: 'get',
        url: '/test/group/:id/active',
        action: GroupTest.findActive,
        cors: true
    },
    {
        method: 'get',
        url: '/test/group/:id',
        action: GroupTest.findAll,
        cors: true
    },
    {
        method: 'post',
        url: '/test/group',
        action: GroupTest.create,
        cors: true
    }
    ]

}
