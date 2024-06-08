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
			<div className="neumo neumo-out p-2 text-xs opacity-75">
				<p
					style={{
						color: payload.sort(
							(a: any, b: any) => b.value - a.value
						)[0].color,
					}}
				>
					{label.toISOString().slice(0, 10)}:&nbsp;
				</p>
				{payload.map((el: any) => (
					<p key={el.name} style={{ color: el.color }}>
						{el.name}: {el.value}
					</p>
				))}
			</div>
		);
	}
	return null;
}

export default CustomizedToolTip;
