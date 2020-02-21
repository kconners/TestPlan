var router = require('express').Router();
var page = require('./page');
// individual products routes

router.get('/Pages.html',function(req,res) {
    res.sendFile(__dirname + '../../public/views/ManageComponentPages.html');
  });
  router.get('/Routes.html',function(req,res) {
    res.sendFile(__dirname + '../../public/views/ManageComponentRoutes.html');
  });

router.post('/page', (req, res) => page.add(req, res));



module.exports = router; 