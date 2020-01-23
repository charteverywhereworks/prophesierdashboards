var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://localhost:27017/dashboardwidgets";
var url = "mongodb://localhost:27017/"; 

/* MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("dashboardwidgets").drop(function(err, delOK) {
      if (err) throw err;
      if (delOK) console.log("Collection deleted");
      db.close();
    });
  }); */

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("dashboardwidgets").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log("find all")
      console.log(result);
      db.close();
    });
  });

/*   MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");

    dbo.collection("dashboardwidgets").find({userid: "test"}).toArray(function(err, result) {
      if (err) throw err;
      console.log("find one")
      console.log(result);
      console.log(result[0])
      console.log(result.length)
      //if (result[0] && result.length === 1) found = true
      db.close();
    });
  }); */

  exports.checkuser = function(req,res) {
    console.log("req",req.body);
    const myquery = {userid: req.body.userid};
  
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
  
      var dbo = db.db("mydb");
      dbo.collection("dashboardwidgets").find(myquery).toArray(function(err, result) {
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
  
  exports.deletewidget = function(req, res) {
    console.log("req", req.body);
    const myquery = {userid: req.body.userid};
    const mydata = {
      "userid": req.body.userid,
      "user_widgets_dashboards": req.body.userWidgetsDashboards
    };

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      console.log(req.body.found)

      if (req.body.found) {
        console.log("Deleting onw")
        const newvalues = {$set: mydata};
        dbo.collection("dashboardwidgets").deleteOne(myquery, function(err, results) {
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
                "success":"Data removed sucessfully"
              });
            }
            console.log("1 document removed");
            db.close();
        });
      } else {
          console.log("User not found!")
      }
    });
  }
  exports.updatedata = function(req,res) {
      console.log("req", req.body);
      const myquery = {userid: req.body.userid};
      const mydata = {
        "userid": req.body.userid,
        "user_widgets_dashboards": req.body.userWidgetsDashboards
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
            dbo.collection("dashboardwidgets").updateOne(myquery, newvalues, function(err, results) {
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
            dbo.collection("dashboardwidgets").insertOne(mydata, function(err, results) {
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

          dbo.collection("dashboardwidgets").find(myquery).toArray(function(err, result) {
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
//Create Colllection
/* MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.createCollection("dashboardwidgets", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
}); */


//Make userid unique

//Insert one or many
/* MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = { 
        userid: "fredy", 
        userWidgetsDashboards: [
            {
                maintitle: "My Widgets",
                elements: [
                    {
                        name: "Add",
                        id: "addWidgetxyz",
                        type: "empty",
                        options: {},
                        filter: [],
                        icon: "AddIcon"
                    }
                ]
            }, 
            {
                maintitle: "My Dashboards",
                elements: [
                    {
                        name: "Add",
                        id: "addDashboardxyz",
                        arrayInputs: [],
                        layouts: {},
                        icon: "AddIcon"
                    }
                ]
            }  
        ]};
    dbo.collection("dashboardwidgets").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
    /* dbo.collection("customers").insertMany(myobj, function(err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
        db.close();
      });
  }); */

  //Insert one or many
/* MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = { 
        userid: "fredy",
        first_name: "test",
        last_name: "test",
        password: "test",
        role: "mainuser"
    };
    dbo.collection("users").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
    /* dbo.collection("customers").insertMany(myobj, function(err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
        db.close();
      });
  }); */

  //Find one

 /*  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("dashboardwidgets").findOne({}, function(err, result) {
      if (err) throw err;
      console.log(result.userWidgetsDashboards[0]);
      db.close();
    });
  }); */


/* MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
}); */


//Find All

/* MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("customers").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  }); */


//Projection

/* MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("customers").find({}, { projection: { _id: 0, name: 1, address: 1 } }).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  }); */

  //Filter the result

/*   MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var query = { address: "Park Lane 38" };
    dbo.collection("customers").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  }); */

  //Regular expressions

/*   MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var query = { address: /^S/ };
    dbo.collection("customers").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  }); */

  //Sort

  //Delete One

/*   MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myquery = { address: 'Mountain 21' };
    dbo.collection("customers").deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      db.close();
    });
  }); */

  //Delete Many
/*   MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myquery = { address: /^O/ };
    dbo.collection("customers").deleteMany(myquery, function(err, obj) {
      if (err) throw err;
      console.log(obj.result.n + " document(s) deleted");
      db.close();
    });
  }); */

  //Drop collection
/*   MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("customers").drop(function(err, delOK) {
      if (err) throw err;
      if (delOK) console.log("Collection deleted");
      db.close();
    });
  }); */

  //Update document
/*   MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myquery = { address: "Valley 345" };
    var newvalues = { $set: {name: "Mickey", address: "Canyon 123" } };
    dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
    });
  }); */

  //Ypdate many

  /* MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myquery = { address: /^S/ };
  var newvalues = {$set: {name: "Minnie"} };
  dbo.collection("customers").updateMany(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log(res.result.nModified + " document(s) updated");
    db.close();
  });
}); */

//limit
/* MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("customers").find().limit(5).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  }); */

  //left outer joins

  /* MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection('orders').aggregate([
    { $lookup:
       {
         from: 'products',
         localField: 'product_id',
         foreignField: '_id',
         as: 'orderdetails'
       }
     }
    ]).toArray(function(err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res));
    db.close();
  });
}); */



exports.dashboardwidgets = function(req,res){
    console.log("req", req);

    res.send({
        "code":200,
        "success":"user registered sucessfully"
    });
}