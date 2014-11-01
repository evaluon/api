module.exports = function(app){

    var KnowledgeArea = app.controllers.knowledgeArea;

    return [
    {
        method: 'get',
        url: '/knowledgeArea',
        action: KnowledgeArea.findAll,
        cors: true
    },
    {
        method: 'get',
        url: '/knowledgeArea/:id',
        action: KnowledgeArea.find,
        cors: true
    },
    {
        method: 'get',
        url: '/test/:id/knowledgeArea',
        action: KnowledgeArea.findByTest,
        cors: true
    },
    {
        method: 'post',
        url: '/knowledgeArea',
        action: KnowledgeArea.create,
        cors: true
    },
    {
        method: 'put',
        url: '/knowledgeArea/:id',
        action: KnowledgeArea.update,
        cors: true
    }
    ]

}
