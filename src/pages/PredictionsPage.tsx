import { useEffect, useState } from "react";
import SearchStockBar, { isQueryRelevant } from "../components/SearchStockBar";
import StockPredictionCard, {
	DataType,
} from "../components/StockPredictionCard";
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
import { transformData } from "../components/Graph";
import { getNthPreviousWorkingDate as getNPWDay } from "../utils/dateUtils";
import LoaderHandler from "../components/LoaderHandler";
import DatePicker from "../components/DatePicker";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
import { ReactComponent as GoogleSvg } from "../assets/svgs/google.svg";
import GenerationInfo from "../components/GenerationInfo";

type PreProcessedDataType = {
	[key: string]: DataType[];
};

function preProcessData(
	stocks: Stock[],
	histories: History[],
	generation?: Generation | null
): PreProcessedDataType {
	if (stocks.length === 0) return {};

	const preProcessData: PreProcessedDataType = {};
	for (let stock of stocks) {
		const combinedData = [
			...histories
				.filter((el: History) => el.stock === stock._id)
				.map((el: History) => ({
					date: new Date(el.date),
					history: el.close,
				})),
			...(generation?.predictions || [])
				.filter((el: Prediction) => el.stock === stock._id)
				.map((el: Prediction) => ({
					date: new Date(el.date),
					prediction: el.close,
				})),
		];

		preProcessData[stock.symbol] = transformData(combinedData);
	}

	return preProcessData;
}

function PredictionsOverview() {
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [predictionDate, setPredictionDate] = useState(
		new Date().getUTCHours() < 20 ? getNPWDay(1) : getNPWDay()
	);
	const [displayLimit, setDisplayLimit] = useState(10);
	const [histories, setHistories] = useState<History[]>([]);
	const [stocks, setStocks] = useState<Stock[]>([]);
	const [relevantStocks, setRelevantStocks] = useState<Stock[]>([]);
	const [generation, setGeneration] = useState<Generation | null>(null);
	const [error, setError] = useState("");
	const [preProcessedData, setPreProcessedData] =
		useState<PreProcessedDataType>({});

	useEffect(() => {
		const fetchStocks = async () => {
			try {
				const response = await getStocks();
				setStocks(response.stocks);
			} catch (e: any) {
				setError(e.message);
			}
		};

		const fetchHistories = async () => {
			try {
				const response = await getHistory(getNPWDay(69));
				setHistories(response.histories);
				if (response.histories.length === 0) {
					setError("No historical data found.");
				}
			} catch (e: any) {
				setError(e.message);
			}
		};
		fetchStocks();
		fetchHistories();
	}, []);

	useEffect(() => {
		if (stocks.length === 0 || !predictionDate) return;

		const fetchGeneration = async () => {
			try {
				setLoading(true);
				const response = await getGeneration(predictionDate);
				setGeneration(response.generation);
			} catch (e: any) {
				console.log(e.message);
				setGeneration(null);
			} finally {
				setLoading(false);
			}
		};
		fetchGeneration();
	}, [stocks, predictionDate]);

	useEffect(() => {
		if (stocks.length === 0 || histories.length === 0) return;
		const preProcessedData = preProcessData(stocks, histories, generation);
		setPreProcessedData(preProcessedData);
		setLoading(false);
	}, [stocks, histories, generation]);

	useEffect(() => {
		if (stocks.length === 0) return;

		const relevantStocks = stocks
			.sort((a: Stock, b: Stock) => a.company.localeCompare(b.company))
			.filter((stock: Stock) => isQueryRelevant(stock, searchQuery));

		setRelevantStocks(relevantStocks);
	}, [stocks, searchQuery]);

	return (
		<>
			<Helmet>
				<title>Predictions Overview | GSP</title>
				<meta
					name="description"
					content="Overview of all predictions available in the General Stock Predictions platform."
				/>
				<link rel="icon" href="/favicon.ico" type="image/x-icon" />

				{/* Open Graph meta tags for social media */}
				<meta property="og:title" content="Predictions | GSP" />
				<meta
					property="og:description"
					content="Overview of all predictions available in the General Stock Predictions platform."
				/>
				<meta property="og:image" content="/homepage-thumbnail.png" />
				<meta
					property="og:url"
					content="http://gsp.trafialek.com/predictions"
				/>
				<meta property="og:type" content="website" />
			</Helmet>
			<div className="container mx-auto py-6 flex flex-col h-full text-sm md:text-base">
				<h1 className="neumo-out text-3xl mb-16 p-5">
					Predictions Overview
				</h1>
				<SearchStockBar
					value={searchQuery}
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setSearchQuery(e.target.value);
					}}
				/>

				<div className="my-4 neumo-text-error text-center flex flex-col items-center">
					<p>
						IMPORTANT: The application is currenly out of service.
						The last prediction was generated on 05.09.2024.
					</p>
					I have prioritized other projects and I am currenly not able
					to maintain the application. I am sorry for the
					inconvenience.
					<p>
						If you have any questions or ideas, please contact me at
					</p>
					<a
						aria-label="Email"
						href="mailto:damian.trafialek@gmail.com"
						// target="_blank"
						className="neumo p-4 mt-4 neumo-out neumo-interactive"
					>
						<GoogleSvg className="w-8 h-8 mx-2" />
					</a>
				</div>

				<DatePicker
					className="my-10 neumo-out py-4"
					date={predictionDate}
					setDate={setPredictionDate}
				/>

				{!loading && (
					<GenerationInfo
						generation={generation}
						predictionDate={predictionDate}
					/>
				)}
				<div className="mb-6 flex flex-1 flex-wrap items-center justify-evenly">
					{loading && <Spinner />}
					{!loading &&
						relevantStocks.length > 0 &&
						relevantStocks
							.slice(0, displayLimit)
							.map((stock: Stock) => (
								<StockPredictionCard
									key={stock._id}
									className="w-full sm:w-12/12 md:w-12/12 lg:w-6/12 xl:w-4/12 flex-grow"
									company={stock.company}
									symbol={stock.symbol}
									area={stock.area}
									data={preProcessedData[stock.symbol] || []}
								/>
							))}
					{!loading && relevantStocks.length === 0 && (
						<p
							className="my-auto neumo-text-error text-center"
							aria-label="Warning message - stocks not found"
						>
							No stocks that would meet the query were found.
						</p>
					)}
					{error && (
						<p
							className="my-auto neumo-text-error text-center"
							aria-label="Error message"
						>
							{error}
						</p>
					)}
				</div>

				{!loading && stocks.length && (
					<LoaderHandler
						disableLessBtn={
							displayLimit <= 10 ||
							displayLimit >= relevantStocks.length
						}
						disableMoreBtn={
							displayLimit >= stocks.length ||
							displayLimit >= relevantStocks.length
						}
						handleLess={() => setDisplayLimit(displayLimit - 10)}
						handleMore={() => setDisplayLimit(displayLimit + 10)}
					/>
				)}
			</div>
			<Footer />
		</>
	);
}

export default PredictionsOverview;
