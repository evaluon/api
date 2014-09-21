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
        method: 'post',
        url: '/test',
        action: SelfTest.addSelfTest,
        cors: true
    }
    ];


};
