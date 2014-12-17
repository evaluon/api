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
        url: '/evaluator',
        action: actors.evaluatorList,
        cors: true
    },
    {
        method: 'get',
        url: '/evaluator/group',
        action: actors.evaluatorGroups,
        cors: true
    },
    {
        method: 'get',
        url: '/evaluator/group/:id',
        action: actors.findEvaluatorGroups,
        cors: true
    },
    {
        method: 'get',
        url: '/evaluee',
        action: actors.evalueeList,
        cors: true
    },
    {
        method: 'post',
        url: '/evaluee',
        action: actors.setEvaluee,
        cors: true
    },
    {
        method: 'put',
        url: '/evaluee',
        action: actors.updateEvaluee,
        cors: true
    },
    {
        method: 'get',
        url: '/evaluee/group',
        action: actors.evalueeGroups,
        cors: true
    },
    {
        method: 'delete',
        url: '/evaluee/group',
        action: actors.blockEvaluee,
        cors: true
    }

    ];

}
