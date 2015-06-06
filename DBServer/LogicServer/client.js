var http = require('http');
function request(pathname,result,postData) {
    //параметры запроса , редирект на сервер БД , парсим бади , передаём клиенту , закрываем поток
    var options = {
        hostname: '127.0.0.1',
        port: 1337,
        path: pathname,
        method: 'POST'
    };
    var req = http.request(options, function (res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('RESPONSE BODY: ' + chunk);
            result.writeHead(200,{"Content-Type": "text/plain","Access-Control-Allow-Origin": "*"});
            result.write(chunk);
            result.end();
        });
    });
    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });
    req.write(postData);
    req.end();
}

exports.request = request;
