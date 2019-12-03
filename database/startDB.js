var clients = require("./clients.js");

const mariadb = require('mariadb');
const dbName = 'client_data';

const pool = mariadb.createPool({
    host     : '127.0.0.1',
    port     : '3355',
    user     : 'root',
    password : 'Password1*',
    connectionLimit: 5
});
const pooldb = mariadb.createPool({
    host     : '127.0.0.1',
    port     : '3355',
    user     : 'root',
    password : 'Password1*',
    connectionLimit: 5,
    database : dbName
});



 module.exports.createDB = async function(){
     setTimeout(hi,15000);
     setTimeout(Connect,15000);
     setTimeout(addTable,15000);
     setTimeout(clients.addClients,15000);
 }
function hi(){
    console.log('docker is spinning');
}

const tables = [{"tableName":"client"},{"tableName":"testcase"}];

 function addTable(){
    let conn;


    tables.forEach(async element => {
      
    

    let table = `CREATE TABLE ${element.tableName} (id INT NOT NULL AUTO_INCREMENT,name VARCHAR(50) NOT NULL,shrt_name VARCHAR(50) NOT NULL, INDEX id (id));`
    try {
      console.log(table);
      conn = await pooldb.getConnection();
      const rows = await conn.query(table);
      console.log(JSON.stringify(rows));
    } catch (err) {
      throw err;
    } finally {
      if (conn) return conn.end();
    }    
   });
 }


 async function Connect(){
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query("CREATE DATABASE `client_data`");
    } catch (err) {
      throw err;
    } finally {
      if (conn) return conn.end();
    }    
 }


require('make-runnable');