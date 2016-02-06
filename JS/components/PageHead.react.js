var React = require('react');

module.exports = React.createClass({
	leftBtnHandle: function(){
		if(this.props.leftBtnHandleFn){
			this.props.leftBtnHandleFn();
		}
	},
	rightBtnHandle: function(){
		if(this.props.rightBtnHandleFn){
			this.props.rightBtnHandleFn();
		}
	},
	render: function() {
		return (
			<header className="page-head">
				<div className="nav-left" onClick = {this.leftBtnHandle}>{this.props.leftBtn}</div>
				<h4 className='title'>{this.props.pageTitle ? this.props.pageTitle : ''}</h4>
				<div className={"nav-right "+this.props.rightBtnClass} onClick = {this.rightBtnHandle}>{this.props.rightBtnName ? this.props.rightBtnName :''}</div>
			</header>
		);
	}
});