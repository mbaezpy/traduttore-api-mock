var url = require('url');


var Mobile = require('./MobileService');

module.exports.getCalendarEvents = function (req, res, next) {
  Mobile.getCalendarEvents(req.swagger.params, res, next);
};

module.exports.getPNEvent = function (req, res, next) {
  Mobile.getPNEvent(req.swagger.params, res, next);
};

module.exports.getHSEvent = function (req, res, next) {
  Mobile.getHSEvent(req.swagger.params, res, next);
};

module.exports.getActivityById = function (req, res, next) {
  Mobile.getActivityById(req.swagger.params, res, next);
};

module.exports.updateActivity = function (req, res, next) {
  Mobile.updateActivity(req.swagger.params, res, next);
};

module.exports.createActivity = function (req, res, next) {
  Mobile.createActivity(req.swagger.params, res, next);
};

module.exports.getActivityEditions = function (req, res, next) {
  Mobile.getActivityEditions(req.swagger.params, res, next);
};

module.exports.createActivityEdition = function (req, res, next) {
  Mobile.createActivityEdition(req.swagger.params, res, next);
};

module.exports.createAppointment = function (req, res, next) {
  Mobile.createAppointment(req.swagger.params, res, next);
};

module.exports.getActivityAppointments = function (req, res, next) {
  Mobile.getActivityAppointments(req.swagger.params, res, next);
};

module.exports.getActivityEditionById = function (req, res, next) {
  Mobile.getActivityEditionById(req.swagger.params, res, next);
};

module.exports.updateActivityEdition = function (req, res, next) {
  Mobile.updateActivityEdition(req.swagger.params, res, next);
};

module.exports.getActivityEditionParticipations = function (req, res, next) {
  Mobile.getActivityEditionParticipations(req.swagger.params, res, next);
};

module.exports.addActivityEditionParticipant = function (req, res, next) {
  Mobile.addActivityEditionParticipant(req.swagger.params, res, next);
};

module.exports.getActivityEditionParticipationById = function (req, res, next) {
  Mobile.getActivityEditionParticipationById(req.swagger.params, res, next);
};

module.exports.updateActivityEditionParticipation = function (req, res, next) {
  Mobile.updateActivityEditionParticipation(req.swagger.params, res, next);
};

module.exports.getAppointmentById = function (req, res, next) {
  Mobile.getAppointmentById(req.swagger.params, res, next);
};

module.exports.updateAppointment = function (req, res, next) {
  Mobile.updateAppointment(req.swagger.params, res, next);
};





