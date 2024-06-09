import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { Stock, History, getHistory, getStocks } from "../services/DataService";
import { error } from "console";
import StockDetail from "../components/StockDetail";
import { getNthPreviousWorkingDate, getToday } from "../utils/dateUtils";
import Footer from "../components/Footer";

function StockDetailPage() {
	const { symbol } = useParams<{ symbol: string }>();
	const [loading, setLoading] = useState(true);
	const [stock, setStock] = useState<Stock | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [histories, setHistories] = useState<History[]>([]);

	useEffect(() => {
		const fetchStock = async () => {
			const response = await getStocks({ symbol, description: true });
			if (response.stocks.length > 0) {
				setError(null);
				setStock(response.stocks[0]);
			} else {
				setError(
					"Failed to fetch the stock. Please make sure the stock symbol is correct or contact the developers."
				);
				setLoading(false);
			}
		};

		fetchStock();
	}, [symbol]);

	useEffect(() => {
		const fetchHistory = async () => {
			const response = await getHistory(
				getNthPreviousWorkingDate(300, getToday()),
				{ stockId: stock?._id }
			);

			setHistories(response.histories);
			setLoading(false);
		};

		if (stock) {
			fetchHistory();
		}
	}, [stock]);

	return (
		<>
			<div className="container mx-auto py-6 flex flex-col h-full">
				<h1 className="neumo-out text-3xl mb-16 p-5">Stock {symbol}</h1>
				<div className="mb-6 flex flex-col items-center flex-grow">
					{loading && <Spinner className="my-auto" />}
					{error && (
						<p className="my-auto neumo-text-error text-center">
							{error}
						</p>
					)}
					{!loading && stock && (
						<StockDetail {...stock} histories={histories} />
					)}
				</div>
			</div>
			<Footer />
		</>
	);
}

export default StockDetailPage;
