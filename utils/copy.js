var q   = require('q'),
    fs  = require('fs');

module.exports = function copyFile(source, target) {
    var defer = q.defer();

    var rd = fs.createReadStream(source);
    rd.on("error", function(err) {
        done(err);
    });

    var wr = fs.createWriteStream(target);
    wr.on("error", function(err) {
        done(err);
    });
    wr.on("close", function(ex) {
        done();
    });

    function done(err) {
        if (err) defer.reject(err);
        else defer.resolve(target);
    }

    rd.pipe(wr);

    return defer.promise;
};
