module.exports = function(app){

    var answer = app.controllers.answer;

    return [
    {
        method: 'post',
        url: '/answer',
        action: answer.create,
        cors: true
    }
    ]

}
