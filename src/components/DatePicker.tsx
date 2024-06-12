import { getNthPreviousWorkingDate, getToday } from "../utils/dateUtils";

type DatePickerProps = {
	date: Date;
	className?: string;
	setDate: (date: Date) => void;
};

function DatePicker(props: DatePickerProps) {
	const { date, setDate, className } = props;
	return (
		<div className={`${className} flex flex-col`}>
			<label htmlFor="date" className="text-center">
				Please choose a date for which to display the generation of
				predictions.
			</label>
			<div className="flex flex-row justify-center gap-4 items-center mt-2">
				<button
					className="neumo-text-info neumo-out neumo-interactive p-2 w-32"
					onClick={() => setDate(getNthPreviousWorkingDate(1, date))}
				>
					Previous
				</button>
				<input
					id="date"
					className="p-4 neumo-text-info neumo neumo-out cursor-pointer"
					type="date"
					value={date.toISOString().split("T")[0]}
					onChange={(e) => setDate(new Date(e.target.value))}
				/>
				<button
					className="neumo-text-info neumo-out neumo-interactive p-2 disabled:opacity-50 disabled:cursor-not-allowed w-32"
					disabled={date >= getToday()}
					onClick={() => setDate(getNthPreviousWorkingDate(-1, date))}
				>
					Next
				</button>
			</div>
		</div>
	);
}

export default DatePicker;
