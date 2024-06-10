import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { Stock, History, getHistory, getStocks } from "../services/DataService";
import StockDetail from "../components/StockDetail";
import { getNthPreviousWorkingDate } from "../utils/dateUtils";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

function StockDetailPage() {
	const { symbol } = useParams<{ symbol: string }>();
	const [loading, setLoading] = useState(true);
	const [stock, setStock] = useState<Stock | null>(null);
	const [error, setError] = useState<string>("");
	const [histories, setHistories] = useState<History[]>([]);

	useEffect(() => {
		const fetchStock = async () => {
			try {
				const response = await getStocks({ symbol, description: true });
				if (response.stocks.length === 0) {
					throw new Error("Stock not found");
				}
				setStock(response.stocks[0]);
			} catch (e: any) {
				setError(e.message);
			} finally {
				setLoading(false);
			}
		};

		fetchStock();
	}, [symbol]);

	useEffect(() => {
		const fetchHistory = async () => {
			const response = await getHistory(getNthPreviousWorkingDate(300), {
				stockId: stock?._id,
			});

			setHistories(response.histories);
		};

		if (stock) {
			fetchHistory();
		}
	}, [stock]);

	return (
		<>
			<Helmet>
				<title>Stock {symbol} | GSP</title>
				<meta name="description" content={`Stock ${symbol} details`} />
			</Helmet>
			<div className="container mx-auto py-6 flex flex-col h-full text-sm md:text-base">
				<h1 className="neumo-out text-3xl mb-16 p-5">Stock {symbol}</h1>
				<div className="mb-6 flex flex-col items-center flex-grow">
					{loading && <Spinner className="my-auto" />}
					{error && (
						<p className="my-auto neumo-text-error text-center">
							{error}
						</p>
					)}
					{!loading && stock && histories.length > 0 && (
						<StockDetail {...stock} histories={histories} />
					)}
				</div>
			</div>
			<Footer />
		</>
	);
}

export default StockDetailPage;
