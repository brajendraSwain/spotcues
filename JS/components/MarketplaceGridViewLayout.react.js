var React = require('react'),
	MarketplaceGridRow = require('./MarketplaceGridRow.react');

module.exports = React.createClass({
	itemClickHandle: function(){
		globalStore.pageNavStack.push(globalStore.pageNameObj.itemDetail);
		this.props.setPageName(globalStore.pageNavStack[globalStore.pageNavStack.length-1]);
	},
	render: function() {
		var self = this,
			marketViewElems,
			itemList = [
				{
					title: '2003 centurion avenue',
					price: '6000',
					user: 'Oliver',
					posedBefore: '5 mins'
				},
				{
					title: '2003 centurion avenue',
					price: '6000',
					user: 'Oliver',
					posedBefore: '5 mins'
				},
				{
					title: '2003 centurion avenue',
					price: '6000',
					user: 'Oliver',
					posedBefore: '5 mins'
				},
				{
					title: '2003 centurion avenue',
					price: '6000',
					user: 'Oliver',
					posedBefore: '5 mins'
				}
			];

		marketViewElems = itemList.map(function(data, index){
			return (<MarketplaceGridRow key={index} onClickFun={self.itemClickHandle} item={data}/>);
		});
		return (<div className="market-grid">{marketViewElems}</div>);
	}
});