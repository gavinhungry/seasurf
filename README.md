seasurf
=======
CSRF session middleware.

Installation
------------

    $ npm install seasurf

Usage
-----

```javascript
var seasurf = require('seasurf');

// All paths past this point have access to the csrfToken method
app.use(seasurf({
  // see Options
});
```

Options
-------

`paths`: Array of leading pathnames to enforce CSRF tokens on (with an enforced
method). Defaults to all paths.

`methods`: Array of HTTP method names to enforce CSRF tokens on (with an enforced
path). Defaults to all methods.

`session`: Name of the key pointing to session data. Defaults to `'session'`.

`token(req, res)`: Function returning the CSRF token from a request. Defaults to
the value of the `X-CSRF-Token` header.

`unverified(req, res)`: Function called when a CSRF token cannot be verified.
Defaults to an empty response with status `403`.

License
-------
Released under the terms of the
[MIT license](http://tldrlegal.com/license/mit-license). See **LICENSE**.
