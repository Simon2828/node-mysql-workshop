//Write a program that fetches all the accounts and their addressbooks.
//Output one line for each account as in Exercise 4, followed by a listing of all the address book 
//names for that account, one per line
//Make the output look nice in any way you like
//Here is an example:
//#1: john@smith.com
//  business contacts
//  friends
//#2: jane@smith.com

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: process.env.IP,
    user: process.env.C9_USER,
    password: '',
    database: 'addressbook'
});


// connection.query("select * from Account join AddressBook on Account.id=AddressBook.accountId", function(err, rows, fields) {

//   if (err) {
//       console.log(err.stack);
//   }
//   else {
//       console.log(JSON.stringify(rows, null, 4));
//   }
// //   rows.forEach(function(row) {
// //     console.log('#' + row.id + ': ' + row.email);
// //   });

// });

var accountNames = 'select Account.id,email,group_concat(name) name from Account join AddressBook on Account.id=AddressBook.accountId group by email order by id asc'

connection.query(accountNames, function(err, rows, fields) {

    if (err) {
        console.log(err.stack);
    }
    else {
        rows.forEach(function(row) {
            var namesLineBreaks= '';
            var separateRowName = row.name.split(',');
            separateRowName.forEach(function(name) {
                namesLineBreaks += name +'\n';
            });
            console.log('#' + row.id + ': ' + row.email + '\n' + namesLineBreaks);
        });
    }

    connection.end();
});
