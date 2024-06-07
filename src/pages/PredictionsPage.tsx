import React, { useEffect } from "react";
import SearchBar from "../components/SearchBar";
import StockCard from "../components/StockCard";
import Spinner from "../components/Spinner";
import { getStocksData, StockData } from "../services/DataService";
import { getNthPreviousWorkingDate, getToday } from "../utils/dateUtils";

function PredictionsOverview() {
	const [loading, setLoading] = React.useState(true);
	const [failedState, setFailedState] = React.useState<string | null>(null);
	const [stocksData, setStocksData] = React.useState<StockData[] | null>(
		null
	);
	const [searchQuery, setSearchQuery] = React.useState("");
	const [predictionDate, setPredictionDate] = React.useState(
		getNthPreviousWorkingDate(0, getToday())
	);
	const [displayOffset, setDisplayOffset] = React.useState(10);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const isQueryRelevant = (stock: StockData) => {
		const query = searchQuery.toLowerCase();
		const { name, symbol, area } = stock;
		return (
			name.toLowerCase().includes(query) ||
			symbol.toLowerCase().includes(query) ||
			area.toLowerCase().includes(query)
		);
	};

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const data = await getStocksData(predictionDate);
				setStocksData(data);
				setFailedState(null);
			} catch (error: any) {
				setFailedState(error.message);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [predictionDate]);

	const buttonLoadHandler = (
		<div className="flex flex-row gap-4 justify-center items-center my-2">
			<button
				className="neumo-out neumo-interactive p-2 disabled:opacity-50 disabled:cursor-not-allowed"
				disabled={displayOffset <= 10}
				onClick={() => setDisplayOffset(displayOffset - 10)}
			>
				Load less
			</button>
			<button
				className="neumo-out neumo-interactive p-2 disabled:opacity-50 disabled:cursor-not-allowed"
				disabled={!stocksData || displayOffset >= stocksData.length}
				onClick={() => setDisplayOffset(displayOffset + 10)}
			>
				Load more
			</button>
		</div>
	);

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
					{!loading && failedState && <p>{failedState}</p>}
					{!loading &&
						!failedState &&
						stocksData &&
						stocksData
							.slice(0, displayOffset)
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

				{!loading && stocksData && !failedState && buttonLoadHandler}
			</div>
		</main>
	);
}

export default PredictionsOverview;
