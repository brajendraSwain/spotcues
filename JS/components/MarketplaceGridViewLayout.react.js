var React = require('react'),
	MarketplaceGridRow = require('./MarketplaceGridRow.react');

module.exports = React.createClass({
	itemClickHandle: function(data){
		this.props.setInAppState({
			keyArr: ['itemDetailData'],
			value: data
		});
		globalStore.pageNavStack.push(globalStore.pageNameObj.itemDetail);
		this.props.setPageName(globalStore.pageNavStack[globalStore.pageNavStack.length-1]);
	},
	render: function() {
		var self = this,
			marketViewElems,
			itemList = self.props.appState.addList;

		marketViewElems = itemList.map(function(data, index){
			return (<MarketplaceGridRow key={index} onClickFun={self.itemClickHandle.bind(self, data)} item={data}/>);
		});
		return (<div className="market-grid">{marketViewElems}</div>);
	}
});