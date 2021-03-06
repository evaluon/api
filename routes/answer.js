module.exports = function(app){

    var answer = app.controllers.answer;

    return [
        {
            method: 'post',
            url: '/answer',
            action: answer.create,
            cors: true
        },
        {
            method: 'put',
            url: '/answer/:id',
            action: answer.score,
            cors: true
        },
        {
            method: 'put',
            url: '/question/:id/answer/:answer',
            action: answer.addToQuestion,
            cors: true
        },
        {
            method: 'put',
            url: '/answers/:id',
            action: answer.update,
            cors: true
        }
    ];

};
