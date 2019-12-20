const express = require('express')
const mariadb = require('../database/node_modules/mariadb');
const db = require('../database/startDB')
const common = require('../public/commonlyUsed')



exports.add = async function(req, res){
    let conn;
    let respon = req.body;
    let created_by = '';
    let updated_by = '';
    let created_at = '';
    let updated_at = '';
    
    let ID = '';
    if(!respon.id){ ID = common.generateUUID(); }
    else {ID = respon.id;}

    if(respon.created_by){created_by = respon.created_by;}
    else {created_by = req.query.loggedInAs;}
    
    if(respon.updated_by){ updated_by = respon.updated_by;}
    else {updated_by = req.query.loggedInAs;}

    if(respon.updated_at){ updated_at = `'${new Date(respon.updated_at).toJSON().slice(0, 19).replace('T', ' ')}'`;}
    else {updated_at = 'NOW()'}

    if(respon.created_at){ created_at = `'${new Date(respon.created_at).toJSON().slice(0, 19).replace('T', ' ')}'`;}
    else {created_at = 'NOW()'}
    
    let table = `INSERT INTO c_testcase (id, client_id ,name,summary,component,version,priority , shrt_name, description ,status,   created_by,   updated_by, created_at, updated_at) 
                                   VALUES(?,          ?,   ?,      ?,        ?,      ?,        ?,         ?,            ?,     1,'${created_by}','${updated_by}',${created_at},${updated_at})`
    
    try {        
        conn = await db.pooldb.getConnection();
        
        var rows = await conn.query(table,[ID,
                                           respon.client_id,
                                           respon.name,
                                           respon.summary,
                                           respon.component,
                                           respon.version,
                                           respon.priority,
                                           respon.shrt_name, 
                                           respon.description
                                          ])    
        
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
exports.delete = async function(req, res){
  let conn;
  let respon = req.body;
  let username = req.query.loggedInAs;
  
  let table = `UPDATE c_testcase
  
  set status = -1,
  updated_by = '${username}',
  updated_at = NOW()

  where id = '${req.params.id}';`
  
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
exports.update = async function(req, res){
  let conn;
  let respon = req.body;
  let username = req.query.loggedInAs;
  
  let table = `Update c_testcase 
                set name = ?,
                    summary = ?,
                    component = ?,
                    version = ?,
                    priority = ?,
                    shrt_name = ?,
                    description = ?,
                    status = ?,
                    updated_by = '${username}',
                    updated_at = NOW()
                where id = ?`
  
  try {        
      conn = await db.pooldb.getConnection();
      
      var rows = await conn.query(table,[respon.name,
                                         respon.summary,
                                         respon.component,
                                         respon.version,
                                         respon.priority,
                                         respon.shrt_name, 
                                         respon.description,
                                         respon.status,
                                         req.params.id
                                        ])    
      
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
    
    let table = `select * from c_testcase where client_id = '${req.params.id}' and status > 0;`
    
    try {        
        conn = await db.pooldb.getConnection();
        
        var rows = await conn.query(table)    
        
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
exports.get = async function(req, res){
  let conn;
  
  let table = `select * from c_testcase where id = '${req.params.id}'`
  
  try {        
      conn = await db.pooldb.getConnection();
      
      var rows = await conn.query(table)    
      
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
exports.getAll = async function(req, res){
  let conn;
  
  let table = `select * from c_testcase`
  
  try {        
      conn = await db.pooldb.getConnection();
      
      var rows = await conn.query(table)    
      
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