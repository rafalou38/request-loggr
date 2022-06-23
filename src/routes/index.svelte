<script lang="ts">
	import { browser } from '$app/env';

	import { fillEmpty } from '$lib/fillEmpty';
	import Graph from '$lib/Graph.svelte';

	import { parseLogs } from '$lib/parseLogs';

	import { testLogs } from '$lib/test/testData';
	let logs = testLogs;

	async function fetchLogs() {
		const urlResponse = await fetch(
			'https://api.heroku.com/apps/2542f63d-35dd-42b2-b934-f3190bf21d3c/log-sessions',
			{
				method: 'POST',
				headers: {
					Accept: 'application/vnd.heroku+json; version=3',
					'Content-Type': 'application/json',
					Authorization: 'Bearer a86f3f8c-57f7-4758-a483-f7bb33cea5b8'
				},
				body: '{"lines":5000}'
			}
		);

		if (!urlResponse.ok)
			return alert('There was a problem with the request.' + urlResponse.statusText);
		const data = await urlResponse.json();
		const url = data.logplex_url;

		const response = await fetch(url);
		if (!response.ok)
			return alert('There was a problem with the request.' + urlResponse.statusText);

		logs = await response.text();
	}

	if (browser) fetchLogs();
</script>

<Graph logs={fillEmpty(parseLogs(logs))} />
