import { Helmet } from "react-helmet";
import CustomLink from "../components/CustomLink";

function HomePage() {
	return (
		<>
			<Helmet>
				<title>General Stock Predictions</title>
				<meta
					name="description"
					content="The platform that will help you invest in the stock markets thanks to the power of AI."
				/>
				<link rel="icon" href="/favicon.ico" type="image/x-icon" />

				{/* Open Graph meta tags for social media */}
				<meta property="og:title" content="General Stock Predictions" />
				<meta
					property="og:description"
					content="The platform that will help you invest in the stock markets thanks to the power of AI."
				/>
				<meta property="og:image" content="/homepage-thumbnail.png" />
				<meta property="og:url" content="http://gsp.trafialek.com" />
				<meta property="og:type" content="website" />
			</Helmet>
			<section className="flex flex-grow justify-center items-center">
				<div className="relative isolate px-6 lg:px-8">
					<div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
						<div className="hidden sm:mb-8 sm:flex sm:justify-center">
							<div className="">
								Made with{" "}
								<span className="neumo-text-error">♥</span> by
								Damian Trafiałek
							</div>
						</div>
						<div className="text-center">
							<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
								General Stock
								<br />
								Predictions
							</h1>
							<p className="mt-6 text-lg leading-8 text-gray-600">
								The platform that will help you invest in the
								stock markets thanks to the power of AI.
							</p>
							<div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-x-6">
								<CustomLink
									to="/stocks"
									text="← See all stocks"
									className="p-2 md:p-4 text-sm w-44 md:text-base md:w-48 my-2"
									aria-label="See all stocks"
								/>
								<CustomLink
									to="/how"
									text="?? How ??"
									className="p-2 md:p-4 text-sm w-44 md:text-base md:w-48 my-2"
									aria-label="How it works"
								/>
								<CustomLink
									to="/predictions"
									text="See predictions →"
									className="p-2 md:p-4 text-sm w-44 md:text-base md:w-48 my-2"
									aria-label="See predictions"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default HomePage;
