module.exports = function(app){

    var Disability = app.db.Disability;

    return {

        findAll: function(){
            return Disability.findAll();
        }

    }

}
