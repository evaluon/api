module.exports = function(app, sql){

    var _ = app.utils._,
        log = app.utils.log;

    return {

        retrieveResults: function(id, evaluee){

            test = {};

            return sql.one(
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

                log.debug(_.extend(
                    test,
                    { questions: _questions }
                ));

                return _.extend(
                    test,
                    { questions: _questions }
                );

            });

        }



    };

}
