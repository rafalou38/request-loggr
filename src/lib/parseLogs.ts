/*

Parses each line of logs and returns a list of logs.
example line:
2022-02-27T17:45:02.917335+00:00 heroku[router]: at=info code=H81 desc="Blank app" method=GET path="/ping" host=request-loggr.herokuapp.com request_id=1bb4f556-d669-4fcf-8511-25906f277154 fwd="90.112.175.88" dyno= connect= service= status=502 bytes= protocol=https

extract date and ip  using a regex if path matches "/ping"
 */
export function parseLogs(logs: string): Map<number, string> {
	const logsMap = new Map<number, string>();
	const lines = logs.split('\n');
	lines.forEach((line) => {
		const path = extractPath(line);
		if (path === '/ping') {
			const date = extractDate(line);
			date.setSeconds(0);
			date.setMilliseconds(0);

			// Keep only the date that happen at the good moment
			if (date.getMinutes() % 15 != 0) return;
			const ip = extractIp(line);
			logsMap.set(date.getTime(), ip);
		}
	});

	return logsMap;
}

function extractDate(line: string) {
	const dateRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+\+\d+:\d+/;
	const match = line.match(dateRegex);
	if (match) {
		const date = new Date(match[0]);
		return date;
	}
	return null;
}

function extractIp(line: string) {
	const ipRegex = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
	const match = line.match(ipRegex);
	if (match) {
		return match[0];
	}
	return null;
}

function extractPath(line: string) {
	const pathRegex = /path=".+?"/;
	const match = line.match(pathRegex);
	if (match) {
		return match[0].replace('path=', '').replace(/"/g, '');
	}
	return null;
}
