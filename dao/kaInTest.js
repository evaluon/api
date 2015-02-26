module.exports = function(app){

    var _ = app.utils._,
        log = app.utils.log,
        checkFields = app.utils.checkFields,
        KAInTest = app.db.KAInTest,
        Actors = app.db.Actors;

    return {

        addKAtoTest: function(test_id, knowledge_area){
            return checkFields(
                [':id', 'knowledge_area'],
                { ':id': test_id, knowledge_area: knowledge_area }
            ).then(function(){
                return KAInTest.addKAtoTest(test_id, knowledge_area);
            });
        },

        findKAinTest: function(user, test_id){
            return checkFields([':id'], { ':id': test_id }).then(function(){
                return Actors.isEvaluator(user);
            }).then(function(isEvaluator){
                return isEvaluator ?
                    KAInTest.findKAinTest_evaluator(test_id) :
                    KAInTest.findKAinTest_evaluee(user.id, test_id);
            });
        }

    }

}
