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

export { makeMongoReqest };
