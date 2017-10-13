var url = require('url');


var Cartella = require('./CartellaService');

module.exports.getShareable = function (req, res, next) {
  Cartella.setDB(req.app.locals.db);
  Cartella.getShareable(req.swagger.params, res, next);
};

module.exports.postEvent = function (req, res, next) {
  Cartella.setDB(req.app.locals.db);
  Cartella.postEvent(req.swagger.params, res, next);
};

module.exports.getEvents = function (req, res, next) {
  Cartella.setDB(req.app.locals.db);
  Cartella.getEvents(req.swagger.params, res, next);
};

module.exports.getEventById = function (req, res, next) {
  Cartella.setDB(req.app.locals.db);
  Cartella.getEventById(req.swagger.params, res, next);
};

module.exports.postEventUpdate = function (req, res, next) {
  Cartella.setDB(req.app.locals.db);
  Cartella.postEventUpdate(req.swagger.params, res, next);
};

module.exports.putEventUpdateById = function (req, res, next) {
  Cartella.setDB(req.app.locals.db);
  Cartella.putEventUpdateById(req.swagger.params, res, next);
};

module.exports.getSharingSettingById = function (req, res, next) {
  Cartella.setDB(req.app.locals.db);
  Cartella.getSharingSettingById(req.swagger.params, res, next);
};

module.exports.updateSharingSetting = function (req, res, next) {
  Cartella.setDB(req.app.locals.db);
  Cartella.updateSharingSetting(req.swagger.params, res, next);
};


