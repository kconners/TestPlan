const express = require('express')
const mariadb = require('../../database/node_modules/mariadb');
const db = require('../../database/startDB')
const common = require('../../public/commonlyUsed')



exports.add = async function(req, res){
    
    let username = req.query.loggedInAs;
    let respon = req.body;
    let conn;
    
    if(!respon.id){
        respon.id = common.generateUUID();
    }
    

     let table = `INSERT INTO aventiv.inmate(build_id, record_id, id, firstname, middlename, lastname, displayid, dateofbirth, inmateraceid, inmateethnicityid, inmatesexid, securityclassificationid, inmatesuffixid, inmateeyecolorid, inmatehaircolorid, heightft, heightin, weight, city, county, state, resident, citizenship, addressline1, email, mugshotid, screeningid, classificationid, facilityid, housingid, pendinghousingid, pendinghousingat, activityid, activityupdatedat, status, updatedat, createdat, updatedby, createdby, addressline2, zipcode, inmatestatusid, inmatetypeid, age, internationaladdress, isaddressinternational, ishomeless, inmateeducationid, isunemployed, irisscanperformed, created_on, updated_on)
     VALUES ('${respon.build_id}','${respon.record_id}','${respon.id}','${respon.firstname}','${respon.middlename}','${respon.lastname}','${respon.displayid}','${respon.dateofbirth}','${respon.inmateraceid}','${respon.inmateethnicityid}','${respon.inmatesexid}','${respon.securityclassificationid}','${respon.inmatesuffixid}','${respon.inmateeyecolorid}','${respon.inmatehaircolorid}','${respon.heightft}','${respon.heightin}','${respon.weight}','${respon.city}','${respon.county}','${respon.state}','${respon.resident}','${respon.citizenship}','${respon.addressline1}','${respon.email}','${respon.mugshotid}','${respon.screeningid}','${respon.classificationid}','${respon.facilityid}','${respon.housingid}','${respon.pendinghousingid}','${respon.pendinghousingat}','${respon.activityid}','${respon.activityupdatedat}','${respon.status}','${respon.updatedat}','${respon.createdat}','${respon.updatedby}','${respon.createdby}','${respon.addressline2}','${respon.zipcode}','${respon.inmatestatusid}','${respon.inmatetypeid}','${respon.age}','${respon.internationaladdress}','${respon.isaddressinternational}','${respon.ishomeless}','${respon.inmateeducationid}','${respon.isunemployed}','${respon.irisscanperformed}', NOW(), NOW()) returning record_id;`
    try{
        conn = await db.pooldb.connect();
        var rows = await conn.query(table)    
        respon.record_id = rows.rows[0].record_id;

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

