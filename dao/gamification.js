module.exports = function(app){

    var Gamification = app.db.Gamification;

    return {

        indicators: function(user){
            return Gamification.indicators(user);
        }

    }

}
