import React from "react";
import { getStocks, Stock } from "../services/DataService";
import Spinner from "../components/Spinner";
import StockInfoCard from "../components/StockInfoCard";
import CustomLink from "../components/CustomLink";
import SearchStockBar, { isQueryRelevant } from "../components/SearchStockBar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

function StocksPage() {
	const [loading, setLoading] = React.useState(true);
	const [stocks, setStocks] = React.useState<Stock[]>([]);
	const [searchQuery, setSearchQuery] = React.useState("");
	const [error, setError] = React.useState("");

	React.useEffect(() => {
		const fetchStocks = async () => {
			try {
				const stocksResponse = await getStocks({ description: true });
				setStocks(stocksResponse.stocks);
				setLoading(false);
			} catch (e: any) {
				setError(e);
			} finally {
				setLoading(false);
			}
		};
		fetchStocks();
	}, []);

	let content = null;

	if (loading) {
		content = <Spinner className="my-auto" />;
	} else if (!loading && stocks.length > 0) {
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
				<p
					className="my-auto neumo-text-error text-center"
					aria-label="Warning message - stocks not found"
				>
					No stocks that would meet the query were found.
				</p>
			);
		}
	} else if (error) {
		content = (
			<p
				className="my-auto neumo-text-error text-center"
				aria-label="Error message"
			>
				{error}
			</p>
		);
	}

	let introduction = null;
	if (!loading && stocks.length === 0) {
		introduction = <p>No stocks available</p>;
	} else if (!loading && stocks.length > 0)
		introduction = (
			<div className="text-center flex flex-col items-center justify-center gap-4">
				<p>
					Currently we support <strong>{stocks.length}</strong>{" "}
					stocks. In order to add a new one stock please contact us.
				</p>
				<CustomLink
					to="/contact"
					text="Contact me"
					className="neumo-out mt-4 p-2 md:p-4"
					c2a
				/>
			</div>
		);

	return (
		<>
			<Helmet>
				<title>Stocks Overview | GSP</title>
				<meta
					name="description"
					content="Overview of all stocks available in the General Stock Predictions platform."
				/>
				<link rel="icon" href="/favicon.ico" type="image/x-icon" />

				{/* Open Graph meta tags for social media */}
				<meta property="og:title" content="Stocks | GSP" />
				<meta
					property="og:description"
					content="Overview of all stocks available in the General Stock Predictions platform."
				/>
				<meta property="og:image" content="/homepage-thumbnail.png" />
				<meta
					property="og:url"
					content="http://gsp.trafialek.com/stocks"
				/>
				<meta property="og:type" content="website" />
			</Helmet>
			<div className="container mx-auto py-6 flex flex-col h-full text-sm md:test-base">
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
			<Footer />
		</>
	);
}

export default StocksPage;
