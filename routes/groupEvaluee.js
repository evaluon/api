module.exports = function(app){

    var group = app.controllers.groupEvaluee;

    return [
    {
        method: 'get',
        url: '/group/:id/evaluee',
        action: group.groupEvaluees,
        cors: true
    },
    {
        method: 'put',
        url: '/group/:id/evaluee',
        action: group.addEvaluees,
        cors: true
    }
    ]

}
