const filter = require('./filter.js');
const logger = require('./logger.js');
var express = require("express");
var ejs = require('ejs');

console.log("Server started.");

var features;
filter.extractFeatures(function(data) {
  features = data;
  logger.recordFeatures(features);
  console.log("Features recorded in file.");
});

// Configure & start server
var app = express();
app.engine('html', ejs.renderFile);

app.get('/', function(request, response) {
  response.render("index.html", {
    time:         JSON.stringify(features.time),
    heart:        JSON.stringify(features.heartRate),
    respiration:  JSON.stringify(features.respirationRate),
    spo2:         JSON.stringify(features.spo2)
  });
  console.log("Web page rendered.");
});

app.listen(8888);
