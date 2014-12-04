module.exports = function(app, sql){

    var log = app.utils.log;

    var self = {

        findApproved: function(){
            return sql.select('approved_knowledge_areas').then(function(ka){
                return ka;
            });
        },

        find: function(knowledge_area){
            return sql.selectOne('knowledge_area', { id: knowledge_area });
        },

        create: function(user, knowledge_area){
            return sql.selectOne('evaluator', user).then(function(evaluator){
                if(!evaluator) throw {
                    message: "not_an_evaluator",
                    statusCode: 403
                };
                return sql.insert('knowledge_area', knowledge_area);
            }).then(function(){
                return sql.insert(
                    'knowledge_area_ticket',
                    { knowledge_area: knowledge_area.id, evaluator_id: user }
                );
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
