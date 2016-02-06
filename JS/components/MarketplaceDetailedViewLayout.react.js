var React = require('react');
var ImageRow = require('./ImageRow.react');
var CommentComposer = require('./CommentComposer.react');

module.exports = React.createClass({
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
  	var self = this,
        commentElems = this.state.commentArr.map(function(cmt, index){
        		var childComments, 
                dynamicCls;

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