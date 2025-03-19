<script lang="ts">
	export let score: number;
	export let maxScore: number = 100;
	export let evaluation: string;
	export let description: string;
</script>

<div
	class="bg-gradient-1 flex flex-col items-center justify-center rounded-b-4xl p-8 text-center text-white md:max-w-sm md:rounded-4xl"
>
	<h2 class="text-heading-m text-light-blue mb-6 font-bold">Your Result</h2>

	<div
		class="bg-gradient-2 mb-6 flex size-36 flex-col items-center justify-center rounded-full md:size-52"
	>
		<span class="text-heading-xl font-bold">{score}</span>
		<span class="text-light-blue opacity-50">of {maxScore}</span>
	</div>

	<h3 class="text-heading-l mb-3 font-bold">{evaluation}</h3>
	<p class="text-light-blue text-body">{description}</p>
</div>
