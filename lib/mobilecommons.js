/**
 * A NodeJS module for interacting with the MobileCommons REST API.
 * @module node-mobilecommons
 * @version 0.0.1
 * @author Desmond Morris
 * @description A NodeJS module for interacting with the MobileCommons REST API.
 * @param {Object} config A valid configuration.
 */

var https = require('https');
var parseString = require('xml2js').parseString;
var querystring = require('querystring');

/**
 * Constructor
 * @param {String} access_token Nike+ access token
 */
function MobileCommons(user, password) {
  if (!(this instanceof MobileCommons)) return new MobileCommons(user, password);
  this.user = user;
  this.password = password;
  this.api_endpoint = 'secure.mcommons.com';
  this.api_endpoint_base_path = '/api/'
}

/**
 * Makes a get request to the MobileCommons api endpoint
 * @param  {String}   url      The path to the api method
 * @param  {Object}   params
 * @param  {Function} callback
 */
MobileCommons.prototype.get = function(url, params, callback) {
  if (typeof params === 'function') {
    callback = params;
    params = null;
  }

  if ( typeof callback !== 'function' ) {
    throw "Invalid callback function";
    return this;
  }

  if (params) {
    url = url + '?' + querystring.stringify(params);
  }

  url = this.api_endpoint_base_path + url;

  var request_options = {
    host: this.api_endpoint,
    port: 443,
    path: url,
    auth: this.user + ':' + this.password,
    method: 'GET',
  };

  https.get(request_options, function(res){
    var data = '';

    res.on('data', function (chunk){
        data += chunk;
    });

    res.on('error', function(e) {
      callback(e);
    });

    res.on('end',function(){
      parseString(data, function (err, result) {
          var response = err ? null : result;
          callback(err, response);
      });
    });
  });

}

/**
 * List Incoming Messages
 * @see    http://www.mobilecommons.com/mobile-commons-api/rest/#ListIncomingMessages
 * @param  {Object}   params
 * @param  {Function} callback
 */
MobileCommons.prototype.messages = function(params, callback) {
  this.get('messages', params, callback);
}

/**
 * Create Group
 * @see    http://www.mobilecommons.com/mobile-commons-api/rest/#CreateGroup
 * @param  {Object}   params
 * @param  {Function} callback
 */
MobileCommons.prototype.messages = function(params, callback) {
  this.get('messages', params, callback);
}

/**
 * List Campaigns
 * @see    http://www.mobilecommons.com/mobile-commons-api/rest/#ListCampaigns
 * @param  {Object}   params
 * @param  {Function} callback
 */
MobileCommons.prototype.campaigns = function(params, callback) {
  this.get('campaigns', params, callback);
}

module.exports = MobileCommons;