import { makeMongoRequest } from "../utils/mongo";

exports.handler = async (event, context) => {
	const { stockId, symbol } = event.queryStringParameters;

	const {
		REACT_APP_CLUSTER_NAME,
		REACT_APP_DB_NAME,
		REACT_APP_API_KEY,
		REACT_APP_API_URL,
		REACT_APP_STOCKS_COLLECTION,
	} = process.env;

	const filter = {
		_id: stockId ? { $oid: stockId } : { $exists: true },
		symbol: symbol || { $exists: true },
	};

	const stocks = await makeMongoRequest(
		REACT_APP_STOCKS_COLLECTION,
		REACT_APP_DB_NAME,
		REACT_APP_CLUSTER_NAME,
		REACT_APP_API_URL,
		"action/find",
		REACT_APP_API_KEY,
		filter
	);

	return {
		statusCode: 200,
		body: JSON.stringify({ stocks: stocks.documents || [] }),
	};
};
