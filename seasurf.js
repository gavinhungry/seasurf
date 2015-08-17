/**
 * seasurf - CSRF session middleware
 * https://github.com/gavinhungry/seasurf
 */

(function() {
  'use strict';

  var tokens = require('csrf')();

  var seasurf = function (opts) {
    opts = opts || {};

    opts.session = opts.session || 'session';

    opts.token = opts.token || function(req, res) {
      return req.headers['x-csrf-token'];
    };

    opts.unverified = opts.unverified || function(req, res) {
      res.status(403).end();
    };

    var getSessionSecret = function(req) {
      var session = req[opts.session];
      if (!session) {
        return null;
      }

      session.csrfSecret = session.csrfSecret || tokens.secretSync();
      return session.csrfSecret;
    };

    return function(req, res, next) {
      var csrfSecret = getSessionSecret(req);
      if (!csrfSecret) {
        return opts.unverified(req, res);
      }

      req.csrfToken = function() {
        return tokens.create(csrfSecret);
      };

      var verifyPath = !opts.paths || opts.paths.some(function(path) {
        return !req.path.indexOf(path) || path === '*';
      });

      var verifyMethod = !opts.methods || opts.methods.some(function(method) {
        return req.method === method.toUpperCase();
      });

      if (verifyPath && verifyMethod) {
        var token = opts.token(req, res);

        if (!tokens.verify(csrfSecret, token)) {
          return opts.unverified(req, res);
        }
      }

      next();
    };
  };

  module.exports = seasurf;

})();
