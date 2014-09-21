module.exports = function(app){

    var Answer = app.db.Answer;

    return {

        associate: function(options){

            return Answer.create(options);

        }

    };

};
