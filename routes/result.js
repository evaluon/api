module.exports = function(app){

    var Result = app.controllers.result;

    return [
    {
        method: 'get',
        url: '/results',
        action: Result.actualPeriod,
        cors: true
    },
    {
        method: 'get',
        url: '/results/:institution_id',
        action: Result.actualPeriod_byInstitution,
        cors: true
    }
    ];

}
