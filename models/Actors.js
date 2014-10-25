module.exports = function(app, sql){

    self = {

        setEvaluator: function(user){
            return sql.selectOne(
                'evaluee', { id: user.id }
            ).then(function(u){
                if(u) throw { "message": "Current user is evaluee"};
                return sql.insert('evaluator', { id: user.id });
            })

        },

        setEvaluee: function(user, isDisabled){
            return sql.selectOne(
                'evaluator', { id: user.id }
            ).then(function(u){
                if(u) throw { "message": "Current user is evaluator"};
                if(isDisabled != null){
                    return sql.insert(
                        'evaluee', { id: user.id, v_is_disabled: isDisabled}
                    );
                } else {
                    throw {
                        "message": "Must include 'disabled' field to " +
                            "indicate if user is visually disabled",
                        "missingFields": ["disabled"]
                    };
                }
            })
        }

    }

    return self;

}
