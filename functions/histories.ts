import { makeMongoRequest } from "../utils/mongo";

exports.handler = async (event, context) => {
	const {
		REACT_APP_CLUSTER_NAME,
		REACT_APP_DB_NAME,
		REACT_APP_API_KEY,
		REACT_APP_API_URL,
		REACT_APP_HISTORY_COLLECTION,
	} = process.env;

	let { start, end, stockId } = event.queryStringParameters;

	if (!start) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				error: "Missing start parameter",
			}),
		};
	}

	const startDate = new Date(start);
	const endDate = end ? new Date(end) : new Date();

	startDate.setUTCHours(0, 0, 0, 0);
	endDate.setUTCHours(0, 0, 0, 0);

	const datesDiffInDays = Math.floor(
		(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
	);

	if (datesDiffInDays > 365 && !stockId) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				error: "Dates range should be less than 365 days without stockId",
			}),
		};
	}

	const filter = {
		date: {
			$gte: {
				$date: startDate,
			},
			$lte: {
				$date: endDate,
			},
		},
		stock: stockId ? { $eq: { $oid: stockId } } : { $exists: true },
	};

	const histories = await makeMongoRequest(
		REACT_APP_HISTORY_COLLECTION,
		REACT_APP_DB_NAME,
		REACT_APP_CLUSTER_NAME,
		REACT_APP_API_URL,
		"action/find",
		REACT_APP_API_KEY,
		filter,
		false,
		{
			projection: {
				stock: 1,
				close: 1,
				date: 1,
			},
			sort: {
				date: 1,
			},
			limit: 50 * 1000,
		}
	);

	return {
		statusCode: 200,
		body: JSON.stringify({
			startDate,
			endDate,
			stockId: stockId || null,
			histories: histories.documents || [],
		}),
	};
};
