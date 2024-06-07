import React, { useEffect } from "react";
import SearchBar from "../components/SearchBar";
import StockCard from "../components/StockCard";
import Spinner from "../components/Spinner";
import { getStocksData, StockData } from "../services/DataService";
import { getNthPreviousWorkingDate, getToday } from "../utils/dateUtils";

function PredictionsOverview() {
	const [loading, setLoading] = React.useState(true);
	const [stocksData, setStocksData] = React.useState<StockData[] | null>(
		null
	);
	const [searchQuery, setSearchQuery] = React.useState("");
	const [predictionDate, setPredictionDate] = React.useState(
		getNthPreviousWorkingDate(0, getToday())
	);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const isQueryRelevant = (stock: StockData) => {
		const query = searchQuery.toLowerCase();
		const { name, symbol } = stock;
		return (
			name.toLowerCase().includes(query) ||
			symbol.toLowerCase().includes(query)
		);
	};

	useEffect(() => {
		const fetchData = async () => {
			const data = await getStocksData(predictionDate);
			setStocksData(data);
			setLoading(false);
		};
		fetchData();
	}, [predictionDate]);

	return (
		<main className="neumo flex-grow">
			<div className="container mx-auto py-6 flex flex-col h-full">
				<h1 className="neumo-out text-3xl mb-16 p-5">
					Predictions Overview
				</h1>
				<SearchBar
					className="mb-6"
					value={searchQuery}
					handleChange={handleChange}
				/>
				<div className="flex flex-row justify-between items-center my-2">
					<button
						className="neumo-out neumo-interactive p-2"
						onClick={() =>
							setPredictionDate(
								getNthPreviousWorkingDate(1, predictionDate)
							)
						}
					>
						Previous
					</button>
					<p className="neumo-out p-4">
						{predictionDate.toLocaleString("default", {
							day: "numeric",
							month: "long",
							year: "numeric",
						})}
					</p>
					<button
						className="neumo-out neumo-interactive p-2 disabled:opacity-50 disabled:cursor-not-allowed"
						disabled={predictionDate >= getToday()}
						onClick={() =>
							setPredictionDate(
								getNthPreviousWorkingDate(-1, predictionDate)
							)
						}
					>
						Next
					</button>
				</div>
				<p className="mb-6">
					Here you can see all the stocks and predicitons overview
				</p>
				<div className="mb-6 flex flex-1 flex-wrap items-center justify-evenly">
					{loading && <Spinner />}
					{!loading &&
						stocksData &&
						stocksData
							.filter(isQueryRelevant)
							.map((stock) => (
								<StockCard
									key={stock.symbol}
									name={stock.name}
									symbol={stock.symbol}
									data={stock.data}
									className="w-full sm:w-6/12 md:w-6/12 lg:w-4/12 xl:w-3/12"
								/>
							))}
				</div>
			</div>
		</main>
	);
}

export default PredictionsOverview;
