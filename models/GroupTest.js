module.exports = function(app, sql){

    var _ = app.utils._,
        log = app.utils.log;

    var self = {

        findActive: function(group_id, evaluee_id){
            return sql.one(
                "SELECT id FROM active_period WHERE gid = ?", [group_id]
            ).then(function(period){
                if(!period) throw {
                    message: "no_active_period",
                    statusCode: 404,
                    cause: "Period"
                }
                return sql.one(
                    "SELECT " +
                    "	t.* " +
                    "FROM " +
                    "	test t, group_test gt, response r " +
                    "WHERE period_id = ? AND group_id = ? AND " +
                    "	t.id = r.test_id AND" +
                    "	t.id = gt.test_id AND" +
                    "	t.stop_date IS NOT NULL AND " +
                    "	t.id NOT IN (" +
                    "       SELECT test_id AS id " +
                    "       FROM opened_test " +
                    "       WHERE evaluee_id = ? " +
                    "   ) AND " +
                    "	NOW() BETWEEN start_date AND stop_date " +
                    "ORDER BY " +
                    "   start_date ASC"
                    , [period.id, group_id, evaluee_id]
                );
            }).then(function(test){
                if(!test) throw {
                    message: 'no_active_test',
                    statusCode: 404,
                    cause: 'GroupTest'
                };
                return test;
            });
        },

        findAll: function(group_id, evaluee_id){
            return sql.query(
                "SELECT " +
                "	t.* " +
                "FROM " +
                "	test t, group_test gt " +
                "WHERE group_id = ? AND " +
                "	t.id = gt.test_id AND " +
                "	t.id NOT IN (" +
                "       SELECT test_id AS id " +
                "       FROM opened_test " +
                "       WHERE evaluee_id = ? " +
                "   )"
                , [group_id, evaluee_id]
            );
        },

        create: function(object){
            return sql.select(
                'active_period', { gid: object.period_id }
            ).then(function(period){
                return sql.insert(
                    'group_test', _.extend({ period_id: period.id }, object)
                );
            }).then(function(result){
                return self.findActive({ id: result.insertId });
            });

        }

    }

    return self;

}
