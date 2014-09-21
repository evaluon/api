module.exports = function(app){

    var _ = app.utils._,
        log = app.utils.log,

        sequelize = app.db.sequelize,
        Utils = app.db.Sequelize.Utils,

        AnswerOptions = app.db.AnswerOption,
        Test = app.db.Test,
        SelfTest = app.db.SelfTest,
        TestResponse = app.db.TestResponse,
        TestQuestion = app.db.TestQuestion,
        Question = app.db.Question,
        Student = app.db.Student;

    Dao = {

        createTest: function(){

            return Test.create();

        },

        createSelfTest: function(user){

            response = {};
            questions = [1, 2];

            return Dao.createTest().then(function(test){
                return Student.find({
                    where: {
                        UserId: user.id
                    }
                }).then(function(student){
                    return {
                        student: student,
                        test: test
                    };
                })
            }).then(function(d){

                student = d.student;
                test = d.test;
                return SelfTest.create({
                    StudentId: student.id,
                    TestId: test.id
                }).then(function(){
                    return test;
                });
            }).then(function(test){
                return Dao.addResponse(user, test);
            }).then(function(test){

                response = test.dataValues;

                var q = new Utils.QueryChainer;

                for(n in questions){
                    q.add(TestQuestion.create({
                        TestId: test.id,
                        QuestionId: questions[n]
                    }));
                }

                return q.run();

            }).then(function(questions){

                log.debug(questions);

                return _.map(questions, function(question){

                    return Question.findAll({
                        include: [
                        {
                            model: AnswerOptions
                        }
                        ],
                        where: {
                            id: question.QuestionId
                        }
                    }).then(function(questions){
                        log.debug(questions);
                        return questions[0];
                    });

                });

            }).then(function(questions){

                response.questions = [];

                for(q in questions){
                    log.debug("%j", questions[q]);
                    response.questions.push(questions[q]);
                }

            }).then(function(){
                return response;
            });

        },

        addResponse: function(user, test){

            return Test.find(test).then(function(test){
                return TestResponse.create({
                    UserId: user.id,
                    TestId: test.id
                }).then(function(){
                    return test;
                });
            });

        },

        listSelfTest: function(user){

            var query = "SELECT t.* FROM Students s, SelfTests st, Tests t " +
                "WHERE st.StudentId = s.id AND st.TestId = t.id AND " +
                "s.UserId = '" + user.id + "'";

            return sequelize.query(query, Test).then(function(test){
                return test;
            });

        }

    };

    return Dao;

}
