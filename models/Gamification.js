module.exports = function(app, sql){

    var math = app.utils.math,
        log = app.utils.log;

    // LoL-alike levels for gamification
    var levels = [
    'bronze', 'silver', 'gold', 'master', 'platinum', 'diamond', 'master'
    ];

    return {

        indicators: function(user){

            return sql.selectOne(
                'evaluee', { id: user }
            ).then(function(isEvaluee){
                if(!isEvaluee) throw {
                    message: "user_is_not_evaluee",
                    statusCode: 403
                }
                return sql.one(
                    "SELECT COUNT(*) AS rightQuestions " +
                    "FROM " +
                    "   question q, response r, answer a " +
                    "WHERE " +
                    "   a.id = r.answer_id AND a.right = TRUE AND " +
                    "   q.id = r.question_id AND r.evaluee_id = ?",
                    [ user ]
                );
            }).then(function(data){
                var rightQuestions = data.rightQuestions;

                var response = {
                    questions: rightQuestions,
                    fullLevel: math.log(rightQuestions, 15),
                    level: math.floor(math.log(rightQuestions, 15)),
                    levelName: (function(){
                        var level = this.level,
                        uBound = levels.length - 1;
                        return levels[level >= ubound ? ubound : level];
                    })()
                };

                log.debug(response);

                return response;

            });

        }

    }

}
