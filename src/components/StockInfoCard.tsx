import Accordion from "./Accordion";
import CustomLink from "./CustomLink";

type StockInfoCardProps = {
	company: string;
	symbol: string;
	area: string;
	description: string;
	className?: string;
};
function StockInfoCard(props: StockInfoCardProps) {
	const { company, symbol, area, description, className } = props;
	return (
		<div className={`${className}`}>
			<div className="my-4 neumo-out flex flex-col p-2 flex-grow">
				<Accordion title={`${company}`}>
					<div className="neumo-in mt-4 mb-1 p-4 divide-y">
						<p>
							Symbol :&nbsp;
							{symbol}
						</p>
						<hr
							style={{
								height: "2px",
								backgroundColor: "#00000055",
								width: "100%",
							}}
						/>
						<p>
							Main industry :&nbsp;
							{area.replaceAll("_", " ").toLocaleLowerCase()}
						</p>
						<hr
							style={{
								height: "2px",
								backgroundColor: "#00000055",
								width: "100%",
							}}
						/>
						<p className="mb-2">{description}</p>

						<div className="flex flex-row justify-end neumo-text-info">
							<CustomLink
								to={`/stocks/${symbol}`}
								text="Details →"
								className="p-2 md:p-4 mt-1"
							/>
						</div>
					</div>
				</Accordion>
			</div>
		</div>
	);
}

export default StockInfoCard;
