module.exports = function(app){

    var _ = app.utils._,
        log = app.utils.log,
        checkFields = app.utils.checkFields,
        Actors = app.db.Actors,
        OpenedTest = app.db.OpenedTest,
        GroupEvaluee = app.db.GroupEvaluee;

    return {

        evalueesInTest: function(group, test){

            var openedTests = [], evalueeList = [];

            return checkFields(
                ['group_id', 'test_id'], { group_id: group, test_id: test }
            ).then(function(){
                return OpenedTest.list(test);
            }).then(function(tests){
                openedTests = _.map(tests, function(t){ return t.evaluee_id });
                return GroupEvaluee.groupEvaluees(group);
            }).then(function(evaluees){
                evalueeList = _.filter(
                    evaluees,
                    function(e){ return _.contains(openedTests, e.id) }
                );
                return Actors.evalueeList();
            }).then(function(evaluees){
                evalueeList = _.map(evalueeList, function(e){ return e.id });
                return _.filter(evaluees, function(e) {
                    return _.contains(evalueeList, e.id)
                });
            });

        }

    };

};
