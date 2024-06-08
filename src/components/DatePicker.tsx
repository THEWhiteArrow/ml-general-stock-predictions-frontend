import { getNthPreviousWorkingDate, getToday } from "../utils/dateUtils";

type DatePickerProps = {
	date: Date;
	setDate: (date: Date) => void;
};

function DatePicker(props: DatePickerProps) {
	const { date, setDate } = props;
	return (
		<div className="flex flex-row justify-between items-center my-2">
			<button
				className="neumo-out neumo-interactive p-2"
				onClick={() => setDate(getNthPreviousWorkingDate(1, date))}
			>
				Previous
			</button>
			<p className="neumo-out p-4">
				{date.toLocaleString("default", {
					day: "numeric",
					month: "long",
					year: "numeric",
				})}
			</p>
			<button
				className="neumo-out neumo-interactive p-2 disabled:opacity-50 disabled:cursor-not-allowed"
				disabled={date >= getToday()}
				onClick={() => setDate(getNthPreviousWorkingDate(-1, date))}
			>
				Next
			</button>
		</div>
	);
}

export default DatePicker;
