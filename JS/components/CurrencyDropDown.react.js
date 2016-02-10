var React = require('react'),
	SpotcuesInput = require('./SpotcuesInput.react'),
	CommonData = require('./../DataStore/CommonData.js');

module.exports = React.createClass({
	getInitialState:function(){
		return { 
			isOpen:false, 
			activeIndex: 0, 
			activeCurrencyCode: 'USD', 
			tempActiveCode: 'USD', 
			tempActiveIndex: 0 
		};
	},
	rowClickHandle: function (index, code) {
		console.log("index, code", index, code);
		this.setState({
			tempActiveIndex: index,
			tempActiveCode: code
		});
	},
	closeDropDown: function(){
		this.setState({
			tempActiveIndex: this.state.activeIndex,
			tempActiveCode: this.state.activeCurrencyCode
		});
		this.setState({isOpen: false});
	},
	openDropDown: function(){
		this.setState({isOpen: true});
	},
	doneClickHandle: function(){
		this.setState({
			activeIndex: this.state.tempActiveIndex,
			activeCurrencyCode: this.state.tempActiveCode
		});
		this.setState({isOpen: false});
	},
	render:function(){
		var self= this,
			currencyObj = CommonData.currencyData,
			dropdownRows = Object.keys(currencyObj).map(function(key, index){
			var dynamicCls = index === self.state.tempActiveIndex ? 'active' : '';
				return (
					<div className={'dropdown-row '+dynamicCls} onClick={self.rowClickHandle.bind(self, index, key)}>
						<div className="currency-code">{currencyObj[key].code}</div>
						<div className="currency-name">{currencyObj[key].name}</div>
					</div>
					);
			});

		return(
			<div className="price-dropdown-wrapper">
				<span className="currency-sign">{currencyObj[self.state.activeCurrencyCode].symbol}</span>
				<span className="arrow-down" onClick={this.openDropDown}>&#x25BC;</span>
				<SpotcuesInput className="price-selected" publishButtonState = {this.props.publishButtonState} changePublishState={this.props.changePublishState} isRequired={true} isNumeric={true}/>
				{this.state.isOpen ?
				<div>
				 <div className="blur-background" onClick={this.closeDropDown}></div>
				 <div className="dropdown">
				 	<div className="dropdown-btns">
				 		<span className="dropdown-close" onClick={this.closeDropDown}>Close</span>
				 		<span className="dropdown-title">Select Currency</span>
				 		<span className="dropdown-done" onClick={this.doneClickHandle}>Done</span>
				 	</div>
				 	{dropdownRows}
				 </div>
				</div>
				 : ''}
			</div>
			);
	}
});