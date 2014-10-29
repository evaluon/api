module.exports = function(app){

    var GroupTest = app.controllers.grouptest;

    return [
    {
        method: 'get',
        url: '/test/group/:id/',
        action: GroupTest.findActive,
        cors: true
    },
    {
        method: 'get',
        url: '/test/group/:id/all',
        action: GroupTest.findAll,
        cors: true
    },
    {
        method: 'post',
        url: '/test/group/:id',
        action: GroupTest.create,
        cors: true
    }
    ]

}
