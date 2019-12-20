


 module.exports.WriteAFile = async function(){
  
    exportData('client');
    exportData('testCase');
    exportData('testSteps');

 }


 async function exportData(dataModel){
    var axios = require('axios');     
    const fs = require('fs');
    'use strict';
    
    let returnedItems = await axios.get(`/${dataModel}`,{ proxy: { host: 'localhost', port: 3000 } }, null);
    fs.writeFileSync(__dirname+`/../public/data/${dataModel}.json`, JSON.stringify(returnedItems.data));
 }