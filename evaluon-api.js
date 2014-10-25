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
var http        = require('http');

// Generate server
var app         = require('./core/loader');
var srv         = require('./core/server')(app);

var dao         = app.dao,
    log         = app.utils.log;

function recreate(){

    var results = {};

    var Token = dao.token,
        Client = dao.client,
        ClientToken = dao.clienttoken;

    return Client.createClient({
        id: 'administrator',
        name: 'Unit Administrator',
        secret: require('crypto').randomBytes(32).toString('base64'),
        role_id: 'admin'
    }).then(function(client){
        results.client = client;
        return Token.createToken();
    }).then(function(token){

        results.token = token;

        return ClientToken.associateToken({
            client_id: results.client.id,
            token_id: token.id
        });

    }).then(function(){

        console.log(
            "New configuration:\n" +
            "Client\n\tId: %s\n\tName: %s\n\tSecret: %s\n" +
            "Token\n\tAccess Token: %s\n\tRefresh Token: %s",
            results.client.id, results.client.name, results.client.secret,
            results.token.access_token, results.token.refresh_token
        );

    }).catch(function(error){
        log.debug(error);
    });

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
    startServer();
}
