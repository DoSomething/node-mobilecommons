var MobileCommons = require('../lib/mobilecommons');

var client = new MobileCommons(
  process.env.MOBILE_COMMONS_USERNAME,
  process.env.MOBILE_COMMONS_PASSWORD
);

client.get('messages', {'include_profile': 1}, function(err, data){
  console.log(err);
  console.log(data.response);
});
