import React from "react";
import SearchBar from "../components/SearchBar";
import StockOverview from "../components/StockOverview";

function PredictionsOverview() {
	const stocksData = [
		{
			name: "Apple Inc.",
			symbol: "AAPL",
			data: [
				{ date: "2024-04-22", value: 156.279999 },
				{ date: "2024-04-23", value: 158.259995 },
				{ date: "2024-04-24", value: 159.130005 },
				{ date: "2024-04-25", value: 156 },
				{ date: "2024-04-26", value: 171.949997 },
				{ date: "2024-04-29", value: 166.149994 },
				{ date: "2024-04-30", value: 162.779999 },
				{ date: "2024-05-01", value: 163.860001 },
				{ date: "2024-05-02", value: 166.619995 },
				{ date: "2024-05-03", value: 167.240005 },
				{ date: "2024-05-06", value: 168.100006 },
				{ date: "2024-05-07", value: 171.25 },
				{ date: "2024-05-08", value: 169.380005 },
				{ date: "2024-05-09", value: 169.960007 },
				{ date: "2024-05-10", value: 168.649994 },
				{ date: "2024-05-13", value: 169.139999 },
				{ date: "2024-05-14", value: 170.339996 },
				{ date: "2024-05-15", value: 172.509995 },
				{ date: "2024-05-16", value: 174.179993 },
				{ date: "2024-05-17", value: 176.059998 },
				{ date: "2024-05-20", value: 176.919998 },
				{ date: "2024-05-21", value: 177.850006 },
				{ date: "2024-05-22", value: 176.380005 },
				{ date: "2024-05-23", value: 173.550003 },
				{ date: "2024-05-24", value: 174.990005 },
				{ date: "2024-05-28", value: 176.399994 },
				{ date: "2024-05-29", value: 175.899994 },
				{ date: "2024-05-30", value: 172.110001 },
				{ date: "2024-05-31", value: 172.5 },
				{ date: "2024-06-03", value: 172.565002 },
			],
		},
	];

	return (
		<div className="container mx-auto flex flex-col pt-10">
			<h1 className="neumo-out text-3xl my-6 p-5">
				Predictions Overview
			</h1>
			<SearchBar className="my-6" />
			<p className="neumo-out p-5">
				Here you can see all the stocks and predicitons overview
			</p>
			<div className="flex flex-wrap gap-4 my-6">
				{stocksData.map((stock) => (
					<StockOverview
						key={stock.symbol}
						name={stock.name}
						symbol={stock.symbol}
						data={stock.data}
					/>
				))}
			</div>
		</div>
	);
}

export default PredictionsOverview;
