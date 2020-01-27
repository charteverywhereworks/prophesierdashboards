var MongoClient = require('mongodb').MongoClient;

//var url = "mongodb://localhost:27017/dashboardwidgets";
//var url = "mongodb://localhost:27017/";
var url = "mongodb://http://ec2-18-224-138-251.us-east-2.compute.amazonaws.com:27017/"
//const url = "mongodb+srv://prophesier:Fgj1981!@cluster0-putwc.mongodb.net/test?retryWrites=true&w=majority";

/* MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("datasource").drop(function(err, delOK) {
      if (err) throw err;
      if (delOK) console.log("Collection deleted");
      db.close();
    });
  }); */

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("datasource").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log("find all")
      console.log(result);
      db.close();
    });
  });

  /*
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("datasource").find({userid: "test"}).toArray(function(err, result) {
      if (err) throw err;
      console.log("find one")
      console.log(result);
      console.log(result[0])
      console.log(result.length)
      //if (result[0] && result.length === 1) found = true
      db.close();
    });
  }); */
exports.loaddata = function(req,res) {
  console.log("req",req.body);
  const myquery = {userid: req.body.userid};

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    
    var dbo = db.db("mydb");
    dbo.collection("datasource").find(myquery).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      console.log("found!!!!!!!!!!!!")
      console.log(result);
      console.log(result[0])
      console.log(result.length)
      if (result[0] && result.length === 1) {
        res.send({
          "code": 200,
          "success": "user found sucessfully"
        });
      } else {
        res.send({
            "code": 200,
            "success": "user no found"
          });
      }
      db.close();
    });
  });
}

exports.updatedata = function(req,res) {
    console.log("req", req.body);
    const myquery = {userid: req.body.userid};
    const mydata = {
      "userid": req.body.userid,
      "data_object": req.body.dataObject,
      "data_names": req.body.dataNames,
      "data_split": req.body.dataSplit,
      "rows": req.body.rows,
      "validateready": req.body.validateready,
      "current_layer": req.body.currentLayer,
      "length": req.body.length,
      "url": req.body.url ? req.body.url : "",
      "current_value": req.body.currentValue ? req.body.currentValue : "",
      "created":today,
      "modified":today 
    };
  
  
    var today = new Date();
    // bcrypt.hash(req.body.password, 5, function( err, bcryptedPassword) {
     //save to db
    //let req.found = true;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;

      var dbo = db.db("mydb");
      console.log("")
      console.log(req.body.found)
      if (req.body.found) {
          console.log("UPDATING")
          const newvalues = {$set: mydata};
          dbo.collection("datasource").updateOne(myquery, newvalues, function(err, results) {
              if (err) {
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
                  "success":"Data updated sucessfully"
                });
              }
              console.log("1 document updated");
              db.close();
            });
      } else {
          dbo.collection("datasource").insertOne(mydata, function(err, results) {
          if (err) {
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
              "success":"Data saved sucessfully"
            });
          }
          console.log("1 document inserted");
          db.close();
        });
      }
    });
  }


  exports.getdata = function(req,res) {
    console.log(req)
    console.log("req", req.query);
    const myquery = {userid: req.query.userid};
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");

        dbo.collection("datasource").find(myquery).toArray(function(err, result) {
          if (err) {
            res.send({
                "code": 204,
                "result": "No files found",
                "error": err
            })
          } else {
              console.log("find one")
              console.log(result);
              res.send({
                "code": 200,
                "result": result
              })
          }
          db.close();
        });
      });
  }
  