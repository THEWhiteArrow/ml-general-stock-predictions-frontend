import { makeMongoReqest } from "../utils/mongo";

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

	let predictions = prediction.documents;

	if (stockId) predictions = predictions.filter((el) => el.stock === stockId);

	return {
		statusCode: 200,
		body: JSON.stringify({
			generation: {
				...generation.document,
				predictions: predictions,
			},
		}),
	};
};
