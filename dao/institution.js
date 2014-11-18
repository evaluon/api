module.exports = function(app){

    var _ = app.utils._,
        log = app.utils.log,
        checkFields = app.utils.checkFields,
        Image = app.db.Image,
        Institution = app.db.Institution;

    self = {

        retrieveInstitutions: function(){
            return Institution.findAll();
        },

        retrieveInstitution: function(id){
            return Institution.find({ id: id });
        },

        findInstitution: function(values){
            return Institution.find(values);
        },

        createInstitution: function(options){
            return checkFields(
                [
                'id', 'name', 'address', 'mail', 'phone_number',
                'image.location', 'image.description'
                ],
                {
                    id: options.id,
                    name: options.name,
                    address: options.address,
                    mail: options.mail,
                    phone_number: options.phone_number,

                    'image.location': options.image.location,
                    'image.description': options.image.description
                }
            ).then(function(){
                return Image.create(options.image);
            }).then(function(image_id){
                return Institution.create(
                    _.extend(
                        { image_id: image_id },
                        _.omit(options, 'image')
                    )
                );
            })

        },

        updateInstitution: function(id, values){
            return Institution.update(id, values);
        }

    };

    return self;

}
