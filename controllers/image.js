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
                var file = data.files.file;

                var year    = new Date().getFullYear().toString(),
                    m       = new Date().getMonth() + 1,
                    month   = m >= 10 ? m.toString() : util.format("0%d", m);

                var targetDir   = path.join("static", year, month),
                    filename    = util.format(
                    "%s%s", uuid(), path.extname(file.name)
                ),
                    target      = path.join(targetDir, filename);

                return mkdir(targetDir).then(function(){
                    log.warn("About copying. Hope you have permissions");
                    return copy(file.path, target);
                });
            }).then(function(location){
                return Dao.create({
                    location: location,
                    description: body.description
                });
            }).then(function(image){
                responseView(image, res);
            }).catch(next);

        },

        createQuestionImage: function(req, res, next){

            log.warn(req.params);

            formidable(req).then(function(data){
                body = data.fields;
                var file = data.files.file;

                var year    = new Date().getFullYear().toString(),
                    m       = new Date().getMonth() + 1,
                    month   = m >= 10 ? m.toString() : util.format("0%d", m);

                var targetDir   = path.join("static", year, month),
                    filename    = util.format(
                    "%s%s", uuid(), path.extname(file.name)
                ),
                    target      = path.join(targetDir, filename);

                return mkdir(targetDir).then(function(){
                    log.warn("About copying. Hope you have permissions");
                    return copy(file.path, target);
                });
            }).then(function(location){
                return Dao.questionImage(req.params.id, {
                    location: location,
                    description: body.description
                });
            }).then(function(image){
                responseView(image, res);
            }).catch(next);

        }
    };

};
