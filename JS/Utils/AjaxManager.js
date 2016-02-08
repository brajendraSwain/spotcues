var $ = require('./../../bower_components/jquery/dist/jquery.min.js');

// var ajaxProcessor = function(reqURL, requestData, callback) {
// 	$.ajax({
// 		type: "POST",
// 		url: Utils.appServerURL+reqURL,
// 		data: JSON.stringify(requestData),
// 		contentType: 'application/json',
// 		success: function(data) {
// 			if (!data.success) {
// 				callback(false, data);
// 			} else {
// 				callback(true, data);
// 			}
// 		},
// 		error: function(data) {
// 			callback(false, data);
// 		},
// 		dataType: "json"
// 	});
// };

var appData = {
	appServerURL: 'http://dev.io.spotcues.com/'
};

var ajaxProcessor = function(reqURL, requestData) {
	return $.ajax({
		type: "POST",
		url: appData.appServerURL+reqURL,
		data: JSON.stringify(requestData),
		contentType: 'application/json',
		success: function(data) {
			
		},
		error: function(data) {
			
		},
		dataType: "json"
	});
};

var createAd = function(optiops){
	var requestData = {
		  "_channel": "5696217782c54c4f4aef0cfd",
		  "text": "",
		  "type": "SPONSORED",
		  "subtitle": "The heading - 23 Centurian Avalanche c4 For sale",
		  "content": "The actual description goes here",
		  "_user":"55d70421ad97c4bb2f8d09df",
			"user":"MarketPlaceUser",
		  "attachments": [
		    {
		      "type": "image",
		      "width": 120,
		      "height": 80,
		      "url": "http://www.trainstation.net.au/wp-content/uploads/2014/09/events.jpg"
		    },
		    {
		      "type": "image",
		      "width": 110,
		      "height": 90,
		      "url": "http://www.grey-hare.co.uk/wp-content/uploads/2012/09/Event-management.png"
		    }
		  ],
		  "sponsoredData": {
		    "appId": "5696215c82c54c4f4aef0cfc",
		    "appIcon": "https://d16a35lzjcij1x.cloudfront.net/poll-icon1449647958559.png",
		    "appUrl": "/spotcues/apps/marketplace",
		    "appName": "MarketPlace",
		    "actions": [],
		    "customData": {
		      "title": optiops.title ? optiops.title: '',
		      "price": optiops.price ? optiops.price: '',
		      "currencySymbol": optiops.currencySymbol ? optiops.currencySymbol: '' ,
		      "description": optiops.description ? optiops.description: '',
		      "email": optiops.email ? optiops.email: '',
		      "phone": optiops.phone ? optiops.phone: ''
		    }
		  }
	};

	var reqURL = 'apps/feed';

	return ajaxProcessor(reqURL, requestData);

};

var getAdList = function(){
	var reqURL = 'post/create';
	var requestData = {
	  "_app": "5696215c82c54c4f4aef0cfc",
	  "_user": "55d70421ad97c4bb2f8d09df",
	  "_channel": "5696217782c54c4f4aef0cfd"
	};

	return ajaxProcessor(reqURL, requestData);
};

var getAllCommentList = function(){
	var reqURL = 'apps/feed';
	var requestData = {
	  "_app": "5696215c82c54c4f4aef0cfc",
	  "_user": "55d70421ad97c4bb2f8d09df",
	  "_channel": "5696217782c54c4f4aef0cfd"
	};

	return ajaxProcessor(reqURL, requestData);
};



module.exports = {
	ajaxProcessor: ajaxProcessor,
	createAd: createAd,
	getAdList: getAdList,
	getAllCommentList: getAllCommentList
};