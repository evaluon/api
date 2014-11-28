module.exports = function(app, sql){

    var _ = app.utils._;

    return {

        retrieveResults: function(test, evaluee){

            test = {};

            return sql.query(
                "SELECT t.*, ot.feedback " +
                "FROM " + (
                    "test t, open_test ot"
                ) +
                "WHERE " + (
                    "ot.test_id = ? AND " +
                    "ot.evaluee_id = ? AND " +
                    "t.id = ot.test_id "
                ), [ test, evaluee ]
            ).then(function(_test){

                test = _test;

                return sql.query(
                    "SELECT " + (
                        "id, question_id, answer_id, knowledge_area_id, " +
                        "question, answer, `right` "
                    ) +
                    "FROM test_responses " +
                    "WHERE " + (
                        "test_id = ? AND evaluee_id = ?"
                    ), [ test, evaluee ]
                );

            }).then(function(_questions){

                return _.extend(
                    test,
                    { questions: _questions }
                );

            });

        }



    };

}
