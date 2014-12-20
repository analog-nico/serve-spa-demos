'use strict';

var store = require('./store.js');


function respond(res) {
    return function (err, ret) {
        if (err) {
            res.send(err);
        } else {
            res.json(ret);
        }
    };
}

module.exports.list = function (req, res) {
    store.list(respond(res));
};

module.exports.create = function (req, res) {
    store.create(req.body, respond(res));
};

module.exports.read = function (req, res) {
    store.read(req.params.id, respond(res));
};

module.exports.update = function (req, res) {
    store.update(req.params.id, req.body, respond(res));
};

module.exports.purge = function (req, res) {
    store.purge(req.params.id, respond(res));
};
