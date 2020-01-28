var express = require("express");
var login = require('./routes/loginroutes');
//var upload = require('./routes/fileroutes');
var dashboardwidgets = require("./routes/dashboardwidgets");
var loaddata = require("./routes/loaddata");
var path = require("path");

var bodyParser = require('body-parser');
//var mongo = require('mongodb');

const cookieParser = require('cookie-parser');
/*
Module:multer
multer is middleware used to handle multipart form data
*/
//var multer = require('multer');

// A random key for signing the cookie


//var multerupload = multer({ dest: 'fileprint/' })
var app = express();

app.use(cookieParser('82e4e438a0705fabf61f9854e3b575af'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//express server

/* app.use(express.static(path.join(__dirname, 'build')));

if(process.env.NODE_ENV === 'production') {
  app.get('/*', function (req, res) {
   	res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
} */

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
    res.send("Hello World!");
});

app.get('/api', function(req, res) {
    console.log("hitting api")
    res.json({ message: 'welcome to prophesier API' });
});

app.post('/api/register',login.register);
app.post('/api/login',login.login);
app.post('/api/checkuser',dashboardwidgets.checkuser);
app.post('/api/checkuserlogin',login.checkuserlogin);
app.post('/api/updatedatawidgets',dashboardwidgets.updatedata);
app.post('/api/deletedatawidgets',dashboardwidgets.deletewidget);
app.post('/api/loaddata',loaddata.loaddata);
app.post("/api/updatedata",loaddata.updatedata);
app.get("/api/getdata", loaddata.getdata);
app.get("/api/getdatawidgets", dashboardwidgets.getdata);

//var router = express.Router();

// test route
/* router.get('/', function(req, res) {
    console.log("hitting api")
    res.json({ message: 'welcome to prophesier API' });
});

//route to handle user registration
router.post('/register',login.register);
router.post('/login',login.login);
router.post('/checkuser',dashboardwidgets.checkuser);
router.post('/checkuserlogin',login.checkuserlogin);
router.post('/updatedatawidgets',dashboardwidgets.updatedata);
router.post('/deletedatawidgets',dashboardwidgets.deletewidget);
router.post('/loaddata',loaddata.loaddata);
router.post("/updatedata",loaddata.updatedata);
router.get("/getdata", loaddata.getdata);
router.get("/getdatawidgets", dashboardwidgets.getdata); */
//route to handle file printing and listing
//router.post('/fileprint',multerupload.any(),upload.fileprint);
//router.get('/fileretrieve',upload.fileretrieve);

//app.use('/api', router);
app.listen(4000,function(){  
    console.log('Express app start on port 4000')  
});