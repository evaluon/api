module.exports = function(app){

    var _ = app.utils._,
        log = app.utils.log,
        checkFields = app.utils.checkFields,
        KnowledgeArea = app.db.KnowledgeArea;

    return {

        create: function(knowledge_area){
            return checkFields(
                ['id'], { 'id': knowledge_area }
            ).then(function(){
                return KnowledgeArea.create(knowledge_area);
            });
        },

        find: function(knowledge_area){
            return checkFields(
                [':id'], {':id': knowledge_area }
            ).then(function(){
                return KnowledgeArea.find(knowledge_area);
            });
        },

        findByTest: function(test){
            return checkFields([':id'], { ':id': test}).then(function(){
                return KnowledgeArea.findByTest(test);
            })
        }

        findAll: function(){
            return KnowledgeArea.findAll();
        },

        update: function(knowledge_area, new_knowledge_area){
            return checkFields(
                [':id', 'id'], { ':id': knowledge_area, id: new_knowledge_area }
            ).then(function(){
                return KnowledgeArea.update(knowledge_area, new_knowledge_area);
            });
        }

    }

}
