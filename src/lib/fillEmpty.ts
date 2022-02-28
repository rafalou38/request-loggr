export function fillEmpty(activeTimes: Map<number, string>) {
	// Get the oldest and newest date from the map.
	const oldestDate = new Date([...activeTimes.keys()].at(0));
	const newestDate = new Date();

	// create a new Map with dates between the oldest and newest date with a space of 15 minutes mapped to null.
	const emptyMap = new Map<number, string>();

	const date = new Date(oldestDate.getTime());
	while (date <= newestDate) {
		emptyMap.set(date.getTime(), null);
		date.setMinutes(date.getMinutes() + 15);
	}

	// replace empty dates with the dates from the active times map
	activeTimes.forEach((ip, date) => {
		emptyMap.set(date, ip);
	});

	return emptyMap;
}
