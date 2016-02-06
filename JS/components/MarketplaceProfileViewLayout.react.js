var React = require('react');
module.exports = React.createClass({
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