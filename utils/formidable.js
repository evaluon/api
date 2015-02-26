var formidable = require('formidable'),
    q = require('q');

module.exports = function(req){

    var form = new formidable.IncomingForm();

    var d = q.defer();

    form.parse(req, function(err, fields, files){
        if(err){
            d.reject(err);
        } else {
            d.resolve({ files: files, fields: fields });
        }
    })

    return d.promise;

}
