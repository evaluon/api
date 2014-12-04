module.exports = function(app){

    var log = app.utils.log,
        Dao = app.dao.knowledgeArea,
        responseView = require('../views/jsonSuccessResponse');

    return {

        create: function(req, res, next){
            Dao.create(req.body).then(function(knowledge_area){
                responseView(knowledge_area, res);
            }).catch(next);
        },

        findAll: function(req, res, next){
            Dao.findAll().then(function(kAreas){
                responseView(kAreas, res);
            }).catch(next);
        },

        find: function(req, res, next){
            Dao.find(req.params.id).then(function(knowledge_area){
                responseView(knowledge_area);
            }).catch(next);
        },

        update: function(req, res, next){
            Dao.update(req.params.id, req.body.id).then(function(answer){
                responseView(answer, res);
            }).catch(next);
        }

    }

}
