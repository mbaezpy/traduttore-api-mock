var url = require('url');


var Mobile = require('./MobileService');

module.exports.getCalendarEvents = function (req, res, next) {
  Mobile.setDB(req.app.locals.db);
  Mobile.getCalendarEvents(req.swagger.params, res, next);
};

module.exports.getPNEvent = function (req, res, next) {
  Mobile.setDB(req.app.locals.db);
  Mobile.getPNEvent(req.swagger.params, res, next);
};

module.exports.getHSEvent = function (req, res, next) {
  Mobile.setDB(req.app.locals.db);
  Mobile.getHSEvent(req.swagger.params, res, next);
};

module.exports.getActivityById = function (req, res, next) {
  Mobile.setDB(req.app.locals.db);
  Mobile.getActivityById(req.swagger.params, res, next);
};

module.exports.updateActivity = function (req, res, next) {
  Mobile.setDB(req.app.locals.db);
  Mobile.updateActivity(req.swagger.params, res, next);
};

module.exports.createActivity = function (req, res, next) {
  Mobile.setDB(req.app.locals.db);
  Mobile.createActivity(req.swagger.params, res, next);
};

module.exports.getActivityEditions = function (req, res, next) {
  Mobile.setDB(req.app.locals.db);
  Mobile.getActivityEditions(req.swagger.params, res, next);
};

module.exports.createActivityEdition = function (req, res, next) {
  Mobile.setDB(req.app.locals.db);
  Mobile.createActivityEdition(req.swagger.params, res, next);
};

module.exports.createAppointment = function (req, res, next) {
  Mobile.setDB(req.app.locals.db);
  Mobile.createAppointment(req.swagger.params, res, next);
};

module.exports.getActivityAppointments = function (req, res, next) {
  Mobile.setDB(req.app.locals.db);
  Mobile.getActivityAppointments(req.swagger.params, res, next);
};

module.exports.getActivityEditionById = function (req, res, next) {
  Mobile.setDB(req.app.locals.db);
  Mobile.getActivityEditionById(req.swagger.params, res, next);
};

module.exports.updateActivityEdition = function (req, res, next) {
  Mobile.setDB(req.app.locals.db);
  Mobile.updateActivityEdition(req.swagger.params, res, next);
};

module.exports.getActivityEditionParticipations = function (req, res, next) {
  Mobile.setDB(req.app.locals.db);
  Mobile.getActivityEditionParticipations(req.swagger.params, res, next);
};

module.exports.addActivityEditionParticipant = function (req, res, next) {
  Mobile.setDB(req.app.locals.db);
  Mobile.addActivityEditionParticipant(req.swagger.params, res, next);
};

module.exports.getActivityEditionParticipationById = function (req, res, next) {
  Mobile.setDB(req.app.locals.db);
  Mobile.getActivityEditionParticipationById(req.swagger.params, res, next);
};

module.exports.updateActivityEditionParticipation = function (req, res, next) {
  Mobile.setDB(req.app.locals.db);
  Mobile.updateActivityEditionParticipation(req.swagger.params, res, next);
};

module.exports.getAppointmentById = function (req, res, next) {
  Mobile.setDB(req.app.locals.db);
  Mobile.getAppointmentById(req.swagger.params, res, next);
};

module.exports.updateAppointment = function (req, res, next) {
  Mobile.setDB(req.app.locals.db);
  Mobile.updateAppointment(req.swagger.params, res, next);
};





