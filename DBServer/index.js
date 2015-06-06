var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/get_user_info"] = requestHandlers.getUserInfo;
handle["/verify_token"] = requestHandlers.verifyToken;
handle["/registration"] = requestHandlers.registration;
handle["/get_user_statistic"] = requestHandlers.getUserStatistic;
handle["/get_user_act_statistic"] = requestHandlers.getUserActStatistic;
handle["/get_user_profile"] = requestHandlers.getUserProfile;

server.startServer(router.route, handle);