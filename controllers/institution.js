module.exports = function(app){

    var _ = app.utils._,
        log = app.utils.log,
        Dao = app.dao.institution,
        ActorsDao = app.dao.actors,
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

            if(req.query.unapproved && req.user.role_id == 'admin'){

                Dao.retrieveUnapproved().then(function(institutions){
                    responseView(institutions, res);
                }).catch(next);

            } else {

                ActorsDao.isEvaluee(req.user.id).then(function(isEvaluee){
                    if(isEvaluee){
                        return Dao.activeInstitutions(req.user.id);
                    } else {
                        return Dao.retrieveInstitutions();
                    }
                }).then(function(institutions){
                    responseView(institutions, res);
                }).catch(next);

            }

        },

        createInstitution: function(req, res, next){
            if(req.user.role_id == 'admin'){

                var body = {};
                log.warn("Entrando a verificar archivos");

                formidable(req).then(function(data){
                    log.debug("Si, got the image, and it's", data.files.file);
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
                        evaluator_id: body.evaluator_id,
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
                req.params.id,
                req.body
            ).then(function(institution){
                if(req.body.denial_reason){

                    client = req.user;
                    mail = req.body.mail;

                    data = {
                        subject: "Denegación de institución",
                        recipient: {
                            name: "",
                            mail: "",
                            token: ""
                        }
                    }

                    return Dao.retrieveInstitution(
                        req.params.id
                    ).then(function(institution){

                        var user = institution.administrator;

                        data.recipient = {
                            name: [user.first_name, user.last_name].join(' '),
                            mail: user.mail,
                            institution: institution
                        };

                        var path = __dirname + '/../views/html/denied.html';

                        var html = fs.readFileSync(path, 'utf8');
                        var template = handlebars.compile(html);

                        var mailOptions = {
                            to: util.format(
                                "%s <%s>",
                                data.recipient.name, data.recipient.mail
                            ),
                            subject: data.subject,
                            html: template(data)
                        };

                        return req.mail.send(mailOptions);

                    });


                } else {
                    return null;
                }
            }).then(function(){
                responseView(false, res);
            }).catch(next);
        }

    }

}
