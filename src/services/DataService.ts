type Stock = {
	_id: string;
	area: string;
	company: string;
	symbol: string;
	description: string;
};

type StocksResponse = {
	stocks: Stock[];
};

type History = {
	_id: string;
	date: string;
	close: number;
	stock: string;
};

type HistoryResponse = {
	stockId?: string;
	histories: History[];
};

type Prediction = {
	_id: string;
	close: number;
	date: string;
	stock: string;
};

type Generation = {
	_id: string;
	categorical_features: string[];
	created_at: string;
	date: string;
	days_back_to_consider: number;
	hyper_params: object;
	label_features: string[];
	mwms: number[];
	n_step: number;
	name: string;
	shifts: number[];
	predictions: Prediction[];
};

type GenerationResponse = {
	generation: Generation;
};

type GetAllStocksConfig = {
	description?: boolean;
};

const getAllStocks = async (
	config: GetAllStocksConfig = { description: false }
): Promise<StocksResponse> => {
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

	data.stocks = data.stocks.map((stock: Stock) => ({
		...stock,
		description: "No description fetched.",
	}));

	if (config.description) {
		const companies = data.stocks.map((stock: Stock) => stock.company);
		const descriptionPromises = companies.map((company: string) =>
			fetch(
				`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
					company
				)}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
		);
		const responses = await Promise.all(descriptionPromises);

		const descriptions = await Promise.all(
			responses.map(async (response, index) => {
				if (!response.ok) {
					return "Failed to fetch the description.";
				}
				const data = await response.json();
				return data.extract;
			})
		);

		data.stocks = data.stocks.map((stock: Stock, index: number) => ({
			...stock,
			description: descriptions[index],
		}));
	}

	return data;
};

const getGeneration = async (date: Date): Promise<GenerationResponse> => {
	const query = {
		date: date.toISOString().slice(0, 10),
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

const getHistory = async (
	start: Date,
	end?: Date,
	stockId?: string
): Promise<HistoryResponse> => {
	const query = {
		start: start.toISOString(),
		end: end?.toISOString() ?? "",
		stockId: stockId ?? "",
	};

	const url = `/api/histories?${new URLSearchParams(query)}`;
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

export { getAllStocks, getGeneration, getHistory };
export type {
	Stock,
	StocksResponse,
	History,
	HistoryResponse,
	Prediction,
	Generation,
	GenerationResponse,
};
