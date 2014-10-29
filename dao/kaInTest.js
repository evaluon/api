module.exports = function(app){

    var _ = app.utils._,
        log = app.utils.log,
        checkFields = app.utils.checkFields,
        KAInTest = app.db.KAInTest;

    return {

        addKAtoTest: function(test_id, knowledge_area){
            return checkFields(
                [':id', 'knowledge_area'],
                { ':id': test_id, knowledge_area: knowledge_area }
            ).then(function(){
                return KAInTest.addKAtoTest(test_id, knowledge_area);
            });
        },

        findKAinTest: function(test_id){
            return checkFields([':id'], { ':id': test_id }).then(function(){
                return KAInTest.findKAinTest(test_id);
            });
        }

    }

}
