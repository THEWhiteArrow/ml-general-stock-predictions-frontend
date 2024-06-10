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
			<div className="container mx-auto flex flex-col items-center justify-center h-full">
				<p className="text-base font-semibold">404</p>
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
					Page not found
				</h1>
				<p className="mt-6 text-base leading-7 text-gray-600">
					Sorry, currently the page you are looking for is not
					available.
				</p>
				<p className="mt-6 text-center leading-7 text-gray-600">
					We are looking forward to extending our services, however we
					are currently experiencing shortages in our team. As a 1
					person team I am working hard to provide you with the best
					experience possible. Please be patient and check back later.
					Thank you for understanding.
				</p>
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<CustomLink
						to="/"
						text="← Bring me back home"
						className="p-4"
					/>
				</div>
			</div>
		</>
	);
}
