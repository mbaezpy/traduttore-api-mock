var url = require('url');


var Cartella = require('./CartellaService');

module.exports.getShareable = function (req, res, next) {
  Cartella.getShareable(req.swagger.params, res, next);
};

module.exports.postEvent = function (req, res, next) {
  Cartella.postEvent(req.swagger.params, res, next);
};

module.exports.getEvents = function (req, res, next) {
  Cartella.getEvents(req.swagger.params, res, next);
};

module.exports.getEventById = function (req, res, next) {
  Cartella.getEventById(req.swagger.params, res, next);
};

module.exports.postEventUpdate = function (req, res, next) {
  Cartella.postEventUpdate(req.swagger.params, res, next);
};

module.exports.putEventUpdateById = function (req, res, next) {
  Cartella.putEventUpdateById(req.swagger.params, res, next);
};

