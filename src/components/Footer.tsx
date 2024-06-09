import { Link } from "react-router-dom";

function Footer() {
	return (
		<footer className="flex p-4 text-sm neumo-in-sm rounded-none">
			<p>© 2024, All Rights Reserved</p>
			<p className="ml-auto">Made with ❤️ by the Damian Trafiałek</p>

			<Link
				to="mailto:damian.trafialek@gmail.com"
				className="ml-2 underline"
			>
				damian.trafialek@gmail.com
			</Link>
		</footer>
	);
}

export default Footer;
