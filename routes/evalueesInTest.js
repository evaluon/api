module.exports = function(app){

    var evalueesInTest = app.controllers.evalueesInTest;

    return [
    {
        method: 'get',
        url: '/test/:test/:group',
        action: evalueesInTest.evalueesInTest,
        cors: true
    }
    ]

}
