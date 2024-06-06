import React from "react";
import {
	LineChart,
	XAxis,
	YAxis,
	Line,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	Legend,
} from "recharts";
import Link from "./Link";
import CustomizedToolTip from "./CustomizedToolTip";
import { DataType } from "../services/DataService";

type StockOverviewProps = {
	className?: string;
	name: string;
	symbol: string;
	data: DataType[];
};

function StockOverview(props: StockOverviewProps) {
	const { className, name, symbol, data } = props;

	return (
		<div className={`flex ${className} p-2`}>
			<div className="neumo neumo-out w-full h-full flex flex-col items-center p-4">
				<div className="flex-grow flex w-full items-center justify-between">
					<h3 className="neumo-in-sm p-2">
						{name} | {symbol}
					</h3>
					<Link
						text="Details"
						to={`/predictions/${symbol}`}
						className="text-center  p-2"
					/>
				</div>

				<ResponsiveContainer
					className="neumo neumo-out mt-5 pt-2        "
					height={250}
					width={"100%"}
				>
					<LineChart data={data}>
						<XAxis dataKey="date" />
						<CartesianGrid stroke="#eee" strokeDasharray="5 5" />
						<YAxis
							tickCount={11}
							type="number"
							domain={[
								Math.floor(
									Math.min(
										...data.map(
											(el) =>
												el.history || el.prediction || 0
										)
									) * 0.95
								),
								Math.ceil(
									Math.max(
										...data.map(
											(el) =>
												el.history || el.prediction || 0
										)
									) * 1.05
								),
							]}
						/>
						<Tooltip
							cursor={{ stroke: "#b8b9be", strokeWidth: 2 }}
							content={<CustomizedToolTip />}
						/>
						<Legend />
						<Line
							type="monotone"
							dataKey="history"
							stroke="#b8b9be"
							dot={false}
						/>
						<Line
							type="monotone"
							dataKey="prediction"
							stroke="#b10b11be"
							dot={false}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}

export default StockOverview;
export type { DataType };
