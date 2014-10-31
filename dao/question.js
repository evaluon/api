module.exports = function(app){

    var _ = app.utils._,
        log = app.utils.log,
        checkFields = app.utils.checkFields,
        Question = app.db.Question;

    return {

        create: function(question){

            return checkFields(
                ['knowledge_area_id', 'open', 'public', 'description_text'],
                question
            ).then(function(){
                return Question.create(question);
            });

        },

        findByKnowledgeArea: function(user, knowledgeArea){

            return checkFields(
                ['user', ':id'], { user: user, ':id': knowledgeArea }
            ).then(function(){
                return Question.findByKnowledgeArea(user, knowledgeArea);
            });
        },

        find: function(id){
            return checkFields([':id'], { ':id': id }).then(function(){
                return Question.find(id);
            });
        },

        update: function(id, question){
            return checkFields([':id'], { ':id': id }).then(function(){
                return Question.update(id, question);
            });
        }

    }

}
