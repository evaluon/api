module.exports = function(app){

    var log = app.utils.log,
        Dao = app.dao.group,
        responseView = require('../views/jsonSuccessResponse');

    return {

        findGroups: function(req, res, next){
            Dao.findGroups(req.params.inst_id).then(function(groups){
                responseView(groups, res);
            }).catch(next);
        },

        findGroup: function(req, res, next){
            Dao.findGroup(
                req.params.inst_id, req.params.id
            ).then(function(groups){
                responseView(groups, res);
            }).catch(next);
        },

        createGroup: function(req, res, next){
            Dao.createGroup(req.body).then(function(){
                responseView(false, res);
            }).catch(next);
        },

        updateGroup: function(req, res, next){
            Dao.updateGroup(req.params.id, req.body).then(function(group){
                responseView(group, res);
            }).catch(next);
        }


    }

}
