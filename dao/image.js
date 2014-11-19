module.exports = function(app){

    var checkFields = app.utils.checkFields,
        Image = app.db.Image;

    return {

        create: function(image){
            return checkFields(
                ['location', 'description'], image
            ).then(function(){
                return Image.create(image);
            });
        }

    }


}
