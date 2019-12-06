
const express = require('express')
const mariadb = require('../database/node_modules/mariadb');
const db = require('../database/startDB')

exports.add = async function(req, res){
    let conn;
    let respon = req.body;
    let username = req.query.loggedInAs;
    
    let table = `INSERT INTO client (name, shrt_name, created_by, updated_by, created_at, updated_at) 
                  VALUES('${respon.name}','${respon.shrt_name}','${username}','kconners',NOW(),NOW())`
    
    try {        
        conn = await db.pooldb.getConnection();
        
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
      conn = await db.pooldb.getConnection();
      
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