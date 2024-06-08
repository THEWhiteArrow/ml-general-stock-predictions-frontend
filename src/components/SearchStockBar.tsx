import React from "react";
import { Stock } from "../services/DataService";
import { ReactComponent as MagnifyingGlassSvg } from "../assets/magnifying-glass.svg";

type SearchBarProps = {
	className?: string;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
};

function isQueryRelevant(stock: Stock, searchQuery: string) {
	const query = searchQuery.toLowerCase();
	const { company, symbol, area } = stock;
	return (
		company.toLowerCase().includes(query) ||
		symbol.toLowerCase().includes(query) ||
		area.toLowerCase().includes(query)
	);
}

function SearchBar(props: SearchBarProps) {
	const { className, value, handleChange } = props;
	return (
		<div
			className={`flex flex-col w-full mx-auto font-[sans-serif] ${className}`}
		>
			<p className="mb-4">
				In order to quickly filter the stocks, please type the name,
				company or symbol of the stock you are looking for.
			</p>
			<div className="flex ">
				<input
					type="text"
					onChange={handleChange}
					value={value}
					placeholder="Stock name, company or symbol"
					className="w-full outline-none text-sm px-4 py-3 neumo neumo-in-sm"
				/>
				<button
					type="button"
					className="flex items-center justify-center px-5 neumo-out neumo-interactive"
				>
					<MagnifyingGlassSvg />
				</button>
			</div>
		</div>
	);
}

export default SearchBar;
export { isQueryRelevant };
