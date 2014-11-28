module.exports = function(app){

    var _ = app.utils._,
        log = app.utils.log,
        Dao = app.dao.image,
        responseView = require('../views/jsonSuccessResponse'),
        formidable = app.utils.formidable,
        azure = app.utils.azure;

    return {

        createImage: function(req, res, next){

            formidable(req).then(function(data){
                body = data.fields;
                var image = data.files.file;
                return azure(
                    app.config.azure, 'evaluon',
                    image.path, _.last(image.name.split('.'))
                );
            }).then(function(data){
                var location = data.result.blob;
                return Dao.create({
                    location: location,
                    description: body.description
                });
            }).then(function(image){
                responseView(image, res);
            }).catch(next);

        },

        createQuestionImage: function(req, res, next){

            formidable(req).then(function(data){
                body = data.fields;
                log.warn(data.fields);
                var image = data.files.file;
                return azure(
                    app.config.azure, 'evaluon',
                    image.path, _.last(image.name.split('.'))
                );
            }).then(function(data){
                var location = data.result.blob;
                return Dao.questionImage(body.question, {
                    location: location,
                    description: body.description
                });
            }).then(function(image){
                responseView(image, res);
            }).catch(next);

        }
    }

}
