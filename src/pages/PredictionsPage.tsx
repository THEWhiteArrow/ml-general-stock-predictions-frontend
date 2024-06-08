import React, { useEffect } from "react";
import SearchBar from "../components/SearchBar";
import StockCard, { DataType, StockCardProps } from "../components/StockCard";
import Spinner from "../components/Spinner";
import {
	getAllStocks,
	getGeneration,
	getHistory,
	History,
	Stock,
	Generation,
	Prediction,
} from "../services/DataService";
import { getNthPreviousWorkingDate, getToday } from "../utils/dateUtils";
import LoaderHandler from "../components/LoaderHandler";
import DatePicker from "../components/DatePicker";

function isQueryRelevant(stock: Stock, searchQuery: string) {
	const query = searchQuery.toLowerCase();
	const { company, symbol, area } = stock;
	return (
		company.toLowerCase().includes(query) ||
		symbol.toLowerCase().includes(query) ||
		area.toLowerCase().includes(query)
	);
}

function PredictionsOverview() {
	const [loading, setLoading] = React.useState(true);
	const [failedState, setFailedState] = React.useState<string | null>(null);
	const [searchQuery, setSearchQuery] = React.useState("");
	const [predictionDate, setPredictionDate] = React.useState(
		getNthPreviousWorkingDate(0, getToday())
	);
	const [displayLimit, setDisplayLimit] = React.useState(10);
	const [histories, setHistories] = React.useState<History[]>([]);
	const [stocks, setStocks] = React.useState<Stock[]>([]);
	const [generation, setGeneration] = React.useState<Generation | null>(null);

	useEffect(() => {
		const fetchStocks = async () => {
			const stocksResponse = await getAllStocks();
			setStocks(stocksResponse.stocks);
		};
		const fetchHistories = async () => {
			const historyResponse = await getHistory(
				getNthPreviousWorkingDate(150, getToday())
			);
			setHistories(historyResponse.histories);
		};
		fetchStocks();
		fetchHistories();
	}, []);

	useEffect(() => {
		setLoading(false);
	}, [histories, generation]);

	useEffect(() => {
		setLoading(true);
		const fetchPredictions = async () => {
			try {
				const generationResponse = await getGeneration(predictionDate);
				setGeneration(generationResponse.generation);
				setFailedState(null);
			} catch (e: any) {
				setFailedState(e.message);
			} finally {
				setLoading(false);
			}
		};
		fetchPredictions();
	}, [predictionDate]);

	let content = null;

	if (loading) {
		content = <Spinner />;
	} else if (failedState) {
		content = <p>{failedState}</p>;
	} else if (stocks.length && (histories.length || generation)) {
		content = stocks
			.filter((el: Stock) => isQueryRelevant(el, searchQuery))
			.slice(0, displayLimit)
			.map((stock: Stock) => (
				<StockCard
					key={stock.symbol}
					company={stock.company}
					symbol={stock.symbol}
					area={stock.area}
					className="w-full sm:w-12/12 md:w-12/12 lg:w-6/12 xl:w-4/12"
					data={[
						...histories
							.filter((el: History) => el.stock === stock._id)
							.map((el: History) => ({
								date: new Date(el.date),
								history: el.close,
							})),
						...(generation?.predictions
							.filter((el: Prediction) => el.stock === stock._id)
							?.map((el: Prediction) => ({
								date: new Date(el.date),
								prediction: el.close,
							})) || []),
					]}
				/>
			));
	}

	return (
		<main className="neumo flex-grow">
			<div className="container mx-auto py-6 flex flex-col h-full">
				<h1 className="neumo-out text-3xl mb-16 p-5">
					Predictions Overview
				</h1>
				<SearchBar
					className="mb-6"
					value={searchQuery}
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setSearchQuery(e.target.value);
					}}
				/>

				<DatePicker date={predictionDate} setDate={setPredictionDate} />

				<p className="mb-6">
					Here you can see all the stocks and predicitons overview
				</p>
				<div className="mb-6 flex flex-1 flex-wrap items-center justify-evenly">
					{content}
				</div>

				{!loading && !failedState && stocks.length && !failedState && (
					<LoaderHandler
						disableLessBtn={stocks.length <= 10}
						disableMoreBtn={stocks.length <= displayLimit}
						handleLess={() => setDisplayLimit(displayLimit - 10)}
						handleMore={() => setDisplayLimit(displayLimit + 10)}
					/>
				)}
			</div>
		</main>
	);
}

export default PredictionsOverview;
