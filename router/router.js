//注册
var crypto = require('crypto');

exports.register=function(req,res){
	res.render("register");
}

exports.doregister=function(req,res){
   var User = global.dbHelper.getModel('user')
	     var uname = req.body.name;
          var password=req.body.password;
           
	     User.findOne({name:uname},function(error,doc){
	     if(error){
	     	console.log(error)	
	     }else if(doc){
	     	res.send("用户已创建");
	     	console.log("用户已创建")
	     }else{
	     	User.create({
	     		name:uname,
	     		password:password
	     	},function(error,doc){
	             if (error) {
	                 console.log(error);
	             }else{
	             	
	             	 res.send("1");
	             }

	     	})
	     }
	   })
	
}

//登陆

exports.login=function(req,res){
	res.render("login");
	
}


exports.dologin=function(req,res,next){
   var User = dbHelper.getModel('user')
   var uname = req.body.name;
   
   User.findOne({name:uname},function(error,doc){
     if(error){
     	console.log(error)	
     }else if(!doc){
     	res.send("non-exist");

     }else{
     	if(req.body.password !=doc.password){
     		res.send("0");
     	}else{ 
     	    req.session.login="1";  //设置session
     		req.session.username = doc;
            res.send("1");	
     	}
     }
   })
}

//首页

exports.index=function(req,res){
	 var Article = global.dbHelper.getModel('article');
   
	Article.find({},function(err,doc){  
       res.render("index",{
       	 "art":doc,
       	 "username": req.session.username ? req.session.username:'',
         "login":req.session.login == "1" ? 1:0
       })
	  }).sort({"time":-1})

	  
}



//发表文章

exports.article=function(req,res){
   
    res.render("article",{
        "username": req.session.username ? req.session.username:'',
        "login":req.session.login == "1" ? 1:0
    })
}


exports.doarticle=function(req,res){
     var Article = global.dbHelper.getModel('article')
	     var title = req.body.title;
	     var text=req.body.text;
	     var time=new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()+' '+new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds();    
	     var author=req.session.username.name;
	     Article.create({
	     	title:title,
	     	text:text,
	     	time:time,
	     	author:author

	     },function(error,doc){
	     	  req.session.art=doc;
	     	  res.json({
	     	  	"success":"1"
	     	  })
	     	
	     })
	   
}
//退出
exports.logout=function(req,res){
    req.session.username = null;
    req.session.login = null;
    res.redirect('/');
}

//详细的文章内容
exports.text=function(req,res){
 var Article = global.dbHelper.getModel('article');
  var i=req.params.id;
  
  Article.find({_id:i},function(err,doc){
  	
   res.render("text",{
       	  "article":doc[0],
       	   "username": req.session.username ? req.session.username:'',
          "login":req.session.login == "1" ? 1:0
       })
	 })
	 
}

//聊天室

exports.chat=function(req,res){
   res.render("chat",{
   	   "username": req.session.username ? req.session.username:'',
       "login":req.session.login == "1" ? 1:0
   })
	 
}