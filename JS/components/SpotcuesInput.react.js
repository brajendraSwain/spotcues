var React = require('react');
module.exports = React.createClass({
	getInitialState: function(){
		return {
			inputVal: ''
		};
	},
	onChangeHandle: function(ev){
		this.setState({inputVal: ev.target.val});
	},
	render: function() {
		var dynamicCls =  this.props.className ? this.props.className : "";
		return (
			<input className={"spotcues-input "+ dynamicCls} 
			maxLength="150" type="text" value={this.state.inputVal} onChange={this.onChangeHandle}/>
			);
	}
});