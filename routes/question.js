module.exports = function(app){

    var question = app.controllers.question,
        image = app.controllers.image;

    return [
    {
        method: 'post',
        url: '/question',
        action: question.create,
        cors: true
    },
    {
        method: 'put',
        url: '/question/:id/image',
        action: image.createQuestionImage,
        cors: true
    }
    ]

}
