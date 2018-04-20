"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var ws_1 = require("ws");
// 创建一个服务器，并创建服务器
var app = express();
// // 发送get请求
app.get('', function (req, res) {
    res.send('我是主页');
});
// app.use('/', express.static(path.join(__dirname, '..', 'test')))
//商品信息
app.get('/api/products', function (req, res) {
    var result = products;
    var search = req.query; // 拿到serch对象{title:string,price:number,tagegory:string||-1}
    if (search.title) {
        result = result.filter(function (p) { return p.title.indexOf(search.title) != -1; });
    }
    if (search.price) {
        result = result.filter(function (p) { return p.price <= parseInt(search.price); });
    }
    if (search.category != -1 && search.category) {
        result = result.filter(function (p) { return p.category.indexOf(search.category) != -1; });
    }
    res.json(result);
});
app.get('/api/product', function (req, res) {
    res.json(products);
});
app.get('/api/product/:id', function (req, res) {
    res.json(products.find(function (product) {
        return product.id == req.params.id;
    }));
});
// 商品评价
app.get('/api/product/:id/comment', function (req, res) {
    // 发送单个商品信息
    res.json(comments.filter(function (comment) { return comment.productID == req.params.id; }));
});
// 监听服务器端口
var server = app.listen(8000, 'localhost', function () {
    console.log('服务器已经启动成功，服务器地址是：http://localhost:8000');
});
// 商品服务
var Product = (function () {
    function Product(id, title, price, desc, rating, category) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.desc = desc;
        this.rating = rating;
        this.category = category;
    }
    return Product;
}());
exports.Product = Product;
;
var products = [
    new Product(1, '第1个标题', 10, '我是第一个描述哦', 4.5, ['化妆品', '电子设备']),
    new Product(2, '第2个标题', 20, '我是第一个描述哦', 3.5, ['化妆品', '电子设备']),
    new Product(3, '第3个标题', 30, '我是第一个描述哦', 2.5, ['化妆品', '电子设备']),
    new Product(4, '第4个标题', 50, '我是第一个描述哦', 1.5, ['化妆品', '电子设备']),
    new Product(5, '第5个标题', 40, '我是第一个描述哦', 1.5, ['化妆品', '图书']),
    new Product(6, '第6个标题', 99, '我是第一个描述哦', 1.5, ['化妆品', '图书']),
    new Product(7, '第7个标题', 67, '我是第一个描述哦', 1.5, ['化妆品', '图书'])
];
// 商品评价
var Comment = (function () {
    function Comment(id, productID, user, time, content, price, rating) {
        this.id = id;
        this.productID = productID;
        this.user = user;
        this.time = time;
        this.content = content;
        this.price = price;
        this.rating = rating;
    }
    return Comment;
}());
exports.Comment = Comment;
var comments = [
    new Comment(1, 2, '张三', '2017-12-25', '圣诞节', 100, 4),
    new Comment(2, 1, '张4', '2017-12-25', '圣诞节', 100, 3),
    new Comment(3, 5, '张5', '2017-12-25', '圣诞节', 100, 2),
    new Comment(3, 1, '张6', '2017-12-25', '圣诞节', 100, 1)
];
var wsServer = new ws_1.Server({ port: 8085 });
wsServer.on("connection", function (webSocket) {
    webSocket.send('这个消息是服务器端主动推送的');
    webSocket.on("message", function (message) {
        console.log("接收到的消息是：" + message);
    });
});
/*
setInterval(() => {
    if(wsServer.clients) {
        wsServer.clients.forEach( client => {
            return client.send('这个消息是定时发送的')
        },1000)
    }
});*/
