// Module dependencies

var express    = require('express');
var mysql      = require('mysql');

var app = express();


//Parameters for connection to mysql database "nodedatabase"
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'akash',
  database: 'nodedatabase'
});

//here i am checking whether connection is done  to mysql properly  or not.
connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})


//when the client hits the url localhost:3000 then this function is called
 app.get("/",function(req,res){

/*
 connection.query('SELECT User from mysql.user LIMIT 2', function(err, rows, fields) {
// connection.end();
   if (!err)
     console.log('The solution is: ', rows[0].User);
   else
     console.log('Error while performing Query.');
   });
*/

// i read in an article that whenever the innodb is the engine then 
// the SUPPORT of INFORMATION_SCHEMA.ENGINES is DEFAULT.
// so, i am selection SUPPORT from INFORMATION_SCHEMA.ENGINES and checkinh whether 
// the SUPPORT is DEFEAULT or not.
//if we got DEFEAULT value then we can say innodb is enabled.
 connection.query('SELECT SUPPORT FROM INFORMATION_SCHEMA.ENGINES WHERE ENGINE = "InnoDB" ', function(err, rows, fields) {
// connection.end();
   if (!err)
   {  

       if(rows[0].SUPPORT == 'DEFAULT')
        console.log("innodb is enabled");
   }
   else
     console.log('Error while performing Query.');
   });

// We creating a table 'people' 
 connection.query('CREATE TABLE IF NOT EXISTS people(id int primary key, name varchar(255), age int, address text)',function(err, result){

                    // Case there is an error during the creation
                    if(err) {
                        console.log(err);
                    }
                    else{
                        console.log("Table people Created");
                    }
                });

// I read in another article that command 'show status' will give the various value 
// and i can get the value of total disk writes and after executing the command we got the value of 
// Innodb_dblwr_pages_written , Innodb_dblwr_writes , Innodb_log_writes

connection.query("show status", function(err, result,res) {
    if (!err)
       {
         console.log('The result is: ', result[195].Variable_name + " = "+ result[195].Value );
         console.log('The result is: ', result[196].Variable_name + " = "+ result[196].Value );
         console.log('The result is: ', result[200].Variable_name + " = "+ result[200].Value );

    }else
        console.log('Error while performing Query.');
});

// braking the connection
 connection.end();
 });
 
 
// i am listening to the port 3000 
app.listen(3000);
console.log("Express server listening on port 3000");