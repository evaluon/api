module.exports = function(app){

    var Results = app.controllers.results;

    return [

    {
        method: 'get',
        url: '/results/period/:id',
        action: Results.retrieveByPeriod,
        cors: true
    },
    {
        method: 'get',
        url: '/results/institution/:id',
        action: Results.retrieveByInstitution,
        cors: true
    },
    {
        method: 'get',
        url: '/results/knowledgearea/:id',
        action: Results.retrieveByKnowledgeArea,
        cors: true
    }


    ];

}
