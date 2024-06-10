import React from "react";
import { Stock } from "../services/DataService";
import { ReactComponent as MagnifyingGlassSvg } from "../assets/svgs/magnifying-glass.svg";

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
		<div className={`flex flex-col w-full mx-auto ${className}`}>
			<label htmlFor="stock-search" className="mb-4">
				In order to quickly filter the stocks, please type the name,
				company, or symbol of the stock you are looking for.
			</label>
			<div className="flex neumo-in-sm">
				<label
					htmlFor="stock-search"
					className="flex items-center justify-center w-20"
				>
					<MagnifyingGlassSvg />
				</label>
				<input
					id="stock-search"
					type="text"
					onChange={handleChange}
					value={value}
					placeholder="Stock name, company or symbol"
					className="w-full outline-none text-sm pr-4 py-3 bg-transparent"
					aria-label="Stock search"
				/>
			</div>
		</div>
	);
}

export default SearchBar;
export { isQueryRelevant };
