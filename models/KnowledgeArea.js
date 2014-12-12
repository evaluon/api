module.exports = function(app, sql){

    var log = app.utils.log;

    var self = {

        findApproved: function(){
            return sql.select('approved_knowledge_areas');
        },

        findUnapproved: function(){
            return sql.select('unapproved_knowledge_areas');
        },

        find: function(knowledge_area){
            return sql.selectOne('knowledge_area', { id: knowledge_area });
        },

        create: function(user, knowledge_area){
            return sql.selectOne(
                'evaluator', { id: user }
            ).then(function(evaluator){
                if(evaluator) {
                    return sql.insert('knowledge_area', knowledge_area);
                } else throw {
                    message: "not_an_evaluator",
                    statusCode: 403
                };
            }).then(function(){
                return sql.insert(
                    'knowledge_area_ticket',
                    { knowledge_area: knowledge_area.id, evaluator_id: user }
                );
            });
        },

        updateTicket: function(id, data){
            return sql.update(
                'knowledge_area_ticket', { knowledge_area: id }, data
            );
        },

        update: function(id, data){
            return sql.update('knowledge_area', { id: id }, data);
        }

    };

    return self;

}
