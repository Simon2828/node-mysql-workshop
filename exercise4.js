//Notice that for the previous exercise, Account #5 did not appear in the listing. Don't come back here until you have 
//re-checked the previous exercise and noticed for yourself that Account #5 is missing.
//The reason for this is because Account #5 does not have any AddressBook, so doing the JOIN left it out.
//Read and understand this article on SQL JOINs, more specifically about the LEFT JOIN.
//Based on your new understanding, create a similar program to Exercise #4.
//The only difference, if an account does not have any address book, print it like this:

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : process.env.IP,
  user     : process.env.C9_USER,
  password : '',
  database : 'addressbook'
});

connection.query("select Account.id,email,ifnull(group_concat(name),'--no address books--''\n') name from Account left join AddressBook on Account.id=AddressBook.accountId group by email order by id asc;", function(err, rows, fields) {
 if (err) {
     console.log(err.stack);
 }
 else {
     rows.forEach(function(row) {
            var namesLineBreaks= '';
            var separateRowName = row.name.split(',');
            separateRowName.forEach(function(name) {
                namesLineBreaks += '  '+name +'\n';
            });
            console.log('#' + row.id + ': ' + row.email + '\n'+namesLineBreaks);
        });
 }
 connection.end();
});
