var React = require('react');
module.exports = React.createClass({
	
	blurBackgroundClickHandle: function(){
		this.props.setIsImageUploader(false);
	},
	onSubmitClick: function(){
		
	},

	componentDidMount: function(){
		$('#imageForm').submit(function(e){
			e.preventDefault();
		    $.ajax({
		        url:'http://dev.io.spotcues.com/image/v2/upload',
		        type:'post',
		        data:$('#myForm').serialize(),
		        success:function(data){
		            //whatever you wanna do after the form is successfully submitted
		            console.log('');
		        }
		    });
		  });
	},

	componentDidUpdate: function(){
		$('#imageForm').submit(function(e){
			e.preventDefault();
		    $.ajax({
		        url:'http://dev.io.spotcues.com/image/v2/upload',
		        type:'post',
		        data:$('#myForm').serialize(),
		        success:function(data){
		            //whatever you wanna do after the form is successfully submitted
		            console.log('');
		        }
		    });
		  });
	},

	render: function() {
		return (
			<div className="imageUploader">
				<div className="blur-background" onClick={this.blurBackgroundClickHandle}></div>
				<div className="formDiv">
					<form id="imageForm" method="post" action="http://dev.io.spotcues.com/image/v2/upload" enctype="multipart/form-data" target="iframe_name">
			          <input type="file" name="fileField"/>
			          <input type="submit" value="submit"/>
			        </form>
		        </div>
	        </div>
			);
	}
});