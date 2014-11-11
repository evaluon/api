module.exports = function(app, sql){

    return {

        openTest: function(user, test){
            return sql.insert(
                'opened_test',
                { evaluee_id: user, test_id: test, open_date: new Date }
            ).then(function(result){

            });
        },

        closeTest: function(user, test){
            return sql.selectOne(
                'opened_test', { evaluee_id: user, test_id: test }
            ).then(function(test){
                return sql.update(
                    'opened_test', { close_date: new Date }, test
                );
            })
        }

    }

}
