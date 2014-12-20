'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var api = require('../../helpers/api.js');


var app = express();

// Serving the app with express.static

app.use(express.static(path.join(__dirname, './app')));
app.use(express.static(path.join(__dirname, '../../bower_components')));


// Providing the REST API

app.use(bodyParser.json());
app.get('/api/projects', api.list);
app.post('/api/projects', api.create);
app.get('/api/projects/:id', api.read);
app.put('/api/projects/:id', api.update);
app.delete('/api/projects/:id', api.purge);


app.listen(3000, function () {
    console.log('Express server listening on port 3000');
});
