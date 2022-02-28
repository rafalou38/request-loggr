<script lang="ts">
	import { fillEmpty } from '$lib/fillEmpty';
	import Graph from '$lib/Graph.svelte';

	import { parseLogs } from '$lib/parseLogs';

	import { testLogs } from '$lib/test/testData';
	let logs = testLogs;
</script>

<textarea class="w-full" bind:value={logs} />

<Graph logs={fillEmpty(parseLogs(logs))} />
