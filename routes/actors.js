module.exports = function(app){

    var actors = app.controllers.actors;

    return [

    {
        method: 'post',
        url: '/evaluator',
        action: actors.setEvaluator,
        cors: true
    },
    {
        method: 'get',
        url: '/evaluator/group',
        action: actors.evaluatorGroups,
        cors: true
    },
    {
        method: 'post',
        url: '/evaluee',
        action: actors.setEvaluee,
        cors: true
    },
    {
        method: 'get',
        url: '/evaluee/group',
        action: actors.evalueeGroups,
        cors: true
    }

    ];

}
