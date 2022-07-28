<script lang="ts">
	import { splitDays } from './splitDates';

	export let logs: Map<number, string>;

	let tooltipText = '';
	let tooltipPosition = {
		x: 0,
		y: 0
	};
	let tooltipVisible = false;

	// handle tooltip
	function mouseEnter(target: HTMLDivElement) {
		const millis = target.dataset?.['millis'];
		const ip = target.dataset?.['ip'];
		if (!target || !millis) return;

		const date = new Date(parseInt(millis));
		tooltipText = date.toLocaleTimeString() + (ip ? '<br/>' + ip : '');

		const rect = target.getBoundingClientRect();
		tooltipPosition.x = rect.left + rect.width / 2;
		tooltipPosition.y = rect.top + rect.height;

		tooltipVisible = true;
	}

	function mouseLeave() {
		tooltipPosition = {
			x: 0,
			y: 0
		};
	}

	// color representation of the ip
	function color(ip: string) {
		const rgb = ip
			.split('.')
			.map((e) => parseInt(e))
			.slice(0, 3);
		rgb[1] = 255;
		return 'rgb(' + rgb.join(',') + ')';
	}
</script>

<!-- tailwindcss tooltip -->
{#if tooltipPosition.x + tooltipPosition.y != 0}
	<div
		class="absolute bg-blue-900 rounded p-2"
		style="left: {tooltipPosition.x}px; top: {tooltipPosition.y}px;"
	>
		{@html tooltipText}
	</div>
{/if}

<table class="text-center w-min">
	<tr>
		<th>DATE</th>
		<th>CONNECTIONS</th>
	</tr>
	{#each [...splitDays(logs).entries()] as [date, dayLogs], i}
		<tr>
			<td>
				{new Date(date).toLocaleDateString()}
			</td>
			<td class="flex gap-[1px] m-2" class:justify-end={i === 0}>
				{#each [...dayLogs.entries()] as [millis, ip]}
					<div
						class="bg-green-400 w-2 h-4"
						style={ip ? `background-color: ${color(ip)}` : '}'}
						class:bg-gray-600={!ip}
						data-millis={millis}
						data-ip={ip}
						on:touchstart={(e) => mouseEnter(e.currentTarget)}
						on:mouseenter={(e) => mouseEnter(e.currentTarget)}
						on:mouseleave={mouseEnter}
						on:mouseleave={mouseLeave}
					/>
				{/each}
			</td>
		</tr>
	{/each}
	<!-- {#each [...logs.entries()] as [date, value]}
		<tr>
			<td>
				{new Date(date).toLocaleString()}
			</td>
			<td>
				{value || 'N/A'}
			</td>
		</tr>
	{/each} -->
</table>
