const updateExistingHolding = ({
	stockHoldings,
	symbol,
	type,
	priceOfShare,
	price,
	quantity,
	prevTotalBalance
}) => {
	let updatedTotalBalance;

	const prevAvgPrice = stockHoldings[symbol].avgBuyPricePerShare;
	const prevQuantity = stockHoldings[symbol].quantity;

	if (type === 'BUY') {
		stockHoldings[symbol] = {
			avgBuyPricePerShare: ((prevAvgPrice * prevQuantity) + (priceOfShare * quantity)) / (prevQuantity + quantity),
			quantity: prevQuantity + quantity
		};

		// Explicitly recalculate: subtract cash spent, add stock value gained
		// (old stock value is already in prevTotalBalance, so only add the new purchase value)
		updatedTotalBalance = prevTotalBalance - (priceOfShare * quantity) + (priceOfShare * quantity);
	} else if (type === 'SELL') {
		if(prevQuantity - quantity <= 0){
			delete stockHoldings[symbol]
		}
		else{
			stockHoldings[symbol] = {
			avgBuyPricePerShare: prevAvgPrice,
			quantity: prevQuantity - quantity
		};
		}
		
		// Add cash received from sale, subtract cost basis of sold shares
		updatedTotalBalance = prevTotalBalance + (priceOfShare * quantity) - (prevAvgPrice * quantity);
	}

	

	return { stockHoldings, updatedTotalBalance };
};

export default updateExistingHolding;
