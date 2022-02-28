<script lang="ts">
	export let logs: Map<number, string>;
</script>

<table class="w-full text-center">
	<tr>
		<th>DATE</th>
		<th>IP</th>
	</tr>
	{#each [...logs.entries()] as [date, value]}
		<tr>
			<td>
				{new Date(date).toLocaleString()}
			</td>
			<td>
				{value || 'N/A'}
			</td>
		</tr>
	{/each}
</table>
