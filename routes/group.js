module.exports = function(app){

    var group = app.controllers.group;

    return [
    {
        method: 'get',
        url: '/group/:inst_id',
        action: group.findGroups,
        cors: true
    },
    {
        method: 'post',
        url: '/group',
        action: group.createGroup,
        cors: true
    },
    {
        method: 'put',
        url: '/group',
        action: group.updateGroup,
        cors: true
    }
    ]

}
