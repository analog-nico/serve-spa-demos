'use strict';

var fs = require('fs');
var path = require('path');
var parseurl = require('parseurl');
var store = require('../../../helpers/store.js');


var templates = {
    'list.html': fs.readFileSync(path.join(__dirname, './partials/list.html')),
    'detail.html': fs.readFileSync(path.join(__dirname, './partials/detail.html'))
};

function getTemplate(name) {
    return '<script type="text/ng-template" id="partials/' + name + '">\n' +
        templates[name] + '\n' +
        '</script>';
}


module.exports = function (req, res, next) {

    req.initialTemplate = '';
    req.initialData = null;

    var url = parseurl(req);

    if (url.pathname === '/') {

        req.initialTemplate = getTemplate('list.html');

        store.list(function (err, ret) {
            if (!err) {
                req.initialData = ret;
            } else {
                // We keep req.initialData === null so that the app will make the initial AJAX request as if serve-spa was not in use.
                // -> So we don't need to reimplement the error handling server side.
            }
            next();
        });

    } else if (url.pathname.match(/^\/edit\//)) {

        req.initialTemplate = getTemplate('detail.html');

        store.read(url.pathname.substr('/edit/'.length), function (err, ret) {
            if (!err) {
                req.initialData = ret;
            }
            next();
        });

    } else if (url.pathname === '/new') {

        req.initialTemplate = getTemplate('detail.html');

    } else {
        next();
    }

};
