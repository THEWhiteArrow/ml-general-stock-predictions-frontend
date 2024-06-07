exports.handler = async (event, context) => {
	const {
		REACT_APP_CLUSTER_NAME,
		REACT_APP_DB_NAME,
		REACT_APP_API_KEY,
		REACT_APP_API_URL,
		REACT_APP_STOCKS_COLLECTION,
		REACT_APP_GENERATION_COLLECTION,
		REACT_APP_HISTORY_COLLECTION,
		REACT_APP_PREDICTION_COLLECTION,
	} = process.env;

	const { date } = event.queryStringParameters;

	if (!date) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				error: "Missing date parameter",
			}),
		};
	}

	const generation = await makeMongoReqest(
		REACT_APP_GENERATION_COLLECTION,
		REACT_APP_DB_NAME,
		REACT_APP_CLUSTER_NAME,
		REACT_APP_API_URL,
		"action/findOne",
		REACT_APP_API_KEY,
		{
			run_date: date,
		}
	);

	const predictionIds: string[] =
		generation?.document?.predictions.map((el) => ({
			$oid: el,
		})) || [];

	const prediction = await makeMongoReqest(
		REACT_APP_PREDICTION_COLLECTION,
		REACT_APP_DB_NAME,
		REACT_APP_CLUSTER_NAME,
		REACT_APP_API_URL,
		"action/find",
		REACT_APP_API_KEY,
		{
			_id: { $in: predictionIds },
		}
	);

	if (!generation.document) {
		return {
			statusCode: 404,
			body: JSON.stringify({
				error: "No data found for requested generation date",
			}),
		};
	}

	const stocks = await makeMongoReqest(
		REACT_APP_STOCKS_COLLECTION,
		REACT_APP_DB_NAME,
		REACT_APP_CLUSTER_NAME,
		REACT_APP_API_URL,
		"action/find",
		REACT_APP_API_KEY
	);

	return {
		statusCode: 200,
		body: JSON.stringify({
			date: date,
			gen2: generation,
			stocks: stocks.documents,
			generation: {
				...generation.document,
				predictions: prediction.documents,
			},
		}),
	};
};

const makeMongoReqest = async (
	collection: string = "",
	database: string = "",
	cluster: string = "",
	base_url: string = "",
	endpoint: string,
	apiKey: string = "",
	filter: object = {},
	bson: boolean = false
) => {
	const url = `${base_url}/${endpoint}`;

	const data = {
		collection: collection,
		database: database,
		dataSource: cluster,
		filter: filter,
	};

	const headers = {
		"Content-Type": "application/json",
		Accept: bson ? "application/ejson" : "application/json",
		"Access-Control-Request-Headers": "*",
		"api-key": apiKey,
	};

	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify(data),
		headers: headers,
	});

	return response.json();
};
