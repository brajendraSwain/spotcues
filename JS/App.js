require('./DataStore/GlobalData');

var React = require('react');

var MarketPlaceApp = require('./components/MarketPlaceApp.react');


React.render(
 	<MarketPlaceApp/>,
	document.getElementById('container')
);