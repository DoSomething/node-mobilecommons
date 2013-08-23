MobileCommons REST API library
====================================

[![wercker status](https://app.wercker.com/status/28a614da7d707626b46502639874800e "wercker status")](https://app.wercker.com/project/bykey/28a614da7d707626b46502639874800e)

A API wrapper for MobileCommons REST API.

It currently only exposes a basic get method and a "messages" convenience endpoint wrapper method.

Install
-------

    npm install node-mobilecommons

Usage
-----

The MobileCommons api uses basic auth for authentication.  

    var MobileCommons = require('node-mobilecommons');
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
