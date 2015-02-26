module.exports = function(app){

    var testResults = app.controllers.testResults;

    return [
    {
        method: 'get',
        url: '/test/:id/results',
        action: testResults.retrieveResults,
        cors: true
    }
    ];

}
