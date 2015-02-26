var azure = require('azure-storage'),
    crypto = require('crypto'),
    Chance = require('chance'),
    chance = new Chance(crypto.randomBytes(64).toString('base64')),
    util = require('util'),
    q = require('q');

module.exports = function(config, container, path, extension){

    var d = q.defer();

    var blobService = azure.createBlobService(config.account, config.key);

    blobService.createBlockBlobFromLocalFile(
        container, util.format("%s.%s", chance.guid(), extension), path,
        function(error, result, response){
            if(error){
                d.reject(error);
            } else{
                d.resolve({ result: result, response: response });
            }
        }
    );

    return d.promise;

}
