module.exports = function(app){

    var _ = app.utils._,
        util = app.utils.util,
        log = app.utils.log,
        Dao = app.dao.knowledgeArea,
        DaoImage = app.dao.image,
        responseView = require('../views/jsonSuccessResponse'),
        azure_url = app.utils.azure_url;

    return {

        findAll: function(req, res, next){

            log.debug(req.query.unapproved)

            if(req.query.unapproved == true){
                var switcher = Dao.findUnapproved;
            }
            if (req.query.unapproved == null || !req.query.unapproved) {
                var switcher = Dao.findApproved;
            }

            switcher().then(function(knowledgeAreas){
                responseView(knowledgeAreas, res);
            }).catch(next);
        },

        create: function(req, res, next){
            azure_url(
                app.config.azure, 'evaluon',
                util.format(
                    'http://placehold.it/180/00427A/FFFFFF&text=%s',
                    _.first(req.body.id.split(''), 3)
                )
            ).then(function(data){
                var image = {
                    location: data.result.blob,
                    description: req.body.description
                };
                return DaoImage.create(image);
            }).then(function(image){
                req.body.image_id = image.id;
                return Dao.create(req.user.id, req.body);
            }).then(function(knowledgeArea){
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
            Dao.removeTicket(req.params.id, req.body).then(function(){
                responseView(false, res);
            }).catch(next);
        }

    }

}
