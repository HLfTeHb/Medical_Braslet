
var http = require('http');
var url  = require('url');

function startServer(route , handle) {
    var server = http.createServer();
    server.listen(1337);
    console.log('Сервер запущен. (127.0.0.1:1337)');

    server.on('request', function (req, res) {
        var pathname = url.parse(req.url).pathname;
        var postData = '';
        console.log('Получен запрос : ' + pathname);
        req.addListener('data',function (postDataChunk){
            postData += postDataChunk;
            console.log('POST :'+postDataChunk+'.');
        });
       req.addListener('end',function(){
           route(handle,pathname,res,postData);
       });
    })
}
exports.startServer = startServer;