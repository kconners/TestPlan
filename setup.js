exports.hiya =  function(){
  AddSeeds('client');
  AddSeeds('testCase');
  AddSeeds('testSteps');
  AddSeeds('application');
};

function AddSeeds(dataModel){

    const client = require('./database/clients')
    const fs = require('fs');

    let rawdata = fs.readFileSync(`./public/data/${dataModel}.json`);  
    let records = JSON.parse(rawdata);
    
    records.forEach(async element => {
      var _loggedInAs = "kconners";
      'use strict';
      let returnedItems = await client.ax().post(`/${dataModel}`, element);
    });
}