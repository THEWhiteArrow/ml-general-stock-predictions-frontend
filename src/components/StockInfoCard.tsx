import Accordion from "./Accordion";

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
			<div className="m-4 neumo-out flex flex-col p-2 flex-grow">
				<Accordion title={`${company} | ${symbol}`}>
					<div className="neumo-in mt-4 p-4 divide-y">
						<p>
							Main industry :{" "}
							{area.replaceAll("_", " ").toLocaleLowerCase()}
						</p>
						<hr
							style={{
								height: "2px",
								backgroundColor: "#00000055",
								width: "100%",
							}}
						/>
						<p>{description}</p>
					</div>
				</Accordion>
			</div>
		</div>
	);
}

export default StockInfoCard;
