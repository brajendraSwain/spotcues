var React = require('react');

module.exports = React.createClass({
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