
function route(handle, pathname, res,postData){
    console.log('Вызов ф-ции для : ' + pathname);
    if(typeof handle[pathname] == 'function') {
        return handle[pathname](res, postData);
    }
    else {
        console.log('Нет функции для ' + pathname);
        res.writeHead(404,{"Content-Type": "text/plain","Access-Control-Allow-Origin": "*"});
        res.write('404 Not found');
        res.end();
    }

}

exports.route = route;