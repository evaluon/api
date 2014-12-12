var azure = require('azure-storage'),
    crypto = require('crypto'),
    Chance = require('chance'),
    chance = new Chance(crypto.randomBytes(64).toString('base64')),
    util = require('util'),
    q = require('q'),
    fs = require('fs'),
    request = require('request'),
    Stream = require('stream');

module.exports = function(config, container, url){

    var d = q.defer();

    var blobService = azure.createBlobService(config.account, config.key);

    loadBase64Image(url, function (image, prefix){

        var fileBuffer = new Buffer(image, 'base64');

        blobService.createBlockBlobFromStream(
            container, util.format("%s.gif", chance.guid()),
            new ReadableStreamBuffer(fileBuffer), fileBuffer.length,
            { contentTypeHeader:'image/jpg' },
            function(error, result, response){
                if(error){
                    d.reject(error);
                } else{
                    d.resolve({ result: result, response: response });
                }
            }
        );

    });

    return d.promise;

}

var loadBase64Image = function (url, callback) {

    request({url: url, encoding: null}, function (err, res, body) {

        if (!err && res.statusCode == 200){
            var contentType = res.headers['content-type'],
                base64prefix = 'data:' + contentType + ';base64,',
                image = body.toString('base64');

            if (typeof callback == 'function'){
                callback(image, base64prefix);
            }

        } else throw {
            message: 'undownloadable',
            statusCode: 400
        };

    });

};


var ReadableStreamBuffer = function(fileBuffer) {

    var that = this;
    Stream.Stream.call(this);
    this.readable = true;
    this.writable = false;

    var frequency = 50;
    var chunkSize = 1024;
    var size = fileBuffer.length;
    var position = 0;

    var buffer = new Buffer(fileBuffer.length);
    fileBuffer.copy(buffer);

    var sendData = function() {
        if(size === 0) {
            that.emit("end");
            return;
        }

        var amount = Math.min(chunkSize, size);
        var chunk = null;
        chunk = new Buffer(amount);
        buffer.copy(chunk, 0, position, position + amount);
        position += amount;
        size -= amount;

        that.emit("data", chunk);
    };

    this.size = function() {
        return size;
    };

    this.maxSize = function() {
        return buffer.length;
    };

    this.pause = function() {
        if(sendData) {
            clearInterval(sendData.interval);
            delete sendData.interval;
        }
    };

    this.resume = function() {
        if(sendData && !sendData.interval) {
            sendData.interval = setInterval(sendData, frequency);
        }
    };

    this.destroy = function() {
        that.emit("end");
        clearTimeout(sendData.interval);
        sendData = null;
        that.readable = false;
        that.emit("close");
    };

    this.setEncoding = function(_encoding) {
    };

    this.resume();
};
util.inherits(ReadableStreamBuffer, Stream.Stream);
