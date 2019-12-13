var clients = require("./clients.js");

const mariadb = require('mariadb');
const dbName = 'client_data';

module.exports.pool = mariadb.createPool({
    //host     : '192.168.99.100',
    host     : '127.0.0.1',
    port     : '3355',
    user     : 'root',
    password : 'Password1*',
    connectionLimit: 5
});
module.exports.pooldb = mariadb.createPool({
    //host     : '192.168.99.100',
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
     
 }
function hi(){
    console.log('docker is spinning');
}

const tables = [{"tableName":"client","tableType":"reference"},
                {"tableName":"application","tableType":"client"},
                {"tableName":"testcase","tableType":"client","extraColumns":[
                  {"columnName":"summary","columnType":"text"},
                  {"columnName":"component","columnType":"VARCHAR(150)"},
                  {"columnName":"version","columnType":"VARCHAR(50)"},
                  {"columnName":"priority","columnType":"VARCHAR(50)"}
                ]},
                {"tableName":"teststep","tableType":"client","extraColumns":[
                  {"columnName":"testcase_idnumber","columnType":"INT"},
                  {"columnName":"order_number","columnType":"INT"},
                  {"columnName":"step","columnType":"text"},
                  {"columnName":"test_data","columnType":"text"},
                  {"columnName":"expected_result","columnType":"text"}
                ]},
                {"tableName":"client_application","tableType":"mapping"},
              ];

 function addTable(){
    var requests = tables.length;
    let conn;


    tables.forEach(async element => {
      let table = '';
    if(element.tableType.toLocaleLowerCase() === "reference"){
     table = `CREATE TABLE ref_${element.tableName} (id VARCHAR(50), name VARCHAR(50) NOT NULL, shrt_name VARCHAR(50) NOT NULL, status INT NOT NULL, created_by VARCHAR(50) NOT NULL, updated_by VARCHAR(50) NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL);`
    }
    else if (element.tableType.toLocaleLowerCase() === "mapping"){
      table = `CREATE TABLE ${element.tableName}_mapping (id VARCHAR(50), client_id VARCHAR(50), parent INT NOT NULL, child INT NOT NULL, status INT NOT NULL, created_by VARCHAR(50) NOT NULL, updated_by VARCHAR(50) NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL);`
    }
    else if (element.tableType.toLocaleLowerCase() === "client"){
      let ExtraColumns = "";
      if(element.extraColumns && element.extraColumns.length >= 1)
       {
         element.extraColumns.forEach(i => 
         ExtraColumns = ExtraColumns + `${i.columnName} ${i.columnType},`);
       }
      table = `CREATE TABLE c_${element.tableName} (id VARCHAR(50), client_id VARCHAR(50), name VARCHAR(50) NOT NULL,shrt_name VARCHAR(50) NOT NULL,  ${ExtraColumns} description text NOT NULL, status INT NOT NULL, created_by VARCHAR(50) NOT NULL, updated_by VARCHAR(50) NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL);`
    }
    else {
      console.log(element.tableType.toLocaleLowerCase())
    }
    try {
      
      conn = await module.exports.pooldb.getConnection();
      const rows = await conn.query(table);
      
      requests--;
      
      if (requests == 0) {clients.addClients();}  
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
      conn = await module.exports.pool.getConnection();
      const rows = await conn.query("CREATE DATABASE `client_data`");
    } catch (err) {
      throw err;
    } finally {
      if (conn) return conn.end();
    }    
 }


require('make-runnable');