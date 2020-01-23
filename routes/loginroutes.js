var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://localhost:27017/dashboardwidgets";
var jsonfile = require('jsonfile');
//var url = "mongodb://localhost:27017/"; 
const url = "mongodb+srv://prophesier:Fgj1981!@cluster0-putwc.mongodb.net/test?retryWrites=true&w=majority";

/* MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myquery = {userid: "test"};
  dbo.collection("users").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    db.close();
  });
}); */

/* MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection("users").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
    db.close();
  });
});
 */
/* MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection("users").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log("find all")
    console.log(result);
    db.close();
  });
}); */

exports.register = function(req,res) {
  console.log("req",req.body);
  var today = new Date();
  // bcrypt.hash(req.body.password, 5, function( err, bcryptedPassword) {
   //save to db
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = { 
      "first_name":req.body.first_name,
      "last_name":req.body.last_name,
      "userid":req.body.userid,
      "password":req.body.password,
      "role":req.body.role,
      "created":today,
      "modified":today
    };
    dbo.collection("users").insertOne(myobj, function(err, results) {
      if (err) {
        console.log(err)
        //throw err;
        res.send({
          "code":400,
          "failed":"error ocurred"
        })
      } else {
        console.log(results)
        console.log('The solution is: ', results);
        res.send({
          "code":200,
          "success":"user registered sucessfully"
        });
      }
      console.log("1 document inserted");
      db.close();
    });
    /* dbo.collection("customers").insertMany(myobj, function(err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
        db.close();
      });*/
  });
}

exports.checkuserlogin = function(req,res) {
  console.log("req",req.body);
  var userid= req.body.userid;
  
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var query = { userid: userid };
    dbo.collection("users").find(query).toArray(function(err, results) {
      console.log("Here the results")
      console.log(results)
      if (err) {
        //throw err;
        console.log("error ocurred",err);
        res.send({
          "code":400,
          "failed":"error ocurred"
        })
      } else {  
          if(results.length === 1) {

            res.send({
              "code":200,
              "success":"user already exist"
            })
      
          } else {
            res.send({
              "code":200,
              "success":"User does not exist"
            });
          }
      }
      console.log(results);
      db.close();
    });
  }); 
}

exports.login = function(req,res) {
  console.log("Attempting to login with this req")
  console.log("req",req.body);
  var userid= req.body.userid;
  var password = req.body.password;
  var role = req.body.role;
  console.log("Attempting to connect to Mongo")
  MongoClient.connect(url, function(err, db) {
    console.log("Connecting MongoClient")
    if (err) {
      console.log("Error connecting to Mongo")
      console.log(err)
      throw err;
    }
    var dbo = db.db("mydb");
    var query = { userid: userid };
    dbo.collection("users").find(query).toArray(function(err, results) {
      console.log(results)
      if (err) {
        //throw err;
        console.log("error ocurred",err);
        res.send({
          "code":400,
          "failed":"error ocurred"
        })
      } else {
        {
          console.log("Success, veryfing password match")
          if(results.length >0){
            if(results[0].password == req.body.password){
              console.log('The solution is: ', results[0].password,req.body.password,req.body.role);
              if(results[0].role == req.body.role){
                var file = './userdata/userid.json'
                var obj = {userid: req.body.userid}
                jsonfile.writeFile(file, obj, function (err) {
                  if(err){
                    console.log("Error ocurred in writing json during login at login handler in login routes",err);
                  }
                })
                res.send({
                  "code":200,
                  "success":"login sucessfull"
                })
              }
              else{
                res.send({
                  "code":204,
                  "success":"You have logged in from wrong user role"
                })
              }
      
            }
            else{
              res.send({
                   "code":204,
                   "success":"Email and password does not match"
              })
            }
      
          }
          else{
            res.send({
              "code":204,
              "success":"Email does not exits"
                });
          }
      
      
        }
      }
      console.log(results);
      db.close();
    });
  }); 
}
