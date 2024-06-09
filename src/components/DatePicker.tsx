import { getNthPreviousWorkingDate, getToday } from "../utils/dateUtils";

type DatePickerProps = {
	date: Date;
	className?: string;
	setDate: (date: Date) => void;
};

function DatePicker(props: DatePickerProps) {
	const { date, setDate, className } = props;
	return (
		<div
			className={`${className} flex flex-row justify-center gap-4 items-center`}
		>
			<button
				className="neumo-out neumo-interactive p-2 w-32"
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
				className="neumo-out neumo-interactive p-2 disabled:opacity-50 disabled:cursor-not-allowed w-32"
				disabled={date >= getToday()}
				onClick={() => setDate(getNthPreviousWorkingDate(-1, date))}
			>
				Next
			</button>
		</div>
	);
}

export default DatePicker;
