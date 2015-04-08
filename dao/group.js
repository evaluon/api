module.exports = function(app){

    var q = app.utils.q,
        _ = app.utils._,
        log = app.utils.log,
        checkFields = app.utils.checkFields,
        Group = app.db.Group,
        Actors = app.db.Actors,
        UserDao = require('./user')(app);

    var self = {

        findGroups: function(institution_id){
            return checkFields(
                [':id'], { ':id': institution_id }
            ).then(function(){
                return Group.findAll({ institution_id: institution_id });
            }).then(function(groups){
                var qs = [];

                for(group in groups){
                    (function(group){
                        qs.push(
                            UserDao.retrieveUser({
                                id: group.user.id
                            }).then(function(user){
                                group.user = user;
                                return group;
                            })
                        );
                    })(groups[group]);
                }

                return q.all(qs);
            });
        },

        findGroup: function(institution_id, group_id){
            var fields = { ':id': group_id, institution_id: institution_id };
            return checkFields(
                [':id', 'institution_id'], fields
            ).then(function(){
                return Group.find(fields);
            }).then(function(group){
                return UserDao.retrieveUser({
                    id: group.user.id
                }).then(function(user){
                    group.user = user;
                    return user;
                });
            });
        },

        createGroup: function(options){
            return checkFields(
                ['institution_id', 'evaluator_id'], options
            ).then(function(){
                return Group.create(options);
            });
        },

        updateGroup: function(options){
            return checkFields(['id'], { id: options.id }).then(function(){
                return Group.create(options.id, options);
            });
        },

        groupPeriods: function(id){
            return checkFields([':id'], { ':id': id }).then(function(){
                return Group.groupPeriods(id);
            });
        },

        setPeriod: function(id){
            return checkFields([':id'], { ':id': id }).then(function(){
                return Group.setPeriod(id);
            });
        }

    }

    return self;

}
