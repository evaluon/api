module.exports = function(app, sql){

    var _ = app.utils._,
        log = app.utils.log;

    var self = {

        findActive: function(group_id){
            return sql.one(
                "SELECT id FROM active_period WHERE gid = ?", [group_id]
            ).then(function(period){
                if(!period) throw {
                    message: "No active period",
                    statusCode: 404,
                    cause: "Period"
                }
                return sql.one(
                    "SELECT " +
                    "	t.* " +
                    "FROM " +
                    "	test t, group_test gt " +
                    "WHERE period_id = ? AND group_id = ? AND " +
                    "	t.id = gt.test_id AND" +
                    "	t.stop_date IS NOT NULL AND " +
                    "	NOW() BETWEEN start_date AND stop_date"
                    , [period.id, group_id]
                );
            })
        },

        findAll: function(group_id){
            return sql.select('group_test', { group_id: group_id });
        },

        create: function(object){
            return sql.insert(
                'group_test',
                _.extend({ create_date: new Date() }, object)
            ).then(function(result){
                return self.find({ id: result.insertId });
            });
        }

    }

    return self;

}
