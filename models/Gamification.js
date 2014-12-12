module.exports = function(app, sql){

    var math = app.utils.math,
        log = app.utils.log;

    // LoL-alike levels for gamification
    var levels = [
    'bronze', 'silver', 'gold', 'platinum', 'diamond', 'master'
    ];

    var levelDescriptions = [
    // Bronze
    "Es el primer estatus por llegar a los  8 puntos, es muy fácil de llegar " +
    "allí, sigue respondiendo preguntas de diferentes asignaturas y llega a " +
    "Plata.",
    // Silver
    "Solo un poco de tiempo para llegar hasta aquí con  64 puntos, pero " +
    "desafía tu conocimiento y sigue practicando.",
    // Gold
    "Ahora tienes 512  puntos  cada vez te vas convirtiendo en un sabe lo " +
    "todo, que esperas quieres ser el mejor? y ganar puntos extras con tus " +
    "evaluadores? sigue en marcha.",
    // Platinum
    "Debes tener entre 512 y 4096 puntos no es tarea facil pero confiamos en " +
    "ti, así que no te rindas, el banco de preguntas son infinitas para " +
    "lograr este puntaje.",
    // Diamond
    "Lograr 4096 y 32.768 puntos ya eres un berraco poder llegar hasta aquí, " +
    "muy buen trabajo eres un honorable estudiante que podrás generar un gran" +
    "impacto entre sus compañeros y evaluadores, te has ganado el " +
    "reconocimiento que mereces. ",
    // Ultimate
    "Animate para tener 32.768 y 262.144 puntos, o más, quieres ser el gurú " +
    "de tu institución llega a este nivel y logra el desafío más honorable " +
    "de nuestro pais. "
    ]

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

                if(rightQuestions > 0){
                    fullLevel = math.log(rightQuestions, 8),
                    level = math.floor(fullLevel);
                } else {
                    fullLevel = level = 0;
                }

                var response = {
                    questions: rightQuestions,
                    remainingQuestions: math.pow(8, level + 1) - rightQuestions,
                    fullLevel: fullLevel,
                    level: level,
                    levelName: (function(){
                        var ubound = levels.length - 1;
                        return levels[level >= ubound ? ubound : level];
                    })(),
                    description: (function(){
                        var ubound = levelDescriptions.length - 1;
                        return levelDescriptions[
                        level >= ubound ? ubound : level
                        ];
                    })
                };

                return response;

            });

        }

    }

}
