function Footer() {
	return (
		<footer className="flex flex-col text-xs md:text-sm md:flex-row md:justify-evenly p-4 neumo-in-sm rounded-none mt-8">
			<p>© 2024, All Rights Reserved</p>
			<p className="pt-2 md:pt-0">Made with ❤️ by the Damian Trafiałek</p>

			<a
				className="pt-2 md:pt-0 underline neumo-text-error"
				href="mailto:damian.trafialek@gmail.com"
				aria-label="Email"
			>
				damian.trafialek@gmail.com
			</a>
		</footer>
	);
}

export default Footer;
