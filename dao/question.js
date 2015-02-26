module.exports = function(app){

    var _ = app.utils._,
        log = app.utils.log,
        checkFields = app.utils.checkFields,
        Question = app.db.Question;

    return {

        create: function(user, question){

            return checkFields(
                [
                'knowledge_area_id', 'open',
                'public', 'description_text',
                'institution_id', 'user_id',
                'difficulty'
                ],
                _.extend({ user_id: user }, question)
            ).then(function(){
                return Question.create(user, question);
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
        },

        listBank: function(){
            return Question.findBy({ public: true });
        }

    }

}
