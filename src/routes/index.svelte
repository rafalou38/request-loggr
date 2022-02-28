<script lang="ts">
	import { fillEmpty } from '$lib/fillEmpty';
	import Graph from '$lib/Graph.svelte';

	import { parseLogs } from '$lib/parseLogs';

	import { testLogs } from '$lib/test/testData';
	let logs = testLogs;

	async function fetchLogs(url: string) {
		const response = await fetch(url);
		if (!response.ok) return alert('There was a problem with the request.' + response.status);

		logs = await response.text();
	}

	let logplex_url =
		'https://dublin.sessions.logs.heroku.com/stream?channel_id=app-2542f63d-35dd-42b2-b934-f3190bf21d3c&num=500&ps=&region=eu&source=&tail=false&timestamp=1646070276&token=pFU3CofDYrjsTr9gwPf2GZDbG7kjqWyH-P-YN_8bkPg%3D';

	$: fetchLogs(logplex_url);
</script>

<label for="logplex_url">Logplex Url <a href="/logplex">How to get.</a></label>
<input type="url" id="logplex_url" bind:value={logplex_url} />
<Graph logs={fillEmpty(parseLogs(logs))} />
