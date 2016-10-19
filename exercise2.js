//For each account, console.log a line with the account's ID and email, like this: #1:email@domain.com
var mysql = require('mysql');
var Table = require('cli-table');
var colors = require('colors');


var connection = mysql.createConnection({
  host     : process.env.IP,
  user     : process.env.C9_USER,
  password : '',
  database : 'addressbook'
});

connection.query("select id, name from AddressBook limit 5", function(err, rows, fields) {
  if (err) {
      console.log(err.stack);
  }
  else {
      console.log(JSON.stringify(rows, null, 4));
  }
});

connection.query("select id, email from Account", function(err, rows, fields) {
  if (err) {
      console.log(err.stack);
  }
  else {
      rows.forEach(function(row){
          console.log(('#'+row.id).bold+':'+row.email);
      })
  }
  connection.end();
});
