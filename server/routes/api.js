/**
 * Created by Arnold on 2018-03-30.
 */
const express = require('express');
const router = express.Router();
//const pg = require('pg');
var async = require("async");
var mysql = require('mysql');
var date = require('date-and-time');

// note:  all config is optional and the environment variables
// will be read id the config is not present.
/*
var config = {
  user:'postgres',
  database:'postgres',
  password:'password',
  host:'localhost',
  port:5432,
  max:10,
  idleTimeoutMillis:30000,
};
*/

var pool = mysql.createPool({
  connectionLimit : 30,
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'ravenview'
});

//  this initializes  connection pool
//  it will keep idle connections open for a 30 seconds
//  and set a limit of maximum 10 idle clients.
//var pool = new pg.Pool(config);
//console.log("pool: " + pool);



var status = "";
var airtemphumid = "";
var soiltemperature = "";

var tempdate = "";
var celsius = "";
var fahrenheit = "";
var humidity = "";


/*  For Soil Moisture Level */
var podsArr = [];
var objpod = "";
var objstatus = "";
var objmachname = "";
var objdate = "";
var objuserid = "";

/*  Air Temperature and Humidity */
var podsAirArr = [];
var objairuser = "";
var objairpod = "";
var objairmachname = "";
var objairdatetimereceived = "";
var objaircelsius = "";
var objairfahrenheit = "";
var objairhumidity = "";

/*  Soil Temperature */
var podsSoilArr = [];
var objsoilpod = "";
var objsoilmachname = "";
var objsoildatetimereceived = "";
var objsoilcelsius = "";
var objsoilfahrenheit = "";

/*

 http://localhost:3000/api/receiveflagresult/%7B%20%22pod%22:%20%22pod1%22,%20%22status%22:%20%2243%22,%22machname%22:%22QWERT12345%22,%22datetimereceived%22:%2205-24-2018%22%20%7D
 http://localhost:3000/api/receivetemperaturehumidity/%7B%22pod%22:%22pod1%22,%22machname%22:%22QWERT12345%22,%22datetimereceived%22:%2205-24-2018%22,%22aircelsius%22:%2224%22,%22airfahrenheit%22:%2257%22,%22humidity%22:%2279%22%7D
 http://localhost:3000/api/receivesoiltemperature/%7B%22pod%22:%22pod1%22,%22machname%22:%22QWERT12345%22,%22datetimereceived%22:%2205-24-2018%22,%22soilcelsius%22:%2244%22,%22soilfahrenheit%22:%2225%22%7D
 */



router.get('/', function(req, res)  {
  res.send('api works');
});



//////////////////////////////
//   SOIL MOISTURE          //
//////////////////////////////
router.get('/receivesoilmoisture/:param', function(req, res) {
  /*  http://172.16.1.65:3000/api/receivesoilmoisture/{ "pod": "pod1", "status": "80","machname":"QWERT12345","userid":"arnold.aprieto@gmail.com","datetimereceived":"05-24-2018" }  --  this is correct*/
  status = req.params.param;
  var obj  = JSON.parse(status);
  objpod = obj.pod;
  objstatus = obj.status;
  objmachname= obj.machname;
  objdate= obj.datetimereceived;
  objuserid= obj.userid;

  var now = new Date();


  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
       // update user_pods for quick lookup
      var updsql = 'update user_pods ' +
          'set soil_moisture_level = "'+ objstatus +'",' +
          'last_transaction_datetime = "'+ date.format(now, 'YYYY/MM/DD HH:mm:ss') +'" ' +
          'where user_id = "' + objuserid  + '" and ' +
          'pod_id = "'+ objpod +'" ';

     // console.log("success update for soil moisture");
      connection.query(updsql, function (error, results, fields) {
        // When done with the connection, release it.
        connection.release();
        // Handle error after the release.
        if (error) throw error;
        //res.send('{"result" : "success"}');
        // Don't use the connection here, it has been returned to the pool.
      });
  });

  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
    //  insert new record to history soil moisture.
    var inssql = 'insert into history_soil_moisture (user_id, pod_id, trans_datetime, soil_moisture_level ) values ("' +objuserid + '","' +objpod + '","' +date.format(now, 'YYYY/MM/DD HH:mm:ss') + '","' + objstatus + '")';
   // console.log("success insert for soil moisture");
    // Use the connection
    connection.query(inssql, function (error, results, fields) {
      // When done with the connection, release it.
      connection.release();
      // Handle error after the release.
      if (error) throw error;

      // Don't use the connection here, it has been returned to the pool.
    });
  });

  res.send('{"result" : "success"}');

    // Use the connection
    /*connection.query(selsql, function (error, results, fields) {
      // When done with the connection, release it.
      connection.release();

      // Handle error after the release.
      if (error) throw error;
      res.send(results);
      // Don't use the connection here, it has been returned to the pool.
    });*/


  /*console.log(status);
   res.send(status);*/


});



//////////////////////////////
//   SOIL TEMPERATURE       //
//////////////////////////////
router.get('/receivesoiltemperature/:param', function(req, res) {
  /* http://172.16.1.65:3000/api/receivesoiltemperature/{"pod":"pod1","machname":"QWERT12345","datetimereceived":"05-24-2018","userid":"arnold.aprieto@gmail.com","soilcelsius":"34","soilfahrenheit":"88"}    */
  soiltemperature = req.params.param;

  var objsoil  = JSON.parse(soiltemperature);
  objsoilpod = objsoil.pod;
  objsoilmachname = objsoil.machname;
  objsoildatetimereceived = objsoil.datetimereceived;
  objsoilcelsius = objsoil.soilcelsius;
  objsoilfahrenheit = objsoil.soilfahrenheit;
  objuserid  = objsoil.userid;

  var now = new Date();

  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
    // update user_pods for quick lookup
    var updsql = 'update user_pods ' +
      'set soil_temperature_celsius = "'+ objsoilcelsius +'",' +
      'soil_temperature_fahrenheit = "'+ objsoilfahrenheit +'",' +
      'last_transaction_datetime = "'+ date.format(now, 'YYYY/MM/DD HH:mm:ss') +'" ' +
      'where user_id = "' + objuserid  + '" and ' +
      'pod_id = "'+ objsoilpod +'" ';


    connection.query(updsql, function (error, results, fields) {
      connection.release();
      if (error) throw error;
    });
  });


  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
    //  insert new record to history soil moisture.
    var inssql = 'insert into history_soil_temperature (user_id, pod_id, trans_datetime, soil_temperature_celsius, soil_temperature_fahrenheit ) values ("' +objuserid + '","' +objsoilpod + '","' +date.format(now, 'YYYY/MM/DD HH:mm:ss') + '","'+objsoilcelsius + '","'  + objsoilfahrenheit + '")';
   // console.log("success insert for soil temperature");
    // Use the connection
    connection.query(inssql, function (error, results, fields) {
      // When done with the connection, release it.
      connection.release();
      // Handle error after the release.
      if (error) throw error;
      // Don't use the connection here, it has been returned to the pool.
    });
  });


  res.send('{"result" : "success"}');
});



//////////////////////////////
//   AIR TEMPERATURE        //
//////////////////////////////
router.get('/receiveairtemperaturehumidity/:param', function(req, res) {
  /* localhost:3000/api/receivetemperaturehumidity/{"pod":"pod1","machname":"QWERT12345","datetimereceived":"05-24-2018","aircelsius":"34","airfahrenheit":"88","humidity":"43"}    */
  /*http://172.16.1.65:3000/api/receivetemperaturehumidity/{"userid":"arnold.aprieto@gmail.com","pod":"pod1","machname":"QWERT12345","datetimereceived":"05-24-2018","aircelsius":"34","airfahrenheit":"88","humidity":"43"}    */
  airtemphumid = req.params.param;

  var objair = JSON.parse(airtemphumid);
  objairuserid = objair.userid;
  objairpod = objair.pod;
  objairmachname = objair.machname;
  objairdatetimereceived = objair.datetimereceived;
  objaircelsius = objair.aircelsius;
  objairfahrenheit = objair.airfahrenheit;
  objairhumidity = objair.humidity;

  var now = new Date();

  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
    // update user_pods for quick lookup
    var updsql = 'update user_pods ' +
      'set air_temperature_celcsius = "'+ objaircelsius +'",' +
      'air_temperature_fahrenheit = "'+ objairfahrenheit +'",' +
      'humidity = "'+ objairhumidity +'",' +
      'last_transaction_datetime = "'+ date.format(now, 'YYYY/MM/DD HH:mm:ss') +'" ' +
      'where user_id = "' + objairuserid  + '" and ' +
      'pod_id = "'+ objairpod +'" ';

   // console.log("success update for air temperature");
    connection.query(updsql, function (error, results, fields) {
      connection.release();
      if (error) throw error;
    });
  });

  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
    //  insert new record to history soil moisture.
    var inssql = 'insert into history_air_temperature (user_id, pod_id, trans_datetime, air_temperature_celsius, air_temperature_fahrenheit,humidity ) values ("' +objairuserid + '","' +objairpod + '","' +date.format(now, 'YYYY/MM/DD HH:mm:ss') + '","'+objaircelsius + '","'  + objairfahrenheit + '","'  + objairhumidity+'")';
   // console.log("success insert for air temperature");
    // Use the connection
    connection.query(inssql, function (error, results, fields) {
      // When done with the connection, release it.
      connection.release();
      // Handle error after the release.
      if (error) throw error;
      // Don't use the connection here, it has been returned to the pool.
    });
  });



  res.send('{"result" : "success"}');
});

////////////////////////
//                    //
// Validate Login     //
//                    //
////////////////////////




router.get('/validatelogin/:param', function(req, res)  {


  // about module
  var clientcode = req.params.param;
  var userpadd = clientcode.split("&");
  // console.log(clientcode);
  var userid = userpadd[0];
  var password = userpadd[1];


  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!

    var selsql = 'select * ' +
      'from users ' +
      'where user_id =  ' + "'" + userid + "'";




    // Use the connection
    connection.query(selsql, function (error, results, fields) {
      // When done with the connection, release it.
      connection.release();
      // Handle error after the release.
      if (error) throw error;

      // console.log(results);

      var json_str = JSON.parse(JSON.stringify(results))

      // get the length of the result from the JSON.parse.
      var length = 0;
      for(var k in json_str) if(json_str.hasOwnProperty(k)) length++;
      //console.log(length);

      if(length < 1){
        res.send('[{"result":"error",' +
          '"message":"Username does not exist" }]')
        return;
      }
      if(length > 1){
        res.send('[{"result":"error",' +
          '"message":"Multiple Username exist, Check primary unique index" }]')
        return;
      }


      if (password.trim() == (results[0]["password"]).trim()){
        res.send('[{"result":"success",' +
          '"message":"go for the kill" }]');
        return;
      }  else {
        res.send('[{"result":"error",' +
          '"message":"Not a valid Password" }]')
        return;
      }
    });
  });
});


//////////////////////////////////////
//                                  //
// Validate Login for Insurance     //
//                                  //
//////////////////////////////////////




router.get('/validatelogininsurance/:param', function(req, res)  {


  // about module
  var clientcode = req.params.param;
  var userpadd = clientcode.split("&");
  // console.log(clientcode);
  var userid = userpadd[0];
  var password = userpadd[1];


  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!

    var selsql = 'select * ' +
      'from insurance ' +
      'where insurance_id =  ' + "'" + userid + "'";




    // Use the connection
    connection.query(selsql, function (error, results, fields) {
      // When done with the connection, release it.
      connection.release();
      // Handle error after the release.
      if (error) throw error;

      // console.log(results);

      var json_str = JSON.parse(JSON.stringify(results))

      // get the length of the result from the JSON.parse.
      var length = 0;
      for(var k in json_str) if(json_str.hasOwnProperty(k)) length++;
      //console.log(length);

      if(length < 1){
        res.send('[{"result":"error",' +
          '"message":"Username does not exist" }]')
        return;
      }
      if(length > 1){
        res.send('[{"result":"error",' +
          '"message":"Multiple Username exist, Check primary unique index" }]')
        return;
      }


      if (password.trim() == (results[0]["password"]).trim()){
        res.send('[{"result":"success",' +
          '"message":"go for the kill" }]');
        return;
      }  else {
        res.send('[{"result":"error",' +
          '"message":"Not a valid Password" }]')
        return;
      }
    });
  });
});



///////////////////////////////////
//   Retrieve Users by User ID   //
///////////////////////////////////

router.get('/retrieveusersbyid/:param', function(req, res) {

  userid = req.params.param;


  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!

    var selsql = 'select * ' +
      'from users ' +
      'where user_id =  ' + "'" + userid + "'";

    // Use the connection
    connection.query(selsql, function (error, results, fields) {
      // When done with the connection, release it.
      connection.release();
      // Handle error after the release.
      if (error) throw error;

      // console.log(results);

      var json_str = JSON.parse(JSON.stringify(results))
      res.send(json_str);

    });
  });

});


//////////////////////////////////////
//   Retrieve UserPods by User ID   //
//////////////////////////////////////

router.get('/retrieveuserpodsbyid/:param', function(req, res) {

  userid = req.params.param;


  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!

    var selsql = 'select * ' +
      'from user_pods ' +
      'where user_id =  ' + "'" + userid + "'";

    // Use the connection
    connection.query(selsql, function (error, results, fields) {
      // When done with the connection, release it.
      connection.release();
      // Handle error after the release.
      if (error) throw error;

      // console.log(results);

      var json_str = JSON.parse(JSON.stringify(results))
      res.send(json_str);

    });
  });

});

////////////////////////////////////////////////
//   Retrieve UserPods by User ID  and Pod ID //
////////////////////////////////////////////////

router.get('/retrieveuserpodsbyuseridpodid/:param', function(req, res) {

  var val = req.params.param;
  var ca = val.split("&");
  var _userid = ca[0];
  var _podid = ca[1];



  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!

    var selsql = 'select * ' +
      'from user_pods ' +
      'where user_id =  ' + "'" + _userid + "' and " +
      'pod_id =  ' + "'" + _podid + "'";
   // console.log(selsql);
    // Use the connection
    connection.query(selsql, function (error, results, fields) {
      // When done with the connection, release it.
      connection.release();
      // Handle error after the release.
      if (error) throw error;

      // console.log(results);

      var json_str = JSON.parse(JSON.stringify(results))
      res.send(json_str);

    });
  });

});





////////////////////////////////////////////////
//   Retrieve History by Datefrom, DateTo, User ID, Pod ID //
////////////////////////////////////////////////

router.get('/retrievesoilmoisturehistory/:param', function(req, res) {

  var val = req.params.param;
  var ca = val.split("&");
  var _datefrom = ca[0];
  var _dateto = ca[1];
  var _userid = ca[2];
  var _podid = ca[3];



  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!

    var selsql = 'select * ' +
      'from history_soil_moisture ' +
      'where user_id =  ' + "'" + _userid + "' and " +
      'pod_id =  ' + "'" + _podid + "' and " +
      'trans_datetime >=  ' + "'" + _datefrom + "' and " +
      'trans_datetime <=  ' + "'" + _dateto + "'";

    // Use the connection
    connection.query(selsql, function (error, results, fields) {
      // When done with the connection, release it.
      connection.release();
      // Handle error after the release.
      if (error) throw error;

      // console.log(results);

      var json_str = JSON.parse(JSON.stringify(results))
      res.send(json_str);

    });
  });

});



////////////////////////////////////////////////
//   Retrieve Soil Temperature  History by Datefrom, DateTo, User ID, Pod ID //
////////////////////////////////////////////////

router.get('/retrievesoiltemperaturehistory/:param', function(req, res) {

  var val = req.params.param;
  var ca = val.split("&");
  var _datefrom = ca[0];
  var _dateto = ca[1];
  var _userid = ca[2];
  var _podid = ca[3];



  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!

    var selsql = 'select * ' +
      'from history_soil_temperature ' +
      'where user_id =  ' + "'" + _userid + "' and " +
      'pod_id =  ' + "'" + _podid + "' and " +
      'trans_datetime >=  ' + "'" + _datefrom + "' and " +
      'trans_datetime <=  ' + "'" + _dateto + "'";

    // Use the connection
    connection.query(selsql, function (error, results, fields) {
      // When done with the connection, release it.
      connection.release();
      // Handle error after the release.
      if (error) throw error;

      // console.log(results);

      var json_str = JSON.parse(JSON.stringify(results))
      res.send(json_str);

    });
  });

});



////////////////////////////////////////////////
//   Retrieve Air Temperature  History by Datefrom, DateTo, User ID, Pod ID //
////////////////////////////////////////////////

router.get('/retrieveairtemperaturehistory/:param', function(req, res) {

  var val = req.params.param;
  var ca = val.split("&");
  var _datefrom = ca[0];
  var _dateto = ca[1];
  var _userid = ca[2];
  var _podid = ca[3];



  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!

    var selsql = 'select * ' +
      'from history_air_temperature ' +
      'where user_id =  ' + "'" + _userid + "' and " +
      'pod_id =  ' + "'" + _podid + "' and " +
      'trans_datetime >=  ' + "'" + _datefrom + "' and " +
      'trans_datetime <=  ' + "'" + _dateto + "'";

    // Use the connection
    connection.query(selsql, function (error, results, fields) {
      // When done with the connection, release it.
      connection.release();
      // Handle error after the release.
      if (error) throw error;

      // console.log(results);

      var json_str = JSON.parse(JSON.stringify(results))
      res.send(json_str);

    });
  });

});



////////////////////////////////////////////////
//   Retrieve Insurance Details   by ID       //
////////////////////////////////////////////////



router.get('/retrieveinsurancebyid/:param', function(req, res) {

  insuranceid = req.params.param;


  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!

    var selsql = 'select * ' +
      'from insurance ' +
      'where insurance_id =  ' + "'" + insuranceid + "'";

    // Use the connection
    connection.query(selsql, function (error, results, fields) {
      // When done with the connection, release it.
      connection.release();
      // Handle error after the release.
      if (error) throw error;

      // console.log(results);

      var json_str = JSON.parse(JSON.stringify(results))
      res.send(json_str);

    });
  });

});


////////////////////////////////////////////////
//   Retrieve users by Insurance ID           //
////////////////////////////////////////////////



router.get('/retrieveusersbyinsuranceid/:param', function(req, res) {

  insuranceid = req.params.param;


  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!

    var selsql = 'select a.user_id, b.first_name, b.middle_name, b.last_name, b.address, b.city, b. postal_code, b. province, b. longitude, b. latitude, b. phone_number ' +
      'from insurance_user a, users b ' +
      'where  a.user_id = b.user_id and ' +
      'insurance_id =  ' + "'" + insuranceid + "'";
    // Use the connection
    connection.query(selsql, function (error, results, fields) {
      // When done with the connection, release it.
      connection.release();
      // Handle error after the release.
      if (error) throw error;

      // console.log(results);

      var json_str = JSON.parse(JSON.stringify(results))
      res.send(json_str);

    });
  });

});




module.exports = router;
