import { HashLink } from "react-router-hash-link";
import Footer from "../components/Footer";
import { ReactComponent as EntitiesSvg } from "../assets/svgs/entities.svg";
import CustomLink from "../components/CustomLink";
import { Helmet } from "react-helmet";

const sections = [
	"Introduction",
	"Phases",
	"Data",
	"Model",
	"Persistence",
	"Pipeline",
	"Presentation",
	"Conclusion",
];

function HowPage() {
	return (
		<>
			<Helmet>
				<title>How does it work? | GSP</title>
				<meta
					name="description"
					content="A short article explaining how GSP project works"
				/>
				<link rel="icon" href="/favicon.ico" type="image/x-icon" />

				{/* Open Graph meta tags for social media */}
				<meta property="og:title" content="How does it work? | GSP" />
				<meta
					property="og:description"
					content="A short article explaining how GSP project works"
				/>
				<meta property="og:image" content="/homepage-thumbnail.png" />
				<meta
					property="og:url"
					content="http://gsp.trafialek.com/how"
				/>
				<meta property="og:type" content="website" />
			</Helmet>
			<section className="flex flex-grow text-sm md:text-base">
				<div className="container mx-auto py-6 flex flex-col h-full">
					<h1 className="neumo-out text-3xl mb-16 p-5">
						How does it work?
					</h1>

					<div className="p-4">
						<p className="italic font-bold neumo-text-error">
							Estimated reading time : ~8 minutes
						</p>
						<p className="italic">
							A short article for people interested in the
							project. It explains the main concepts and the way
							the project works.
						</p>
					</div>

					<h2 className="text-xl neumo-out p-4 mt-8">Summary</h2>
					<ol className="divide-y divide-dashed m-2 list-decimal list-outside ml-10">
						{sections.map((section) => (
							<li key={section}>
								<HashLink
									to={`#${section}`}
									className="py-2 flex hover:pl-4 neumo-hover-text-error neumo-transition-all"
								>
									{section}
								</HashLink>
							</li>
						))}
					</ol>

					<div className="pt-32" id="Introduction">
						<h2 className="text-xl neumo-out p-4">Introduction</h2>
					</div>
					<p className="mt-4">
						The project is a full-stack platform providing real-life
						stocks predictions, divided into front-end and back-end
						tiers. The back-end handles data collection, model
						creation, and forecasts using Python automation scripts.
						The front-end presents data and predictions via a web
						application built with React.js and Tailwind CSS.
						Project development was divided into four phases:
						initial predictions, persistence, presentation, and
						future improvements. Agile methodologies and the Kanban
						framework guided development. Data collection involved
						web scraping and Yahoo Finance API usage to collect and
						store stock data. The model, utilizing Linear Regression
						and a Regression Chain of XGBoost Regressors, predicts
						future stock prices. Data persistence occurs in a
						MongoDB database, following best practices for schema
						design. Automation is achieved through GitHub Actions,
						which handle data collection, transformation, model
						training, prediction generation, and data persistence.
						The front-end, hosted in the cloud, utilizes serverless
						functions for database interactions, ensuring
						scalability and security. Proper planning and
						organization were crucial for project success,
						demonstrating significant achievement for a
						single-person project.
					</p>

					<div className="pt-32" id="Phases">
						<h2 className="text-xl neumo-out p-4">Phases</h2>
					</div>
					<p className="mt-4">
						From the very begining of the project it was clear that
						it will touch many different areas of the software
						development and complex planning before-hand was crucial
						to the success of the project. It was something quite
						new for me as all the previous personal projects that I
						have developed so far were partailly lacking the
						structure and the planning. This project was different.
						It was a real-life project that required a lot of
						planning and structuring.
					</p>
					<p className="mt-4">
						The project was divided into 4 main phases:
					</p>
					<ul className="list-disc list-inside">
						<li>Phase 1 - initial stocks predictions</li>
						<li>Phase 2 - persistence</li>
						<li>Phase 3 - presentation</li>
						<li>
							Phase 4 - project future aka. improvement of
							prediction algorithms
						</li>
					</ul>

					<p className="mt-4">
						Each phase was further divided into smaller tasks and
						implemented in an agile manner. The project was
						developed using the agile methodology and the Kanban
						framework.
					</p>

					<div className="pt-32" id="Data">
						<h2 className="text-xl neumo-out p-4">Data</h2>
					</div>
					<p className="mt-4">
						If you have survived until this point, I can tell you
						that from now on it will actually become interesting. So
						hold on tight!
					</p>

					<p className="mt-4">
						The data collection was the first task that I had to do
						in order to start the project. You may think that it is
						not that much relevant but just think about it. If you
						are trying to develop an application that heavily
						depends on the data (yes, that is exactly machine
						learning) then you need to have reliable source of the
						data that you can use to train your model. Difficulty
						increases if you want to automate everything including
						the data collection.
					</p>

					<p className="mt-4">
						So that is how scraping the internet started. I have
						managed to find an exposed&nbsp;
						<a
							href="https://developer.yahoo.com/api/"
							className="underline neumo-text-error"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Yahoo Finance API Link"
						>
							Yahoo Finance API
						</a>
						&nbsp;that I could use to collect the data for each
						stock. The data was collected using the Python
						automation script that I have developed and included
						several information such as:
					</p>
					<ul className="list-disc list-inside">
						<li>Open price</li>
						<li>Close price</li>
						<li>High price</li>
						<li>Low price</li>
						<li>Volume</li>
						<li>Adj Close Price</li>
					</ul>
					<p className="mt-4">
						Now, you might have notice that the project only
						predicts the close prices, and you are right about that.
						The reason is that the close price is the most important
						price for the stock. It is the price that is used to
						calculate the profit and loss of the stock. It is the
						price that is used to calculate the market
						capitalization of the company. It is the price that is
						used to calculate the dividend yield of the stock. And
						so on. So, it is the most important price of the stock.
					</p>
					<p className="mt-4">
						Thanks to the automation of this process it is possible
						to effortessly add new stocks to the project. The data
						is collected on a daily basis and stored in the
						database. Moreover, the system provides backwards
						compatibility so any new stock that is added to the
						project will have the historical data as well and will
						be correctly displayed in the front-end.
					</p>

					<div className="pt-32" id="Model">
						<h2 className="text-xl neumo-out p-4">Model</h2>
					</div>

					<p className="mt-4">
						As you know the project is a machine learning project
						and specifically a Time-series Forecasting one. The
						model is responsible for predicting the future stock
						prices based on the historical data. However, as broad
						as it may sound I will introduce you briefly to the
						techniques used in the model.
					</p>
					<p className="mt-4">
						Here is some small lingo of the words in the field.
					</p>
					<ul className="list-disc list-inside">
						<li>
							EDA - exploratory data analysis - a step which
							focuses on the exploration and understanding of the
							collected data
						</li>
						<li>
							Data cleaning - a step ensuring that no data is
							missing, only useful parts are kept and there are no
							duplicates
						</li>
						<li>
							Feature - a characteristic of the data that is used
							to make the predictions
						</li>
						<li>
							Feature engineering - a process that creates
							features from cleaned/preprocessed data
						</li>
						<li>
							Time step - a single unit of time that is used - in
							this case it is a day
						</li>
						<li>
							Train data - data that is used to train the model
						</li>
						<li>Test data - data that is used to test the model</li>
					</ul>

					<p className="mt-4">
						The model is developed using the Linear Regression
						model. Specifically a Regression Chain of XGBoost
						Regressors was used. You may wonder what the heck is
						that. Well, it is a technique that uses multiple XGBoost
						regressors to make prediction for the next time-step.
						Since we are predicting for multiple time-steps (many
						days in the future) we need to use multiple regressors
						to make the predictions and each of them should include
						the results from the previous days.
					</p>

					<p className="mt-4">
						A interesting fact is that the model only considers the
						weekdays. The reason is that the stock market is closed
						during the weekends and the model should not consider
						the weekends as a time-step. This is a small trick that
						ensures that the model is more accurate. So if we
						consider some thursday, the model will consider the next
						day as friday and the day after that as monday. It will
						not consider the saturday and sunday as time-steps.
					</p>

					<p className="mt-4">
						Results of feature engineering and the model training
						are concreate predictions of all the stocks for the next
						N time-steps.
					</p>

					<div className="pt-32" id="Persistence">
						<h2 className="text-xl neumo-out p-4">Persistence</h2>
					</div>
					<p className="mt-4">
						As you remember the entire phase 2 was dedicated to the
						persistence of the data in the actual cloud.
					</p>
					<p className="mt-4">
						The data is stored in the MongoDb database. The process
						of designing the database was quite challenging as it
						was required to store the data in a way that it is
						easily accessible and that it is easily queryable. The
						data is stored in the database in the following way:
					</p>
					<ul className="list-disc list-inside">
						<li>Stocks - information about the specific stock</li>
						<li>Histories - historical data about each stock</li>
						<li>
							Generations - information about the generation of
							predictions and model itself (features, hyper
							params, etc.)
						</li>
						<li>
							Predictions - generated prediciton for each stock
							and each date in the generation
						</li>
					</ul>
					<EntitiesSvg className="w-1/2 mx-auto my-2" />
					<p className="mt-4">
						Now, you can wonder why the heck the Histories and
						Predicitons should have the reference to the Stocks and
						not the other way around.
					</p>
					<p>
						It is following MongoDb best practises and
						avoiding&nbsp;
						<a
							className="underline neumo-text-error"
							target="_blank"
							href="https://www.mongodb.com/developer/products/mongodb/schema-design-anti-pattern-summary/"
							rel="noopener noreferrer"
							aria-label="MongoDb Anti-Patterns Link"
						>
							MongoDb Anti-Patterns
						</a>
						,&nbsp;one of which is storing the unbounded array of
						references in the documents (massive arrays).
					</p>

					<div className="pt-32" id="Pipeline">
						<h2 className="text-xl neumo-out p-4">Pipeline</h2>
					</div>
					<p className="mt-4">
						The pipeline is the process that is responsible for the
						automation of the entire project. It is the process that
						combines the data collection, the model training, the
						prediction generation and results persistence.
					</p>
					<p className="mt-4">
						This step was possible thanks to the Github Actions. The
						actions are the workflows that are triggered by the
						Scheduler on a daily basis and are responsible for the
						automation of the entire project. The actions are
						responsible for the following tasks in sequence:
					</p>
					<ul className="list-decimal list-inside">
						<li>Data collection</li>
						<li>Data transformation</li>
						<li>Model training</li>
						<li>Prediction generation</li>
						<li>Persistence of data</li>
					</ul>

					<div className="pt-32" id="Presentation">
						<h2 className="text-xl neumo-out p-4">Presentation</h2>
					</div>
					<p className="mt-4">
						The presentation is the final step of the project. It is
						the step that is responsible for the presentation of the
						data and the predicitons to the end user.
					</p>
					<p className="mt-4">
						General Stocks Preditions web-platform was developed
						using React.js and Tailwind CSS. It is a simple
						application that is responsible for the following tasks:
					</p>
					<ul className="list-disc list-inside">
						<li>
							Displaying the historical data of the stock prices
						</li>
						<li>
							Displaying the predicitons of the stock prices for
							the next N days
						</li>
						<li>
							Displaying the information about the stock itself
						</li>
					</ul>

					<p className="mt-4">
						What is interesting is that the front-end is hosted in
						the cloud and is using the power of serverless functions
						to execute the requests to the mongo databse. The
						serverless solution not only provides the scalability
						and the reliability of the application (which of course
						you knew), but also adds another layer of safety as no
						environmental secrets are exposed during the creation of
						requests.
					</p>

					<p className="mt-4">
						One of the non-fucntional requirements that I gave my
						project was to follow the Neumorphism pattern on the
						website. I have managed to achieve that by using the
						Tailwind CSS and the custom components that I have
						developed. The website is fully responsive and is
						available on all devices.
					</p>

					<div className="pt-32" id="Conclusion">
						<h2 className="text-xl neumo-out p-4">Conclusion</h2>
					</div>
					<p className="mt-4">
						Well, during the development of the project I have
						learned that the proper organisation and planning is
						crucial for the success of the project.
					</p>
					<p className="mt-4">
						I am very happy that it is finally in the state that I
						can share it with you. From the 1 person team
						perspective I am very proud that even though at times it
						seemed there was no end to the project, I have managed
						to finish it.
					</p>

					<p className="mt-4">
						I hope that you have enjoyed the article and that you
						have learned something new. If you have any questions or
						suggestions feel free to contact me.
					</p>
					<div className="my-16 flex justify-center">
						<CustomLink
							text="Contact me"
							to="/contact"
							className="p-4"
							c2a
						/>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
}

export default HowPage;
