import CustomLink from "../components/CustomLink";

function HomePage() {
	return (
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
							The platform that will help you invest in the stock
							markets thanks to the power of AI.
						</p>
						<div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-x-6">
							<CustomLink
								to="/stocks"
								text="← See all stocks"
								className="p-4 w-48 my-2"
								aria-label="See all stocks"
							/>
							<CustomLink
								to="/how"
								text="?? How ??"
								className="p-4 w-48 my-2"
								aria-label="How it works"
							/>
							<CustomLink
								to="/predictions"
								text="See predictions →"
								className="p-4 w-48 my-2"
								aria-label="See predictions"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default HomePage;
