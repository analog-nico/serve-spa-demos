'use strict';

var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var api = require('../../../helpers/api-middlewares.js');


var app = express();
app.use(logger('dev'));


// Providing the REST API
app.use(bodyParser.json());
app.get('/api/projects', api.list);
app.post('/api/projects', api.create);
app.get('/api/projects/:id', api.read);
app.put('/api/projects/:id', api.update);
app.delete('/api/projects/:id', api.purge);

// Serving the bower components with express.static
app.use('/bower_components', express.static(path.join(__dirname, '../../../bower_components')));

// Finally, serving the app with express.static
app.use(express.static(path.join(__dirname, './app')));

// To support pushState urls we need to serve index.html for all other paths
app.use('*', function(req,res) {
    res.sendFile(path.join(__dirname, './app/index.html'));
});


app.listen(3000, function () {
    console.log('Express server listening on port 3000');
});
