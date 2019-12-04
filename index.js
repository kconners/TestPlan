const express = require('express')
const app = express()
const port = 3000
var fs = require('fs')

var client = require('./routes/client');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



app.get('/', (req, res) => res.send('Hello World!'));

app.get('/client.html',function(req,res) {
  res.sendFile(__dirname + '/views/client.html');
});
app.post('/client', (req, res) =>client.add(req, res));
app.get('/client', (req, res) =>client.list(req, res));
app.delete('/client/:id', (req, res) =>client.delete(req, res));


app.get('/quit', function(req,res) {
    res.send('closing..');
    server.close();
  });

var server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))