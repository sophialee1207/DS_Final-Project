const express = require('express');
var cors = require('cors');
const FluentClient = require('@fluent-org/logger').FluentClient;
const app = express();
var bodyParser = require('body-parser')
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

const date = require('date-and-time') 
const fs = require('node:fs');
var jsonParser = bodyParser.json()

const logger = new FluentClient('fluentd.test', {
  socket: {
    host: '127.0.0.1',
    port: 24224,
    timeout: 5000, // 5 seconds
  }
});

app.get('/', function(request, response) {
  const msg = `run server2:3001`;
  logger.emit('follow', {from: msg, to: `Hello World!`});
  console.info(msg);
  response.json({hello: 'Hello World!'});
});

app.post('/', jsonParser, function(request, response){
  const input = request.body; 
  const now  =  new Date(); 
  input["time"] = date.format(now,'YYYY/MM/DD HH:mm:ss');
  input["message"] = "Purchase information received";
  input["srv"] = "service2";
  const msg = JSON.stringify(input) + '\n';
  console.log(msg);
  fs.appendFile('D:/course/distributed_system/fluentd/logs/service2.log', msg, err => {
    if (err) {
      console.error(err);
    }
  });
  response.json(request.body);
});

const port = process.env.PORT || 3001;
app.listen(port, function() {
  console.log("Listening on " + port);
});