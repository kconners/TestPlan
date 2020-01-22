const mariadb = require('mariadb');
const common = require('../public/commonlyUsed')


module.exports = {ax : function(){
  var axios = require('axios');   

  var ax = axios.create({
          baseURL: 'http://127.0.0.1:3000'
      });
  return ax;
}}

