import React from "react";
import { getAllStocks, Stock } from "../services/DataService";
import Spinner from "../components/Spinner";
import StockInfoCard from "../components/StockInfoCard";
import CustomLink from "../components/CustomLink";
import SearchStockBar, { isQueryRelevant } from "../components/SearchStockBar";
function StocksPage() {
	const [loading, setLoading] = React.useState(true);
	const [stocks, setStocks] = React.useState<Stock[]>([]);
	const [searchQuery, setSearchQuery] = React.useState("");

	React.useEffect(() => {
		const fetchStocks = async () => {
			const stocksResponse = await getAllStocks({ description: true });
			setStocks(stocksResponse.stocks);
			setLoading(false);
		};
		fetchStocks();
	}, []);

	let content = null;

	if (loading) {
		content = <Spinner className="my-auto" />;
	} else if (stocks.length) {
		content = stocks
			.filter((stock) => isQueryRelevant(stock, searchQuery))
			.sort((a, b) => a.company.localeCompare(b.company))
			.map((stock) => (
				<StockInfoCard
					key={stock.symbol}
					{...stock}
					className="w-full"
				/>
			));

		if (content.length === 0) {
			content = (
				<p className="my-auto">
					No stocks that would meet the query were found.
				</p>
			);
		}
	}

	let introduction = null;
	if (!loading && stocks.length === 0) {
		introduction = <p>No stocks available</p>;
	} else if (!loading && stocks.length > 0)
		introduction = (
			<div className="text-center flex flex-col items-center justify-center gap-4">
				<p>
					Currently we support <strong>{stocks.length}</strong>{" "}
					stocks. In order to add a new one please contact us and
					let's start the conversation.
				</p>
				<CustomLink
					to="/contact"
					text="Let's talk!"
					className="neumo-out mt-4 p-4"
					c2a
				/>
			</div>
		);

	return (
		<main className="neumo flex-grow">
			<div className="container mx-auto py-6 flex flex-col h-full">
				<h1 className="neumo-out text-3xl mb-16 p-5">Stocks</h1>
				<SearchStockBar
					className="mb-6"
					value={searchQuery}
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setSearchQuery(e.target.value);
					}}
				/>
				{introduction}
				<div className="my-8 flex flex-1 flex-col justify-start items-center">
					{content}
				</div>
			</div>
		</main>
	);
}

export default StocksPage;
