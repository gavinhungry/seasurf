/**
 * seasurf - CSRF session middleware
 * https://github.com/gavinhungry/seasurf
 */

(function() {
  'use strict';

  var tokens = require('csrf')();

  module.exports = function seasurf(path) {
    return function(req, res, next) {
      req.session.csrfSecret = req.session.csrfSecret || tokens.secretSync();

      req.csrfToken = function() {
        return tokens.create(req.session.csrfSecret);
      };

      if (path && req.path.indexOf(path) === 0) {
        var token = req.headers['x-csrf-token'];

        if (!tokens.verify(req.session.csrfSecret, token)) {
          return res.status(403).end();
        }
      }

      next();
    }
  };

})();
