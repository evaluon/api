var q   = require('q'),
    md  = require('mkdirp');

module.exports = function(dir){
    var defer = q.defer();

    md(dir, function(err){
        if(err) defer.reject(err);
        else defer.resolve();
    });

    return defer.promise;
};
