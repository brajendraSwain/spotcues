
var globalStore = {
	pageNavStack: ['home'],
	pageNameObj: {
		home: 'home',
		itemDetail: 'detaled-page',
		userProfile: 'profile',
		createAd: 'create-add',
		replyPage: 'comment-reply'
	}
};


var MarketplaceGridRow = React.createClass({
	render: function() {
		return (
			<div className="market-grid-row" onClick = {this.props.onClickFun}>
				<div className="left-section img-placeholder"></div>
				<div className="right-section">
					<div className="description">{this.props.item.title}</div>
					<div className="price-section">
		    			<div className="tag-icon"></div>
		    			<span>${this.props.item.price}</span>
		    		</div>
				</div>
				<div className="bottom-section">
					<div className="posted-by-section">
		    			<div className="text-section">
		    				<p>
		    					<span className="posted">Posted by</span>
		    					<span className="user">{this.props.item.user}</span>
		    				</p>
		    			</div>
		    		</div>
					<span className="posed-time-ago">{this.props.item.posedBefore}</span>
				</div>
			</div>
		);
	}
});

var PageHead = React.createClass({
	leftBtnHandle: function(){
		if(this.props.leftBtnHandleFn){
			this.props.leftBtnHandleFn();
		}
	},
	rightBtnHandle: function(){
		if(this.props.rightBtnHandleFn){
			this.props.rightBtnHandleFn();
		}
	},
	render: function() {
		return (
			<header className="page-head">
				<div className="nav-left" onClick = {this.leftBtnHandle}>{this.props.leftBtn}</div>
				<h4 className='title'>{this.props.pageTitle ? this.props.pageTitle : ''}</h4>
				<div className={"nav-right "+this.props.rightBtnClass} onClick = {this.rightBtnHandle}>{this.props.rightBtnName ? this.props.rightBtnName :''}</div>
			</header>
		);
	}
});

var MarketplaceGridViewLayout = React.createClass({
	itemClickHandle: function(){
		globalStore.pageNavStack.push(globalStore.pageNameObj.itemDetail);
		this.props.setPageName(globalStore.pageNavStack[globalStore.pageNavStack.length-1]);
	},
	render: function() {
		var self = this;
		var itemList = [
				{
					title: '2003 centurion avenue',
					price: '6000',
					user: 'Oliver',
					posedBefore: '5 mins'
				},
				{
					title: '2003 centurion avenue',
					price: '6000',
					user: 'Oliver',
					posedBefore: '5 mins'
				},
				{
					title: '2003 centurion avenue',
					price: '6000',
					user: 'Oliver',
					posedBefore: '5 mins'
				},
				{
					title: '2003 centurion avenue',
					price: '6000',
					user: 'Oliver',
					posedBefore: '5 mins'
				}
			];

		var marketViewElems = itemList.map(function(data, index){
			return (<MarketplaceGridRow key={index} onClickFun={self.itemClickHandle} item={data}/>);
		});
		return (<div className="market-grid">{marketViewElems}</div>);
	}
});

var ImageRow = React.createClass({
  render: function() {
  	var imageArr = [1,2,3,4,5];
  	var imageElems = imageArr.map(function(imgData, index){
  		return (
  			<div className="image-div" key={index}>
  				<div className="img-placeholder"></div>
  			</div>
  			);
  	});
    return (
    	<div className="image-section swipe-wrap">
    		<div className="image-scroll ">{imageElems}</div>
    		{this.props.isAddMore ? <div className="addMore"></div>: ''}
    	</div>
    	);
  }
});

var SpotcuesTextArea = React.createClass({
	getInitialState: function(){
		return {
			inputVal: ''
		};
	},
	onChangeHandle: function(ev){
		this.setState({inputVal: ev.target.val});
	},
	render: function() {
		var dynamicCls =  this.props.className ? this.props.className : "";
		return (
			<textarea className={"spotcues-text-area "+ dynamicCls} 
			maxLength="150" type="text" value={this.state.inputVal} onChange={this.onChangeHandle}/>
			);
	}
});


var CommentComposer = React.createClass({
	getInitialState:function(){
		return {commentText:""}
	},
	addComment:function(e){
		e.stopPropagation(); e.preventDefault();
		if(this.state.commentText.length<=0) return;
		// App.refs.endorsementDetails.addComment();
		this.props.addComment();
	},
	setCommentText:function(){
		var commentText = $(event.target).val()
		this.setState({"commentText":commentText});
	},
	render:function(){
		return(<div className="comment-composer market-place">
					<div className="controlbox"><textarea className="text" onChange={this.setCommentText}></textarea></div>
					<button className="comment-Button" onTouchStart={this.addComment} onClick={this.addComment}>Send</button>
				</div>);
	}
});

var MarketplaceDetailedViewLayout = React.createClass({
	getInitialState:function(){
		return {
			commentArr: [
			{text: 'this is nice!!', userName: 'raja', timeBefore: '9 hrs'},
			{text: 'this is amazing!!', userName: 'kumar', timeBefore: '2 hrs', commentArr: [
				{text: 'thanku', userName: 'oliver', timeBefore: '5 mins'},
				{text: 'thanku :)', userName: 'Thea', timeBefore: '5 mins'}
				]}
			]
		}
	},
	handleReplyClick: function(user, cmt){
		globalStore.pageNavStack.push(globalStore.pageNameObj.replyPage);
		this.props.setPageName(globalStore.pageNavStack[globalStore.pageNavStack.length-1]);
		this.props.setReplyPageData(user, cmt);
	},
  render: function() {
  	var self = this;
  	var commentElems = this.state.commentArr.map(function(cmt, index){
  		var childComments, dynamicCls;
  		if(cmt.commentArr){
  			childComments = cmt.commentArr.map(function(childCmt, chIndex){
  				return (<div className={"child-reply-row "}>
				  			<div className="replyText">{childCmt.text}</div>
				  			<span className="user">{childCmt.userName}</span> <div className="dot"></div>
				  			<span className="time-before">{childCmt.timeBefore}</span>
				  		</div>);
  			});
  		}
  		dynamicCls = index === 0 ? 'first': '';
  		return (<div className={"reply-row "+dynamicCls}>
		  			<div className="replyText">{cmt.text}</div>
		  			<span className="user">{cmt.userName}</span> <div className="dot"></div>
		  			<span className="time-before">{cmt.timeBefore}</span> <div className="dot"></div>
		  			<span className="reply-text-btn" onClick={self.handleReplyClick.bind(self, cmt.userName, cmt)}>{"Reply"}</span>
		  			<div className="border-div"></div>
		  			{childComments}
		  		</div>);
  	});
    return (
    	<div className="market-grid detailed-view">
    		<div className="title-section">{"Moving-Sale - All Bedroom Furniture Must Go"}</div>
    		<div className="price-section">
    			<div className="tag-icon"></div>
    			<span>$20 - $540</span>
    		</div>
    		<div className="desc-1-section">{"Moving January1st. Selling all bedroom furniture in photos."}</div>
    		<div className="desc-2-section">
    			<p>Wardrobe - $100 (reduced)</p>
    			<p>Bookcase - $80</p>
    			<p>(2) Table lamps - $100 per pairs</p>
    			<p>Wardrobe - $100 (reduced)</p>
    			<p>Wardrobe - $100 (reduced)</p>
    		</div>
    		<div className="desc-3-section">
    			<p>Happy to send more pictures or details upon request. Everything must go. Make me an offer!!</p> 
    		</div>
    		<ImageRow/>
    		<div className="posted-by-section">
    			<div className="text-section">
    				<p>
    					<span className="posted">Posted by</span>
    					<span className="user">User</span>
    				</p>
    				<p><span className="time">10 hrs</span></p>
    			</div>
    			<div className="button-section">
    				<div className="mail-icon"></div>
    				<div className="phone-icon"></div>
    			</div>
    		</div>
    		<div className="reply-section">
    			<span className="replyWord">REPLIES</span>
    			{commentElems}
    		</div>
    		<CommentComposer />
    	</div>
    	);
  }
});

var MarketplaceProfileViewLayout = React.createClass({
	createAdClickHandle: function () {
		globalStore.pageNavStack.push(globalStore.pageNameObj.createAd);
		this.props.setPageName(globalStore.pageNavStack[globalStore.pageNavStack.length-1]);
	},
	render: function() {
		return (
			<div className="profile-view">
				<div className="no-ad-icon"></div>
				<div className="btn create-btn" onClick={this.createAdClickHandle}>CREATE AD</div>
			</div>
			);
	}
});

var SpotcuesInput = React.createClass({
	getInitialState: function(){
		return {
			inputVal: ''
		};
	},
	onChangeHandle: function(ev){
		this.setState({inputVal: ev.target.val});
	},
	render: function() {
		var dynamicCls =  this.props.className ? this.props.className : "";
		return (
			<input className={"spotcues-input "+ dynamicCls} 
			maxLength="150" type="text" value={this.state.inputVal} onChange={this.onChangeHandle}/>
			);
	}
});

var PriceDropDown = React.createClass({
	getInitialState:function(){
		return {isOpen:false, activeIndex: 0 }
	},
	rowClickHandle: function (index) {
		this.setState({activeIndex: index});
	},
	closeDropDown: function(){
		this.setState({isOpen: false});
	},
	openDropDown: function(){
		this.setState({isOpen: true});
	},
	doneClickHandle: function(){
		this.closeDropDown();
	},
	render:function(){
		var self= this,
			currencyArr = ['USD', 'EUR', 'GBP', 'INR' ];
		var dropdownRows = currencyArr.map(function(currency, index){
			var dynamicCls = index === self.state.activeIndex ? 'active' : '';
			return (<div className={'dropdown-row '+dynamicCls} onClick={self.rowClickHandle.bind(self, index)}>{currency}</div>);
		});
		return(
			<div className="price-dropdown-wrapper">
				<span className="dollar-sign">$</span>
				<span className="arrow-down" onClick={this.openDropDown}>&#x25BC;</span>
				<SpotcuesInput className="price-selected"/>
				{this.state.isOpen ?
				<div>
				 <div className="blur-background" onClick={this.closeDropDown}></div>
				 <div className="dropdown">
				 	<div className="dropdown-btns">
				 		<span className="dropdown-close" onClick={this.closeDropDown}>Close</span>
				 		<span className="dropdown-title">Select Currency</span>
				 		<span className="dropdown-done" onClick={this.doneClickHandle}>Done</span>
				 	</div>
				 	{dropdownRows}
				 </div>
				</div>
				 : ''}
			</div>
			);
	}
});

var MarketplaceCreateAdLayout = React.createClass({
  render: function() {
    return (
    	<div className="createAd-view">
    		<div className="title">
    			<span className="text">Title</span>
    			<span className="words-left">30 left</span>
    		</div>
			<SpotcuesTextArea className="itemTitleInput"/>
			<div className="title">
    			<span className="price">Price</span>
    		</div>
    		<PriceDropDown/>
    		<div className="title">
    			<span className="description">Description</span>
    		</div>
    		<SpotcuesTextArea className="descriptionInput"/>
    		<div className="email">
    			<span>Email</span>
    			<SpotcuesInput className="email"/>
    		</div>
    		
    		<div className="phone">
    			<span className="phone">Phone</span>
    			<SpotcuesInput className="phone"/>
    		</div>
    		<ImageRow isAddMore={true}/>

    	</div>
    	);
  }
});

var MarketplaceReplyPageLayout = React.createClass({
  render: function() {	
	var self = this,
		cmt = self.props.replyData,
		childComments;
	if(cmt.commentArr){
  			childComments = cmt.commentArr.map(function(childCmt, chIndex){
  				var dynamicCls = chIndex === 0 ? 'first': '';
  				return (<div className={"child-reply-row "+ dynamicCls}>
				  			<div className="replyText">{childCmt.text}</div>
				  			<span className="user">{childCmt.userName}</span> <div className="dot"></div>
				  			<span className="time-before">{childCmt.timeBefore}</span>
				  		</div>);
  			});
  		}

    return (
    	<div className="reply-view">
	    	<div className="reply-row">
	  			<div className="replyText">{cmt.text}</div>
	  			<span className="user">{cmt.userName}</span> <div className="dot"></div>
	  			<span className="time-before">{cmt.timeBefore}</span>
	  			<div className="border-div"></div>
	  			{childComments}
	  		</div>
	  		<CommentComposer />
	  	</div>
    	);
  }
});




var AppContainer = React.createClass({
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
				{this.selectedPage(self.state.pageName)}	
			 </div>
			);
		}
});

ReactDOM.render(
	<AppContainer/>,
	document.getElementById('container')
);