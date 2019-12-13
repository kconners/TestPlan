const express = require('express')
const mariadb = require('../database/node_modules/mariadb');
const db = require('../database/startDB')



exports.add = async function(req, res){
    let conn;
    let respon = req.body;
    let username = req.query.loggedInAs;
    
    let table = `INSERT INTO c_testcase (client_id ,name , shrt_name, description ,status,created_by, updated_by, created_at, updated_at) 
                  VALUES(?,?,?,?,1,'${username}','${username}',NOW(),NOW())`
    
    try {        
        conn = await db.pooldb.getConnection();
        
        var rows = await conn.query(table,[respon.client_id,respon.name,respon.shrt_name, respon.description])    
        
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
    
    let table = `select * from c_testcase where client_id = ${req.params.id} and status > 0;`
    
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