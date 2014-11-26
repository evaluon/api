module.exports = function(app){

    var openedTests = app.controllers.openedTests;

    return [
    {
        method: 'post',
        url: '/test/:id/open',
        action: openedTests.openTest,
        cors: true
    },
    {
        method: 'post',
        url: '/test/:id/close',
        action: openedTests.closeTest,
        cors: true
    },/*
    {
        method: 'post',
        url: '/test/:id/feedback',
        action: openedTests.feedbackTest,
        cors: true
    }*/
    ]

}
