/**
 * A NodeJS module for interacting with the MobileCommons REST API.
 * @module mobilecommons
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
MobileCommons.prototype.create_group = function(params, callback) {
  this.get('create_group', params, callback);
}

/**
 * List Groups
 * @see    http://www.mobilecommons.com/mobile-commons-api/rest/#ListGroups
 * @param  {Function} callback
 */
MobileCommons.prototype.groups = function(callback) {
  this.get('groups', callback);
}

/**
 * Add Group Member
 * @see    http://www.mobilecommons.com/mobile-commons-api/rest/#AddGroupMember
 * @param  {Object}   params
 * @param  {Function} callback
 */
MobileCommons.prototype.add_group_member = function(params, callback) {
  this.get('add_group_member', params, callback);
}

/**
 * Remove Group Member
 * @see    http://www.mobilecommons.com/mobile-commons-api/rest/#RemoveGroupMember
 * @param  {Object}   params
 * @param  {Function} callback
 */
MobileCommons.prototype.remove_group_member = function(params, callback) {
  this.get('remove_group_member', params, callback);
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

/**
 * List Campaign Subscribers
 * @see    http://www.mobilecommons.com/mobile-commons-api/rest/#ListCampaignSubscribers
 * @param  {Object}   params
 * @param  {Function} callback
 */
MobileCommons.prototype.campaign_subscribers = function(params, callback) {
  this.get('campaign_subscribers', params, callback);
}

module.exports = MobileCommons;
