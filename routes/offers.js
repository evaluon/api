module.exports = function(app){

    var offers = app.controllers.offers;

    return [
    {
        method: 'get',
        url: '/offers',
        action: offers.retrieveOffers,
        cors: true
    }
    ];

};
