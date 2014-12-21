'use strict';

var fs = require('fs');
var path = require('path');
var parseurl = require('parseurl');
var api = require('../../../../helpers/api-core.js');


var templates = {
    'list.html': fs.readFileSync(path.join(__dirname, './partials/list.html')),
    'detail.html': fs.readFileSync(path.join(__dirname, './partials/detail.html'))
};

function getTemplate(name) {
    return {
        name: name,
        html: templates[name]
    };
}


module.exports = function (req, res, next) {

    req.initialTemplate = null;
    req.initialData = null;

    var url = parseurl(req);

    if (url.pathname === '/') {

        // This is the path for projects list page

        req.initialTemplate = getTemplate('list.html');

        api.list(function (err, ret) {
            if (!err) {
                req.initialData = ret;
            } else {
                // We keep req.initialData === null so that the app will make the initial AJAX request as if serve-spa was not in use.
                // -> So we don't need to reimplement the error handling server side.
            }
            next();
        });

    } else if (url.pathname.match(/^\/edit\//)) {

        // This is the path for the project edit page

        req.initialTemplate = getTemplate('detail.html');

        api.read(url.pathname.substr('/edit/'.length), function (err, ret) {
            if (!err) {
                req.initialData = ret;
            }
            next();
        });

    } else if (url.pathname === '/new') {

        // This is the path for the page to create a new project

        req.initialTemplate = getTemplate('detail.html');
        next();

    } else {
        next();
    }

};
