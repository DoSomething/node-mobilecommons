var MobileCommons = require('../lib/mobilecommons');

var client = new MobileCommons(
  process.env.MOBILE_COMMONS_USERNAME,
  process.env.MOBILE_COMMONS_PASSWORD
);

var params = {
  'phone_number': '555-867-5309',
  'first_name': 'Jon'
};

client.post('profile_update', params, function(err, data){
  console.log(err);
  console.log(data.response);
});
