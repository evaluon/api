module.exports = function(app){

    var test = app.controllers.test;

    return [
    {
        method: 'get',
        url: '/test',
        action: test.findAll,
        cors: true
    },
    {
        method: 'get',
        url: '/test/:id',
        action: test.find,
        cors: true
    },
    {
        method: 'post',
        url: '/test',
        action: test.create,
        cors: true
    },
    {
        method: 'put',
        url: '/test/:id',
        action: test.update,
        cors: true
    }
    ]

}
