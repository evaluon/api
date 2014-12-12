module.exports = function(app, sql){

    var log = app.utils.log,
        _ = app.utils._,
        Q = app.utils.q;

    var self = {

        findApproved: function(){
            return sql.select(
                'approved_knowledge_areas'
            ).then(function(areas){
                var qs = [];

                for(area in areas){

                    qs.push(
                        (function(area) {
                            return sql.selectOne(
                                'image', { id: area.image_id }
                            ).then(function(image){
                                return _.extend(
                                    { image: image },
                                    _.omit(area, 'image_id')
                                )
                            })
                        })(areas[area])
                    );
                }

                return Q.all(qs);
            });
        },

        findUnapproved: function(){
            return sql.select(
                'unapproved_knowledge_areas'
            ).then(function(areas){
                var qs = [];

                for(area in areas){

                    qs.push(
                        (function(area) {
                            return sql.selectOne(
                                'image', { id: area.image_id }
                            ).then(function(image){
                                return _.extend(
                                    { image: image },
                                    _.omit(area, 'image_id')
                                )
                            })
                        })(areas[area])
                    );
                }

                return Q.all(qs);
            });
        },

        find: function(knowledge_area){
            return sql.selectOne(
                'knowledge_area', { id: knowledge_area }
            ).then(function(area){
                return sql.selectOne(
                    'image', { id: area.image_id }
                ).then(function(image){
                    return _.extend(
                        { image: image },
                        _.omit(area, 'image_id')
                    )
                });
            });
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
                'knowledge_area_ticket', data, { knowledge_area: id }
            );
        },

        removeTicket: function(id, data){
            return sql.delete('knowledge_area_ticket', { knowledge_area: id });
        },

        update: function(id, data){
            return sql.update('knowledge_area', data, { id: id });
        }

    };

    return self;

}
