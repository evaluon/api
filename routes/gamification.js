module.exports = function(app){

    var gamification = app.controllers.gamification;

    return [
    {
        method: 'get',
        url: '/gamification',
        action: gamification.indicators,
        cors: true
    }
    ]

}
