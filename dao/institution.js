module.exports = function(app){

    var log = app.utils.log,
        _ = app.utils._,
        Institution = app.db.Institution;

    self = {

        retrieveInstitutions: function(){
            return Institution.findAll();
        },

        retrieveInstitution: function(id){
            return Institution.find({ id: id });
        },

        createInstitution: function(institution){
            return Institution.create(institution);
        },

        updateInstitution: function(id, values){
            return Institution.update(id, values);
        }

    };

    return self;

}
