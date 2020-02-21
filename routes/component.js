const express = require('express')
const mariadb = require('../database/node_modules/mariadb');
const db = require('../database/startDB')
const common = require('../public/commonlyUsed')

exports.add = async function(req, res){
    let conn;
    let respon = req.body;
    let username = req.query.loggedInAs;

    let application_idnumber = '';
    if(respon.parent_id){ application_idnumber = respon.parent_id; }
    else {application_idnumber = req.params.applicationID;}

    let ID = '';
    if(!respon.id){
      ID = common.generateUUID();
    }
    else {
      ID = respon.id;
    }

    if(respon.created_by){created_by = respon.created_by;}
    else {created_by = req.query.loggedInAs;}
    
    if(respon.updated_by){ updated_by = respon.updated_by;}
    else {updated_by = req.query.loggedInAs;}

    if(respon.updated_at){ updated_at = `'${new Date(respon.updated_at).toJSON().slice(0, 19).replace('T', ' ')}'`;}
    else {updated_at = 'NOW()'}

    if(respon.created_at){ created_at = `'${new Date(respon.created_at).toJSON().slice(0, 19).replace('T', ' ')}'`;}
    else {created_at = 'NOW()'}

     
    let table = `INSERT INTO f_application_component (id,parent_id, name, shrt_name, description ,status,created_by, updated_by, created_at, updated_at) 
                  VALUES('${ID}','${application_idnumber}','${respon.name}','${respon.shrt_name}','${respon.description}',1,'${username}','${username}',NOW(),NOW())`
    
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
exports.delete = async function(req, res){
    let conn;
    let respon = req.body;
    let username = req.query.loggedInAs;
    
    let table = `UPDATE f_application_component
    
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
exports.listForApplication = async function(req, res){
    let conn;
    
    let table = `select * from f_application_component where parent_id = '${req.params.applicationID}' and status > 0;`
    
    try {        
        conn = await db.pooldb.getConnection();
        
        var rows = await conn.query(table)    
        
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
exports.listAll = async function(req, res){
    let conn;
    
    let table = `select * from f_application_component where status > 0;`
    
    try {        
        conn = await db.pooldb.getConnection();
        
        var rows = await conn.query(table)    
        
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
