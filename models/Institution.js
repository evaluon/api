module.exports = function(app, sql){

    var log = app.utils.log,
    _ = app.utils._,
    Q = app.utils.q;

    var self = {

        active: function(evaluee){
            return sql.query(
                "SELECT DISTINCT i.* " +
                "FROM " + (
                    "institution i, `group` g, group_evaluees ge "
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
        },

        find: function(values){
            return sql.selectOne(
                'institution', values
            ).then(function(institution){
                return sql.selectOne(
                    'image', {id: institution.image_id}
                ).then(function(image){
                    institution.image = image;
                    if(institution.evaluator_id != null){
                        return sql.one(
                            "SELECT " + (
                                "u.id, first_name, middle_name, " +
                                "last_name, birth_date, mail, " +
                                "phone_number, register_date, " +
                                "area "
                            ) +
                            "FROM " + (
                                "user u, evaluator e "
                            ) +
                            "WHERE " + (
                                "u.id = e.id AND " +
                                "e.id = ?"
                            ), [institution.evaluator_id]
                        );
                    } else {
                        return null;
                    }
                }).then(function(evaluator){
                    if(evaluator) {
                        institution.administrator = evaluator;
                    }
                    return _.omit(
                        institution,
                        [
                        'image_id',
                        'password',
                        'evaluator_id',
                        'denial_reason'
                        ]
                    );

                });
            });
        },

        unapproved: function(){
            return sql.query(
                "SELECT * FROM institution " +
                "WHERE approved = 0 AND denial_reason IS NULL"
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
                                institution.image = image;
                                if(institution.evaluator_id != null){
                                    return sql.one(
                                        "SELECT " + (
                                            "u.id, first_name, middle_name, " +
                                            "last_name, birth_date, mail, " +
                                            "phone_number, register_date, " +
                                            "area "
                                        ) +
                                        "FROM " + (
                                            "user u, evaluator e "
                                        ) +
                                        "WHERE " + (
                                            "u.id = e.id AND " +
                                            "e.id = ?"
                                        ), [institution.evaluator_id]
                                    );
                                } else {
                                    return null;
                                }
                            }).then(function(evaluator){
                                if(evaluator) {
                                    institution.administrator = evaluator;
                                }
                                return _.omit(
                                    institution,
                                    [
                                    'image_id',
                                    'password',
                                    'evaluator_id',
                                    'denial_reason'
                                    ]
                                );

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
