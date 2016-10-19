var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : process.env.IP,
  user     : process.env.C9_USER,
  password : '',
  database : 'addressbook'
});

connection.query("SHOW databases", function(err, rows, fields) {
  if (err) {
      console.log(err.stack);
  }
  else {
      console.log(JSON.stringify(rows, null, 4));
  }
  connection.end();
});
