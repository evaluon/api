modules.export = function(app, sql){

    return {

        userIndicators: function(user){

            return sql.selectOne('evaluee', { id: user }).then(function(isEvaluee){
                if(!isEvaluee) throw {
                    message: "user_is_not_evaluee",
                    statusCode: 403
                }
            })

        }

    }

}
