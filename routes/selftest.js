module.exports = function(app){

    var SelfTest = app.controllers.selftest;

    return [
    {
        method: 'get',
        url: '/test/self/all',
        action: SelfTest.findAll,
        cors: true
    },
    {
        method: 'get',
        url: '/test/self',
        action: SelfTest.find,
        cors: true
    },
    {
        method: 'post',
        url: '/test/self',
        action: SelfTest.setSelfTest,
        cors: true
    }
    ];


};
