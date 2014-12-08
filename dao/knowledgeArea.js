module.exports = function(app){

    var _ = app.utils._,
        log = app.utils.log,
        checkFields = app.utils.checkFields,
        KnowledgeArea = app.db.KnowledgeArea;

    return {

        create: function(user, knowledge_area){
            return checkFields(
                ['id', 'image_id', 'description'], knowledge_area
            ).then(function(){
                return KnowledgeArea.create(user, knowledge_area);
            });
        },

        find: function(knowledge_area){
            return checkFields(
                [':id'], {':id': knowledge_area }
            ).then(function(){
                return KnowledgeArea.find(knowledge_area);
            });
        },

        findApproved: function(){
            return KnowledgeArea.findApproved();
        },

        findUnapproved: function(){
            return KnowledgeArea.findUnapproved();
        },

        update: function(id, data){
            return checkFields([':id'], { ':id': id }).then(function(){
                return KnowledgeArea.update(id, data);
            });
        }

    }

}
