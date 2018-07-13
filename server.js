var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var crypto = require('crypto');
const nodemailer = require('nodemailer');
var dateFormat = require('dateformat');
var pg = require('pg');
var app = express();

// DB connect String
var connectString = "postgres://miraj:swati1970@localhost:1234/cheeseordersdb";

var client = new pg.Client(connectString);
client.connect();

//TEST TEST TEST

// var query = client.query("SELECT * FROM junk");
// console.log(query + "work");

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
  res.redirect('/ordercheese.html')

  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var employeenumber = req.body.employeenumber;
  var saledate = req.body.saledate;
  var email = req.body.email;
  console.log(email);
  var mainEmail = "mpatel@josephfarms.com"
  console.log(mainEmail);


  var variety1 = req.body.variety1;
  var style1 = req.body.style1;
  var size1 = req.body.size1;
  var pounds1 = req.body.pounds1;

  var variety2 = req.body.variety2;
  var style2 = req.body.style2;
  var size2 = req.body.size2;
  var pounds2 = req.body.pounds2;

  var variety3 = req.body.variety3;
  var style3 = req.body.style3;
  var size3 = req.body.size3;
  var pounds3 = req.body.pounds3;

  var variety4 = req.body.variety4;
  var style4 = req.body.style4;
  var size4 = req.body.size4;
  var pounds4 = req.body.pounds4;

  var variety5 = req.body.variety5;
  var style5 = req.body.style5;
  var size5 = req.body.size5;
  var pounds5 = req.body.pounds5;

  var variety6 = req.body.variety6;
  var style6 = req.body.style6;
  var size6 = req.body.size6;
  var pounds6 = req.body.pounds6;

  var variety7 = req.body.variety7;
  var style7 = req.body.style7;
  var size7 = req.body.size7;
  var pounds7 = req.body.pounds7;

  var variety8 = req.body.variety8;
  var style8 = req.body.style8;
  var size8 = req.body.size8;
  var pounds8 = req.body.pounds8;

  var variety9 = req.body.variety9;
  var style9 = req.body.style9;
  var size9 = req.body.size9;
  var pounds9 = req.body.pounds9;

  var variety10 = req.body.variety10;
  var style10 = req.body.style10;
  var size10 = req.body.size10;
  var pounds10 = req.body.pounds10;

  var variety11 = req.body.variety11;
  var style11 = req.body.style11;
  var size11 = req.body.size11;
  var pounds11 = req.body.pounds11;

  var variety12 = req.body.variety12;
  var style12 = req.body.style12;
  var size12 = req.body.size12;
  var pounds12 = req.body.pounds12;

  var variety13 = req.body.variety13;
  var style13 = req.body.style13;
  var size13 = req.body.size13;
  var pounds13 = req.body.pounds13;

  var variety14 = req.body.variety14;
  var style14 = req.body.style14;
  var size14 = req.body.size14;
  var pounds14 = req.body.pounds14;

  var variety15 = req.body.variety15;
  var style15 = req.body.style15;
  var size15 = req.body.size15;
  var pounds15 = req.body.pounds15;

  var comments = req.body.comments;

  console.log(JSON.stringify(firstname) + '' + JSON.stringify(lastname) + '' + JSON.stringify(employeenumber));
  console.log(JSON.stringify(saledate) + '' + JSON.stringify(variety1) + '' + JSON.stringify(size1));

  var calTotal = parseInt(pounds1) + parseInt(pounds2) + parseInt(pounds3) + parseInt(pounds4) + parseInt(pounds5) + parseInt(pounds6) + parseInt(pounds7) + parseInt(pounds8) + parseInt(pounds9) + parseInt(pounds10) + parseInt(pounds11) + parseInt(pounds12) + parseInt(pounds13) + parseInt(pounds14) + parseInt(pounds15);
  console.log(calTotal);

  //smpt
  let transporter = nodemailer.createTransport({
    host: '10.4.1.11',
    port: 25,
    secure: false, // true for 465, false for other ports
  });
  // setup email data
  let mailOptions = {
    from: '"New Order - " <notifications@josephfarms.com>', // sender address
    to: '<mpatel@josephfarms.com>', // list of receivers
    subject: 'New Cheese Order Received - ' + saledate, // Subject line

    html: '<strong>First Name: </strong>' + firstname + '<br/><strong>Last Name: </strong>' + lastname + '<br/><strong>Employee Number: </strong>' + employeenumber + '<br/><strong>Cheese Sale Date: </strong>' + saledate + '<br/><br/>\
    <table style="text-align: center; border:2px solid black; width:400px">\
    <tr><th style="border-bottom:2px solid black;">Number</th><th style="border-bottom:2px solid black;">Variety</th><th style="border-bottom:2px solid black;">Style</th><th style="border-bottom:2px solid black;">Size(Lb)</th><th style="border-bottom:2px solid black;">Pounds</th><th style="border-bottom:2px solid black;"></th></tr>\
    <tr><td style="border-bottom:1px solid black;">1</td><td style="border-bottom:1px solid black;">' + variety1 + '</td><td style="border-bottom:1px solid black;">' + style1 + '</td><td style="border-bottom:1px solid black;">' + size1 + '</td><td style="border-bottom:1px solid black;">' + pounds1 + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">2</td><td style="border-bottom:1px solid black;">' + variety2 + '</td><td style="border-bottom:1px solid black;">' + style2 + '</td><td style="border-bottom:1px solid black;">' + size2 + '</td><td style="border-bottom:1px solid black;">' + pounds2 + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">3</td><td style="border-bottom:1px solid black;">' + variety3 + '</td><td style="border-bottom:1px solid black;">' + style3 + '</td><td style="border-bottom:1px solid black;">' + size3 + '</td><td style="border-bottom:1px solid black;">' + pounds3 + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">4</td><td style="border-bottom:1px solid black;">' + variety4 + '</td><td style="border-bottom:1px solid black;">' + style4 + '</td><td style="border-bottom:1px solid black;">' + size4 + '</td><td style="border-bottom:1px solid black;">' + pounds4 + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">5</td><td style="border-bottom:1px solid black;">' + variety5 + '</td><td style="border-bottom:1px solid black;">' + style5 + '</td><td style="border-bottom:1px solid black;">' + size5 + '</td><td style="border-bottom:1px solid black;">' + pounds5 + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">6</td><td style="border-bottom:1px solid black;">' + variety6 + '</td><td style="border-bottom:1px solid black;">' + style6 + '</td><td style="border-bottom:1px solid black;">' + size6 + '</td><td style="border-bottom:1px solid black;">' + pounds6 + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">7</td><td style="border-bottom:1px solid black;">' + variety7 + '</td><td style="border-bottom:1px solid black;">' + style7 + '</td><td style="border-bottom:1px solid black;">' + size7 + '</td><td style="border-bottom:1px solid black;">' + pounds7 + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">8</td><td style="border-bottom:1px solid black;">' + variety8 + '</td><td style="border-bottom:1px solid black;">' + style8 + '</td><td style="border-bottom:1px solid black;">' + size8 + '</td><td style="border-bottom:1px solid black;">' + pounds8 + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">9</td><td style="border-bottom:1px solid black;">' + variety9 + '</td><td style="border-bottom:1px solid black;">' + style9 + '</td><td style="border-bottom:1px solid black;">' + size9 + '</td><td style="border-bottom:1px solid black;">' + pounds9 + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">10</td><td style="border-bottom:1px solid black;">' + variety10 + '</td><td style="border-bottom:1px solid black;">' + style10 + '</td><td style="border-bottom:1px solid black;">' + size10 + '</td><td style="border-bottom:1px solid black;">' + pounds10 + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">11</td><td style="border-bottom:1px solid black;">' + variety11 + '</td><td style="border-bottom:1px solid black;">' + style11 + '</td><td style="border-bottom:1px solid black;">' + size11 + '</td><td style="border-bottom:1px solid black;">' + pounds11 + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">12</td><td style="border-bottom:1px solid black;">' + variety12 + '</td><td style="border-bottom:1px solid black;">' + style12 + '</td><td style="border-bottom:1px solid black;">' + size12 + '</td><td style="border-bottom:1px solid black;">' + pounds12 + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">13</td><td style="border-bottom:1px solid black;">' + variety13 + '</td><td style="border-bottom:1px solid black;">' + style13 + '</td><td style="border-bottom:1px solid black;">' + size13 + '</td><td style="border-bottom:1px solid black;">' + pounds13 + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">14</td><td style="border-bottom:1px solid black;">' + variety14 + '</td><td style="border-bottom:1px solid black;">' + style14 + '</td><td style="border-bottom:1px solid black;">' + size14 + '</td><td style="border-bottom:1px solid black;">' + pounds14 + '</td><td style="border-bottom:1px solid black;"></td></tr>\
    <tr><td style="border-bottom:1px solid black;">15</td><td style="border-bottom:1px solid black;">' + variety15 + '</td><td style="border-bottom:1px solid black;">' + style15 + '</td><td style="border-bottom:1px solid black;">' + size15 + '</td><td style="border-bottom:1px solid black;">' + pounds15 + '</td><td style="border-bottom:1px solid black;"></td></tr>\
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
