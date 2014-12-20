'use strict';

var parseurl = require('parseurl');
var store = require('../../../helpers/store.js');


module.exports = function (req, res, next) {

    req.initialData = null;

    var url = parseurl(req);

    if (url.pathname === '/') {

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

        store.read(url.pathname.substr('/edit/'.length), function (err, ret) {
            if (!err) {
                req.initialData = ret;
            }
            next();
        });

    } else {
        next();
    }

};
