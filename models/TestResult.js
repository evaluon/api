module.exports = function(app, sql){

    var _ = app.utils._,
        log = app.utils.log;

    return {

        retrieveResults: function(id, evaluee){

            log.warn("Start fetching test %d results for %s", id, evaluee);

            test = {};

            return sql.query(
                "SELECT t.*, ot.feedback " +
                "FROM " + (
                    "test t, opened_test ot "
                ) +
                "WHERE " + (
                    "t.id = ot.test_id AND " +
                    "ot.test_id = ? AND " +
                    "ot.evaluee_id = ?"
                ), [ id, evaluee ]
            ).then(function(_test){

                log.error("Showing %j", _test);

                test = _test;

                return sql.query(
                    "SELECT " + (
                        "id, question_id, answer_id, knowledge_area_id, " +
                        "question, answer, `right` "
                    ) +
                    "FROM test_responses " +
                    "WHERE " + (
                        "test_id = ? AND evaluee_id = ?"
                    ), [ id, evaluee ]
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
