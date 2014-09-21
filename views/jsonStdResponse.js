module.exports = function(err, data, res){

    var obj = {
        success: (err == null)
    }

    if(err){
        obj.error = err;
    } else {
        obj.data = data;
    }

    res.json(obj);

};
