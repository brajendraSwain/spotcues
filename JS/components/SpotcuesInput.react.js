var React = require('react');
module.exports = React.createClass({
	getInitialState: function(){
		return {
			inputVal: '',
			isValidated: true,
			errorMsg: ''
		};
	},
	onChangeHandle: function(ev){
		this.setState({inputVal: ev.target.value, isValidated: true});
	},
	onBlurHandle: function(ev){
		var value = ev.target.value;
		if(this.props.isRequired && !this.testRequired(value)){
			this.showError('Field can not be empty !!');
			return false;
		}

		if(this.props.isEmail && !this.testEmail(value)){
			this.showError('Not a valid email !!');
			return false;
		}

		if(this.props.isNumeric && !this.testNumber(value)){
			this.showError('Only Number allowed !!');
			return false;
		}

		if(this.props.isSpecialCharValidation && !this.testValidChar(value)){
			this.showError('Invalid character entered !!');
			return false;
		}
	},
	showError: function(msg){
		this.setState({
			isValidated: false,
			errorMsg: msg
		});
	},
	testValidChar: function(val){
		var re = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g;
		return re.test(val);
	},
	testNumber: function(val){
		var re = /^\d+$/;
		return re.test(val);
	},
	testRequired: function(val){
		return val.length ? true: false;
	},
	testEmail: function(email){
		var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	},
	render: function() {
		var dynamicCls =  this.props.className ? this.props.className : "";
		return (
			<div className="spotcues-input-wrapper-div">
				<input onBlur={this.onBlurHandle} className={"spotcues-input "+ dynamicCls} 
				maxLength="150" type="text" value={this.state.inputVal} onChange={this.onChangeHandle}/>
				<span className="input-errors">{this.state.isValidated ? '' : this.state.errorMsg}</span>
			</div>
			);
	}
});