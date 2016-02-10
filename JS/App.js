require('./DataStore/GlobalData');


var React = require('react');
var AjaxManager = require('./Utils/AjaxManager');

var MarketPlaceApp = require('./components/MarketPlaceApp.react');

var appState = {
	addList: [],
	itemDetailData: ""
};

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

// $("#form_imgUploadTool").submit();

// $('#form_imgUploadTool').iframePostForm({
// 	json: false,
// 	complete: function(response) {
// 		var imageURL = response.substring(response.lastIndexOf("url':")+7,response.lastIndexOf("'}"));
// 		$("#imgSelection").attr("src", imageURL);
// 		$("#imgSelection").load (function(){
// 		$(".content-holder").hideAjaxLoader();
// 		if(uploadMode == "upload") imageEditor.setDefaultSelection();
// 			console.log("Setting defaukt selection");
// 		})
// 	}
// });



AjaxManager.getAdList().then(function (data) {
	console.log('addList data.......  ',data);
	if(data.success){
		appState.addList = data.result;
	}
	React.render(
	 	<MarketPlaceApp appState={appState}/>,
		document.getElementById('container')
	);
});