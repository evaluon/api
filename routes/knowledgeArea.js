module.exports = function(app){

    var KnowledgeArea = app.controllers.knowledgeArea;

    return [
    {
        method: 'get',
        url: '/knowledgeArea',
        action: KnowledgeArea.findAll
    },
    {
        method: 'get',
        url: '/knowledgeArea/:id',
        action: KnowledgeArea.find
    },
    {
        method: 'post',
        url: '/knowledgeArea',
        action: KnowledgeArea.create
    },
    {
        method: 'put',
        url: '/knowledgeArea/:id',
        action: KnowledgeArea.update
    }
    ]

}
