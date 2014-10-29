module.exports = function(app){

    var KAinTest = app.controllers.kaInTest;

    return [
    {
        method: 'get',
        url: '/test/:id/knowledgeArea',
        action: KAinTest.findKAinTest,
        cors: true
    },
    {
        method: 'post',
        url: '/test/:id/knowledgeArea',
        action: KAinTest.addKAtoTest,
        cors: true
    }
    ]

}
