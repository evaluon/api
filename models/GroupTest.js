module.exports = function(app, sql){

    var _ = app.utils._,
    log = app.utils.log,
    hotp = app.utils.hotp,
    salt = app.config.security.salt;

    var self = {

        findActive: function(group_id, evaluee_id){
            return sql.one(
                "SELECT id FROM active_period WHERE gid = ?", [group_id]
            ).then(function(period){
                if(!period) throw {
                    message: "no_active_period",
                    statusCode: 404,
                    cause: "Period"
                };
                return sql.query(
                    "SELECT " +
                    "	t.* " +
                    "FROM " +
                    "	test t, group_test gt " +
                    "WHERE period_id = ? AND group_id = ? AND " +
                    "	t.id = gt.test_id AND" +
                    "	t.stop_date IS NOT NULL AND " +
                    "	t.id NOT IN (" +
                    "       SELECT test_id AS id " +
                    "       FROM opened_test " +
                    "       WHERE evaluee_id = ? " +
                    "   ) AND " +
                    "	NOW() BETWEEN start_date AND stop_date " +
                    "ORDER BY " +
                    "   start_date ASC",
                    [period.id, group_id, evaluee_id]
                );
            }).then(function(test){
                if(test.length === 0) throw {
                    message: 'no_active_test',
                    statusCode: 404,
                    cause: 'GroupTest'
                };
                return test;
            });
        },

        findAll: function(group_id, evaluee_id){

            return sql.one(
                "SELECT id FROM active_period WHERE gid = ?", [group_id]
            ).then(function(period){
                if(!period) throw {
                    message: "no_active_period",
                    statusCode: 404,
                    cause: "Period"
                };
                return sql.selectOne('evaluee', { id: evaluee_id });
            }).then(function(ev){

                if(ev) {
                    return sql.query(
                        "SELECT " + (
                            "t.* "
                        ) +
                        "FROM " + (
                            "test t, group_test gt "
                        ) +
                        "WHERE" + (
                            "group_id = ? AND " +
                            "t.id = gt.test_id AND " +
                            "t.id NOT IN (" + (
                                "SELECT test_id AS id " +
                                "FROM opened_test " +
                                "WHERE evaluee_id = ?"
                            ) +
                            ") "
                        ) +
                        "ORDER BY start_date DESC",
                        [group_id, evaluee_id]
                    );
                } else {
                    return sql.query(
                        "SELECT " + (
                            "t.*, " +
                            "IF(" + (
                                "(" + (
                                    "SELECT COUNT(evaluee_id) AS id " +
                                    "FROM opened_test " +
                                    "WHERE test_id = t.id"
                                ) + ")"
                            ) +
                            ") > 0, 0, 1) AS editable "
                        ) +
                        "FROM " + (
                            "test t, group_test gt "
                        ) +
                        "WHERE" + (
                            "group_id = ? AND " +
                            "t.id = gt.test_id "
                        ) +
                        "ORDER BY start_date DESC",
                        [group_id]
                    ).then(function(tests){
                        return _.map(tests, function(test){
                            var id = test.id.toString();
                            return _.extend({ hotp: hotp(salt, id) }, test);
                        });
                    });
                }
            });

        },

        create: function(object){

            return sql.selectOne(
                'active_period', { gid: object.group_id }
            ).then(function(period){
                if(!period) throw {
                    statusCode: 404,
                    message: "no_active_period"
                };
                return sql.insert(
                    'group_test', _.extend({ period_id: period.id }, object)
                );
            }).then(function(result){
                return sql.selectOne('test', { id: object.test_id });
            });

        }

    };

    return self;

};
