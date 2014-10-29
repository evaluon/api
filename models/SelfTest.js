module.exports = function(app, sql){

    var _ = app.utils._,
        log = app.utils.log;

    function checkEvaluee(evaluee){
        return sql.selectOne('evaluee', { id: evaluee }).then(function(e){
            if(!e) throw {
                message: "User is not an evaluee",
                statusCode: 403
            }
        });
    }

    var self = {

        create: function(evaluee, test){

            var test_id;

            checkEvaluee(evaluee).then(function(){
                return sql.insert('test', test);
            }).then(function(response){
                test_id = response.insertId;
                return sql.insert(
                    'self_test',
                    { evaluee_id: evaluee, test_id: test_id }
                );
            }).then(function(){
                return sql.selectOne('test', test_id);
            });

        },

        find: function(evaluee_id){

            checkEvaluee(evaluee_id).then(function(){
                return sql.one(
                    "SELECT " +
                    "   t.* " +
                    "FROM " +
                    "   test t, self_test st " +
                    "WHERE " +
                    "   st.test_id = t.id AND " +
                    "   st.evaluee_id = ? " +
                    "ORDER BY " +
                    "   t.id DESC"
                    , [ evaluee_id ]
                );
            });


        },

        findAll: function(evaluee_id){

            checkEvaluee(evaluee_id).then(function(){
                return sql.query(
                    "SELECT " +
                    "   t.* " +
                    "FROM " +
                    "   test t, self_test st " +
                    "WHERE " +
                    "   st.test_id = t.id AND " +
                    "   st.evaluee_id = ?"
                    , [ evaluee_id ]
                );
            });

        }

    }

    return self;

}
