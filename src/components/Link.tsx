import React from "react";
import { Link as RouterLink } from "react-router-dom";

type LinkProps = {
	text: string;
	to: string;
};
function Link(props: LinkProps) {
	const { text, to } = props;
	return (
		<RouterLink className="neumo neumo-out p-5" to={to}>
			{text}
		</RouterLink>
	);
}

export default Link;
