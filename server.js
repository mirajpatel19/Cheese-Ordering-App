var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var crypto = require('crypto');
const nodemailer = require('nodemailer');
var dateFormat = require('dateformat');
const pg = require('pg');
var app = express();
var http = require('http');

// DB connect String
//
 var connectionString = "postgres://postgres:1114@localhost:5432/cheeseordersdb";
 const client = new pg.Client(connectionString);
//


app.get('/', function(req, res) {
  res.set({
    'Access-Control-Allow-Origin': '*'
  });
  return res.redirect('/index.html')
}).listen(8888);
console.log('Server is listening at 8888');
app.use('/', express.static(__dirname + '/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/ordercheese', function(req, res, next) {
      //res.send(200);
      //res.send({'test': 'response'})
    //  res.redirect('/ordercheese.html')
    console.log("Request...", req.query.firstname);
    console.log("Request...", req.query.lastname);
    console.log("Request...", req.query.employeenumber);
    console.log("Request...", req.query.saledate);

      var firstname = req.query.firstname;
      var lastname = req.query.lastname;
      var employeenumber = req.query.employeenumber;
      var saledate = req.query.saledate;

       var cheeseSaleDate = new Date(saledate);
       var day = cheeseSaleDate.getDate() + 1
       var month = cheeseSaleDate.getMonth() + 1;
       var year = cheeseSaleDate.getFullYear();

       if (day < 10) {
         day = '0' + day
       }
       if (month < 10) {
         month = '0' + month
       }
      var cheeseSaleDate = month + '/' + day + '/' + year;

      console.log(" ");
      console.log("Sale date: " + cheeseSaleDate);
      console.log(" ");

      var dateNow = new Date();
      console.log("Today is: " + dateNow);

      var dd = dateNow.getDate();
      var mm = dateNow.getMonth() + 1; //January is 0
      var yyyy = dateNow.getFullYear();
      var min = dateNow.getMinutes();
      var hour = dateNow.getHours();
      var sec = dateNow.getSeconds();

      if (dd < 10) {
        dd = '0' + dd
      }
      if (mm < 10) {
        mm = '0' + mm
      }
      if (hour < 10) {
        hour = '0' + hour
      }
      if (min < 10) {
        min = '0' + min
      }
      if (sec < 10) {
        sec = '0' + sec
      }
      //dateNow = yyyy + '-' + mm + '-' + dd;
      dateNow = mm + '/' + dd + '/' + yyyy + " " + hour + ":" + min + ":" + sec;
      console.log("Formated date: " + dateNow);

      var email = req.query.email;
      //console.log(email);
      var mainEmail = "mpatel@josephfarms.com";
      //console.log(mainEmail);
      console.log(req.query.variety1,);
      console.log(req.query.style1);
      console.log(req.query.size1);
      console.log(req.query.pounds1);

// console.log("saledate is before array " + saledate);
 var array = new Array(15);
 var test;
 array[0] = {
   'variety': req.query.variety1,
   'style': req.query.style1,
   'size': req.query.size1,
   'pounds': req.query.pounds1
 }
 array[1] = {
   'variety': req.query.variety2,
   'style': req.query.style2,
   'size': req.query.size2,
   'pounds': req.query.pounds2
 }
 array[2] = {
   'variety': req.query.variety3,
   'style': req.query.style3,
   'size': req.query.size3,
   'pounds': req.query.pounds3
 }
 array[3] = {
   'variety': req.query.variety4,
   'style': req.query.style4,
   'size': req.query.size4,
   'pounds': req.query.pounds4
 }
 array[4] = {
   'variety': req.query.variety5,
   'style': req.query.style5,
   'size': req.query.size5,
   'pounds': req.query.pounds5
 }
 array[5] = {
   'variety': req.query.variety6,
   'style': req.query.style6,
   'size': req.query.size6,
   'pounds': req.query.pounds6
 }
 array[6] = {
   'variety': req.query.variety7,
   'style': req.query.style7,
   'size': req.query.size7,
   'pounds': req.query.pounds7
 }
 array[7] = {
   'variety': req.query.variety8,
   'style': req.query.style8,
   'size': req.query.size8,
   'pounds': req.query.pounds8
 }
 array[8] = {
   'variety': req.query.variety9,
   'style': req.query.style9,
   'size': req.query.size9,
   'pounds': req.query.pounds9
 }
 array[9] = {
   'variety': req.query.variety10,
   'style': req.query.style10,
   'size': req.query.size10,
   'pounds': req.query.pounds10
 }
 array[10] = {
   'variety': req.query.variety11,
   'style': req.query.style11,
   'size': req.query.size11,
   'pounds': req.query.pounds11
 }
 array[11] = {
   'variety': req.query.variety12,
   'style': req.query.style12,
   'size': req.query.size12,
   'pounds': req.query.pounds12
 }
 array[12] = {
   'variety': req.query.variety13,
   'style': req.query.style13,
   'size': req.query.size13,
   'pounds': req.query.pounds13
 }
 array[13] = {
   'variety': req.query.variety14,
   'style': req.query.style14,
   'size': req.query.size14,
   'pounds': req.query.pounds14
 }
 array[14] = {
   'variety': req.query.variety15,
   'style': req.query.style15,
   'size': req.query.size15,
   'pounds': req.query.pounds15
 }
    var comments = req.query.comments;

  //SQL DATABASE
  client.connect(function(err) {
    // if (err) {
    //   throw err;
    // }
    console.log("Database connected!");
    //Checks if user exists into database.
    client.query("SELECT distinct fname FROM users where fname=$1 and lname=$2 and empnum=$3", [firstname, lastname, employeenumber], function(err, result, fields) {
    if (err) {
      throw err;
    }
    //Insert user bc it does not exists.
    if (result.rowCount == 0) {
       console.log("Not Match!");
        client.query("INSERT INTO users(fname, lname, empnum) \
          VALUES($1, $2, $3) RETURNING fname, lname, empnum", [firstname, lastname, employeenumber], function(err, resu) {
        if (err) {
          throw err
        }
        console.log('New User row was inserted MP');

        //LOOP TO CHECK ALL THE array items.
        array.forEach(function(item, i, arr) {
          //If array is empty.
          if (array[i].variety == '-' && array[i].style == '-' && array[i].size == 0 && array[i].pounds == 0) {
            console.log('No values inside');
          //Else add the vilues into orders table.
          } else {
            console.log('There are values inside MR.: ' + array[i].variety + ' ' + array[i].style + ' ' + array[i].size + ' ' + array[i].pounds);
            //search for userid into user table and insert it into orders table.
            client.query("SELECT id FROM users where fname=$1 and lname=$2 and empnum=$3", [firstname, lastname, employeenumber], function(err, result)  {
              if (err) {
                throw err;
              }
                var num = result.rows[0];
                var getId = num.id;
                console.log("Found user data at index: "+ getId);
                client.query("INSERT INTO orders(userid, saledate, variety, style, size, pounds, orderDate) \
                  VALUES($1, $2, $3, $4, $5, $6, $7)", [getId, cheeseSaleDate, array[i].variety, array[i].style, array[i].size, array[i].pounds, dateNow], function(err, resu) {
                if (err) {
                  throw err
                }
                  console.log('Item added: ');
                });
            });
          }
        });
      });
    //Do Not insert user bc it does exist into the database.
    } else {
        console.log("Match");
        console.log(array[0].variety + ' ' + array[0].style + ' ' + array[0].size + ' ' + array[0].pounds);
        //LOOP TO CHECK ALL THE array items.
        array.forEach(function(item, i, arr) {
          //If array is empty.
          if (array[i].variety == '-' && array[i].style == '-' && array[i].size == 0 && array[i].pounds == 0) {
            console.log('No values inside');
          //Else add the vilues into orders table.
          } else {
            console.log('There are values inside MR.: ' + array[i].variety + ' ' + array[i].style + ' ' + array[i].size + ' ' + array[i].pounds);
            //search for userid into user table and insert it into orders table.
            client.query("SELECT id FROM users where fname=$1 and lname=$2 and empnum=$3", [firstname, lastname, employeenumber], function(err, result) {
              if (err) {
                throw err;
              }
                var num = result.rows[0];
                var getId = num.id;
                console.log("Found data user at index: "+ getId);
                console.log("saledate is before insert into database " + cheeseSaleDate);

                client.query("INSERT INTO orders(userid, saledate, variety, style, size, pounds, orderDate) \
                  VALUES($1, $2, $3, $4, $5, $6, $7)", [getId, cheeseSaleDate, array[i].variety, array[i].style, array[i].size, array[i].pounds, dateNow], function(err, resu) {
                  if (err) {
                    throw err
                  }
                  console.log('Item added: ');
                });
          });
        }
      });
    }
    });
// //TEST TEST TEST TEST
//     //client.query("SELECT distinct fname FROM users where fname=$1 and lname=$2 and empnum=$3", [firstname, lastname, employeenumber], function(err, result, fields) {
//     client.query("SELECT * FROM orders where userid = 3", function(err, result) {
//       if (err) {
//         throw err;
//       }
//       console.log("MY TEST");
//       //console.log(result);
//       test = result;
//       console.log(test);
//     });
  });

        //console.log(JSON.stringify(firstname) + '' + JSON.stringify(lastname) + '' + JSON.stringify(employeenumber)); console.log(JSON.stringify(saledate) + '' + JSON.stringify(variety1) + '' + JSON.stringify(size1));
        var pounds1 = req.query.pounds1;
        var pounds2 = req.query.pounds2;
        var pounds3 = req.query.pounds3;
        var pounds4 = req.query.pounds4;
        var pounds5 = req.query.pounds5;
        var pounds6 = req.query.pounds6;
        var pounds7 = req.query.pounds7;
        var pounds8 = req.query.pounds8;
        var pounds9 = req.query.pounds9;
        var pounds10 = req.query.pounds10;
        var pounds11 = req.query.pounds11;
        var pounds12 = req.query.pounds12;
        var pounds13 = req.query.pounds13;
        var pounds14 = req.query.pounds14;
        var pounds15 = req.query.pounds15;

        var calTotal = parseInt(pounds1) + parseInt(pounds2) + parseInt(pounds3) + parseInt(pounds4) + parseInt(pounds5) + parseInt(pounds6) + parseInt(pounds7) + parseInt(pounds8) + parseInt(pounds9) + parseInt(pounds10) + parseInt(pounds11) + parseInt(pounds12) + parseInt(pounds13) + parseInt(pounds14) + parseInt(pounds15);
        //var calTotal = array[0].pounds + array[1].pounds + array[2].pounds + array[3].pounds + array[4].pounds + array[5].pounds + array[6].pounds + array[7].pounds + array[8].pounds + array[9].pounds + array[10].pounds + array[11].pounds + array[12].pounds + array[13].pounds + array[14].pounds;
        //
        //   var calTotal = 0,
        //   for (var i = 0; i < 15; i++) {
        //     calTotal += array[i].pounds;
        //   };
        //
        // console.log(calTotal);
        //
        //smpt
        let transporter = nodemailer.createTransport({
          host: '10.4.1.11',
          port: 25,
          secure: false, // true for 465, false for other ports
        });
        // setup email data
        let mailOptions = {
          from: '"New Order - " <notifications@josephfarms.com>', // sender address
          to: mainEmail, // list of receivers
          subject: 'New Cheese Order Received - ' + cheeseSaleDate, // Subject line
          cc: email,
          html: '<strong>First Name: </strong>' + firstname + '<br/><strong>Last Name: </strong>' + lastname + '<br/><strong>Employee Number: </strong>' + employeenumber + '<br/><strong>Cheese Sale Date: </strong>' + cheeseSaleDate + '<br/><br/>\
    <table style="text-align: center; border:2px solid black; width:400px">\
    <tr><th style="border-bottom:2px solid black;">Number</th><th style="border-bottom:2px solid black;">Variety</th><th style="border-bottom:2px solid black;">Style</th><th style="border-bottom:2px solid black;">Size(Lb)</th><th style="border-bottom:2px solid black;">Pounds</th><th style="border-bottom:2px solid black;"></th></tr>\
    <tr><td style="border-bottom:1px solid black;">1</td><td style="border-bottom:1px solid black;">' + array[0].variety + '</td><td style="border-bottom:1px solid black;">' + array[0].style + '</td><td style="border-bottom:1px solid black;">' + array[0].size + '</td><td style="border-bottom:1px solid black;">' + array[0].pounds + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">2</td><td style="border-bottom:1px solid black;">' + array[1].variety + '</td><td style="border-bottom:1px solid black;">' + array[1].style + '</td><td style="border-bottom:1px solid black;">' + array[1].size + '</td><td style="border-bottom:1px solid black;">' + array[1].pounds + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">3</td><td style="border-bottom:1px solid black;">' + array[2].variety + '</td><td style="border-bottom:1px solid black;">' + array[2].style + '</td><td style="border-bottom:1px solid black;">' + array[2].size + '</td><td style="border-bottom:1px solid black;">' + array[2].pounds + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">4</td><td style="border-bottom:1px solid black;">' + array[3].variety + '</td><td style="border-bottom:1px solid black;">' + array[3].style + '</td><td style="border-bottom:1px solid black;">' + array[3].size + '</td><td style="border-bottom:1px solid black;">' + array[3].pounds + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">5</td><td style="border-bottom:1px solid black;">' + array[4].variety + '</td><td style="border-bottom:1px solid black;">' + array[4].style + '</td><td style="border-bottom:1px solid black;">' + array[4].size + '</td><td style="border-bottom:1px solid black;">' + array[4].pounds + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">6</td><td style="border-bottom:1px solid black;">' + array[5].variety + '</td><td style="border-bottom:1px solid black;">' + array[5].style + '</td><td style="border-bottom:1px solid black;">' + array[5].size + '</td><td style="border-bottom:1px solid black;">' + array[5].pounds + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">7</td><td style="border-bottom:1px solid black;">' + array[6].variety + '</td><td style="border-bottom:1px solid black;">' + array[6].style + '</td><td style="border-bottom:1px solid black;">' + array[6].size + '</td><td style="border-bottom:1px solid black;">' + array[6].pounds + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">8</td><td style="border-bottom:1px solid black;">' + array[7].variety + '</td><td style="border-bottom:1px solid black;">' + array[7].style + '</td><td style="border-bottom:1px solid black;">' + array[7].size + '</td><td style="border-bottom:1px solid black;">' + array[7].pounds + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">9</td><td style="border-bottom:1px solid black;">' + array[8].variety + '</td><td style="border-bottom:1px solid black;">' + array[8].style + '</td><td style="border-bottom:1px solid black;">' + array[8].size + '</td><td style="border-bottom:1px solid black;">' + array[8].pounds + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">10</td><td style="border-bottom:1px solid black;">' + array[9].variety + '</td><td style="border-bottom:1px solid black;">' + array[9].style + '</td><td style="border-bottom:1px solid black;">' + array[9].size + '</td><td style="border-bottom:1px solid black;">' + array[9].pounds + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">11</td><td style="border-bottom:1px solid black;">' + array[10].variety + '</td><td style="border-bottom:1px solid black;">' + array[10].style + '</td><td style="border-bottom:1px solid black;">' + array[10].size + '</td><td style="border-bottom:1px solid black;">' + array[10].pounds + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">12</td><td style="border-bottom:1px solid black;">' + array[11].variety + '</td><td style="border-bottom:1px solid black;">' + array[11].style + '</td><td style="border-bottom:1px solid black;">' + array[11].size + '</td><td style="border-bottom:1px solid black;">' + array[11].pounds + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">13</td><td style="border-bottom:1px solid black;">' + array[12].variety + '</td><td style="border-bottom:1px solid black;">' + array[12].style + '</td><td style="border-bottom:1px solid black;">' + array[12].size + '</td><td style="border-bottom:1px solid black;">' + array[12].pounds + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">14</td><td style="border-bottom:1px solid black;">' + array[13].variety + '</td><td style="border-bottom:1px solid black;">' + array[13].style + '</td><td style="border-bottom:1px solid black;">' + array[13].size + '</td><td style="border-bottom:1px solid black;">' + array[13].pounds + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">15</td><td style="border-bottom:1px solid black;">' + array[14].variety + '</td><td style="border-bottom:1px solid black;">' + array[14].style + '</td><td style="border-bottom:1px solid black;">' + array[14].size + '</td><td style="border-bottom:1px solid black;">' + array[14].pounds + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td></td><td></td><td></td><td><strong>Total:</strong></td><td><strong>' + calTotal + '</strong></td><td></td></tr>\
    </table>\
    <br><strong>Comments: </strong>' + comments + '<br/>'
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
        res.redirect('confirmation.html');
        next()
       }, function (req, res, next) {
         //res.redirect('/confirmation');
         res.end();
       });

      app.get('/picklist', function(req, res, next) {
        //SQL DATABASE
        client.connect(function(err) {
          // if (err) {
          //   throw err;
          // }
          console.log("Database connected for picklist!");
          //Checks if user exists into database.
          client.query("select users.empnum, users.fname, users.lname, orders.saledate, orders.variety, orders.style, orders.size, orders.pounds, orders.orderdate from users inner join orders on users.id = orders.userid", function(err, result, fields) {
            //select users.empnum, users.fname, users.lname, orders.saledate, orders.variety, orders.style, orders.size, orders.pounds, orders.orderdate from users inner join orders on users.id = orders.userid;
          if (err) {
            throw err;
          }
          //console.log(result.rows);
          res.send(result.rows);
          });
        });
      });
