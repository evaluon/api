module.exports = function(app){

    var period = app.controllers.period;

    return [
    {
        method: 'get',
        url: '/period/:id',
        action: period.retrievePeriods,
        cors: true
    },
    {
        method: 'post',
        url: '/period',
        action: period.createPeriod,
        cors: true
    }
    ]

}
