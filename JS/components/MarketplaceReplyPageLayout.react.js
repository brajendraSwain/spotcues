var React = require('react');
var CommentComposer = require('./CommentComposer.react');

module.exports = React.createClass({
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