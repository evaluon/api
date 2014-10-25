module.exports = function(app){

    var log = app.utils.log,
        Dao = app.dao.institution,
        responseView = require('../views/jsonSuccessResponse');

    return {

        retrieveInstitution: function(req, res, next){
            return Dao.retrieveInstitution(
                req.params.id
            ).then(function(institution){
                responseView(institution, res);
            }).catch(next);
        },

        retrieveInstitutions: function(req, res, next){
            return Dao.retrieveInstitutions().then(function(institutions){
                responseView(institutions, res);
            }).catch(next);
        },

        createInstitution: function(req, res, next){
            return Dao.createInstitution(req.body).then(function(institution){
                responseView(institution, res);
            }).catch(next);
        },

        updateInstitution: function(req, res, next){
            return Dao.updateInstitution(
                req.body.id,
                req.body
            ).then(function(institution){
                responseView(institution, res);
            }).catch(next);
        }

    }

}
