import {
	ResponsiveContainer,
	LineChart,
	XAxis,
	CartesianGrid,
	YAxis,
	Tooltip,
	Legend,
	Line,
} from "recharts";
import CustomizedToolTip from "./CustomizedToolTip";

type DataType = {
	date: Date;
	history?: number;
	prediction?: number;
};

type GraphProps = {
	className?: string;
	data: DataType[];
	exclude?: string[];
};

function transformData(data: DataType[]) {
	const transformedData: DataType[] = [];

	data.sort(
		(a: DataType, b: DataType) => a.date.getTime() - b.date.getTime()
	).forEach((el) => {
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
	return transformedData;
}

function Graph(props: GraphProps) {
	const { data, exclude = [], className } = props;
	const transformedData: DataType[] = transformData(data);

	return (
		<ResponsiveContainer
			className={`my-2 pr-4 ${className}`}
			height={400}
			width={"100%"}
		>
			<LineChart data={transformedData}>
				<XAxis
					dataKey="date"
					tickFormatter={(date: DataType["date"]) =>
						date.toISOString().slice(0, 10)
					}
					fontSize={12}
				/>
				<CartesianGrid stroke="#eee" strokeDasharray="5 5" />
				<YAxis
					tickCount={11}
					domain={[
						Math.floor(
							Math.min(
								...data.map(
									(el) => el.history || el.prediction || 0
								)
							) * 0.95
						),
						Math.ceil(
							Math.max(
								...data.map(
									(el) => el.history || el.prediction || 0
								)
							) * 1.05
						),
					]}
				/>
				<Tooltip content={<CustomizedToolTip />} />
				<Legend />
				{exclude?.indexOf("history") === -1 && (
					<Line
						type="monotone"
						dataKey="history"
						stroke="#7a7a7a"
						dot={false}
					/>
				)}
				{exclude?.indexOf("prediction") === -1 && (
					<Line
						type="monotone"
						dataKey="prediction"
						stroke="#bd1b21"
						dot={false}
					/>
				)}
			</LineChart>
		</ResponsiveContainer>
	);
}

export default Graph;
export type { DataType };
