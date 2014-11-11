module.exports = function(app){

    var _ = app.utils._,
        log = app.utils.log,
        checkFields = app.utils.checkFields,
        Answer = app.db.Answer,
        Question = app.db.Question,
        Image = app.db.Image;

    return {

        addQuestionImage: function(question_id, image){
            return checkFields(
                [':id', 'location', 'description'],
                _.extends({ ':id': question_id }, image)
            ).then(function(){
                return Image.create(image);
            }).then(function(image_id){
                return Question.update(question_id, { image_id: image_id });
            });
        },

        addAnswerImage: function(answer_id, image){
            return checkFields(
                [':id', 'location', 'description'],
                _.extend({ ':id': question_id }, image)
            ).then(function(){
                return Image.create(image);
            }).then(function(answer_id){
                return Answer.update(answer_id, { image_id: image_id });
            });
        },

        addImage: function(image){
            return checkFields(
                [':id', 'location', 'description'],
                _.extend({ ':id': institution_id }, image)
            ).then(function(){
                return Image.create(image);
            });
        }

    }


}
