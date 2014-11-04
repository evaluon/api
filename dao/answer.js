module.exports = function(app){

    var _ = app.utils._,
        log = app.utils.log,
        checkFields = app.utils.checkFields,
        Answer = app.db.Answer;

    return {

        create: function(answers){

            return checkFields(
                ['description_text', 'right'], answers
            ).then(function(){
                return Answer.create(answers);
            });

        }

    }

}