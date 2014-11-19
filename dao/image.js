module.exports = function(app){

    var checkFields = app.utils.checkFields,
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
                    _.extend({ image_id: image.id }, question)
                );
            });
        }

    }


}
