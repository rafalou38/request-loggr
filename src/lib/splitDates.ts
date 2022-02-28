export function splitDays(logs: Map<number, string>): Map<number, Map<number, string>> {
	const days: Map<number, Map<number, string>> = new Map();
	logs.forEach((ip, millis) => {
		const date = new Date(millis);
		const day = getDay(date);
		if (!days.has(day)) {
			days.set(day, new Map());
		}
		days.get(day).set(millis, ip);
	});

	return days;
}

function getDay(date: Date) {
	const nDate = new Date(date);
	nDate.setHours(0, 0, 0, 0);
	return nDate.getTime();
}
