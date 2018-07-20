var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var crypto = require('crypto');
const nodemailer = require('nodemailer');
var dateFormat = require('dateformat');
const pg = require('pg');
var app = express();

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

app.post('/ordercheese', function(req, res) {
      //res.send(200);

      res.redirect('/ordercheese.html')

      var firstname = req.body.firstname;
      var lastname = req.body.lastname;
      var employeenumber = req.body.employeenumber;
      var date = req.body.saledate;

      var todaysDate = req.body.date;
      console.log("Today is: " + JSON.stringify(todaysDate));
//res.send(firstname);

      // TODO: fix the data in the database. One day back.
      var mydate = date;
      var saledate = dateFormat(mydate, "mm/dd/yyyy");
      //console.log(saledate);

      var email = req.body.email;
      //console.log(email);
      var mainEmail = "mpatel@josephfarms.com";
      //console.log(mainEmail);
      console.log(req.body.variety1,);
      console.log(req.body.style1);
      console.log(req.body.size1);
      console.log(req.body.pounds1);

 var array = new Array(15);
 array[0] = {
   'variety': req.body.variety1,
   'style': req.body.style1,
   'size': req.body.size1,
   'pounds': req.body.pounds1
 }
 array[1] = {
   'variety': req.body.variety2,
   'style': req.body.style2,
   'size': req.body.size2,
   'pounds': req.body.pounds2
 }
 array[2] = {
   'variety': req.body.variety3,
   'style': req.body.style3,
   'size': req.body.size3,
   'pounds': req.body.pounds3
 }
 array[3] = {
   'variety': req.body.variety4,
   'style': req.body.style4,
   'size': req.body.size4,
   'pounds': req.body.pounds4
 }
 array[4] = {
   'variety': req.body.variety5,
   'style': req.body.style5,
   'size': req.body.size5,
   'pounds': req.body.pounds5
 }
 array[5] = {
   'variety': req.body.variety6,
   'style': req.body.style6,
   'size': req.body.size6,
   'pounds': req.body.pounds6
 }
 array[6] = {
   'variety': req.body.variety7,
   'style': req.body.style7,
   'size': req.body.size7,
   'pounds': req.body.pounds7
 }
 array[7] = {
   'variety': req.body.variety8,
   'style': req.body.style8,
   'size': req.body.size8,
   'pounds': req.body.pounds8
 }
 array[8] = {
   'variety': req.body.variety9,
   'style': req.body.style9,
   'size': req.body.size9,
   'pounds': req.body.pounds9
 }
 array[9] = {
   'variety': req.body.variety10,
   'style': req.body.style10,
   'size': req.body.size10,
   'pounds': req.body.pounds10
 }
 array[10] = {
   'variety': req.body.variety11,
   'style': req.body.style11,
   'size': req.body.size11,
   'pounds': req.body.pounds11
 }
 array[11] = {
   'variety': req.body.variety12,
   'style': req.body.style12,
   'size': req.body.size12,
   'pounds': req.body.pounds12
 }
 array[12] = {
   'variety': req.body.variety13,
   'style': req.body.style13,
   'size': req.body.size13,
   'pounds': req.body.pounds13
 }
 array[13] = {
   'variety': req.body.variety14,
   'style': req.body.style14,
   'size': req.body.size14,
   'pounds': req.body.pounds14
 }
 array[14] = {
   'variety': req.body.variety15,
   'style': req.body.style15,
   'size': req.body.size15,
   'pounds': req.body.pounds15
 }
    var comments = req.body.comments;

      //SQL DATABASE
      //
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
                client.query("INSERT INTO orders(userid, saledate, varity, style, size, pounds) \
                  VALUES($1, $2, $3, $4, $5, $6)", [getId, saledate, array[i].variety, array[i].style, array[i].size, array[i].pounds], function(err, resu) {
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
                client.query("INSERT INTO orders(userid, saledate, varity, style, size, pounds) \
                  VALUES($1, $2, $3, $4, $5, $6)", [getId, saledate, array[i].variety, array[i].style, array[i].size, array[i].pounds], function(err, resu) {
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
  });


            //Add values to the user table from the html form. EXTRA
           //client.query("INSERT INTO users(fname, lname, empnum) \
               //VALUES($1, $2, $3) RETURNING fname, lname, empnum", [firstname, lastname, employeenumber])
      //
      //       client.query("INSERT INTO items(itemid, varity, style, size, pounds) \
      //       VALUES(1, $1, $2, $3, $4)", [variety1, style1, size1, pounds1]);
      //       client.query("INSERT INTO items(itemid, varity, style, size, pounds) \
      //       VALUES(2, $1, $2, $3, $4)", [variety2, style2, size2, pounds2]);

      //

        //console.log(JSON.stringify(firstname) + '' + JSON.stringify(lastname) + '' + JSON.stringify(employeenumber)); console.log(JSON.stringify(saledate) + '' + JSON.stringify(variety1) + '' + JSON.stringify(size1));
        var pounds1 = req.body.pounds1;
        var pounds2 = req.body.pounds2;
        var pounds3 = req.body.pounds3;
        var pounds4 = req.body.pounds4;
        var pounds5 = req.body.pounds5;
        var pounds6 = req.body.pounds6;
        var pounds7 = req.body.pounds7;
        var pounds8 = req.body.pounds8;
        var pounds9 = req.body.pounds9;
        var pounds10 = req.body.pounds10;
        var pounds11 = req.body.pounds11;
        var pounds12 = req.body.pounds12;
        var pounds13 = req.body.pounds13;
        var pounds14 = req.body.pounds14;
        var pounds15 = req.body.pounds15;

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
          subject: 'New Cheese Order Received - ' + saledate, // Subject line
          cc: email,
          html: '<strong>First Name: </strong>' + firstname + '<br/><strong>Last Name: </strong>' + lastname + '<br/><strong>Employee Number: </strong>' + employeenumber + '<br/><strong>Cheese Sale Date: </strong>' + saledate + '<br/><br/>\
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
      });
