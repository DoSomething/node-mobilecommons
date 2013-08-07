MobileCommons REST API library for Node
====================================

A API wrapper for MobileCommons REST API.

It currently only exposes a basic get method and a "messages" convenience endpoint wrapper method.

Install
-------

    npm install node-mobilecommons

Usage
-----

The MobileCommons api uses basic auth for authentication.  

    var MobileCommons = require('./lib/mobilecommons');
    var mc = new MobileCommons(
        'username',
        'password'
    );

    mc.messages({'include_profile': 1}, function(err, data) {
      console.log(data.response.messages[0].message);
    });


Todo
----

* Moar endpoints
* Tests
