
const express = require('express')
const mariadb = require('../database/node_modules/mariadb');
const db = require('../database/startDB')
const common = require('../public/commonlyUsed')

exports.add = async function(req, res){
    let conn;
    let respon = req.body;
    let username = req.query.loggedInAs;
    let ID = common.generateUUID();
    let table = `INSERT INTO ref_client (id, name, shrt_name, status,created_by, updated_by, created_at, updated_at) 
                  VALUES('${ID}','${respon.name}','${respon.shrt_name}',1,'${username}','${username}',NOW(),NOW())`
    
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
  
  let table = `select * from ref_client;`
  
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
    let command = `delete from ref_client where id = ${req.params.id}`
    
    try {        
        conn = await db.pooldb.getConnection();
        
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