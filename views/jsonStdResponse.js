module.exports = function(err, data, res){

    var obj = {
        success: !err
    }

    if(err){
        obj.error = err;
    } else {
        if(data) obj.data = data;
    }

    res.json(obj);

};
