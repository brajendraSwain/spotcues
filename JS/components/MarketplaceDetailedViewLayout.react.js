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
    var itemDetailData = this.props.appState['itemDetailData'];
  	var self = this,
        commentElems = itemDetailData._comments.map(function(cmt, index){
        		var childComments, 
                dynamicCls;

        		if(cmt.comments){
        			childComments = cmt._comments.map(function(childCmt, chIndex){
                var childCommentedTimeBefore = self.calculateTimeBefore(childCmt.createdAt);
        				return (<div className={"child-reply-row "}>
      				  			<div className="replyText">{childCmt.text}</div>
      				  			<span className="user">{childCmt.user}</span> <div className="dot"></div>
      				  			<span className="time-before">{childCommentedTimeBefore}</span>
      				  		</div>);
        			});
        		}
        		dynamicCls = index === 0 ? 'first': '';

            var commentedTimeBefore = self.calculateTimeBefore(cmt.createdAt);
        		return (<div className={"reply-row "+dynamicCls}>
      		  			<div className="replyText">{cmt.text}</div>
      		  			<span className="user">{cmt.user}</span> <div className="dot"></div>
      		  			<span className="time-before">{commentedTimeBefore}</span> <div className="dot"></div>
      		  			<span className="reply-text-btn" onClick={self.handleReplyClick.bind(self, cmt.user, cmt)}>{"Reply"}</span>
      		  			<div className="border-div"></div>
      		  			{childComments}
      		  		</div>);
        	});

  var posteTimeBefore = self.calculateTimeBefore(itemDetailData.createdAt);
    

  var currencySymbol = itemDetailData.sponsoredData.customData.currencySymbol ? itemDetailData.sponsoredData.customData.currencySymbol: '';

    return (
    	<div className="market-grid detailed-view">
    		<div className="title-section">{itemDetailData.text}</div>
    		<div className="price-section">
    			<div className="tag-icon"></div>
    			<span>{currencySymbol + ' '+ itemDetailData.sponsoredData.customData.price}</span>
    		</div>
    		<div className="desc-1-section">{itemDetailData.content}</div>
    		<ImageRow/>
    		<div className="posted-by-section">
    			<div className="text-section">
    				<p>
    					<span className="posted">Posted by</span>
    					<span className="user">{itemDetailData.user}</span>
    				</p>
    				<p><span className="time">{posteTimeBefore}</span></p>
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
    		<CommentComposer item = {itemDetailData} setInAppState={this.props.setInAppState} appState={this.props.appState} refreshApp={this.props.refreshApp}/>
    	</div>
    	);
  }
});