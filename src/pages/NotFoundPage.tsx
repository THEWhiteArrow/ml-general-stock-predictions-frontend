import { Helmet } from "react-helmet";
import CustomLink from "../components/CustomLink";

export default function Example() {
	return (
		<>
			<Helmet
				title="404 | GSP"
				meta={[
					{
						name: "description",
						content: "Page not found",
					},
				]}
			/>
			<div className="container mx-auto flex flex-col items-center justify-center h-full text-sm md:text-base">
				<p className="text-base font-semibold">404</p>
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
					Page not found
				</h1>
				<p className="mt-6 text-center leading-7 text-gray-600">
					Sorry, currently the page you are looking for is not
					available.
				</p>
				<p className="mt-6 text-center leading-7 text-gray-600">
					If you think this is a mistake, please contact me at the
					email address:&nbsp;
					<a
						href="mailto:damian.trafialek@gmail.com"
						target="_blank"
						rel="noopener noreferrer"
						className="underline neumo-text-error"
					>
						damian.trafialek@gmail.com
					</a>
				</p>
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<CustomLink
						to="/"
						text="← Bring me back home"
						className="p-2 md:p-4"
					/>
				</div>
			</div>
		</>
	);
}
