type Stock = {
	_id: string;
	area: string;
	company: string;
	symbol: string;
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

const getAllStocks = async (): Promise<StocksResponse> => {
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

const getGeneration = async (date: Date): Promise<GenerationResponse> => {
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
