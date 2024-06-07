// import { MongoClient } from "mongodb";

type DataType = {
	date: string;
	history?: number;
	prediction?: number;
};
type StockData = {
	name: string;
	symbol: string;
	data: DataType[];
};
const stocksDataMock: StockData[] = [
	{
		name: "Apple Inc.",
		symbol: "AAPL",
		data: [
			{ date: "2024-04-22", history: 156.279999 },
			{ date: "2024-04-23", history: 158.259995 },
			{ date: "2024-04-24", history: 159.130005 },
			{ date: "2024-04-25", history: 156 },
			{ date: "2024-04-26", history: 171.949997 },
			{ date: "2024-04-29", history: 166.149994 },
			{ date: "2024-04-30", history: 162.779999 },
			{ date: "2024-05-01", history: 163.860001 },
			{ date: "2024-05-02", history: 166.619995 },
			{ date: "2024-05-03", history: 167.240005 },
			{ date: "2024-05-06", history: 168.100006 },
			{ date: "2024-05-07", history: 171.25 },
			{ date: "2024-05-08", history: 169.380005 },
			{ date: "2024-05-09", history: 169.960007 },
			{ date: "2024-05-10", history: 168.649994 },
			{ date: "2024-05-13", history: 169.139999 },
			{ date: "2024-05-14", history: 170.339996 },
			{ date: "2024-05-15", history: 172.509995 },
			{ date: "2024-05-16", history: 174.179993 },
			{ date: "2024-05-17", history: 176.059998 },
			{ date: "2024-05-20", history: 176.919998 },
			{ date: "2024-05-21", history: 177.850006 },
			{ date: "2024-05-22", history: 176.380005 },
			{ date: "2024-05-23", history: 173.550003 },
			{ date: "2024-05-24", history: 174.990005 },
			{ date: "2024-05-28", history: 176.399994 },
			{ date: "2024-05-29", history: 175.899994 },
			{ date: "2024-05-30", history: 172.110001 },
			{ date: "2024-05-31", history: 172.5 },
			{ date: "2024-06-03", history: 172.565002 },
		],
	},
	{
		name: "Apple Inc.",
		symbol: "AAPL",
		data: [
			{ date: "2024-04-22", history: 156.279999 },
			{ date: "2024-04-23", history: 158.259995 },
			{ date: "2024-04-24", history: 159.130005 },
			{ date: "2024-04-25", history: 156 },
			{ date: "2024-04-26", history: 171.949997 },
			{ date: "2024-04-29", history: 166.149994 },
			{ date: "2024-04-30", history: 162.779999 },
			{ date: "2024-05-01", history: 163.860001 },
			{ date: "2024-05-02", history: 166.619995 },
			{ date: "2024-05-03", history: 167.240005 },
			{ date: "2024-05-06", history: 168.100006 },
			{ date: "2024-05-07", history: 171.25 },
			{ date: "2024-05-08", history: 169.380005 },
			{ date: "2024-05-09", history: 169.960007 },
			{ date: "2024-05-10", history: 168.649994 },
			{ date: "2024-05-13", history: 169.139999 },
			{ date: "2024-05-14", history: 170.339996 },
			{ date: "2024-05-15", history: 172.509995 },
			{ date: "2024-05-16", history: 174.179993 },
			{ date: "2024-05-17", history: 176.059998 },
			{ date: "2024-05-20", history: 176.919998 },
			{ date: "2024-05-21", history: 177.850006 },
			{ date: "2024-05-22", history: 176.380005 },
			{ date: "2024-05-23", history: 173.550003 },
			{ date: "2024-05-24", history: 174.990005 },
			{ date: "2024-05-28", history: 176.399994 },
			{ date: "2024-05-29", history: 175.899994 },
			{ date: "2024-05-30", history: 172.110001 },
			{ date: "2024-05-31", history: 172.5 },
			{ date: "2024-06-03", history: 172.565002 },
		],
	},
	{
		name: "Apple Inc.",
		symbol: "AAPL",
		data: [
			{ date: "2024-04-22", history: 156.279999 },
			{ date: "2024-04-23", history: 158.259995 },
			{ date: "2024-04-24", history: 159.130005 },
			{ date: "2024-04-25", history: 156 },
			{ date: "2024-04-26", history: 171.949997 },
			{ date: "2024-04-29", history: 166.149994 },
			{ date: "2024-04-30", history: 162.779999 },
			{ date: "2024-05-01", history: 163.860001 },
			{ date: "2024-05-02", history: 166.619995 },
			{ date: "2024-05-03", history: 167.240005 },
			{ date: "2024-05-06", history: 168.100006 },
			{ date: "2024-05-07", history: 171.25 },
			{ date: "2024-05-08", history: 169.380005 },
			{ date: "2024-05-09", history: 169.960007 },
			{ date: "2024-05-10", history: 168.649994 },
			{ date: "2024-05-13", history: 169.139999 },
			{ date: "2024-05-14", history: 170.339996 },
			{ date: "2024-05-15", history: 172.509995 },
			{ date: "2024-05-16", history: 174.179993 },
			{ date: "2024-05-17", history: 176.059998 },
			{ date: "2024-05-20", history: 176.919998 },
			{ date: "2024-05-21", history: 177.850006 },
			{ date: "2024-05-22", history: 176.380005 },
			{ date: "2024-05-23", history: 173.550003 },
			{ date: "2024-05-24", history: 174.990005 },
			{ date: "2024-05-28", history: 176.399994 },
			{ date: "2024-05-29", history: 175.899994 },
			{ date: "2024-05-30", history: 172.110001 },
			{ date: "2024-05-31", history: 172.5 },
			{ date: "2024-06-03", history: 172.565002 },
		],
	},
	{
		name: "Apple Inc.",
		symbol: "AAPL",
		data: [
			{ date: "2024-04-22", history: 156.279999 },
			{ date: "2024-04-23", history: 158.259995 },
			{ date: "2024-04-24", history: 159.130005 },
			{ date: "2024-04-25", history: 156 },
			{ date: "2024-04-26", history: 171.949997 },
			{ date: "2024-04-29", history: 166.149994 },
			{ date: "2024-04-30", history: 162.779999 },
			{ date: "2024-05-01", history: 163.860001 },
			{ date: "2024-05-02", history: 166.619995 },
			{ date: "2024-05-03", history: 167.240005 },
			{ date: "2024-05-06", history: 168.100006 },
			{ date: "2024-05-07", history: 171.25 },
			{ date: "2024-05-08", history: 169.380005 },
			{ date: "2024-05-09", history: 169.960007 },
			{ date: "2024-05-10", history: 168.649994 },
			{ date: "2024-05-13", history: 169.139999 },
			{ date: "2024-05-14", history: 170.339996 },
			{ date: "2024-05-15", history: 172.509995 },
			{ date: "2024-05-16", prediction: 174.179993 },
			{ date: "2024-05-17", prediction: 176.059998 },
			{ date: "2024-05-20", prediction: 176.919998 },
			{ date: "2024-05-21", prediction: 177.850006 },
			{ date: "2024-05-22", prediction: 176.380005 },
			{ date: "2024-05-23", prediction: 173.550003 },
			{ date: "2024-05-24", prediction: 174.990005 },
			{ date: "2024-05-28", prediction: 176.399994 },
			{ date: "2024-05-29", prediction: 175.899994 },
			{ date: "2024-05-30", prediction: 172.110001 },
			{ date: "2024-05-31", prediction: 172.5 },
			{ date: "2024-06-03", prediction: 172.565002 },
		],
	},
	{
		name: "Apple Inc.",
		symbol: "AAPL",
		data: [
			{ date: "2024-04-22", history: 156.279999 },
			{ date: "2024-04-23", history: 158.259995 },
			{ date: "2024-04-24", history: 159.130005 },
			{ date: "2024-04-25", history: 156 },
			{ date: "2024-04-26", history: 171.949997 },
			{ date: "2024-04-29", history: 166.149994 },
			{ date: "2024-04-30", history: 162.779999 },
			{ date: "2024-05-01", history: 163.860001 },
			{ date: "2024-05-02", history: 166.619995 },
			{ date: "2024-05-03", history: 167.240005 },
			{ date: "2024-05-06", history: 168.100006 },
			{ date: "2024-05-07", history: 171.25 },
			{ date: "2024-05-08", history: 169.380005 },
			{ date: "2024-05-09", history: 169.960007 },
			{ date: "2024-05-10", history: 168.649994 },
			{ date: "2024-05-13", history: 169.139999 },
			{ date: "2024-05-14", history: 170.339996 },
			{ date: "2024-05-15", history: 172.509995 },
			{ date: "2024-05-16", history: 174.179993 },
			{ date: "2024-05-17", history: 176.059998 },
			{ date: "2024-05-20", history: 176.919998 },
			{ date: "2024-05-21", history: 177.850006 },
			{ date: "2024-05-22", history: 176.380005 },
			{ date: "2024-05-23", history: 173.550003 },
			{ date: "2024-05-24", history: 174.990005 },
			{ date: "2024-05-28", history: 176.399994 },
			{ date: "2024-05-29", history: 175.899994 },
			{ date: "2024-05-30", history: 172.110001 },
			{ date: "2024-05-31", history: 172.5 },
			{ date: "2024-06-03", history: 172.565002 },
		],
	},
	{
		name: "Apple Inc.",
		symbol: "AAPL",
		data: [
			{ date: "2024-04-22", history: 156.279999 },
			{ date: "2024-04-23", history: 158.259995 },
			{ date: "2024-04-24", history: 159.130005 },
			{ date: "2024-04-25", history: 156 },
			{ date: "2024-04-26", history: 171.949997 },
			{ date: "2024-04-29", history: 166.149994 },
			{ date: "2024-04-30", history: 162.779999 },
			{ date: "2024-05-01", history: 163.860001 },
			{ date: "2024-05-02", history: 166.619995 },
			{ date: "2024-05-03", history: 167.240005 },
			{ date: "2024-05-06", history: 168.100006 },
			{ date: "2024-05-07", history: 171.25 },
			{ date: "2024-05-08", history: 169.380005 },
			{ date: "2024-05-09", history: 169.960007 },
			{ date: "2024-05-10", history: 168.649994 },
			{ date: "2024-05-13", history: 169.139999 },
			{ date: "2024-05-14", history: 170.339996 },
			{ date: "2024-05-15", history: 172.509995 },
			{ date: "2024-05-16", history: 174.179993 },
			{ date: "2024-05-17", history: 176.059998 },
			{ date: "2024-05-20", history: 176.919998 },
			{ date: "2024-05-21", history: 177.850006 },
			{ date: "2024-05-22", history: 176.380005 },
			{ date: "2024-05-23", history: 173.550003 },
			{ date: "2024-05-24", history: 174.990005 },
			{ date: "2024-05-28", history: 176.399994 },
			{ date: "2024-05-29", history: 175.899994 },
			{ date: "2024-05-30", history: 172.110001 },
			{ date: "2024-05-31", history: 172.5 },
			{ date: "2024-06-03", history: 172.565002 },
		],
	},
	{
		name: "Apple Inc.",
		symbol: "AAPL",
		data: [
			{ date: "2024-04-22", history: 156.279999 },
			{ date: "2024-04-23", history: 158.259995 },
			{ date: "2024-04-24", history: 159.130005 },
			{ date: "2024-04-25", history: 156 },
			{ date: "2024-04-26", history: 171.949997 },
			{ date: "2024-04-29", history: 166.149994 },
			{ date: "2024-04-30", history: 162.779999 },
			{ date: "2024-05-01", history: 163.860001 },
			{ date: "2024-05-02", history: 166.619995 },
			{ date: "2024-05-03", history: 167.240005 },
			{ date: "2024-05-06", history: 168.100006 },
			{ date: "2024-05-07", history: 171.25 },
			{ date: "2024-05-08", history: 169.380005 },
			{ date: "2024-05-09", history: 169.960007 },
			{ date: "2024-05-10", history: 168.649994 },
			{ date: "2024-05-13", history: 169.139999 },
			{ date: "2024-05-14", history: 170.339996 },
			{ date: "2024-05-15", history: 172.509995 },
			{ date: "2024-05-16", history: 174.179993 },
			{ date: "2024-05-17", history: 176.059998 },
			{ date: "2024-05-20", history: 176.919998 },
			{ date: "2024-05-21", history: 177.850006 },
			{ date: "2024-05-22", history: 176.380005 },
			{ date: "2024-05-23", history: 173.550003 },
			{ date: "2024-05-24", history: 174.990005 },
			{ date: "2024-05-28", history: 176.399994 },
			{ date: "2024-05-29", history: 175.899994 },
			{ date: "2024-05-30", history: 172.110001 },
			{ date: "2024-05-31", history: 172.5 },
			{ date: "2024-06-03", history: 172.565002 },
		],
	},
	{
		name: "Apple Inc.",
		symbol: "AAPL",
		data: [
			{ date: "2024-04-22", history: 156.279999 },
			{ date: "2024-04-23", history: 158.259995 },
			{ date: "2024-04-24", history: 159.130005 },
			{ date: "2024-04-25", history: 156 },
			{ date: "2024-04-26", history: 171.949997 },
			{ date: "2024-04-29", history: 166.149994 },
			{ date: "2024-04-30", history: 162.779999 },
			{ date: "2024-05-01", history: 163.860001 },
			{ date: "2024-05-02", history: 166.619995 },
			{ date: "2024-05-03", history: 167.240005 },
			{ date: "2024-05-06", history: 168.100006 },
			{ date: "2024-05-07", history: 171.25 },
			{ date: "2024-05-08", history: 169.380005 },
			{ date: "2024-05-09", history: 169.960007 },
			{ date: "2024-05-10", history: 168.649994 },
			{ date: "2024-05-13", history: 169.139999 },
			{ date: "2024-05-14", history: 170.339996 },
			{ date: "2024-05-15", history: 172.509995 },
			{ date: "2024-05-16", prediction: 174.179993 },
			{ date: "2024-05-17", prediction: 176.059998 },
			{ date: "2024-05-20", prediction: 176.919998 },
			{ date: "2024-05-21", prediction: 177.850006 },
			{ date: "2024-05-22", prediction: 176.380005 },
			{ date: "2024-05-23", prediction: 173.550003 },
			{ date: "2024-05-24", prediction: 174.990005 },
			{ date: "2024-05-28", prediction: 176.399994 },
			{ date: "2024-05-29", prediction: 175.899994 },
			{ date: "2024-05-30", prediction: 172.110001 },
			{ date: "2024-05-31", prediction: 172.5 },
			{ date: "2024-06-03", prediction: 172.565002 },
		],
	},
];

// const connectToMongo = async (): Promise<MongoClient> => {
// 	const {
// 		REACT_APP_DB_USER,
// 		REACT_APP_DB_PASSWORD,
// 		REACT_APP_CLUSTER_NAME,
// 		REACT_APP_DB_NAME,
// 	} = process.env;
// 	const uri = `mongodb+srv://${REACT_APP_DB_USER}:${REACT_APP_DB_PASSWORD}@${REACT_APP_CLUSTER_NAME}.m7l3ilv.mongodb.net/${REACT_APP_DB_NAME}?retryWrites=true&w=majority`;
// 	const client = new MongoClient(uri);
// 	await client.connect();
// 	return client;
// };

const getAllStocks = async () => {
	const {
		REACT_APP_CLUSTER_NAME,
		REACT_APP_DB_NAME,
		REACT_APP_API_KEY,
		REACT_APP_ENV,
	} = process.env;

	const proxy =
		REACT_APP_ENV === "dev" ? "https://cors-anywhere.herokuapp.com/" : "";
	const url = `${proxy}https://eu-central-1.aws.data.mongodb-api.com/app/data-udefxog/endpoint/data/v1/action/find`;
	const data = {
		collection: "stocks-v2",
		database: REACT_APP_DB_NAME || "",
		dataSource: REACT_APP_CLUSTER_NAME || "",
	};

	const headers = {
		"Content-Type": "application/json",
		"Access-Control-Request-Headers": "*",
		"Acess-Control-Allow-Origin": "localhost:3000",
		"api-key": REACT_APP_API_KEY || "",
	};

	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify(data),
		// mode: "no-cors",
		headers: headers,
	});

	return response.json();
};

const getGenerationByDate = async (date: Date) => {
	const {
		REACT_APP_CLUSTER_NAME,
		REACT_APP_DB_NAME,
		REACT_APP_API_KEY,
		REACT_APP_ENV,
	} = process.env;

	const proxy =
		REACT_APP_ENV === "dev" ? "https://cors-anywhere.herokuapp.com/" : "";
	const url = `${proxy}https://eu-central-1.aws.data.mongodb-api.com/app/data-udefxog/endpoint/data/v1/action/findOne`;
	const data = {
		collection: "generations-v2",
		database: REACT_APP_DB_NAME || "",
		dataSource: REACT_APP_CLUSTER_NAME || "",
		filter: {
			// date: {
			// 	$gte: new Date(date.toISOString()), // Match documents where 'date' is greater than or equal to the specified date
			// 	$lt: new Date(
			// 		date.getTime() + 24 * 60 * 60 * 1000
			// 	).toISOString(), // Match documents where 'date' is less than the next day
			// },
		},
	};

	const headers = {
		"Content-Type": "application/json",
		"Access-Control-Request-Headers": "*",
		"api-key": REACT_APP_API_KEY || "",
	};

	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify(data),
		headers: headers,
	});

	return response.json();
};

const getPredictionsByIds = async (predictionIds: string[]) => {};

const getStocksData = async (date: Date): Promise<StockData[]> => {
	// const client = await connectToMongo();
	// const stocks = await getAllStocks();
	// console.log(stocks);
	// const generation = await getGenerationByDate(date);
	// console.log(generation);
	// const predictions = await getPredictionsByIds(generation.predictions);

	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(stocksDataMock);
		}, 2000);
	});
};

export { getStocksData };
export type { StockData, DataType };
