'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var api = require('../../helpers/api-middlewares.js');
var serveSpa = require('serve-spa');


var app = express();


// Providing the REST API
app.use(bodyParser.json());
app.get('/api/projects', api.list);
app.post('/api/projects', api.create);
app.get('/api/projects/:id', api.read);
app.put('/api/projects/:id', api.update);
app.delete('/api/projects/:id', api.purge);

// Serving the bower components with express.static
app.use('/bower_components', express.static(path.join(__dirname, '../../bower_components')));

// Finally, serving the app with serve-spa
serveSpa(app, path.join(__dirname, './app'));

// serve-spa covers pushState urls. Due to that, however, make sure to call it last.


app.listen(3000, function () {
    console.log('Express server listening on port 3000');
});
