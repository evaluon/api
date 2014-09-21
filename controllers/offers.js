module.exports = function(app){

    var _ = app.utils._,
    log = app.utils.log,
    request = app.utils.request,
    responseView = require('../views/jsonSuccessResponse');

    url1 = "http://servicedatosabiertoscolombia.cloudapp.net/v1/Ministerio_de_Salud/ofertainstpcd1?$format=json",
    url2 = "http://servicedatosabiertoscolombia.cloudapp.net/v1/Ministerio_de_Salud/servicsaludpcd1?$format=json";

    return {

        retrieveOffers: function(req, res, next){

            options1 = {
                uri: url1,
                method: "GET"
            },
            options2 = {
                uri: url2,
                method: "GET"
            };

            var response1, response2;

            request(options1).then(function(body){

                datos = JSON.parse(body).d;

                response1 = _.map(datos, function(dato){
                    return {
                        titulo: dato.nombreoferta,
                        descripcion: dato.descripcionoferta,
                        fecha_publicacion: new Date()
                    };
                });

                return request(options2);

            }).then(function(body){

                datos = JSON.parse(body).d;

                response2 = _.map(datos, function(dato){
                    return {
                        titulo: dato.categoria,
                        descripcion: dato.descripcion,
                        fecha_publicacion: new Date()
                    };
                });

                return null;

            }).then(function(){
                log.debug(response2);
                responseView(_.flatten([response1, response2]), res);
            }).catch(next);

        }

    };

};
