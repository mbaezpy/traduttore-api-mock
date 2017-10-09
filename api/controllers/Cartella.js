var url = require('url');


var Cartella = require('./CartellaService');

module.exports.getShareable = function (req, res, next) {
  Cartella.getShareable(req.swagger.params, res, next);
};


