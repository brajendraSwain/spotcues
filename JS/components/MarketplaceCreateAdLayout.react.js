var React = require('react');
var SpotcuesTextArea = require('./SpotcuesTextArea.react');
var CurrencyDropDown = require('./CurrencyDropDown.react');
var SpotcuesInput = require('./SpotcuesInput.react');
var ImageRow = require('./ImageRow.react');

module.exports = React.createClass({
    
    getInitialState:function(){
    	return { titleLength: 0 }
    },
    setTitleLength: function(newTitleLength){
    	this.setState({titleLength: newTitleLength});
    },
    render: function() {
        return (
        	<div className="createAd-view">
        		<div className="title">
        			<span className="text">Title</span>
        			<span className="words-left">{this.state.titleLength ? (150 - this.state.titleLength) +" Left" : "Max 150 Characters"}</span>
        		</div>
        		<SpotcuesTextArea className="itemTitleInput" placeHolder ={"Write an interesting heading"} setTitleLength={this.setTitleLength}/>
        		<div className="title">
        			<span className="price">Price</span>
        		</div>
        		<CurrencyDropDown/>
        		<div className="title">
        			<span className="description">Description</span>
        		</div>
        		<SpotcuesTextArea className="descriptionInput" placeHolder ={"Write all the details"}/>
        		<div className="email">
        			<span>Email</span>
        			<SpotcuesInput className="email"/>
        		</div>
        		
        		<div className="phone">
        			<span className="phone">Phone</span>
        			<SpotcuesInput className="phone"/>
        		</div>
        		<ImageRow isAddMore={true}/>

        	</div>
        	);
        }
});