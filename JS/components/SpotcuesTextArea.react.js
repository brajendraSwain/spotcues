var React = require('react');
module.exports = React.createClass({
	getInitialState: function(){
		return {
			inputVal: ''
		};
	},
	onChangeHandle: function(ev){
		this.setState({inputVal: ev.target.value});
		debugger;
		if(this.props.setTitleLength && ev.target.value !== undefined){
			console.log('ev.target.value.length', ev.target.value.length);
			this.props.setTitleLength(ev.target.value.length);
		}
	},
	render: function() {
		var dynamicCls =  this.props.className ? this.props.className : "";
		return (
			<textarea className={"spotcues-text-area "+ dynamicCls} 
			maxLength="150" type="text" value={this.state.inputVal} onChange={this.onChangeHandle} 
			placeholder={this.props.placeHolder ? this.props.placeHolder: ''}/>
			);
	}
});