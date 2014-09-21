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

        var results = {};

        var Zone = db.Zone,
            Utils = db.Sequelize.Utils,

            Role = dao.role,
            Token = dao.token,
            Client = dao.client,
            Permission = dao.permission,
            ClientToken = dao.clienttoken;


        var q = new Utils.QueryChainer;

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

        for(p in defaultPermissions){
            q.add(Permission.createPermission(defaultPermissions[p]));
        }

        return q.run().then(function(permissions){

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
