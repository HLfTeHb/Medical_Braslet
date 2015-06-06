var db = require('mysql');

var rand = function() {
    return Math.random().toString(36).substr(2);
};
var token = function() {
    return rand() + rand();
};

function dbquery(res) {

    var connection = db.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'SVT'
    });
    var result = "";
    connection.connect();
    connection.query('SELECT * from Categories', function (err, rows, fields) {
        if (err) {
            throw err;
        }
        else {
            result = JSON.stringify(rows);
            res.writeHead(200,{"Content-Type": "text/plain","Access-Control-Allow-Origin": "*"});
            res.write(result);
            res.end();
        }
    });
    connection.end();
}

function userLogIn(res,postData){
    var connection = db.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'SVT'
    });
    var result = "";
    connection.connect();
    var temp = JSON.parse(postData);
    connection.query("SELECT token FROM Users WHERE login='"+temp['login']+"' and password='"+temp['password']+"'", function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            result = JSON.stringify(rows);
            res.writeHead(200,{"Content-Type": "text/plain","Access-Control-Allow-Origin": "*"});
            console.log("Sent result: "+result);
            res.write(result);
            res.end();
        }
    });
    connection.end();
}

function getToken(res,postData){
    var connection = db.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'SVT'
    });
    var result = "";
    connection.connect();
    var temp = JSON.parse(postData);
    connection.query("SELECT token FROM Users WHERE login='"+temp['login']+"'", function (err, rows, fields) {
        if (err) {
            throw err;
        }
        else {
            result = JSON.stringify(rows);
            res.writeHead(200,{"Content-Type": "text/plain","Access-Control-Allow-Origin": "*"});
            console.log("Sent result: "+result);
            res.write(result);
            res.end();
        }
    });
    connection.end();
}

function addUser(res,postData){
    var connection = db.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'SVT'
    });
    var result = "";
    connection.connect();
    var temp = JSON.parse(postData);
    connection.query("INSERT INTO Users VALUES('"+temp['login']+"','"+temp['password']+"','"+token()+"','"+temp['e-mail']+"')", function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            result = JSON.stringify(rows);
            res.writeHead(200,{"Content-Type": "text/plain","Access-Control-Allow-Origin": "*"});
            console.log("Sent result: "+result);
            res.write(result);
            res.end();
        }
    });
    connection.end();
}

function getUserStat(res,postData){
    var connection = db.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'SVT'
    });
    var result = "";
    connection.connect();
    var temp = JSON.parse(postData);
    connection.query(
            "select categories.time as category_time, categories.name as category_name from activities, categories where activities.id_category=categories.id_category and token_user='"+temp['token']+"' group by categories.name;",
        function (err, rows, fields) {
            if (err) {
                console.log(err);
            }
            else {
                result = JSON.stringify(rows);
                res.writeHead(200, {"Content-Type": "text/plain", "Access-Control-Allow-Origin": "*"});
                console.log("Sent result: " + result);
                res.write(result);
                res.end();
            }
        });

    connection.end();
}

function getUserActStat(res,postData){
    var connection = db.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'SVT'
    });
    var result = "";
    connection.connect();
    var temp = JSON.parse(postData);
    connection.query(
            "select activities.name as activity_name, activities.time as activity_time, activities.id_emotion as emotion from categories,activities where activities.id_category=categories.id_category and activities.token_user='"+temp['token']+"' and categories.name='"+temp['category']+"';",
        function (err, rows, fields) {
            if (err) {
                console.log(err);
            }
            else {
                result = JSON.stringify(rows);
                res.writeHead(200, {"Content-Type": "text/plain", "Access-Control-Allow-Origin": "*"});
                console.log("Sent result: " + result);
                res.write(result);
                res.end();
            }
        });

    connection.end();
}

function getUserProf(res,postData){
    var connection = db.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'SVT'
    });
    var result = "";
    connection.connect();
    var temp = JSON.parse(postData);
    connection.query(
            "select login,e_mail from users where token = '"+temp['token']+"';",
        function (err, rows, fields) {
            if (err) {
                console.log(err);
            }
            else {
                result = JSON.stringify(rows);
                res.writeHead(200, {"Content-Type": "text/plain", "Access-Control-Allow-Origin": "*"});
                console.log("Sent result: " + result);
                res.write(result);
                res.end();
            }
        });

    connection.end();
}

exports.dbquery = dbquery;
exports.userLogIn = userLogIn;
exports.getToken = getToken;
exports.addUser = addUser;
exports.getUserStat = getUserStat;
exports.getUserActStat = getUserActStat;
exports.getUserProf = getUserProf;