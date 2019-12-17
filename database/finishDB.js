


 module.exports.WriteAFile = async function(){
    const axios = require('axios');     
    const fs = require('fs');
    'use strict';

    let returnedItems = await axios.get('/client',{ proxy: { host: 'localhost', port: 3000 } }, null);
    fs.writeFileSync('client.json', JSON.stringify(returnedItems.data));
 }