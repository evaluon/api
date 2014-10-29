module.exports = function(app){

    var KnowledgeArea = app.controllers.knowledgeArea;

    return [
    {
        method: 'get',
        url: '/knowledge_area',
        action: KnowledgeArea.findAll
    },
    {
        method: 'get',
        url: '/knowledge_area/:id',
        action: KnowledgeArea.find
    },
    {
        method: 'post',
        url: '/knowledge_area',
        action: KnowledgeArea.create
    },
    {
        method: 'put',
        url: '/knowledge_area/:id',
        action: KnowledgeArea.update
    }
    ]

}
