import { makeMongoRequest } from "../utils/mongo";

exports.handler = async (event, context) => {
	const {
		REACT_APP_CLUSTER_NAME,
		REACT_APP_DB_NAME,
		REACT_APP_API_KEY,
		REACT_APP_API_URL,
		REACT_APP_GENERATION_COLLECTION,
		REACT_APP_PREDICTION_COLLECTION,
	} = process.env;

	const { date, stockId } = event.queryStringParameters;

	if (!date) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				error: "Missing date parameter",
			}),
		};
	}

	const predictionDate = new Date(date);

	const generation = await makeMongoRequest(
		REACT_APP_GENERATION_COLLECTION,
		REACT_APP_DB_NAME,
		REACT_APP_CLUSTER_NAME,
		REACT_APP_API_URL,
		"action/findOne",
		REACT_APP_API_KEY,
		{
			date: {
				$eq: {
					$date: predictionDate,
				},
			},
		}
	);

	const predictionIds: string[] =
		generation?.document?.predictions.map((el) => ({
			$oid: el,
		})) || [];

	const filter = {
		_id: { $in: predictionIds },
		stock: stockId ? { $eq: { $oid: stockId } } : { $exists: true },
	};

	const prediction = await makeMongoRequest(
		REACT_APP_PREDICTION_COLLECTION,
		REACT_APP_DB_NAME,
		REACT_APP_CLUSTER_NAME,
		REACT_APP_API_URL,
		"action/find",
		REACT_APP_API_KEY,
		filter,
		false,
		{
			limit: 50000,
			sort: {
				date: 1,
			},
		}
	);

	if (!generation.document) {
		return {
			statusCode: 404,
			body: JSON.stringify({
				predictionDate,
				error: "No data found for requested generation date",
			}),
		};
	}

	return {
		statusCode: 200,
		body: JSON.stringify({
			predictionDate: predictionDate,
			generation: {
				...generation.document,
				predictions: prediction.documents || [],
			},
		}),
	};
};
