var React = require('react');

module.exports = React.createClass({
	render: function() {
		// var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
		var timeUnit = 1000; // hours*minutes*seconds*milliseconds
		var currentTime = new Date();
		var postedTime = new Date(this.props.item.createdAt)
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
		var currencySymbol = this.props.item.sponsoredData.customData.currencySymbol ? this.props.item.sponsoredData.customData.currencySymbol : '';
		return (
			<div className="market-grid-row" onClick = {this.props.onClickFun}>
				<div className="left-section img-placeholder">
					{this.props.item.attachments.length ?
						<img src={this.props.item.attachments[0].url} alt="Smiley face" height="100%" width="100%"/>
						: ''}
				</div>
				<div className="right-section">
					<div className="description">{this.props.item.text}</div>
					<div className="price-section">
		    			<div className="tag-icon"></div>
		    			<span>{currencySymbol+'  ' +this.props.item.sponsoredData.customData.price}
		    			</span>
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
					<span className="posed-time-ago">{posteTimeBefore}</span>
				</div>
			</div>
		);
	}
});