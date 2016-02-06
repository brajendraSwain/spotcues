var React = require('react');

module.exports = React.createClass({
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