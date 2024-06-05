import React from "react";
import {
	LineChart,
	XAxis,
	YAxis,
	Line,
	CartesianGrid,
	ResponsiveContainer,
} from "recharts";
import Link from "./Link";

type DataType = {
	date: string;
	value: number;
};

type StockOverviewProps = {
	className?: string;
	name: string;
	symbol: string;
	data: Array<DataType>;
};

function StockOverview(props: StockOverviewProps) {
	const { className, name, symbol, data } = props;

	return (
		<div
			className={`StockOverview neumo neumo-out w-full flex flex-col items-center ${className}`}
		>
			<h3 className="mt-5 neumo-out p-2">
				{name} | {symbol}
			</h3>

			<ResponsiveContainer
				className="neumo neumo-out mt-5 pt-2        "
				width="96%"
				height={200}
			>
				<LineChart data={data}>
					<XAxis dataKey="date" />
					<CartesianGrid stroke="#eee" strokeDasharray="5 5" />
					<YAxis
						tickCount={11}
						type="number"
						domain={[
							Math.floor(
								Math.min(...data.map((el) => el.value)) * 0.95
							),
							Math.ceil(
								Math.max(...data.map((el) => el.value)) * 1.05
							),
						]}
					/>
					<Line type="monotone" dataKey="value" stroke="#b7b8be" />
				</LineChart>
			</ResponsiveContainer>

			<div className="flex flex-row items-center my-5">
				<Link
					text="Details"
					to={`/predictions/${symbol}`}
					className="neumo neumo-out neumo-interactive w-16 text-center mx-5 py-2"
				/>
				<Link
					text="View"
					to={`/predictions/${symbol}`}
					className="neumo neumo-out neumo-interactive w-16 text-center mx-5 py-2"
				/>
			</div>
		</div>
	);
}

export default StockOverview;
