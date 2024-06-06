import React from "react";

type CustomizedToolTipProps = {
	active?: boolean;
	payload?: any;
	label?: any;
};

function CustomizedToolTip(props: CustomizedToolTipProps) {
	const { active, payload, label } = props;
	console.log("CustomizedToolTip -> payload", payload);
	if (active && payload && payload.length) {
		return (
			<div className="neumo neumo-out p-2 text-xs opacity-50">
				<p>{payload[0].name}</p>
				<p>
					{label} : {payload[0].value}
				</p>
			</div>
		);
	}
	return null;
}

export default CustomizedToolTip;
