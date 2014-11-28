module.exports = function(app, sql){

    var log = app.utils.log,
    _ = app.utils._,
    Q = app.utils.q;

    var self = {

        activeInstitutions: function(evaluee){
            return sql.query(
                "SELECT i.* " +
                "FROM " + (
                    "institution i, group g, group_evaluees ge "
                ) +
                "WHERE " + (
                    "ge.evaluee_id = ? AND " +
                    "g.id = ge.group_id AND " +
                    "i.id = g.institution_id"
                ), [ evaluee ]
            ).then(function(institutions){
                var qs = [];

                for(institution in institutions){

                    qs.push(
                        (function(institution) {
                            return sql.selectOne(
                                'image', {id: institution.image_id}
                            ).then(function(image){
                                return _.extend(
                                    { image: image },
                                    _.omit(institution, 'image_id')
                                )
                            })
                        })(institutions[institution])
                    );
                }

                return Q.all(qs);
            });
        }

        find: function(values){
            return sql.selectOne(
                'institution', values
            ).then(function(institution){
                return sql.selectOne(
                    'image', {id: institution.image_id}
                ).then(function(image){
                    return _.extend(
                        { image: image },
                        _.omit(institution, 'image_id')
                    )
                });
            });
        },

        findAll: function(values){
            return sql.select(
                'institution', values
            ).then(function(institutions){
                var qs = [];

                for(institution in institutions){

                    qs.push(
                        (function(institution) {
                            return sql.selectOne(
                                'image', {id: institution.image_id}
                            ).then(function(image){
                                return _.extend(
                                    { image: image },
                                    _.omit(institution, 'image_id')
                                )
                            })
                        })(institutions[institution])
                    );
                }

                return Q.all(qs);
            });
        },

        create: function(institution){
            return sql.insert('institution', institution).then(function(res){
                return self.find({ id: institution.id });
            });
        },

        update: function(id, institution){
            return sql.update('institution', institution, { id: id });
        },

        destroy: function(id){
            return sql.delete('institution', { id: id });
        }

    };

    return self;

}
