module.exports = function(app){

    return {

        endpoint: function(app){
            return require('./oauth2/endpoint.js')(app);
        },
        server: function(app){
            return require('./oauth2/server.js')(app);
        }

    };

};
