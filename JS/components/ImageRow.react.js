var React = require('react');

module.exports = React.createClass({
  render: function() {
  	var imageArr = [1,2,3,4,5],
        imageElems = imageArr.map(function(imgData, index){
        		return (
        			<div className="image-div" key={index}>
        				<div className="img-placeholder"></div>
        			</div>
        			);
        	});
        
    return (
    	<div className="image-section swipe-wrap">
    		<div className="image-scroll ">{imageElems}</div>
    		{this.props.isAddMore ? <div className="addMore">Add More</div>: ''}
    	</div>
    	);
  }
});