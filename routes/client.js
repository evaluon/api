module.exports = function(app){

    var client = app.controllers.client;

    return [
    {
        method: 'post',
        url: '/client',
        action: client.create,
        cors: true
    }
    ]

}
