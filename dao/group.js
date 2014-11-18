module.exports = function(app){

    var log = app.utils.log,
        _ = app.utils._,
        Group = app.db.Group,
        Actors = app.db.Actors;

    var self = {

        findGroups: function(institution_id){
            return checkFields(
                [':id'], { ':id': institution_id }
            ).then(function(){
                return Group.findAll({ institution_id: institution_id });
            });
        },

        findGroup: function(institution_id, group_id){
            var fields = { ':id': group_id, institution_id: institution_id };
            return checkFields(
                [':id', 'institution_id'], fields
            ).then(function(){
                return Group.find(fields);
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
