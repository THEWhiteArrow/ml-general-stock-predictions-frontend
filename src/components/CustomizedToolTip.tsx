import React from "react";

type CustomizedToolTipProps = {
	active?: boolean;
	payload?: any;
	label?: any;
};

function CustomizedToolTip(props: CustomizedToolTipProps) {
	const { active, payload, label } = props;
	if (active && payload && payload.length) {
		return (
			<p className="neumo neumo-out p-2 text-xs opacity-50">
				{label} : {payload[0].value}
			</p>
		);
	}
	return null;
}

export default CustomizedToolTip;
