var express = require("express");

var app = express();

var http = require("http").Server(app);
var io = require("socket.io")(http)

var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var router = require("./router/router");

var mongoose = require("mongoose");



global.dbHelper = require( './models/dbHelper' );

mongoose.connect("mongodb://127.0.0.1:27017/test1");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

app.use(cookieParser());
app.use(session({
     secret: '12345',
     cookie: {maxAge: 800000000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
}))



//静态资源
app.use(express.static(__dirname + '/public'));

//设置模板引擎
app.set("view engine", "ejs");
app.get("/login",router.login);  
app.post("/login",router.dologin);
app.get("/register",router.register)
app.post('/register',router.doregister)
app.get("/",router.index)
app.get("/article",router.article)
app.post("/article",router.doarticle)
app.get('/logout',router.logout )
app.get('/article/:id',router.text)

app.get("/chat",router.chat)


io.on("connection",function(socket){
	socket.on("liaotian",function(msg){
		io.emit("liaotian",msg)
	})
})

http.listen(80)