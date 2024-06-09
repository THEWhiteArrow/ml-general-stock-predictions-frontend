import { Link } from "react-router-dom";
import { ReactComponent as EyeSvg } from "../assets/eye.svg";
import Graph, { DataType } from "./Graph";

type StockPredictionCardProps = {
	className?: string;
	company: string;
	symbol: string;
	area: string;
	data: DataType[];
};

function StockPredictionCard(props: StockPredictionCardProps) {
	const { className, company, area, symbol, data } = props;

	return (
		<div className={`flex ${className} p-6`}>
			<div className="neumo neumo-out w-full h-full flex flex-col items-center">
				<div className="text-sm md:text-base neumo-out py-4 px-4 flex-grow flex w-full items-center justify-between">
					<h3>{company}</h3>
					<Link
						to={`/stocks/${symbol}`}
						className="neumo neumo-out neumo-interactive p-2 flex flex-row items-center gap-2"
					>
						View
						<EyeSvg />
					</Link>
				</div>

				<Graph data={data} />
			</div>
		</div>
	);
}

export default StockPredictionCard;
export type { DataType };
