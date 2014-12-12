var azure = require('azure-storage'),
    crypto = require('crypto'),
    Chance = require('chance'),
    chance = new Chance(crypto.randomBytes(64).toString('base64')),
    util = require('util'),
    q = require('q'),
    request = require('request');

module.exports = function(config, container, url){

    var d = q.defer();

    var blobService = azure.createBlobService(config.account, config.key);

    request({ url: url }, function(err, res, body){

        if(err) {
            d.reject(err);
        } else {

            blobService.createBlockBlobFromText(
                container, util.format("%s.png", chance.guid()), body,
                function(error, result, response){
                    if(error){
                        d.reject(error);
                    } else{
                        d.resolve({ result: result, response: response });
                    }
                }
            );

        }

    });

    return d.promise;

}
