var React = require('react'),
	AjaxManager = require('./../Utils/AjaxManager');

module.exports = React.createClass({
	getInitialState:function(){
		return {commentText:""}
	},
	addComment:function(e){
		e.stopPropagation(); e.preventDefault();
		var self = this;
		if(this.state.commentText.length<=0) return;
		// App.refs.endorsementDetails.addComment();
		var createCommentOptions = {
			text: this.state.commentText,
			user: this.props.item.user,
			advId: this.props.item._id
		};
		AjaxManager.createComment(createCommentOptions).then(function (data) {
			console.log('added data.......  ', JSON.stringify(data));
			if(data.success){
				//get the updated list of ad..
				$.when(AjaxManager.getAdList(), AjaxManager.getCommentList({advId: self.props.item._id})).then(function (addList, commentList) { 
					if(addList[0].success && commentList[0].success){
						self.props.setInAppState({
							keyArr: ['addList'],
							value: addList[0].result
						});
						var itemDetailData = self.props.appState['itemDetailData'];
						itemDetailData._comments = commentList[0].result;
						itemDetailData.comments = commentList[0].result.length;
						self.props.setInAppState({
							keyArr: ['itemDetailData'],
							value: itemDetailData
						});
						self.setState({commentText:""});
						self.props.refreshApp();
					}
				});
			}
		});
	},

	setCommentText:function(){
		var commentText = $(event.target).val()
		this.setState({"commentText": commentText});
	},
	render:function(){
		return(<div className="comment-composer market-place">
					<div className="controlbox"><textarea className="text" onChange={this.setCommentText} value={this.state.commentText}></textarea></div>
					<button className="comment-Button" onTouchStart={this.addComment} onClick={this.addComment}>Send</button>
				</div>);
	}
});