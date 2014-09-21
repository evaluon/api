/*

Copyright (c) 2014 Bool Inc
Bool Node.js MVC Framework

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

*/

// Load of nodejs modules
var http = require('http');

// Generate server
var app = require('./core/loader');
var srv = require('./core/server')(app);

var sequelize = app.db.sequelize, db = app.db, dao = app.dao;

function recreate(){
    return sequelize.drop().then(function(){
        return db.Token.sync();
    }).then(function(){
        return db.Permission.sync();
    }).then(function(){
        return db.RolePermission.sync();
    }).then(function(){
        return db.Role.sync();
    }).then(function(){
        return db.User.sync();
    }).then(function(){
        return db.Client.sync();
    }).then(function(){
        return db.ClientToken.sync();
    }).then(function(){
        return db.UserToken.sync();
    }).then(function(){
        return db.Student.sync();
    }).then(function(){
        return db.Test.sync();
    }).then(function(){
        return db.AnswerOption.sync();
    }).then(function(){
        return db.Question.sync();
    }).then(function(){
        return db.SelfTest.sync();
    }).then(function(){
        return db.TestResponse.sync();
    }).then(function(){
        return db.TestQuestion.sync();
    }).then(function(){
        return db.Answer.sync();
    }).then(function(){

        var results = {};

        var Utils = db.Sequelize.Utils,

            Role = dao.role,
            Token = dao.token,
            Client = dao.client,
            Permission = dao.permission,
            ClientToken = dao.clienttoken

            Question = dao.question,
            AnswerOption = dao.answeroption,
            Answer = dao.answer;

        question1 = "En la extracción minera de oro se emplea cianuro de " +
        "sodio, zinc y ácidos fuertes durante el proceso de purificación " +
        "Los ácidos fuertes que pueden emplearse son ácido sulfúrico (H2SO4) " +
        "de una concentración volumen-volumen del 78% o ácido nítrico (HNO3) " +
        "que contenga 112 mL de ácido por cada 200 mL de solución.<br />"  +
        "Si en la extraccción del oro se requiere usar el ácido de mayor" +
        "concentración, ¿cual ácido debería emplearse?";

        question2 = "La función de la membrana celular es";

        answers1 = [
        "El HNO3, porque como su volumen es mayor que el de la solucion " +
        "de H2SO4 tiene una mayor concentración.",
        "El H2SO4, porque la concentración volumen-volumen de HNO3 es " +
        "del 56%. ",
        "El HNO3, porque su concentración volumen-volumen es del 112%.",
        "El H2SO4, porque como su volumen es menor que el de la solución " +
        "de HNO3 se encuentra más concentrado."
        ];

        answers2 = [
        "Encargarse del control de las actividades celulares.",
        "Sintetizar las proteínas estructurales y funcionales.",
        "Ser responsable del tráfico de pequeños segmentos de ARN.",
        "Permitir la comunicación e intercambiar materiales con su medio " +
        "ambiente.",
        "Todas las anteriores."
        ];

        good1 = 1, good2 = 3;

        var defaultPermissions = [
            {
                id: 1,
                name: 'anon'
            },
            {
                id: 2,
                name: 'user'
            },
            {
                id: 4,
                name: 'admin'
            },
            ],

            defaultRoles = [
            {
                name: 'anon',
                permissions: [1]
            },
            {
                name: 'user',
                permissions: [1, 2]
            },
            {
                name: 'admin',
                permissions: [1, 2, 4]
            }
            ];

        Question.createQuestion({
            text: question1
        }).then(function(question1){

            results.question1 = question1;

            var q = new Utils.QueryChainer;

            for(a in answers1){
                q.add(AnswerOption.create({ text: answers1[a] }));
            }

            return q.run();

        }).then(function(newAnswers1){

            var q = new Utils.QueryChainer, question = results.question1;

            for(a in newAnswers1){

                answer = newAnswers1[a];

                q.add(
                    Answer.associate({
                        AnswerOptionId: answer.id,
                        QuestionId: question.id,
                        right: a == good1
                    })
                );

            }

            return q.run();

        }).then(function(){

            return Question.createQuestion({
                text: question2
            });

        }).then(function(question2){

            results.question2 = question2;

            var q = new Utils.QueryChainer;

            for(a in answers2){
                q.add(AnswerOption.create({ text: answers2[a] }));
            }

            return q.run();

        }).then(function(newAnswers2){

            var q = new Utils.QueryChainer, question = results.question2;

            for(a in newAnswers2){

                answer = newAnswers2[a];

                q.add(
                    Answer.associate({
                        AnswerOptionId: answer.id,
                        QuestionId: question.id,
                        right: a == good2
                    })
                );

            }

            return q.run();

        }).then(function(){

            var q = new Utils.QueryChainer;

            for(p in defaultPermissions){
                q.add(Permission.createPermission(defaultPermissions[p]));
            }

            return q.run();

        }).then(function(permissions){

            var q = new Utils.QueryChainer;

            for(r in defaultRoles){
                q.add(Role.createRole(defaultRoles[r]));
            }

            return q.run();

        }).then(function(roles){

            for(r in roles){

                var role = roles[r];
                permissions = [];

                for(sRole in defaultRoles){
                    if(defaultRoles[sRole].name == role.name){
                        permissions = defaultRoles[sRole].permissions;
                    }
                }

                for(p in permissions){
                    (function(role, p){
                        return Role.addPermission(role, p);
                    })(role, permissions[p]);
                }

            }

        }).then(function(){

            return Client.createClient({
                id: 'administrator',
                name: 'Unit Administrator',
                secret: require('crypto').randomBytes(32).toString('base64'),
                RoleId: 'admin'
            });

        }).then(function(client){

            results.client = client.dataValues;

            return Token.createToken();

        }).then(function(token){

            results.token = token.dataValues;

            return ClientToken.associateToken({
                ClientId: results.client.id,
                TokenId: token.id
            });

        }).then(function(){

            console.log(
                "New configuration:\n" +
                "Client\n\tId: %s\n\tName: %s\n\tSecret: %s\n" +
                "Token\n\tAccess Token: %s\n\tRefresh Token: %s",
                results.client.id, results.client.name, results.client.secret,
                results.token.accessToken, results.token.refreshToken
            );

        });

    });
}

function start(){
    return sequelize.authenticate();
}

var startServer = function(){
    http.createServer(srv).listen(
        srv.get('port'),
        srv.get('host'),
        function(){
            console.log(
                'Express server listening on http://%s:%d',
                srv.get('host'),
                srv.get('port')
            );
        }
    );
};

if(process.env.INSTALL){
    recreate().then(startServer);
} else {
    start().then(startServer);
}
