var React = require('react');
var CommentComposer = require('./CommentComposer.react');

module.exports = React.createClass({
  calculateTimeBefore: function(createdTime){
    var timeUnit = 1000; // hours*minutes*seconds*milliseconds
    var currentTime = new Date();
    var postedTime = new Date(createdTime)
    var diffSecs = Math.round(Math.abs((currentTime.getTime() - postedTime.getTime())/(timeUnit)));
    
    var posteTimeBefore;

    if(diffSecs < 60){ // mins
      posteTimeBefore = (diffSecs).toFixed(0) + ' secs'; 
    }else if(diffSecs < 60*60){ //hrs
      posteTimeBefore = (diffSecs/60).toFixed(0) + ' mins'; 
    }else if(diffSecs < 60*60*24){ //day
      posteTimeBefore = (diffSecs/(60*60)).toFixed(0) + ' hrs';
    }else{
      posteTimeBefore = (diffSecs/(60*60*24)).toFixed(0) + ' days';
    }
    return posteTimeBefore;
  },
  render: function() {	
	var self = this,
		cmt = self.props.replyData,
		childComments;
	if(cmt.comments){
  			childComments = cmt._comments.map(function(childCmt, chIndex){
  				var childCommentedBefore = self.calculateTimeBefore(childCmt.createdAt);
  				var dynamicCls = chIndex === 0 ? 'first': '';
  				return (<div className={"child-reply-row "+ dynamicCls}>
				  			<div className="replyText">{childCmt.text}</div>
				  			<span className="user">{childCmt.user}</span> <div className="dot"></div>
				  			<span className="time-before">{childCommentedBefore}</span>
				  		</div>);
  			});
  		}
  	var commentedBefore = self.calculateTimeBefore(cmt.createdAt);
    return (
    	<div className="reply-view">
	    	<div className="reply-row">
	  			<div className="replyText">{cmt.text}</div>
	  			<span className="user">{cmt.user}</span> <div className="dot"></div>
	  			<span className="time-before">{commentedBefore}</span>
	  			<div className="border-div"></div>
	  			{childComments}
	  		</div>
	  		<CommentComposer />
	  	</div>
    	);
  }
});