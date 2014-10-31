module.exports = function(app){

    var TestQuestions = app.controllers.testQuestions;

    return [
    {
        method: 'get',
        url: '/test/:id/question',
        action: TestQuestions.testQuestions,
        cors: true
    },
    {
        method: 'get',
        url: '/test/:id/question/:knowledgeArea',
        action: TestQuestions.testQuestionsByKnowledgeArea,
        cors: true
    },
    {
        method: 'put',
        url: '/test/:id/question',
        action: TestQuestions.addQuestion,
        cors: true
    }
    ]

}
