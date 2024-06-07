import { useState, useEffect } from "react";

interface EnvVars {
	REACT_APP_DB_USER?: string;
	REACT_APP_DB_PASSWORD?: string;
	REACT_APP_CLUSTER_NAME?: string;
	REACT_APP_DB_NAME?: string;
}

function useEnvVars() {
	const [envVars, setEnvVars] = useState<EnvVars>({});

	useEffect(() => {
		const env: EnvVars = {
			REACT_APP_DB_USER: process.env.REACT_APP_DB_USER,
			REACT_APP_DB_PASSWORD: process.env.REACT_APP_DB_PASSWORD,
			REACT_APP_CLUSTER_NAME: process.env.REACT_APP_CLUSTER_NAME,
			REACT_APP_DB_NAME: process.env.REACT_APP_DB_NAME,
		};
		setEnvVars(env);
	}, []);

	return envVars;
}

export default useEnvVars;
