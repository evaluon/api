module.exports = function(app){

    var _ = app.utils._,
        log = app.utils.log,
        Dao = app.dao.institution,
        formidable = app.utils.formidable,
        azure = app.utils.azure,
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
            if(req.query.evaluee){
                return Dao.activeInstitutions(
                    req.query.evaluee
                ).then(function(institutions){
                    responseView(institutions, res);
                }).catch(next);
            } else {
                return Dao.retrieveInstitutions().then(function(institutions){
                    responseView(institutions, res);
                }).catch(next);
            }
        },

        createInstitution: function(req, res, next){
            if(req.user.role_id == 'admin'){

                var body = {};

                formidable(req).then(function(data){
                    body = data.fields;
                    var image = data.files.file;
                    return azure(
                        app.config.azure, 'evaluon',
                        image.path, _.last(image.name.split('.'))
                    );
                }).then(function(data){
                    var location = data.result.blob;
                    return Dao.createInstitution({
                        id: body.id,
                        name: body.name,
                        address: body.address,
                        mail: body.mail,
                        phone_number: body.phone_number,
                        image: {
                            location: location,
                            description: body.description
                        }
                    });
                }).then(function(institution){
                    responseView(institution, res);
                }).catch(next);


            }
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
