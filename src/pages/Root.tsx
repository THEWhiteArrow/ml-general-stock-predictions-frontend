import React from "react";
import { Outlet } from "react-router-dom";
function Root() {
	return (
		<div className="h-full neumo">
			<Outlet />
		</div>
	);
}

export default Root;
