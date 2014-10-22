module.exports = function(app){

    var SelfTest = app.controllers.selftest;

    return [
    {
        method: 'get',
        url: '/test',
        action: SelfTest.listSelfTest,
        cors: true
    },
    {
        method: 'get',
        url: '/test/:id',
        action: SelfTest.testDetail,
        cors: true
    },
    {
        method: 'post',
        url: '/test',
        action: SelfTest.addSelfTest,
        cors: true
    },
    {
        method: 'post',
        url: '/question',
        action: SelfTest.answerQuestion,
        cors: true
    },
    {
        method: 'get',
        url: '/result/:id',
        action: SelfTest.testResult,
        cors: true
    }
    ];


};
