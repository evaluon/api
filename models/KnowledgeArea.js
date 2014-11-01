module.exports = function(app, sql){

    var log = app.utils.log;

    var self = {

        findAll: function(){
            return sql.select('knowledge_area').then(function(ka){
                log.debug(ka);
                return ka;
            });
        },

        findByTest: function(test){
            return sql.selectOne(
                "SELECT ka.* " +
                "FROM " +
                "   knowledge_area ka, test_knowledge_areas tka " +
                "WHERE " +
                "   ka.id = tka.knowledge_area_id AND " +
                "   tka.test_id = ?"
                ,[test]
            );
        },

        find: function(knowledge_area){
            return sql.selectOne('knowledge_area', { id: knowledge_area });
        },

        create: function(knowledge_area){
            return sql.insert(
                'knowledge_area', { id: knowledge_area }
            ).then(function(){
                return self.find(knowledge_area);
            });
        },

        update: function(knowledge_area, new_knowledge_area){
            return sql.update(
                'knowledge_area',
                { id: knowledge_area },
                { id: new_knowledge_area }
            ).then(function(){
                return self.find(new_knowledge_area);
            });
        }

    };

    return self;

}
