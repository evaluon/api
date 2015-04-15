module.exports = function(app){

    var _ = app.utils._,
    log = app.utils.log,

    util = app.utils.util,
    fs = require('fs'),
    handlebars = require('handlebars'),

    Dao = app.dao.user,
    DaoActors = app.dao.actors,
    DaoInstitution = app.dao.institution,

    responseView = require('../views/jsonSuccessResponse');

    var Ctrl = {

        adminList: function(req, res, next){
            Dao.findAll({ role_id: 'admin' }).then(function(users){
                return _.map(users, function(user){
                    return _.omit(user, 'password');
                });
            }).then(function(users){
                responseView(users, res);
            }).catch(next);
        },

        retrieveUser: function(req, res, next){
            Dao.retrieveUser({ id: req.user.id }).then(function(user){
                responseView(user, res);
            }).catch(next);
        },

        createUser: function(req, res, next){
            if(req.user.role_id == 'admin'){

                var body = _.omit(req.body, ['role', 'enabled']);
                var user = _.extend(
                    {
                        role_id: body.role_id || 'user',
                        register_date: new Date()
                    },
                    body
                );

                Dao.createUser(user).then(function(user){
                    req.user = user;
                    Ctrl.retrieveUser(req, res, next);
                }).catch(next);
            } else {
                throw {
                    message: "invalid_permissions",
                    statusCode: 403
                }
            }

        },

        updateUser: function(req, res, next){
            var user = (req.body.id && req.user.role_id == 'admin' ?
                req.body : req.user
            );
            var body = _.omit(req.body, ['role_id', 'role', 'enabled']);
            log.debug(body);
            Dao.updateUser(user, body).then(function(user){
                req.user = user;
                Ctrl.retrieveUser(req, res, next);
            }).catch(next);
        },

        deleteUser: function(req, res, next){
            if(
                !req.user.role_id == 'admin' || req.params.id == req.user.id
            ) throw {
                statusCode: 403,
                message: "invalid_permissions"
            };
            Dao.delete(req.params.id).then(function(){
                responseView(false, res);
            }).catch(next);
        },

        recoverPassword: function(req, res, next){

            if(req.user.role_id == 'admin'){

                client = req.user;
                mail = req.body.mail;

                data = {
                    subject: "Recuperación de contraseña",
                    recipient: {
                        name: "",
                        mail: "",
                        token: ""
                    }
                }

                Dao.recoverPassword(req.body.mail).then(function(user){

                    data.recipient = {
                        name: [user.first_name, user.last_name].join(' '),
                        mail: mail,
                        password: user.password
                    };

                    var path = __dirname + '/../views/html/passrec.html';

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

                }).then(function(response){
                    responseView(response, res);
                }).catch(next);

            }

        }

    };

    return Ctrl;

};
