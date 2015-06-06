var http = require('http');
var url  = require('url');
var client = require('./client');
var querystring = require('querystring');

function startServer() {
    //создание сервера , задаём порт
    var server = http.createServer();
    server.listen(1338);
    console.log('Сервер запущен. (127.0.0.1:1338)');
    //обработка события "по запросу" , парсим адресс, делаем запрос на сервер БД
    server.on('request', function (req, res) {
        var pathname = url.parse(req.url).pathname;
        if(pathname == '/favicon.ico'){console.log('ico check');}
        else{
            var postData="";
            req.addListener('data',function (postDataChunk){
                postData+=postDataChunk;
            })
            console.log('Получен запрос : ' + pathname);
            req.addListener('end',function(){
                console.log("REQUEST BODY: "+postData);
                client.request(pathname,res,postData);
            })

        }
    })
    var io = require('socket.io').listen(server);
    io.sockets.on('connection', function(client) {
        client.on('message', function (err, msg) {
            client.broadcast.emit('message', msg);
        });
    });
}
exports.startServer = startServer;