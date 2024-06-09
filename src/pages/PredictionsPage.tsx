import React, { useEffect } from "react";
import SearchStockBar, { isQueryRelevant } from "../components/SearchStockBar";
import StockPredictionCard from "../components/StockPredictionCard";
import Spinner from "../components/Spinner";
import {
	getStocks,
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
import Accordion from "../components/Accordion";

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
			const stocksResponse = await getStocks();
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
				console.log(generationResponse.generation);
				// setFailedState(null);
			} catch (e: any) {
				setGeneration(null);
				// setFailedState(e.message);
			} finally {
				setLoading(false);
			}
		};
		fetchPredictions();
	}, [predictionDate]);

	let content = null;
	let relevantCnt = 0;
	if (loading) {
		content = <Spinner />;
	} else if (failedState) {
		content = <p>{failedState}</p>;
	} else if (stocks.length && (histories.length || generation)) {
		const relevantStocks = stocks.filter((el: Stock) =>
			isQueryRelevant(el, searchQuery)
		);
		relevantCnt = relevantStocks.length;
		content = relevantStocks
			.sort((a: Stock, b: Stock) => a.company.localeCompare(b.company))
			.slice(0, displayLimit)
			.map((stock: Stock) => (
				<StockPredictionCard
					key={stock.symbol}
					company={stock.company}
					symbol={stock.symbol}
					area={stock.area}
					className="w-full sm:w-12/12 md:w-12/12 lg:w-6/12 xl:w-4/12 flex-grow"
					data={[
						...(generation?.predictions
							.filter((el: Prediction) => el.stock === stock._id)
							?.map((el: Prediction) => ({
								date: new Date(el.date),
								prediction: el.close,
							})) || []),
						...histories
							.filter((el: History) => el.stock === stock._id)
							.map((el: History) => ({
								date: new Date(el.date),
								history: el.close,
							})),
					]}
				/>
			));

		if (content.length === 0) {
			content = (
				<p
					className="my-auto neumo-text-error text-center"
					aria-label="Warning message - stocks not found"
				>
					No stocks that would meet the query were found.
				</p>
			);
		}
	}

	let generationInfo = null;
	if (!generation)
		generationInfo = (
			<p
				className="neumo-text-error text-center"
				aria-label="Warning message - predictions not found"
			>
				No predictions for the chosen date are available. Please pick
				another date or contact the developers.
			</p>
		);
	else {
		generationInfo = (
			<Accordion title="Generation Info" className="neumo-out p-4">
				<div className="neumo-in mt-4 mb-1 p-4 flex flex-col">
					<h4 className="neumo-out mt-4 mb-2 p-2">Date</h4>
					<p>
						{new Date(generation.date).toISOString().split("T")[0]}
					</p>

					<h4 className="neumo-out mt-4 mb-2 p-2">Name</h4>
					<p>{generation.name}</p>

					<h4 className="neumo-out mt-4 mb-2 p-2">
						Number of days into the past to consider
					</h4>
					<p>{generation.days_back_to_consider}</p>
					<h4 className="neumo-out mt-4 mb-2 p-2">
						Number of days into the future to predict
					</h4>

					<p>{generation.n_step}</p>
					<h4 className="neumo-out mt-4 mb-2 p-2">
						Categorical features used
					</h4>
					<p>{JSON.stringify(generation.categorical_features)}</p>

					<h4 className="neumo-out mt-4 mb-2 p-2">
						Label features used
					</h4>
					<p>{JSON.stringify(generation.label_features)}</p>

					<h4 className="neumo-out mt-4 mb-2 p-2">
						Moving window averages used
					</h4>
					<p>{JSON.stringify(generation.mwms)}</p>

					<h4 className="neumo-out mt-4 mb-2 p-2">
						Targe feature lags used
					</h4>
					<p>{JSON.stringify(generation.shifts)}</p>
				</div>
			</Accordion>
		);
	}

	return (
		<main className="neumo flex-grow">
			<div className="container mx-auto py-6 flex flex-col h-full">
				<h1 className="neumo-out text-3xl mb-16 p-5">
					Predictions Overview
				</h1>
				<SearchStockBar
					value={searchQuery}
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setSearchQuery(e.target.value);
					}}
				/>
				<div>
					<p className="text-center mt-4">
						Please choose a date for which to display the generation
						of predictions.
					</p>
					<DatePicker
						className="mb-8 mt-2"
						date={predictionDate}
						setDate={setPredictionDate}
					/>
				</div>

				<p className="mb-6">{!loading && generationInfo}</p>
				<div className="mb-6 flex flex-1 flex-wrap items-center justify-evenly">
					{content}
				</div>

				{!loading && !failedState && stocks.length && !failedState && (
					<LoaderHandler
						disableLessBtn={
							displayLimit <= 10 || displayLimit >= relevantCnt
						}
						disableMoreBtn={
							displayLimit >= stocks.length ||
							displayLimit >= relevantCnt
						}
						handleLess={() => setDisplayLimit(displayLimit - 10)}
						handleMore={() => setDisplayLimit(displayLimit + 10)}
					/>
				)}
			</div>
		</main>
	);
}

export default PredictionsOverview;
