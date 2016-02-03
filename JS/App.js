
var MarketplaceGridRow = React.createClass({
	render: function() {
		return (
			<div className="market-grid-row" onClick = {this.props.onClickFun}>
				<div className="left-section img-placeholder"></div>
				<div className="right-section">
					<div className="description">{'description'}</div>
					<div className="price">{'price'}</div>
				</div>
				<div className="bottom-section">
					<div className="posed-by">{'posed-by'}</div>
					<span className="posed-time-ago">{'posed-time-ago'}</span>
				</div>
			</div>
		);
	}
});

var PageHead = React.createClass({
	leftBtnHandle: function(){
		if(this.props.leftBtnHandleFun){
			this.props.leftBtnHandleFun();
		}
	},
	render: function() {
		return (
			<header className="page-head">
				<div className="nav-left" onClick = {this.leftBtnHandle}>{this.props.leftBtn}</div>
				<h4 className='title'>{'Marketplace'}</h4>
				<div className="nav-right">{'rightButtonsArray'}</div>
			</header>
		);
	}
});

var MarketplaceGridViewLayout = React.createClass({
	itemClickHandle: function(){
		this.props.setPageNo(2);//hard_coded
	},
	render: function() {
		var self = this;
		var dd = [1,2,3];

		var marketViewElems = dd.map(function(data, index){
			return (<MarketplaceGridRow key={index} onClickFun={self.itemClickHandle}/>);
		});
		return (<div className="market-grid">{marketViewElems}</div>);
	}
});

var ImageRow = React.createClass({
  render: function() {
  	var imageArr = [1,2,3,4,5];
  	var imageElems = imageArr.map(function(imgData, index){
  		return (<div className="image-div img-placeholder" key={index}>{imgData}</div>);
  	});
    return (
    	<div className="image-section swipe-wrap">
    		<div className="image-scroll">{imageElems}</div>
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
		window.evv = ev;
		this.setState({inputVal: ev.target.val});
	},
	render: function() {
		return (
			<input className="spotcues-input" type="text" value={this.state.inputVal} onChange={this.onChangeHandle}/>
			);
	}
});


var MarketplaceDetailedViewLayout = React.createClass({
  render: function() {
    return (
    	<div className="market-grid detailed-view">
    		<div className="title-section">{"title-section"}</div>
    		<div className="price-section">{"price-section"}</div>
    		<div className="desc-1-section">{"desc-1-section"}</div>
    		<div className="desc-2-section">{"desc-2-section"}</div>
    		<div className="desc-3-section">{"desc-3-section"}</div>
    		<ImageRow/>
    		<div className="posted-by-section">{"posted-by-section"}</div>
    		<div className="reply-section">{"reply-section"}</div>
    		<div className="send-reply">
    			<SpotcuesInput />
    			<div className="btn send-btn">Send</div>
    		</div>
    	</div>
    	);
  }
});




var AppContainer = React.createClass({
	getInitialState: function(){
		return {
			pageNo: 1
		};
	},
	setPageNo: function(newPageNo){
		this.setState({pageNo: newPageNo});
	},

	closeBtnHandle: function(){

	},

	backButtonHandle: function(){
		this.setPageNo(this.state.pageNo-1);
	},

	selectedPage: function(pageNo){
		if(pageNo === 1){
			return (
				<section className="page-box">
					<PageHead leftBtn={'Close'} leftBtnHandleFun = {this.closeBtnHandle}/>
					<div className="page-content">
						<MarketplaceGridViewLayout setPageNo = {this.setPageNo}/>
					</div>
				</section>
				);
		}

		if(pageNo === 2){
			return (
				<section className="page-box">
					<PageHead leftBtn={'Back'} leftBtnHandleFun = {this.backButtonHandle}/>
					<div className="page-content">
						<MarketplaceDetailedViewLayout/>
					</div>
				</section>
				);
		}

	},
	render: function() {
		var self = this;
		return (
			<div className="vl main-container swipe-wrap">
				{this.selectedPage(self.state.pageNo)}	
			 </div>
			);
		}
});

ReactDOM.render(
	<AppContainer/>,
	document.getElementById('container')
);