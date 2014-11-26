var _ = require('underscore');

module.exports = function(err, data, res){

    statusCode = err ? (err.statusCode || 500) : (data.statusCode || 200);

    var obj = {
        success: !err
    }

    if(err){
        obj.error = _.omit(err, 'statusCode');
        obj.error.message = err.message || 'internal_server_error';
    } else {
        if(data) obj.data = _.isArray(data) ? data : _.omit(data, 'statusCode');
    }

    res.json(statusCode, obj);

};
