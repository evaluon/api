module.exports = function(app){

    var image = app.controllers.image;

    return [
    {
        method: 'post',
        url: '/image',
        action: image.createImage,
        cors: true
    }
    ]


}
