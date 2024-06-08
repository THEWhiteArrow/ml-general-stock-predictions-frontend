const getNthPreviousWorkingDate = (days: number, date: Date): Date => {
	let newDate = new Date(date);

	if (newDate.getDay() === 6)
		newDate.setDate(newDate.getDate() - 1); // Friday
	else if (newDate.getDay() === 7)
		newDate.setDate(newDate.getDate() - 2); // Saturday
	else {
		const addedDays = 5 - newDate.getDay();
		days += addedDays;
		newDate = new Date(newDate.setDate(newDate.getDate() + addedDays));
	}
	days += 2 * Math.floor(days / 5);

	newDate = new Date(newDate.setDate(newDate.getDate() - days));

	if (newDate > new Date()) {
		return date;
	}
	return newDate;
};
const getToday = () => {
	const date = new Date();
	date.setUTCHours(0, 0, 0, 0);
	return date;
};
export { getNthPreviousWorkingDate, getToday };
