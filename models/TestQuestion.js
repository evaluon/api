module.exports = function(app, sql){

    var _ = app.utils._,
    log = app.utils.log,
    Q = app.utils.q;

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
                "SELECT q.* " +
                "FROM " +
                "   question q, test_questions tq " +
                "WHERE" +
                "   tq.test_id = ? AND q.id = tq.question_id " +
                "AND q.knowledge_area_id = ?",
                [test, knowledgeArea]
            ).then(function(questions){

                qs = [];

                for(question in questions){

                    qs.push(
                        (function(question) {
                            return sql.query(
                                "SELECT a.* " +
                                "FROM answer a, answer_options qa " +
                                "WHERE a.id = qa.answer_id AND qa.question_id = ?",
                                [question.id]
                            ).then(function(answers){
                                return _.extend(
                                    { answers: answers }, question
                                );
                            }).then(function(q){
                                return q;
                            });
                        })(questions[question])
                    );

                }

                return Q.all(qs);

            });
        },

        add: function(user, test, question){
            return sql.selectOne('evaluator', { id: user }).then(function(u){
                if(!u) throw {
                    message: "User is not an evaluee",
                    statusCode: 403
                }
                return sql.selectOne('question', { id: question });
            }).then(function(q){
                if(!q.public) {
                    return sql.selectOne(
                        'group',
                        { institution_id: q.institution_id, evaluator_id: user }
                    ).then(function(g){
                        if(!g) throw {
                            message: "Question not found",
                            statusCode: 404
                        }
                    });
                }
            }).then(function(){
                return sql.insert(
                    'test_questions',
                    { test_id: test, question_id: question }
                );
            });


        }

    }

}
