<script lang="ts">
	import resultsData from '$lib/data/data.json';

	import ResultCard from '$lib/components/ResultCard.svelte';
	import SummaryItem from '$lib/components/SummaryItem.svelte';
	import Button from '$lib/components/Button.svelte';

	type Category = keyof typeof STYLES_BY_CATEGORY;

	const STYLES_BY_CATEGORY = {
		Reaction: {
			bgClass: 'bg-red-50',
			textClass: 'text-red'
		},
		Memory: {
			bgClass: 'bg-yellow-50',
			textClass: 'text-yellow'
		},
		Verbal: {
			bgClass: 'bg-green-50',
			textClass: 'text-green'
		},
		Visual: {
			bgClass: 'bg-blue-50',
			textClass: 'text-blue'
		}
	};

	const categories = resultsData.map((item) => ({
		...item,
		textClass: STYLES_BY_CATEGORY[item.category as Category]?.textClass || 'text-gray-500',
		bgClass: STYLES_BY_CATEGORY[item.category as Category]?.bgClass || 'bg-gray-50'
	}));

	console.log(categories[0].bgClass);

	const result = {
		score: 76,
		maxScore: 100,
		evaluation: 'Great',
		description: 'You scored higher than 65% of the people who have taken these tests.'
	};

	function handleContinue() {
		alert("Congratulations, you continued! \n (There's nothing to continue here...)");
	}
</script>

<div class="md:bg-very-light-blue min-h-svh md:flex md:items-center">
	<div
		class=" m-auto flex flex-col items-center justify-center gap-4 bg-white sm:w-[min(80%,46rem)] md:flex-row md:rounded-4xl"
	>
		<ResultCard {...result} />
		<div class="flex w-full flex-col gap-6 p-8 md:gap-10 md:px-10 md:py-0">
			<h2 class="text-heading-m text-dark-navy -mb-4 font-bold">Summary</h2>
			<div class="grid gap-4">
				{#each categories as item}
					<SummaryItem {...item} />
				{/each}
			</div>
			<Button text="Continue" onClick={handleContinue} />
		</div>
	</div>
</div>
