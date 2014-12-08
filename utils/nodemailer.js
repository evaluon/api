module.exports = (function() {

    var q = require('q'),
    nodemailer = require('nodemailer');

    var transporter = null;

    return {

        setTransporter: function(config){
            transporter = nodemailer.createTransport(config);
        },

        send: function(options, cb){
            var d = q.defer();

            if(transporter) {
                transporter.sendMail(options, function(err, info){
                    if(err) {
                        d.reject(err);
                    } else {
                        d.resolve(info);
                    }
                });
            }
            else throw {message: "Missing transporter for mail function"};

            return d.promise;
        }

    };

})();
