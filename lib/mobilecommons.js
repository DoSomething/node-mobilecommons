'use strict';

/**
 * Module dependencies
 */

var request = require('request');
var https = require('https');
var parseXMLString = require('xml2js').parseString;
var querystring = require('querystring');

/**
 * Constructor
 * @param {String} user username
 * @param {String} password password
 */
function MobileCommons(user, password) {
  if (!(this instanceof MobileCommons)) return new MobileCommons(user, password);
  this.auth = {
    user: user,
    password: password
  }
  this.api_endpoint = 'https://secure.mcommons.com/api/';
}

/**
* Request helper function
*
* @param {String} method HTTP method, GET or POST
* @param {String} path endpoint path
* @param {Object} params request payload query or body
* @param {Function} callback
*/
MobileCommons.prototype.__request = function(method, path, params, callback) {

  if (typeof params === 'function') {
    callback = params;
    params = null;
  }

  if ( typeof callback !== 'function' ) {
    callback(new Error('Invalid callback function provided'));
    return this;
  }

  var method = method.toLowerCase();

  var options = {
    method: method,
    uri: this.api_endpoint + path
  };

  if (method === 'get') {
    options['uri'] += '?' + querystring.stringify(params);
  }
  else if (method === 'post') {
    options['form'] = params;
  }

  options['auth'] = this.auth;
  
  request(options, function(error, response, xml){
    if (error) {
      callback(error);
      return this;
    }

    if (response.statusCode !== 200) {
      callback(new Error('Status Code: ' + response.statusCode));
      return this;
    }

    parseXMLString(xml, function (err, body) {
      if (err) {
        callback(err);
      }
      else {
        callback(null, body);
      }
    });
  });
}

/**
 * Helper function wrapper for GET requests
 * @param  {String}   url  The path to the api method
 * @param  {Object}   params
 * @param  {Function} callback
 */
MobileCommons.prototype.get = function(path, params, callback) {
  this.__request('GET', path, params, callback);
}

/**
* Helper function wrapper for POST requests
* @param  {String}   path The path to the api method
* @param  {Object}   params
* @param  {Function} callback
*/
MobileCommons.prototype.post = function(path, params, callback) {
  this.__request('POST', path, params, callback);
}

module.exports = MobileCommons;
