var React = require('react'),
	MarketplaceGridRow = require('./MarketplaceGridRow.react'),
	PageHead = require('./PageHead.react'),
	MarketplaceGridViewLayout = require('./MarketplaceGridViewLayout.react'),
	ImageRow = require('./ImageRow.react'),
	SpotcuesTextArea = require('./SpotcuesTextArea.react'),
	CommentComposer = require('./CommentComposer.react'),
	MarketplaceDetailedViewLayout = require('./MarketplaceDetailedViewLayout.react'),
	MarketplaceProfileViewLayout = require('./MarketplaceProfileViewLayout.react'),
	SpotcuesInput = require('./SpotcuesInput.react'),
	CurrencyDropDown = require('./CurrencyDropDown.react'),
	MarketplaceCreateAdLayout = require('./MarketplaceCreateAdLayout.react'),
	MarketplaceReplyPageLayout = require('./MarketplaceReplyPageLayout.react'),
	AjaxManager = require('./../Utils/AjaxManager');


module.exports = React.createClass({
	getInitialState: function(){
		return {
			pageName: globalStore.pageNameObj.home,
			replyPage: {
				user: '',
				comment : {}
			},
			publishButtonState: false,
			appState: this.props.appState
		};
	},
	setPageName: function(newPageName){
		this.setState({pageName: newPageName});
	},

	getFromAppState: function(){
		if(arguments.length === 1){
			return this.state.appState[arguments[0]];
		}

		if(arguments.length === 2){
			return this.state.appState[arguments[0]][arguments[1]];
		}

		if(arguments.length === 3){
			return this.state.appState[arguments[0]][arguments[1]][arguments[2]];
		}
	},

	setInAppState: function(options){
		if(options.keyArr.length === 1){
			this.state.appState[options.keyArr[0]] = options.value;
		}else if(options.keyArr.length === 2){
			this.state.appState[options.keyArr[0]][options.keyArr[1]] = options.value;
		}else if(options.keyArr.length === 3){
			this.state.appState[options.keyArr[0]][options.keyArr[1]][options.keyArr[2]] = options.value;
		}else{
			console.error('key level only till 3 allowed!!');
			return false;
		}
	},
	refreshApp: function(){
		this.setState({});
	},

	setReplyPageData: function(userName, comment){
		this.setState({replyPage: {
				user: userName,
				comment : comment
			}});
	},
	changePublishState: function(newState){
		this.setState({publishButtonState: newState});
	},

	closeBtnHandle: function(){

	},
	onLoadHandle: function(){
		console.log(this);
		window.elem  = event;
	},

	publishClickHandle: function(){
		// debugger;
		var self = this,
			currentTime = new Date(),
			createAdOptions = {
			  "title": document.querySelector('.createAd-view .itemTitleInput').value,
			  "price": document.querySelector('.createAd-view .price-selected').value,
			  "currencySymbol": document.querySelector('.createAd-view .currency-sign').innerText,
			  "description": document.querySelector('.createAd-view .descriptionInput').value,
			  "email": document.querySelector('.createAd-view input.email').value,
			  "phone": document.querySelector('.createAd-view input.phone').value,
			  "createdAt": currentTime.toString()
			};
		console.log('createAdOptions....', createAdOptions);
		AjaxManager.createAd(createAdOptions).then(function (data) {
			console.log('create data.......  ', JSON.stringify(data));
			if(data.success){
				//get the updated list of ad..
				AjaxManager.getAdList().then(function (addList) { 
					if(addList.success){
						self.setInAppState({
							keyArr: ['addList'],
							value: addList.result
						});
						globalStore.pageNavStack.push(globalStore.pageNameObj.home);
						self.setPageName(globalStore.pageNavStack[globalStore.pageNavStack.length-1]);
					}
				});
			}
		});
	},

	userBtnHandle: function(){
		globalStore.pageNavStack.push(globalStore.pageNameObj.userProfile);
		this.setPageName(globalStore.pageNavStack[globalStore.pageNavStack.length-1]);
	},

	backButtonHandle: function(){
		globalStore.pageNavStack.pop();
		this.setPageName(globalStore.pageNavStack[globalStore.pageNavStack.length-1]);
	},

	componentDidMount: function() {
	    this.refs.iframe.getDOMNode().addEventListener('load', this.onLoadHandle);
	},

	selectedPage: function(pageName){
		if(pageName === globalStore.pageNameObj.home){
			return (
				<section className="page-box">
					<PageHead leftBtn={'Close'} leftBtnHandleFn = {this.closeBtnHandle} 
					rightBtnHandleFn={this.userBtnHandle} rightBtnClass={'user-icon'} pageTitle={'Marketplace'}/>
					<div className="page-content">
						<MarketplaceGridViewLayout setPageName = {this.setPageName} appState={this.state.appState}
						setInAppState={this.setInAppState} getFromAppState={this.getFromAppState} refreshApp={this.refreshApp}/>
					</div>
				</section>
				);
		}

		if(pageName === globalStore.pageNameObj.itemDetail){
			return (
				<section className="page-box">
					<PageHead leftBtn={'Back'} leftBtnHandleFn = {this.backButtonHandle} 
					rightBtnHandleFn={this.userBtnHandle} rightBtnClass={'user-icon'} pageTitle={'Marketplace'}/>
					<div className="page-content">
						<MarketplaceDetailedViewLayout setPageName = {this.setPageName} 
						setReplyPageData = {this.setReplyPageData} appState={this.state.appState}
						setInAppState={this.setInAppState} getFromAppState={this.getFromAppState} refreshApp={this.refreshApp}/>
					</div>
				</section>
				);
		}

		if(pageName === globalStore.pageNameObj.userProfile){
			return (
				<section className="page-box">
					<PageHead leftBtn={'Back'} leftBtnHandleFn = {this.backButtonHandle} pageTitle={'My Ads'}/>
					<div className="page-content">
						<MarketplaceProfileViewLayout setPageName = {this.setPageName}/>
					</div>
				</section>
				);
		}

		if(pageName === globalStore.pageNameObj.createAd){
			return (
				<section className="page-box">
					<PageHead leftBtn={'Back'} leftBtnHandleFn = {this.backButtonHandle} pageTitle={'Create Ad'}
					rightBtnHandleFn={this.publishClickHandle} rightBtnName={'Publish'} 
					rightBtnClass={'publish '+this.state.publishButtonState ? 'active': 'inactive'} />
					<div className="page-content">
						<MarketplaceCreateAdLayout setPageName = {this.setPageName} changePublishState={this.changePublishState} 
						publishButtonState = {this.state.publishButtonState} />
					</div>
				</section>
				);
		}

		if(pageName === globalStore.pageNameObj.replyPage){
			return (
				<section className="page-box">
					<PageHead leftBtn={'Back'} leftBtnHandleFn = {this.backButtonHandle} 
					pageTitle={'Reply '+ this.state.replyPage.user}/>
					<div className="page-content">
						<MarketplaceReplyPageLayout setPageName = {this.setPageName} replyData={this.state.replyPage.comment}/>
					</div>
				</section>
				);
		}

	},
	render: function() {
		var self = this;
		return (
			<div className="vl main-container swipe-wrap">
				{self.selectedPage(self.state.pageName)}
				<iframe name='iframe_name' id="myIframe" ref='iframe' ></iframe>	
			 </div>
			);
		}
});