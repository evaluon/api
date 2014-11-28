module.exports = function(app){

    var _ = app.utils._,
        log = app.utils.log,
        checkFields = app.utils.checkFields,
        Question = app.db.Question,
        Image = app.db.Image;

    return {

        create: function(image){
            return checkFields(
                ['location', 'description'], image
            ).then(function(){
                return Image.create(image);
            });
        },

        questionImage: function(question, image){
            return checkFields(
                ['location', 'description'], image
            ).then(function(){
                return Image.create(image);
            }).then(function(_image){
                log.debug("Adding %j to %s", _image, question);
                return Question.update(question, { image_id: _image.id });
            });
        }

    }


}
