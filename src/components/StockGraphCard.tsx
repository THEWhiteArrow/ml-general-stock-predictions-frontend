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
import { ReactComponent as EyeSvg } from "../assets/eye.svg";

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

function StockGraphCard(props: StockCardProps) {
	const { className, company, area, symbol, data } = props;

	const transformedData: DataType[] = [];

	data.sort((a, b) => a.date.getTime() - b.date.getTime()).forEach((el) => {
		const { date, history, prediction } = el;
		if (!transformedData.length) transformedData.push(el);
		else if (
			transformedData[transformedData.length - 1].date.getTime() !==
			date.getTime()
		)
			transformedData.push(el);
		else
			transformedData[transformedData.length - 1] = {
				date,
				history:
					transformedData[transformedData.length - 1].history ||
					history,
				prediction:
					transformedData[transformedData.length - 1].prediction ||
					prediction,
			};
	});

	return (
		<div className={`flex ${className} p-6`}>
			<div className="neumo neumo-out w-full h-full flex flex-col items-center">
				<div className="neumo-out py-4 px-4 flex-grow flex w-full items-center justify-between">
					<h3>
						{company} | {symbol}
					</h3>
					<Link
						to={`stocks/${symbol}`}
						className="neumo neumo-out neumo-interactive p-2 flex flex-row items-center gap-2"
					>
						View more
						<EyeSvg />
						{/* <BoxArrowInUpRightSvg /> */}
					</Link>
				</div>

				<ResponsiveContainer
					className="my-2 pr-4"
					height={400}
					width={"100%"}
				>
					<LineChart data={transformedData}>
						<XAxis
							dataKey="date"
							tickFormatter={(date: DataType["date"]) =>
								date.toISOString().slice(0, 10)
							}
						/>
						<CartesianGrid stroke="#eee" strokeDasharray="5 5" />
						<YAxis
							tickCount={11}
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
						<Tooltip content={<CustomizedToolTip />} />
						<Tooltip />
						<Legend />
						<Line
							type="monotone"
							dataKey="history"
							stroke="#7a7a7a"
							dot={false}
						/>
						<Line
							type="monotone"
							dataKey="prediction"
							stroke="#bd1b21"
							dot={false}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}

export default StockGraphCard;
export type { DataType, StockCardProps };
