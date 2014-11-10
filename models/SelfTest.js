module.exports = function(app, sql){

    var q = app.utils.q,
        _ = app.utils._,
        log = app.utils.log;

    var self = {

        create: function(evaluee, test){

            var test_id;

            return sql.selectOne('evaluee', { id: evaluee }).then(function(e){
                if(!e) throw {
                    message: "User is not an evaluee",
                    statusCode: 403
                }
            }).then(function(){
                return sql.insert('test', test);
            }).then(function(response){
                test_id = response.insertId;
                return sql.insert(
                    'self_test',
                    { id: test_id, evaluee_id: evaluee }
                );
            }).then(function(){
                var kAs, allQuestions;
                return sql.select('knowledge_area').then(function(res){
                    kAs = res;
                    qs = [];

                    for(KA in res){
                        KA = res[KA];
                        qs.push(
                            sql.select(
                                'question',
                                { knowledge_area_id: KA.id, public: true }
                            )
                        )
                    };

                    return q.all(qs);
                }).then(function(questions){
                    log.debug(questions);
                    allQuestions = _.flatten(questions);
                    log.warn(allQuestions);
                    return sql.beginTransaction();
                }).then(function(){
                    qs = [];

                    for(question in allQuestions){
                        question = allQuestions[question];

                        qs.push(
                            sql.insert(
                                'test_questions',
                                { question_id: question.id, test_id: test_id }
                            )
                        );
                    }

                    return q.all(qs);
                }).then(function(){
                    return sql.commit();
                });
            }).then(function(){
                return sql.selectOne('test', { id: test_id });
            });

        },

        find: function(evaluee){

            return sql.selectOne('evaluee', { id: evaluee }).then(function(e){
                if(!e) throw {
                    message: "User is not an evaluee",
                    statusCode: 403
                }
            }).then(function(){
                return sql.one(
                    "SELECT " +
                    "   t.* " +
                    "FROM " +
                    "   test t, self_test st " +
                    "WHERE " +
                    "   st.evaluee_id = ? AND " +
                    "   t.id = st.id " +
                    "ORDER BY " +
                    "   t.id DESC"
                    , [ evaluee ]
                );
            }).then(function(test){
                if(!test) throw {
                    message: "Test not available",
                    statusCode: 404
                }
                return test;
            });


        },

        findAll: function(evaluee){

            return sql.selectOne('evaluee', { id: evaluee }).then(function(e){
                if(!e) throw {
                    message: "User is not an evaluee",
                    statusCode: 403
                }
            }).then(function(){
                return sql.query(
                    "SELECT " +
                    "   t.* " +
                    "FROM " +
                    "   test t, self_test st " +
                    "WHERE " +
                    "   st.evaluee_id = ? AND" +
                    "   t.id = st.id "
                    , [ evaluee ]
                );
            });

        }

    }

    return self;

}
