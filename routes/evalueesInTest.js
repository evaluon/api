module.exports = function(app){

    var evalueesInTest = app.controllers.evalueesInTest;

    return [
    {
        method: 'get',
        url: '/evaluee/test',
        action: evalueesInTest.evalueesInTest,
        cors: true
    }
    ]

}
