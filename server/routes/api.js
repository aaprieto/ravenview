/**
 * Created by Arnold on 2018-03-30.
 */
const express = require('express');
const router = express.Router();
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

/*  Air Temperature and Humidity */
var podsAirArr = [];
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
/*  http://172.16.1.80:3000/api/receiveflagresult/{ "pod": "pod1", "status": "80","machname":"QWERT12345","datetimereceived":"05-24-2018" }  --  this is correct*/

router.get('/receiveflagresult/:flag', function(req, res) {
  /*  http://172.16.1.80:3000/api/receiveflagresult/{ "pod": "pod1", "status": "80","machname":"QWERT12345","datetimereceived":"05-24-2018" }  --  this is correct*/
  status = req.params.flag;
  var obj  = JSON.parse(status);
  objpod = obj.pod;
  objstatus = obj.status;
  objmachname= obj.machname;
  objdate= obj.datetimereceived;

  if (podsArr.length >  0) {
    var flag = false;
    for (var i = 0; i < podsArr.length; i++) {
        if (objpod== podsArr[i]["pod"]){
            podsArr[i]["status"] = objstatus;
            podsArr[i]["machname"] = objmachname;
            podsArr[i]["datetimereceived"] = objdate;
            flag = true;
        }
    }

    if (flag == false){
      var objvalue = new Object();
      objvalue.pod = obj.pod;
      objvalue.status = obj.status;
      objvalue.machname = obj.machname;
      objvalue.datetimereceived = obj.datetimereceived;
      podsArr.push(objvalue);
    }
  }

  if (podsArr.length < 1){
    var objvalue = new Object();
    objvalue.pod = obj.pod;
    objvalue.status = obj.status;
    objvalue.machname = obj.machname;
    objvalue.datetimereceived = obj.datetimereceived;
    podsArr.push(objvalue);
  }

  for (var x = 0; x < podsArr.length; x++) {
   console.log(podsArr[x]["pod"] + "  " + podsArr[x]["status"] + "  " + podsArr[x]["machname"] + "  " + podsArr[x]["datetimereceived"]);
  }

  console.log("Length: " + podsArr.length);
  res.send(status);
});



router.get('/receivetemperaturehumidity/:airtemphumid', function(req, res) {
   /* localhost:3000/api/receivetemperaturehumidity/{"pod":"pod1","machname":"QWERT12345","datetimereceived":"05-24-2018","aircelsius":"34","airfahrenheit":"88","humidity":"43"}    */
   airtemphumid = req.params.airtemphumid;

   var objair  = JSON.parse(airtemphumid);
   objairpod = objair.pod;
   objairmachname = objair.machname;
   objairdatetimereceived = objair.datetimereceived;
   objaircelsius = objair.aircelsius;
   objairfahrenheit = objair.airfahrenheit;
   objairhumidity = objair.humidity;


   if (podsAirArr.length >  0) {
     var flag = false;
     for (var i = 0; i < podsAirArr.length; i++) {
       if (objairpod == podsAirArr[i]["pod"]){
         podsAirArr[i]["machname"] = objairmachname;
         podsAirArr[i]["datetimereceived"] = objairdatetimereceived;
         podsAirArr[i]["aircelsius"] = objaircelsius;
         podsAirArr[i]["airfahrenheit"] = objairfahrenheit;
         podsAirArr[i]["humidity"] = objairhumidity;
         flag = true;
       }
     }

     if (flag == false){
       var objvalue = new Object();
       objvalue.pod = objair.pod;
       objvalue.machname = objair.machname;
       objvalue.datetimereceived = objair.datetimereceived;
       objvalue.aircelsius = objair.aircelsius;
       objvalue.airfahrenheit = objair.airfahrenheit;
       objvalue.humidity = objair.humidity;
       podsAirArr.push(objvalue);
     }
   }

   if (podsAirArr.length < 1){
     var objvalue = new Object();
     objvalue.pod = objair.pod;
     objvalue.machname = objair.machname;
     objvalue.datetimereceived = objair.datetimereceived;
     objvalue.aircelsius = objair.aircelsius;
     objvalue.airfahrenheit = objair.airfahrenheit;
     objvalue.humidity = objair.humidity;
     podsAirArr.push(objvalue);
   }




   for (var x = 0; x < podsAirArr.length; x++) {
     console.log(podsAirArr[x]["pod"] + "  " + podsAirArr[x]["machname"] + "  " + podsAirArr[x]["datetimereceived"] + "  " + podsAirArr[x]["aircelsius"] + "  " + podsAirArr[x]["airfahrenheit"] + "  " + podsAirArr[x]["humidity"]);
   }

   console.log("Length: " + podsAirArr.length);
   res.send(airtemphumid);

});




router.get('/receivesoiltemperature/:soiltemperature', function(req, res) {
  /* localhost:3000/api/receivesoiltemperature/{"pod":"pod1","machname":"QWERT12345","datetimereceived":"05-24-2018","soilcelsius":"34","soilfahrenheit":"88"}    */
  soiltemperature = req.params.soiltemperature;

  var objsoil  = JSON.parse(soiltemperature);
  objsoilpod = objsoil.pod;
  objsoilmachname = objsoil.machname;
  objsoildatetimereceived = objsoil.datetimereceived;
  objsoilcelsius = objsoil.soilcelsius;
  objsoilfahrenheit = objsoil.soilfahrenheit;



  if (podsSoilArr.length >  0) {
    var flag = false;
    for (var i = 0; i < podsSoilArr.length; i++) {
      if (objsoilpod == podsSoilArr[i]["pod"]){
        podsSoilArr[i]["machname"] = objsoilmachname;
        podsSoilArr[i]["datetimereceived"] = objsoildatetimereceived;
        podsSoilArr[i]["soilcelsius"] = objsoilcelsius;
        podsSoilArr[i]["soilfahrenheit"] = objsoilfahrenheit;
        flag = true;
      }
    }

    if (flag == false){
      var objvalue = new Object();
      objvalue.pod = objsoil.pod;
      objvalue.machname = objsoil.machname;
      objvalue.datetimereceived = objsoil.datetimereceived;
      objvalue.soilcelsius = objsoil.soilcelsius;
      objvalue.soilfahrenheit = objsoil.soilfahrenheit;

      podsSoilArr.push(objvalue);
    }
  }

  if (podsSoilArr.length < 1){
    var objvalue = new Object();
    objvalue.pod = objsoil.pod;
    objvalue.machname = objsoil.machname;
    objvalue.datetimereceived = objsoil.datetimereceived;
    objvalue.soilcelsius = objsoil.soilcelsius;
    objvalue.soilfahrenheit = objsoil.soilfahrenheit;
    podsSoilArr.push(objvalue);
  }




  for (var x = 0; x < podsSoilArr.length; x++) {
    console.log(podsSoilArr[x]["pod"] + "  " + podsSoilArr[x]["machname"] + "  " + podsSoilArr[x]["datetimereceived"] + "  " + podsSoilArr[x]["soilcelsius"] + "  " + podsSoilArr[x]["soilfahrenheit"]);
  }

  console.log("Length: " + podsSoilArr.length);
  res.send(soiltemperature);

});







router.get('/retrievesoilmoisturelevel/:pod', function(req, res) {
  pod = req.params.pod;
  var retstatuslevel;
  for (var x = 0; x < podsArr.length; x++) {
    if (pod ==  podsArr[x]["pod"]){
      console.log(podsArr[x]["pod"] + "  " + podsArr[x]["status"]);
      retstatuslevel = podsArr[x]["status"];
    }
  }

  const universal_return = '[{"status":"' + retstatuslevel + '"}]';
  res.send(universal_return);

});




router.get('/retrieveairtemperaturehumidity/:pod', function(req, res) {
  var pod = req.params.pod;
  var machname;
  var retcelsius;
  var retfahrenheit;
  var rethumidity;
  for (var x = 0; x < podsAirArr.length; x++) {
    if (pod ==  podsAirArr[x]["pod"]){
      machname = podsAirArr[x]["machname"];
      retcelsius = podsAirArr[x]["aircelsius"];
      retfahrenheit = podsAirArr[x]["airfahrenheit"];
      rethumidity = podsAirArr[x]["humidity"];
    }
  }

  const universal_return = '{"machname":"' + machname + '","retcelsius":"' + retcelsius+ '","retfahrenheit":"' + retfahrenheit+ '","rethumidity":"' + rethumidity+ '"}';
  res.send(universal_return);

});



router.get('/retrievesoiltemperature/:pod', function(req, res) {
  var pod = req.params.pod;
  var soilmachname;
  var soilretcelsius;
  var soilretfahrenheit;
console.log("check 1");

  for (var x = 0; x < podsSoilArr.length; x++) {
    if (pod ==  podsSoilArr[x]["pod"]){
      soilmachname = podsSoilArr[x]["machname"];
      soilretcelsius = podsSoilArr[x]["soilcelsius"];
      soilretfahrenheit = podsSoilArr[x]["soilfahrenheit"];
    }
  }
  console.log("check 2");
  const universal_return = '{"machname":"' + soilmachname + '","retcelsius":"' + soilretcelsius+ '","retfahrenheit":"' + soilretfahrenheit+ '"}';
  console.log(universal_return);
  res.send(universal_return);

});




router.get('/retrievestatus/:pod1', function(req, res) {
  const universal_return = '[{"status":"' + status + '"}]';
  res.send(universal_return);

});

router.get('/retrievetemperaturehumidity/', function(req, res) {

  const universal_return = '[{"tempdate":"' + tempdate + '"},{"celsius":"' + celsius + '"},{"fahrenheit":"' + fahrenheit + '"},{"humidity":"' + humidity + '"}]';
  res.send(universal_return);

});


module.exports = router;
