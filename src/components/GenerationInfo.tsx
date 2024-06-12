import { Generation } from "../services/DataService";
import Accordion from "./Accordion";

type GenerationInfoProps = {
	generation: Generation | null;
	predictionDate: Date;
};

function GenerationInfo(props: GenerationInfoProps) {
	const { generation, predictionDate } = props;

	const currentDate = new Date();
	const currentUTCHour = currentDate.getUTCHours();
	if (!generation) {
		if (
			predictionDate.toDateString() === currentDate.toDateString() &&
			currentUTCHour < 20
		) {
			return (
				<p
					className="neumo-text-info text-center mb-6"
					aria-label="Information"
				>
					Nice to see you! Please wait until 20:00 UTC for the newest
					predictions to be generated or pick past date.
				</p>
			);
		} else if (
			predictionDate.getDay() === 6 ||
			predictionDate.getDay() === 0
		) {
			return (
				<p
					className="neumo-text-info text-center mb-6"
					aria-label="Information message - weekend"
				>
					No predictions are generated on weekends. Please pick a
					weekday or contact the developers.
				</p>
			);
		} else {
			return (
				<p
					className="neumo-text-error text-center mb-6"
					aria-label="Warning message - predictions not found"
				>
					No predictions for the chosen date are available. Please
					pick another date or contact the developers.
				</p>
			);
		}
	} else console.log(new Date(generation.created_at).toLocaleString());
	return (
		<Accordion title="Generation Info" className="neumo-out p-4 mb-6">
			<div className="neumo-in mt-4 mb-1 p-4 flex flex-col">
				<h4 className="neumo-out mt-4 mb-2 p-2">Date</h4>
				<p>{new Date(generation.date).toISOString().split("T")[0]}</p>
				<h4 className="neumo-out mt-4 mb-2 p-2">Created at</h4>
				<p>{new Date(generation.created_at).toLocaleString()}</p>

				<h4 className="neumo-out mt-4 mb-2 p-2">Name</h4>
				<p>{generation.name}</p>

				<h4 className="neumo-out mt-4 mb-2 p-2">
					Number of days into the past to consider
				</h4>
				<p>{generation.days_back_to_consider}</p>
				<h4 className="neumo-out mt-4 mb-2 p-2">
					Number of days into the future to predict
				</h4>

				<p>{generation.n_step}</p>
				<h4 className="neumo-out mt-4 mb-2 p-2">
					Categorical features used
				</h4>
				<p>{JSON.stringify(generation.categorical_features)}</p>

				<h4 className="neumo-out mt-4 mb-2 p-2">Label features used</h4>
				<p>{JSON.stringify(generation.label_features)}</p>

				<h4 className="neumo-out mt-4 mb-2 p-2">
					Moving window averages used
				</h4>
				<p>{JSON.stringify(generation.mwms)}</p>

				<h4 className="neumo-out mt-4 mb-2 p-2">
					Targe feature lags used
				</h4>
				<p>{JSON.stringify(generation.shifts)}</p>
			</div>
		</Accordion>
	);
}

export default GenerationInfo;
