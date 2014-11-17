module.exports = function(app){

    var log = app.utils.log,
        Dao = app.dao.image,
        responseView = require('../views/jsonSuccessResponse');

    return {

        createImage: function(req, res, next){
            log.debug(Object.keys(req));
            responseView(req.files || false, res);
        }
    }

}
