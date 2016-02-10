var React = require('react');
var SpotcuesTextArea = require('./SpotcuesTextArea.react');
var CurrencyDropDown = require('./CurrencyDropDown.react');
var SpotcuesInput = require('./SpotcuesInput.react');
var ImageRow = require('./ImageRow.react');
var ImageUploader = require('./ImageUploader.react');

module.exports = React.createClass({
    
    getInitialState:function(){
    	return { titleLength: 0, isImageUploader: false }
    },
    setTitleLength: function(newTitleLength){
    	this.setState({titleLength: newTitleLength});
    },
    setIsImageUploader: function(newValue){
        this.setState({isImageUploader: newValue});
    },
    render: function() {
        var ImageUploaderElem = this.state.isImageUploader ? <ImageUploader setIsImageUploader={this.setIsImageUploader} /> : '';
        return (
        	<div className="createAd-view">
                {ImageUploaderElem}
        		<div className="title">
        			<span className="text">Title</span>
        			<span className="words-left">{this.state.titleLength ? (150 - this.state.titleLength) +" Left" : "Max 150 Characters"}</span>
        		</div>
        		<SpotcuesTextArea className="itemTitleInput" placeHolder ={"Write an interesting heading"} setTitleLength={this.setTitleLength} 
                publishButtonState = {this.props.publishButtonState} changePublishState={this.props.changePublishState}/>
        		<div className="title">
        			<span className="price">Price</span>
        		</div>
        		<CurrencyDropDown publishButtonState = {this.props.publishButtonState} changePublishState={this.props.changePublishState}/>
        		<div className="title">
        			<span className="description">Description</span>
        		</div>
        		<SpotcuesTextArea className="descriptionInput" placeHolder ={"Write all the details"} 
                publishButtonState = {this.props.publishButtonState} changePublishState={this.props.changePublishState} />
        		<div className="email">
        			<span>Email</span>
        			<SpotcuesInput className="email" publishButtonState = {this.props.publishButtonState} changePublishState={this.props.changePublishState}
                    isRequired={true} isEmail={true}/>
        		</div>
        		
        		<div className="phone">
        			<span className="phone">Phone</span>
        			<SpotcuesInput className="phone" publishButtonState = {this.props.publishButtonState} changePublishState={this.props.changePublishState} isRequired={true} isNumeric={true}/>
        		</div>
        		<ImageRow isAddMore={true} setIsImageUploader={this.setIsImageUploader}/>

        	</div>
        	);
        }
});