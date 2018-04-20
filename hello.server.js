"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 创建服务器
var http = require("http");
var server = http.createServer(function (require, respone) {
    respone.end("Hello word！");
});
// 启动服务器
server.listen(8000);
