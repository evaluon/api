module.exports = function(app, sql){

    var _ = app.utils._,
        log = app.utils.log;

    var self =  {

        addKAtoTest: function(test_id, knowledge_area){
            return sql.insert(
                'test_knowledge_areas',
                { test_id : test_id, knowledge_area_id : knowledge_area }
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
            );
        },

        findKAinTest_evaluee: function(evaluee_id, test_id){
            return sql.selectOne(
                'opened_test', { evaluee_id: evaluee_id, test_id: test_id }
            ).then(function(ot){
                if(!ot) throw {
                    message: 'test_unopened',
                    statusCode: 403
                }
                return sql.query(
                    "SELECT DISTINCT knowledge_area_id AS id " +
                    "FROM test_questions tq, question q " +
                    "WHERE" +
                    "   q.id = tq.question_id AND" +
                    "   tq.question_id NOT IN (" +
                    "      SELECT question_id FROM response " +
                    "      WHERE test_id = ? AND evaluee_id = ? " +
                    "   ) AND" +
                    "   tq.test_id = ?"
                    , [test_id, evaluee_id, test_id]
                );
            })

        }

    }

    return self;

}
