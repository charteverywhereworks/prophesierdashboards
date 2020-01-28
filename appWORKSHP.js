var express = require("express");  
var app = express();  
var MongoClient = require("mongodb").MongoClient;  

app.get("/", function(req, res) {  
  res.send("Hello World!");  
});  

app.get("/users", function(req, res) {  
  MongoClient.connect("mongodb://localhost:27017", function(err, db) {  
    if (err) console.log(err);  
    var db = db.db("test");	  
    db 
      .collection("users")  
      .find({})  
      .toArray(function(err, result) {  
        if (err) throw err;  

        res.json(result)  
      });  
  });  
});

app.listen(4000,function(){  
    console.log('Express app start on port 4000')  
});
