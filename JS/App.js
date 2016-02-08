require('./DataStore/GlobalData');

var React = require('react');
var AjaxManager = require('./Utils/AjaxManager');

var MarketPlaceApp = require('./components/MarketPlaceApp.react');

// var createAdOptions = {
//   "title": "nice amazing sale",
//   "price": "6000",
//   "currencySymbol": '$',
//   "description": "its nice ....",
//   "email": "braja.ss@gmail.com",
//   "phone": "8900988008"
// };
// AjaxManager.createAd(createAdOptions).then(function (data) {
// 	console.log('create data.......  ',data);
// });

AjaxManager.getAdList().then(function (data) {
	console.log('addlist data.......  ',data);
});
React.render(
 	<MarketPlaceApp/>,
	document.getElementById('container')
);