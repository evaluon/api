module.exports = function(app, sql){

    var Q = app.utils.q;

    var self = {

        create: function(answers){

            qs = [];

            for(answer in answers){
                answer = answers[answer];

                qs.push(
                    sql.insert('answer', answer).then(function(res){
                        return self.find({ id: res.insertId });
                    }).then(function(answer){
                        return answer.id;
                    })
                );
            }

            return Q.all(qs);

        },

        find: function(criteria){
            return sql.selectOne('answer', criteria);
        },

        

    };

    return self;

}
