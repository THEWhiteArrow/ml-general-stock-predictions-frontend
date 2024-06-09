import { History } from "../services/DataService";
import CustomLink from "./CustomLink";
import Graph from "./Graph";

type StockDetailProps = {
	symbol: string;
	company: string;
	description: string;
	area: string;
	histories: History[];
};

function StockDetail(props: StockDetailProps) {
	const { symbol, company, description, area, histories } = props;

	const min =
		Math.floor(
			Math.min(...histories.map((history) => history.close)) * 100
		) / 100;
	const max =
		Math.floor(
			Math.max(...histories.map((history) => history.close)) * 100
		) / 100;
	const avg =
		Math.floor(
			(histories.reduce((acc, history) => acc + history.close, 0) /
				histories.length) *
				100
		) / 100;
	const current =
		Math.floor(
			histories.sort(
				(a, b) =>
					new Date(b.date).getTime() - new Date(a.date).getTime()
			)[0].close * 100
		) / 100;

	return (
		<div className="flex flex-col">
			<h2 className="text-2xl font-bold">
				{company} ({symbol})
			</h2>
			<p>{description}</p>

			<div className="flex flex-col md:flex-row neumo-out p-4 my-8">
				<Graph
					data={histories.map((history) => ({
						date: new Date(history.date),
						history: history.close,
					}))}
					exclude={["prediction"]}
				/>

				<div className="flex flex-col p-5 neumo-in w-full md:w-4/12">
					<h4 className="neumo-out p-2 mt-4">Statistics</h4>
					<p className="mt-4">Min: {min}</p>
					<p>Max: {max}</p>
					<p>Avg: {avg}</p>
					<p>
						Current: {current} ({current > avg ? "↑" : "↓"})
					</p>
					<h4 className="neumo-out p-2 mt-4">Analysis</h4>
					<p className="mt-4">
						This is quite an advanced use case and not yet
						implemented. Please contact the support and show your
						love to the developers.
					</p>
				</div>
			</div>

			<div className="my-4 flex flex-row items-center justify-between">
				<CustomLink
					to={`/stocks`}
					text="← Back to Stocks"
					className="p-4 md:w-64 text-center"
					c2a
				/>

				<CustomLink
					to={`https://finance.yahoo.com/quote/${symbol}/`}
					text="Visit Yahoo Finance →"
					className="p-4 md:w-64 text-center"
					c2a
				/>
			</div>
		</div>
	);
}

export default StockDetail;
