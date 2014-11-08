var Hashids = require('hashids'),
    speakeasy = require('speakeasy')

module.exports = function(salt, cter){
    return speakeasy.hotp({key: new Hashids(salt).encode(cter), counter: cter});
}
