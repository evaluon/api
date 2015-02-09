module.exports = function(app, sql){

    var q = app.utils.q,
        _ = app.utils._,
        log = app.utils.log;

    return {

        actualPeriod_byInstitution: function(evaluee_id, institution_id){
            return sql.select(
                'actual_results_by_institution',
                { evaluee_id: evaluee_id, institution_id: institution_id }
            ).then(function(results){

                var qs = [];

                for(result in results){
                    (function(result){

                        var response = {
                            rightQuestions: result.rigth_questions || 0,
                            totalQuestions: result.total_questions,
                            note: result.note
                        };

                        qs.push(
                            sql.selectOne(
                                'test', { id: result.test_id }
                            ).then(function(test){
                                response.id = test.id;
                                response.description = test.description;
                                return sql.selectOne(
                                    'opened_test',
                                    { evaluee_id: evaluee_id, test_id: test.id }
                                );
                            }).then(function(openTest){
                                response.feedback = openTest.feedback;
                                return response;
                            })
                        );
                    })(results[result]);
                }

                return q.all(qs);
            })
        },

        actualPeriod: function(evaluee_id){

            return sql.query(
                "SELECT i.*, average " +
                "FROM institution i, institutional_average ia " +
                "WHERE i.id = ia.institution_id AND evaluee_id = ?",
                [ evaluee_id ]
            ).then(function(institutions){

                var qs = [];

                for(institution in institutions){
                    institution = institutions[institution];
                    qs.push(
                        sql.selectOne(
                            'image', { id: institution.image_id }
                        ).then(function(image){
                            return _.extend(
                                { image: image },
                                _.omit(institution, 'image_id')
                            );
                        })
                    );
                }

                return q.all(qs);

            });

        }

    }

}
