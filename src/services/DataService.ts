type DataType = {
	date: Date;
	history?: number;
	prediction?: number;
};
type StockData = {
	name: string;
	symbol: string;
	data: DataType[];
};

const getAllStocks = async () => {
	const url = "/api/stocks";

	const response = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.error);
	}

	return data;
};

const getGenerationByDate = async (date: Date) => {
	const query = {
		date: `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(
			-2
		)}-${("0" + date.getDate()).slice(-2)}`,
	};

	const url = `/api/generations?${new URLSearchParams(query)}`;
	const response = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.error);
	}

	return data;
};

const getStocksData = async (date: Date): Promise<StockData[]> => {
	const stocksResponse = await getAllStocks();
	const generationsResponse = await getGenerationByDate(date);
	// const historyResponse = await getHistoryByDateOffset();

	// TODO: handle request errors

	console.log(stocksResponse);
	console.log(generationsResponse);
	let stocksData: StockData[] = [];

	stocksData = stocksResponse.stocks?.map((stock: any) => {
		const stockData: StockData = {
			name: stock.company,
			symbol: stock.symbol,
			data: [],
		};

		generationsResponse.generation?.predictions
			.filter((p: any) => p.stock === stock._id)
			.forEach((p: any) => {
				stockData.data.push({
					date: p.date.slice(0, 10),
					prediction: p.close,
				});
			});

		return stockData;
	});

	return stocksData;
};

export { getStocksData };
export type { StockData, DataType };
