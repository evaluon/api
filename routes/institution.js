module.exports = function(app){


    var institution = app.controllers.institution;

    return [
    {
        method: 'get',
        url: '/institution',
        action: institution.retrieveInstitutions,
        cors: true
    },
    {
        method: 'get',
        url: '/institution/:id',
        action: institution.retrieveInstitution,
        cors: true
    },
    {
        method: 'get',
        url: '/institution/:id/group',
        action: institution.retrieveInstitutionGroups,
        cors: true
    },
    {
        method: 'post',
        url: '/institution',
        action: institution.createInstitution,
        cors: true
    },
    {
        method: 'put',
        url: '/institution/:id',
        action: institution.updateInstitution,
        cors: true
    }
    ]

}
