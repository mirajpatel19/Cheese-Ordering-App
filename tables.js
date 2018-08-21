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
      saledate varchar(255), \
      variety varchar(255), \
      style varchar(255), \
      size varchar(255), \
      qty int, \
      pounds float(8), \
      orderDate varchar(255), \
      PRIMARY KEY (id), \
      FOREIGN KEY (userid) REFERENCES users(id) \
  )'
);

//TEST values
//
// insert into users(empnum, fname, lname) values(144196, 'Miraj', 'Patel'),(144197, 'Sam', 'Shai'),(144198, 'Cathline', 'Rameres'), (144199, 'Kobe', 'Brain'),(555, 'Sam', 'Shai');
//
// insert into orders(userid, saledate, variety, style, size, qty, orderdate) values(3, '07/18/2018', 'Marble Jack', 'Ball', '2.5 lb', 5, 08/08/2018), (4, '07/19/2018', 'Pepper Jack', 'Sliced', '5 lb', 2, 08/10/2018), (1, '07/20/2018', 'Monterey Jack', 'Loaf', '1 lb', 8, 08/18/2018), (3, '07/19/2018', 'Pepper Jack', 'Sliced', '2.5 lb', 1, 08/05/2018), (1, '07/19/2018', 'Pepper Jack', 'Sliced', '2.5 lb', 1, 08/05/2018), (3, '07/20/2018', 'Monterey Jack', 'Loaf', '1 lb', 8, 08/18/2018);
//insert into orders(userid, saledate, variety, style, size, qty, orderdate) values(3, '07/18/2018', 'Marble Jack', 'Ball', '2.5 lb', 5, '08/08/2018'), (4, '07/19/2018', 'Pepper Jack', 'Sliced', '5 lb', 2, '08/10/2018'), (1, '07/20/2018', 'Monterey Jack', 'Loaf', '1 lb', 8, '08/18/2018'), (3, '07/19/2018', 'Pepper Jack', 'Sliced', '2.5 lb', 1, '08/05/2018'), (1, '07/19/2018', 'Pepper Jack', 'Sliced', '2.5 lb', 1, '08/05/2018'), (3, '07/20/2018', 'Monterey Jack', 'Loaf', '1 lb', 8, //'08/18/2018'), (3, '07/18/2018', 'Marble Jack', 'Ball', '2.5 lb', 5, '08/08/2018'), (6, '07/18/2018', 'Marble Jack', 'Ball', '2.5 lb', 5, '08/08/2018'), (9, '07/19/2018', 'Pepper Jack', 'Sliced', '5 lb', 2, '08/10/2018'), (1, '07/20/2018', 'Monterey Jack', 'Loaf', '1 lb', 8, '08/18/2018'), (1, '07/20/2018', 'Monterey Jack', 'Loaf', '2 lb', 1, '08/18/2018'), (5, '07/20/2018', 'Monterey Jack', 'Loaf', '2 lb', 1, '08/18/2018'), (5, '07/23/2018', 'Monterey Jack', 'Loaf', '2 lb', 1, '08/18/2018');
//
// 'Monterey Jack', 'Loaf', '1 lb', 8	x111
// 'Marble Jack', 'Ball', '2.5 lb', 5	x111
// 'Pepper Jack', 'Sliced', '5 lb', 2	x11
// 'Pepper Jack', 'Sliced', '2.5 lb', 1	x11
// 'Monterey Jack', 'Loaf', '2 lb', 1	x11
//

//INNER JOIN. Based on all the orders recived. It will get user information.
//
// select users.empnum, users.fname, users.lname, orders.saledate, orders.variety, orders.style, orders.size, orders.qty, orders.orderdate from users inner join orders on users.id = orders.userid;
//

//CREATING A VIEW.
//create view myView as select users.empnum, users.fname, users.lname, orders.saledate, orders.variety, orders.style, orders.size, orders.qty from users inner join orders on users.id = orders.userid;
//

//
//PICK-LIST
// select variety, count(*) from myView group by variety;
//

//BETTER PICK-LIST
//select variety, style, count(*) from myView group by style, variety;
//select saledate, variety, style, size, qty, count(*) from orders group by style, variety, saledate having saledate='08/31/2018';
//select saledate, variety, style, size, qty, count(*) from orders group by variety, style, saledate, size, qty order by saledate, variety, style, size, qty;
//

//
//Pay Roll
//select users.empnum, users.fname, users.lname, sum(orders.pounds) as totalpounds from users inner join orders on users.id = orders.userid where orders.saledate='08/24/2018' group by users.empnum, users.fname, users.lname;
//select userid, SUM(pounds) as total_pounds from orders group by userid;
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
//     qty int, \
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
