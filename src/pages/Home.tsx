import React from "react";
import Link from "../components/Link";

function Home() {
	return (
		<div className="container mx-auto flex flex-col">
			<h1 className="neumo-out">Home</h1>
			<p>This is the Home page.</p>

			<Link text="About" to="/about" />
		</div>
	);
}

export default Home;
