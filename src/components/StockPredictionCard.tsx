import { Link } from "react-router-dom";
import { ReactComponent as EyeSvg } from "../assets/svgs/eye.svg";
import Graph, { DataType } from "./Graph";

type StockPredictionCardProps = {
	className?: string;
	company: string;
	symbol: string;
	area: string;
	data: DataType[];
	skipTransform?: boolean;
};

function StockPredictionCard(props: StockPredictionCardProps) {
	const { className, company, symbol, data, skipTransform } = props;

	return (
		<div className={`flex ${className} px-0 py-6 md:p-6`}>
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

				<Graph data={data} skipTransform={skipTransform} />
			</div>
		</div>
	);
}

export default StockPredictionCard;
export type { DataType };
