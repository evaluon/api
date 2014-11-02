module.exports = function(app){

    var log = app.utils.log,
        Dao = app.dao.kaInTest,
        responseView = require('../views/jsonSuccessResponse');

    return {

        addKAtoTest: function(req, res, next){
            Dao.addKAtoTest(
                req.params.id, req.body.knowledge_area
            ).then(function(){
                responseView(false, res);
            }).catch(next);
        },

        findKAinTest: function(req, res, next){
            Dao.findKAinTest(req.user, req.params.id).then(function(KAs){
                responseView(KAs, res);
            }).catch(next);
        }

    }

}
