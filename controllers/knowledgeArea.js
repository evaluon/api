module.exports = function(app){

    var log = app.utils.log,
        Dao = app.dao.knowledgeArea,
        responseView = require('../views/jsonSuccessResponse');

    return {

        findAll: function(req, res, next){

            var switcher = (req.query.unapproved ?
                Dao.findUnapproved :
                Dao.findApproved
            );
            switcher().then(function(knowledgeAreas){
                responseView(knowledgeAreas, res);
            }).catch(next);
        },

        create: function(req, res, next){
            Dao.create(req.user.id, req.body).then(function(knowledgeArea){
                responseView(false, res);
            }).catch(next);
        },

        find: function(req, res, next){
            Dao.find(req.params.id).then(function(knowledge_area){
                responseView(knowledge_area);
            }).catch(next);
        },

        approve: function(req, res, next){
            Dao.updateTicket(req.params.id, { approved: 1 }).then(function(){
                responseView(false, res);
            }).catch(next);
        },

        unapprove: function(req, res, next){
            Dao.updateTicket(req.params.id, req.body).then(function(){
                responseView(false, res);
            }).catch(next);
        }

    }

}
