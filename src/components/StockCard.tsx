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
import { Link } from "react-router-dom";
import CustomizedToolTip from "./CustomizedToolTip";
import { ReactComponent as BoxArrowInUpRightSvg } from "../assets/box-arrow-in-up-right.svg";

type DataType = {
	date: Date;
	history?: number;
	prediction?: number;
};

type StockCardProps = {
	className?: string;
	company: string;
	symbol: string;
	area: string;
	data: DataType[];
};

function StockCard(props: StockCardProps) {
	const { className, company, area, symbol, data } = props;

	return (
		<div className={`flex ${className} p-6`}>
			<div className="neumo neumo-out w-full h-full flex flex-col items-center">
				<div className="neumo-out py-4 px-4 flex-grow flex w-full items-center justify-between">
					<h3>
						{company} | {symbol}
					</h3>
					<Link
						to="/details"
						className="neumo neumo-out neumo-interactive p-2"
					>
						<BoxArrowInUpRightSvg />
					</Link>
				</div>

				<ResponsiveContainer
					className="my-2 pr-4"
					height={400}
					width={"100%"}
				>
					<LineChart data={data}>
						<XAxis
							dataKey="date"
							tickFormatter={(date: Date) =>
								date.toISOString().slice(0, 10)
							}
						/>
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

export default StockCard;
export type { DataType, StockCardProps };
