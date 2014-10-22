module.exports = function(app){

    var Average = app.controllers.average;

    return [

    {
        method: 'get',
        url: '/average/period/:id',
        action: Average.retrieveByPeriod,
        cors: true
    },
    {
        method: 'get',
        url: '/average/institution/:id',
        action: Average.retrieveByInstitution,
        cors: true
    },
    {
        method: 'get',
        url: '/average/knowledgearea/:id',
        action: Average.retrieveByKnowledgeArea,
        cors: true
    }


    ];

}
