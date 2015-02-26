module.exports = function(app){

    var disabilities = app.controllers.disabilities;

    return [
    {
        method: 'get',
        url: '/evaluee/description',
        action: disabilities.findAll,
        cors: true
    }
    ]

}
