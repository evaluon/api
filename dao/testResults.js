module.exports = function(app){

    var _ = app.utils._,
        checkFields = app.utils.checkFields,
        TestResult = app.db.TestResult;

    return {

        retrieveResults: function(test, evaluee){

            return checkFields(
                ['test', 'evaluee'], { test: test, evaluee: evaluee }
            ).then(function(){
                return TestResult.retrieveResults(test, evaluee);
            });

        }

    };

}
