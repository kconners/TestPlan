const express = require('express')
const mariadb = require('../database/node_modules/mariadb');
const db = require('../database/startDB')
const common = require('../public/commonlyUsed')



exports.add = async function(req, res){
    let conn;
    let respon = req.body;
    let username = req.query.loggedInAs;

    let testcase_id = req.params.id;
    
    let table = `INSERT INTO c_teststep (id, client_id ,name,shrt_name ,testcase_idnumber,order_number,step , test_Data, expected_result, description ,status,   created_by,   updated_by, created_at, updated_at) 
                                   VALUES(?,          ?,   ?,''        ,                ?,           ?,    ?,         ?,               ?,            ?,     1,'${username}','${username}',NOW(),NOW())`
    
    try {        
        conn = await db.pooldb.getConnection();
        
        var rows = await conn.query(table,[
                                           respon.id,
                                           respon.client_id,
                                           respon.name,
                                           testcase_id,
                                           respon.orderNumber,
                                           respon.step,
                                           respon.testData,
                                           respon.expectedResult, 
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
  
  let table = `UPDATE c_teststep
  
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
  
  let table = `Update c_teststep 
                set order_number = ?,
                    step = ?,
                    test_data = ?,
                    expected_result = ?,
                    description = ?,
                    status = ?,
                    updated_by = '${username}',
                    updated_at = NOW()
                where id = ?`
  
  try {        
      conn = await db.pooldb.getConnection();
      
      var rows = await conn.query(table,[respon.orderNumber,
                                         respon.step,
                                         respon.testData,
                                         respon.expectedResult,
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
    
    let table = `SELECT * FROM client_data.c_teststep where testcase_idnumber = '${req.params.id}' and status > 0 order by order_number;`
    
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
  
  let table = `SELECT * FROM client_data.c_teststep;`
  
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