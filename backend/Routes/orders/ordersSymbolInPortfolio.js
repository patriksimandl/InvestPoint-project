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

		updatedTotalBalance = prevTotalBalance - (priceOfShare*quantity) + (((prevAvgPrice * prevQuantity) + (priceOfShare * quantity)) / (prevQuantity + quantity) * quantity);
	} else if (type === 'SELL') {
		stockHoldings[symbol] = {
			avgBuyPricePerShare: prevAvgPrice,
			quantity: prevQuantity - quantity
		};
		updatedTotalBalance = prevTotalBalance + (priceOfShare * quantity) - (((prevAvgPrice * prevQuantity) + (priceOfShare * quantity)) / (prevQuantity + quantity) * quantity);
	}

	

	return { stockHoldings, updatedTotalBalance };
};

export default updateExistingHolding;
