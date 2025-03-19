<script lang="ts">
	export let text: string = 'Continue';
	export let onClick: () => void = () => {};
</script>

<button
	on:click={onClick}
	class="bg-dark-navy bg-gradient h-full w-full rounded-full py-4 text-white hover:cursor-pointer"
>
	{text}
</button>

<style>
	.bg-gradient {
		&:hover {
			background: linear-gradient(to bottom, #6943ff, #2f2ce9);
		}
	}
</style>
