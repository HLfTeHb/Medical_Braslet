var database = require("./database");

function start(res, postData) {
    console.log("Вызывается обработчик по запросу 'start'.");
    database.dbquery(res);
}

function upload(res, postData) {
    console.log("Вызывается обработчик по запросу 'upload'.");
    res.writeHead(200,{"Content-Type": "text/plain","Access-Control-Allow-Origin": "*"});
    res.write(postData);
    res.end();
}

function getUserInfo(res, postData){
    console.log("Вызывается обработчик по запросу '/get_user_info'");
    database.userLogIn(res,postData);
}

function verifyToken(res,postData){
    console.log("Вызывается обработчик по запросу '/verify_user'");
    database.getToken(res,postData);
}

function registration(res,postData){
    console.log("Вызывается обработчик по запросу '/registration'");
    database.addUser(res,postData);
}

function getUserStatistic(res,postData){
    console.log("Вызывается обработчик по зпросу '/get_user_statistic'");
    database.getUserStat(res,postData);
}

function getUserActStatistic(res,postData){
    console.log("Вызывается обработчик по зпросу '/get_user_act_statistic'");
    database.getUserActStat(res,postData);
}

function getUserProfile(res,postData){
    console.log("Вызывается обработчик по зпросу '/get_user_profile'");
    database.getUserProf(res,postData);
}

exports.start = start;
exports.upload = upload;
exports.getUserInfo = getUserInfo;
exports.verifyToken = verifyToken;
exports.registration = registration;
exports.getUserStatistic = getUserStatistic;
exports.getUserActStatistic = getUserActStatistic;
exports.getUserProfile = getUserProfile;