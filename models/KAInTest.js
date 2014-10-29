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

        findKAinTest: function(test_id){
            return sql.query(
                "SELECT knowledge_area_id AS id " +
                "FROM test_knowledge_areas " +
                "WHERE test_id = ?", [test_id]
            );
        }

    }

    return self;

}
