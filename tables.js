const pg = require('pg');
var connectionString = "postgres://postgres:1114@localhost:5432/cheeseordersdb";
const client = new pg.Client(connectionString);
client.connect();

var query = client.query(
  'CREATE TABLE users( \
      id serial, \
      empnum int, \
      fname varchar(255), \
      lname varchar(255), \
      PRIMARY KEY (id) \
  )'
);

var query = client.query(
  'CREATE TABLE orders( \
      id serial, \
      userid int, \
      saledate date, \
      variety varchar(255), \
      style varchar(255), \
      size varchar(255), \
      pounds int, \
      PRIMARY KEY (id), \
      FOREIGN KEY (userid) REFERENCES users(id) \
  )'
);

//TEST values
//
// insert into users(empnum, fname, lname) values(144196, 'Miraj', 'Patel'),(144197, 'Sam', 'Shai'),(144198, 'Cathline', 'Rameres'), (144199, 'Kobe', 'Brain'),(555, 'Sam', 'Shai');
//
// insert into orders(userid, saledate, varity, style, size, pounds) values(3, '07/18/2018', 'Marble Jack', 'Ball', '2.5 lb', 5), (2, '07/19/2018', 'Pepper Jack', 'Sliced', '5 lb', 2), (1, '07/20/2018', 'Monterey Jack', 'Loaf', '1 lb', 8), (3, '07/19/2018', 'Pepper Jack', 'Sliced', '2.5 lb', 1);
//

//Inner JOIN. Based on all the orders recived. It will get user information.
//
// select users.empnum, users.fname, users.lname, orders.saledate, orders.varity, orders.style, orders.size, orders.pounds from users inner join orders on users.id = orders.userid and orders.saledate = '2018-07-20';
//
Monterey Jack

//
// //Old table!!!
// var query = client.query(
//   'CREATE TABLE users(\
//     id serial, \
//     empnum int, \
//     fname varchar(255), \
//     lname varchar(255), \
//     PRIMARY KEY (id) \
// )');
//
// var query = client.query(
//   'CREATE TABLE items(\
//     id serial, \
//     itemid int, \
//     varity varchar(255), \
//     style varchar(255), \
//     size varchar(255), \
//     pounds int, \
//     PRIMARY KEY (id), \
//     FOREIGN KEY (itemid) REFERENCES users(id) \
//   )');
//



  // //MIGHT NEED THIRD TABLE.
  // var query = client.query(
  //   'CREATE TABLE orders(\
  //     orderid serial PRIMARY KEY, \
  //     empnum int references users(empnum), \
  //     saledate date \
  // )');
