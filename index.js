const express = require('express')
const app = express()
const port = 3000
var fs = require('fs')

var client = require('./routes/client');
var testCase = require('./routes/testcase');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname + '/public'));




app.get('/', (req, res) => res.send('Hello World!'));

app.get('/client.html',function(req,res) {
  res.sendFile(__dirname + '/views/client.html');
});
app.get('/TestCase.html',function(req,res) {
  res.sendFile(__dirname + '/public/views/TestCase.html');
});
app.get('/TestCycle.html',function(req,res) {
  res.sendFile(__dirname + '/public/views/TestCycle.html');
});



app.post('/client', (req, res)  => client.add(req, res));


app.get('/client', (req, res) =>client.list(req, res));
app.delete('/client/:id', (req, res) =>client.delete(req, res));
app.get('/client/:id/testCase', (req, res) =>testCase.list(req, res));
app.post('/testCase', (req, res)  => testCase.add(req, res));


app.get('/quit', function(req,res) {
    res.send('closing..');
    server.close();
  });



  app.get('/ManageClientsApplications.html',function(req,res) {
    res.sendFile(__dirname + '/public/views/ManageClientsApplications.html');
  });

var server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))