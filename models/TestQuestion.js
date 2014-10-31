module.exports = function(app, sql){

    return {

        findAll: function(test){
            return sql.query(
                "SELECT q.* FROM question q, test_questions tq " +
                "WHERE tq.test_id = ? AND q.id = tq.question_id",
                [test]
            );
        },

        findByKnowledgeArea: function(test, knowledgeArea){
            return sql.query(
                "SELECT q.* FROM question q, test_questions tq " +
                "WHERE tq.test_id = ? AND q.id = tq.question_id " +
                "AND q.knowledge_area_id = ?",
                [test, knowledgeArea]
            );
        },

        add: function(test, question){
            return sql.insert(
                'test_questions', { test_id: test, question_id: question }
            );
        }

    }

}
