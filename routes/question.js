module.exports = function(app){

    var question = app.controllers.question;

    return [
    {
        method: 'post',
        url: '/question',
        action: question.create,
        cors: true
    }
    ]

}
