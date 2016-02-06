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
	MarketplaceReplyPageLayout = require('./MarketplaceReplyPageLayout.react');


module.exports = React.createClass({
	getInitialState: function(){
		return {
			pageName: globalStore.pageNameObj.home,
			replyPage: {
				user: '',
				comment : {}
			}
		};
	},
	setPageName: function(newPageName){
		this.setState({pageName: newPageName});
	},

	setReplyPageData: function(userName, comment){
		this.setState({replyPage: {
				user: userName,
				comment : comment
			}});
	},

	closeBtnHandle: function(){

	},

	userBtnHandle: function(){
		globalStore.pageNavStack.push(globalStore.pageNameObj.userProfile);
		this.setPageName(globalStore.pageNavStack[globalStore.pageNavStack.length-1]);
	},

	backButtonHandle: function(){
		globalStore.pageNavStack.pop();
		this.setPageName(globalStore.pageNavStack[globalStore.pageNavStack.length-1]);
	},

	selectedPage: function(pageName){
		if(pageName === globalStore.pageNameObj.home){
			return (
				<section className="page-box">
					<PageHead leftBtn={'Close'} leftBtnHandleFn = {this.closeBtnHandle} 
					rightBtnHandleFn={this.userBtnHandle} rightBtnClass={'user-icon'} pageTitle={'Marketplace'}/>
					<div className="page-content">
						<MarketplaceGridViewLayout setPageName = {this.setPageName}/>
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
						setReplyPageData = {this.setReplyPageData}/>
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
					rightBtnHandleFn={''} rightBtnName={'Publish'}/>
					<div className="page-content">
						<MarketplaceCreateAdLayout setPageName = {this.setPageName}/>
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
			 </div>
			);
		}
});