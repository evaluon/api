module.exports = function(app){

    var testResults = app.controllers.testResults;

    return [
    {
        method: 'get',
        url: '/test/results',
        action: testResults.retrieveResults,
        cors: true
    }
    ];

}
