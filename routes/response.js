module.exports = function(app){

    var response = app.controllers.response;

    return [
    {
        method: 'post',
        url: '/response',
        action: response.makeResponse,
        cors: true
    }
    ]

}
