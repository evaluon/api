module.exports = function(app){

    var _ = app.utils._,
        log = app.utils.log,
        hotp = app.utils.hotp,
        checkFields = app.utils.checkFields,
        salt = app.config.security.salt,
        OpenedTest = app.db.OpenedTest;

    return {

        openTest: function(user, test, hotp){

            return checkFields(
                ['user', 'test', 'hotp'],
                { user: user, test: test, hotp: hotp }
            ).then(function(){

                if(hotp == hotp(salt, test)){
                    return OpenedTest.openTest(user, test);
                } else {
                    throw {
                        statusCode: 403,
                        message: "invalid_hotp_code"
                    }
                }

            })

        },

        closeTest: function(user, test){

            return checkFields(
                ['user', 'test'],
                { user: user, test: test }
            ).then(function(){
                return OpenedTest.closeTest(user, test);
            })

        }


    }

}
