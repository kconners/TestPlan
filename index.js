const express = require('express')
const app = express()
const port = 3000
var fs = require('fs')

const common = require('./database/finishDB');

var client = require('./routes/client');
var application = require('./routes/application');
var testCase = require('./routes/testcase');
var testStep = require('./routes/teststeps');
var component = require('./routes/component');
var setup = require('./setup');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:9999"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

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
app.get('/client/:id/testCase', (req, res) =>testCase.list(req, res));
app.delete('/client/:id', (req, res) =>client.delete(req, res));

app.post('/client/:clientID/application', (req, res)  => application.add(req, res));
app.get('/client/:clientID/application', (req, res)  => application.listForClient(req, res));

app.post('/testCase', (req, res)  => testCase.add(req, res));
app.post('/testCase/:id/testSteps', (req, res) =>testStep.add(req, res));
app.get('/testCase', (req, res)  => testCase.getAll(req, res));
app.get('/testCase/:id', (req, res)  => testCase.get(req, res));
app.get('/testCase/:id/testSteps', (req, res) =>testStep.list(req, res));
app.put('/testCase/:id', (req, res)  => testCase.update(req, res));
app.delete('/testCase/:id', (req, res)  => testCase.delete(req, res));

app.post('/testSteps', (req, res) =>testStep.add(req, res));
app.get('/testSteps', (req, res)  => testStep.getAll(req, res));
app.put('/testSteps/:id', (req, res) =>testStep.update(req, res));
app.delete('/testSteps/:id', (req, res) =>testStep.delete(req, res));

app.post('/application', (req, res)  => application.add(req, res));
app.get('/application', (req, res)  => application.listAll(req, res));
app.delete('/application/:id', (req, res)  => application.delete(req, res));

app.post('/application/:applicationID/component', (req, res)  => component.add(req, res));
app.get('/application/:applicationID/component', (req, res)  => component.listForApplication(req, res));

app.post('/component', (req, res)  => component.add(req, res));
app.get('/component', (req, res)  => component.listAll(req, res));
app.delete('/component/:id', (req, res)  => component.delete(req, res));

app.get('/quit', function(req,res) {
    res.send('closing..');
    
    common.WriteAFile();
    //server.close();
  });

  app.get('/ManageClientsApplications.html',function(req,res) {
    res.sendFile(__dirname + '/public/views/ManageClientsApplications.html');
  });

  app.get('/ManageApplicationComponents.html',function(req,res) {
    res.sendFile(__dirname + '/public/views/ManageApplicationComponents.html');
  });


var server = app.listen(port, () => setup.hiya())