<script lang="ts">
	export let category: string;
	export let score: number;
	export let icon: string;
	export let bgClass: string;
	export let textClass: string;
</script>

<div class="flex items-center justify-items-center gap-3 rounded-lg p-4 {bgClass}">
	<img src={icon} alt={category} />
	<div class="flex w-full items-center justify-between">
		<h4 class={textClass}>{category}</h4>
		<p class="text-dark-navy"><span class="font-bold">{score}</span> / 100</p>
	</div>
</div>
