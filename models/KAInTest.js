module.exports = function(app, sql){

    var _ = app.utils._,
        log = app.utils.log,
        Q = app.utils.q;

    var self =  {

        addKAtoTest: function(test_id, knowledge_area){
            return sql.insert(
                'test_knowledge_areas', {
                    test_id : test_id, knowledge_area_id : knowledge_area
                }
            );
        },

        findKAinTest_evaluator: function(test_id){
            return sql.query(
                "SELECT " +
                "   DISTINCT knowledge_area_id AS id " +
                "FROM " +
                "   test_questions tq, question q " +
                "WHERE" +
                "   tq.test_id = ? AND" +
                "   q.id = tq.question_id"
                , [test_id]
            ).then(function(areas){
                var qs = [];

                for(area in areas){

                    qs.push(
                        (function(area) {
                            return sql.selectOne(
                                'image', { id: area.image_id }
                            ).then(function(image){
                                return _.extend({ image: image },
                                    _.omit(area, 'image_id')
                                );
                            });
                        })(areas[area])
                    );
                }

                return Q.all(qs);
            });
        },

        findKAinTest_evaluee: function(evaluee_id, test_id){

            return sql.query(
                "SELECT 1 AS flag FROM opened_test WHERE evaluee_id = ? AND " +
                "test_id = ? UNION SELECT 1 AS flag FROM self_test WHERE " +
                "id = ? AND evaluee_id = ?"
                , [ evaluee_id , test_id, test_id, evaluee_id ]

            ).then(function(ot){

                if(!ot) throw {
                    message: 'test_unopened',
                    statusCode: 403
                }

                return sql.query(
                    "SELECT * " +
                    "FROM knowledge_area " +
                    "WHERE " + (
                        "id IN (" + (
                            "SELECT " + (
                                "DISTINCT knowledge_area_id AS id "
                            ) +
                            "FROM " + (
                                "test_questions tq, question q "
                            ) +
                            "WHERE " + (
                                "q.id = tq.question_id AND " +
                                "tq.question_id NOT IN ( " + (
                                    "SELECT question_id FROM response " +
                                    "WHERE test_id = ? AND evaluee_id = ? "
                                ) +
                                ") AND " +
                                "tq.test_id = ?"
                            ) +
                            ")"
                        )
                    ) , [test_id, evaluee_id, test_id]
                ).then(function(areas){
                    var qs = [];
                    log.debug(areas);

                    for(area in areas){

                        qs.push(
                            (function(area) {
                                return sql.selectOne(
                                    'image', { id: area.image_id }
                                ).then(function(image){
                                    return _.extend({ image: image },
                                        _.omit(area, 'image_id')
                                    );
                                });
                            })(areas[area])
                        );

                    }

                    return Q.all(qs);

                });

            });

        }

    };

    return self;

}
