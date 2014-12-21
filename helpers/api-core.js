'use strict';

var Datastore = require('nedb');
var path = require('path');


var db = new Datastore({
    filename: path.join(__dirname, './datastore'),
    autoload: true
});

module.exports.list = function (respond) {
    db.find({}, respond);
};

module.exports.create = function (project, respond) {
    db.insert(project, respond);
};

module.exports.read = function (id, respond) {
    db.find({ _id: id }, function (err, storedProjects) {
        respond(err, storedProjects[0]);
    });
};

module.exports.update = function (id, project, respond) {
    db.update({ _id: id }, project, { upsert: true }, respond);
};

module.exports.purge = function (id, respond) {
    db.remove({ _id: id }, respond);
};
