import React from "react";
import Link from "../components/Link";

function HomePage() {
	return (
		<div className="container mx-auto flex flex-col">
			<h1 className="neumo-out">HomePage</h1>
			<p>This is the Home page.</p>

			<Link text="About" to="/about" />
			<Link text="Predictions Overview" to="/predictions" />
		</div>
	);
}

export default HomePage;
