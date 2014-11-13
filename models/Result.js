module.exports = function(app, sql){

    var q = app.utils.q,
        _ = app.utils._;

    return {

        actualPeriod_byInstitution: function(evaluee_id, institution_id){
            return sql.select(
                'actual_results_by_institution',
                { evaluee_id: evaluee_id, institution_id: institution_id }
            ).then(function(results){

                var qs = [];

                for(result in results){
                    result = results[result];
                    qs.push(
                        sql.selectOne(
                            'test', { id: result.test_id }
                        ).then(function(test){
                            return {
                                id: test.id,
                                description: test.description,
                                note: result.note
                            };
                        })
                    )
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
