module.exports = function(app){

    var gamification = app.controllers.gamification;

    return [
    {
        method: 'get',
        url: '/indicator',
        action: gamification.indicators,
        cors: true
    }
    ]

}
