import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export class Root extends Component {
	render() {
		return (
			<main className="neumo flex flex-grow">
				<Navbar />
				<div className="mt-[72px] flex flex-grow">
					<Outlet />
				</div>
			</main>
		);
	}
}

export default Root;
