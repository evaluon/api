module.exports = function(app){

    var KnowledgeArea = app.controllers.knowledgeArea;

    return [
    {
        method: 'get',
        url: '/knowledgearea',
        action: KnowledgeArea.findAll,
        cors: true
    },
    {
        method: 'get',
        url: '/knowledgearea/:id',
        action: KnowledgeArea.find,
        cors: true
    },
    {
        method: 'post',
        url: '/knowledgearea',
        action: KnowledgeArea.create,
        cors: true
    },
    {
        method: 'put',
        url: '/knowledgearea/:id',
        action: KnowledgeArea.update,
        cors: true
    }
    ]

}
