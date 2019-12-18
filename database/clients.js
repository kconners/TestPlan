//var clients = [{"client":"Greyhound","shrt":"gh"},{"client":"Securus","shrt":"sec"}];
const mariadb = require('mariadb');
const common = require('../public/commonlyUsed')

const pooldb = mariadb.createPool({
    // host     : '192.168.99.100',
    host     : '127.0.0.1',
    port     : '3355',
    user     : 'root',
    password : 'Password1*',
    connectionLimit: 5,
    database : 'client_data'
});

module.exports = { addClients :  function (){

  const fs = require('fs');

  let rawdata = fs.readFileSync('../public/data/client.json');  
  let clients = JSON.parse(rawdata);
  
  let results = clients.length;
  clients.forEach(async element => {
      
  let conn;
  let table = `INSERT INTO ref_client (id ,name, shrt_name, status,created_by, updated_by, created_at, updated_at) 
  VALUES('${element.id}','${element.name}','${element.shrt_name}',1,'kconners','kconners',NOW(),NOW())`
  
  try {
      conn = await pooldb.getConnection();
      const rows = await conn.query(table);
      results--;

      if(results == 0){process.exit();}
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }   
  });
}
}