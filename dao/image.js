module.exports = function(app){

    var _ = app.utils._,
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
            }).then(function(image){
                return Question.update(
                    _.extend({ id: question }, { image_id: image.id })
                );
            });
        }

    }


}
