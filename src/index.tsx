import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
	HomePage,
	NotFoundPage,
	PredictionsPage,
	StockDetailPage,
	StocksPage,
	Root,
} from "./pages";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/predictions",
				element: <PredictionsPage />,
			},

			{
				path: "/stocks",
				element: <StocksPage />,
			},
			{
				path: "/stocks/:symbol",
				element: <StockDetailPage />,
			},
			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
]);

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
