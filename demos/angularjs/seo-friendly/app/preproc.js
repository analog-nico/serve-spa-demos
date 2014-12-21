'use strict';

var fs = require('fs');
var path = require('path');
var express = require('express');
var api = require('../../../../helpers/api-core.js');


var router = express.Router();


var templates = {
    'list.html': fs.readFileSync(path.join(__dirname, './partials/list.html')),
    'detail.html': fs.readFileSync(path.join(__dirname, './partials/detail.html'))
};

router.use('*', function (req, res, next) {
    // Init the variables used in index.htmlt
    req.availableTemplates = templates;
    req.initialTemplate = null;
    req.initialData = null;
    next();
});

router.use('/', function (req, res, next) {

    req.initialTemplate = 'list.html';

    api.list(function (err, ret) {
        if (!err) {
            req.initialData = ret;
        } else {
            // We keep req.initialData === null so that the app will make the initial AJAX request as if serve-spa was not in use.
            // -> So we don't need to reimplement the error handling server side.
        }
        next();
    });

});

router.use('/edit/:_id', function (req, res, next) {

    req.initialTemplate = 'detail.html';

    api.read(req.params._id, function (err, ret) {
        if (!err) {
            req.initialData = ret;
        }
        next();
    });

});

router.use('/new', function (req, res, next) {
    req.initialTemplate = 'detail.html';
    next();
});


module.exports = router;
