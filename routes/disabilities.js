module.exports = function(app){

    var disabilities = app.controllers.disabilities;

    return [
    {
        method: 'get',
        url: '/disability',
        action: disabilities.findAll,
        cors: true
    }
    ]

}
