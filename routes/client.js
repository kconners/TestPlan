
const express = require('express')
const mariadb = require('../database/node_modules/mariadb');
const pooldb = mariadb.createPool({
    host     : '192.168.99.100',
     //host     : '127.0.0.1',
    port     : '3355',
    user     : 'root',
    password : 'Password1*',
    connectionLimit: 5,
    database : 'client_data'
});

exports.add = async function(req, res){
    let conn;
    let respon = req.body;
    
    let table = `INSERT INTO client (name, shrt_name) VALUES('${respon.name}','${respon.shrt_name}')`
    
    try {        
        conn = await pooldb.getConnection();
        
        var rows = await conn.query(table)    
        
        respon.id = rows.insertId;

        res.status = 200;
        res.send(JSON.stringify(respon));

        return;
        } 
        catch (err) {
          throw err;
        } 
        finally {
          if (conn) return conn.end();
        }      
}
exports.list = async function(req, res){
  let conn;
  
  let table = `select * from client;`
  
  try {        
      conn = await pooldb.getConnection();
      
      var rows = await conn.query(table)    
      console.log(JSON.stringify(rows));      
      //respon.id = rows.insertId;

      res.status = 200;
      res.send(JSON.stringify(rows));

      return;
      } 
      catch (err) {
        throw err;
      } 
      finally {
        if (conn) return conn.end();
      }      
}
exports.delete = async function(req, res){
    let conn;
    let command = `delete from client where id = ${req.params.id}`
    
    try {        
        conn = await pooldb.getConnection();
        
        var rows = await conn.query(command)            
        res.status = 200;
        res.send();
        return;
        } 
        catch (err) {
          throw err;
        } 
        finally {
          if (conn) return conn.end();
        }      
}