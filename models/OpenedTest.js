module.exports = function(app, sql){

    return {

        list: function(test){
            return sql.select('opened_test', { test_id: test });
        },

        openTest: function(user, test){
            return sql.insert(
                'opened_test',
                { evaluee_id: user, test_id: test, open_date: new Date }
            );
        },

        closeTest: function(user, test){
            return sql.update(
                'opened_test',
                { close_date: new Date },
                { evaluee_id: user, test_id: test }
            );
        },

        feedback: function(user, test, feedback){

            return sql.update(
                'opened_test',
                { feedback: feedback },
                { evaluee_id: user, test_id: test }
            );

        }

    }

}
