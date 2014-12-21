'use strict';

var api = require('./api-core.js');


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
    api.list(respond(res));
};

module.exports.create = function (req, res) {
    api.create(req.body, respond(res));
};

module.exports.read = function (req, res) {
    api.read(req.params.id, respond(res));
};

module.exports.update = function (req, res) {
    api.update(req.params.id, req.body, respond(res));
};

module.exports.purge = function (req, res) {
    api.purge(req.params.id, respond(res));
};
